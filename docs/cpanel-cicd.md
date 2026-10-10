# cPanel Git deployment

This project deploys from the `main` branch to the cPanel Node.js application for `piesquaretechnologies.com`.

## Server setup

1. Clone this repository into the cPanel application root, for example `/home/piesquar/repositories/Pie-Square-Technologies-`.
2. Set the Node.js application root to that clone, use Node 20, production mode, and `server.js` as the startup file.
3. Add these application environment variables in cPanel:

   - `GITHUB_WEBHOOK_SECRET`: the random secret configured on the GitHub webhook.
   - `CPANEL_HOME`: `/home/piesquar`.
   - `DEPLOY_BRANCH`: `main`.
   - `DEPLOY_DOMAIN`: `piesquaretechnologies.com`.

4. Generate a read-only SSH deploy key on the server and add its public key to the GitHub repository. The clone must use that key for `git fetch`.
5. Add a GitHub push webhook targeting `https://piesquaretechnologies.com/api/github-webhook` with content type `application/json`, the same secret, and the `push` event.

The webhook validates GitHub's HMAC signature, accepts pushes to `main`, and starts `deploy.sh` in the background. The script serializes concurrent deploys, resets the server clone to `origin/main`, installs the lockfile dependencies, builds the Next.js app, restarts Passenger through `tmp/restart.txt`, and performs a homepage health check.

Secrets stay in cPanel and GitHub settings. They must not be committed to this repository.
