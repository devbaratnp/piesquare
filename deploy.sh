#!/usr/bin/env bash
set -euo pipefail

BRANCH="${DEPLOY_BRANCH:-main}"
HOME_DIR="${CPANEL_HOME:-${HOME:?CPANEL_HOME or HOME must be set}}"
REPO_DIR="${DEPLOY_REPO_DIR:-$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)}"
BACKUP_DIR="${DEPLOY_BACKUP_DIR:-$HOME_DIR/deploy-backups/piesquare-technologies}"
LOCK_FILE="$REPO_DIR/.deploy.lock"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"

exec 9>"$LOCK_FILE"
if ! flock -n 9; then
  echo "Another Pie Square deployment is already running."
  exit 1
fi

mkdir -p "$BACKUP_DIR" "$REPO_DIR/tmp"

cd "$REPO_DIR"
CURRENT_COMMIT="$(git rev-parse HEAD 2>/dev/null || true)"
if [ -n "$CURRENT_COMMIT" ]; then
  printf '%s %s\n' "$TIMESTAMP" "$CURRENT_COMMIT" > "$BACKUP_DIR/previous-$TIMESTAMP.txt"
fi

git fetch --prune origin "$BRANCH"
git reset --hard "origin/$BRANCH"

npm ci
npm run build

touch "$REPO_DIR/tmp/restart.txt"

if command -v curl >/dev/null 2>&1; then
  DOMAIN="${DEPLOY_DOMAIN:-piesquaretechnologies.com}"
  HEALTHY=0
  for _ in 1 2 3 4 5; do
    if curl --fail --silent --show-error --max-time 30 -o /dev/null "https://$DOMAIN/"; then
      HEALTHY=1
      break
    fi
    sleep 2
  done
  if [ "$HEALTHY" -ne 1 ]; then
    echo "Post-deploy health check failed for https://$DOMAIN/"
    exit 1
  fi
fi

find "$BACKUP_DIR" -type f -name 'previous-*.txt' -mtime +14 -delete 2>/dev/null || true
echo "Deployed $BRANCH at $TIMESTAMP"
