# Backend and CMS setup

This project is a Next.js site with an optional MySQL-backed CMS. The public website still renders from `data/site.ts` when MySQL is unavailable, but the admin dashboard requires a configured database.

## Requirements

- Node.js and npm compatible with the versions in `package.json`
- MySQL with permission to create tables, or a database prepared by your hosting provider
- A writable project directory for media uploads

The application uses `mysql2`, `utf8mb4`, and a connection pool limited to five connections.

## 1. Create the database

Create a database and a dedicated application user. Run this as a MySQL administrator, changing the password before use:

```sql
CREATE DATABASE piesquare CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'piesquare_app'@'localhost' IDENTIFIED BY 'replace-with-a-strong-password';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, INDEX, REFERENCES
  ON piesquare.* TO 'piesquare_app'@'localhost';
FLUSH PRIVILEGES;
```

If the application and MySQL are on different hosts, replace `localhost` with the application host or the restricted host pattern required by the provider. Avoid using the MySQL root account from the application.

On cPanel, create the database and database user in **MySQL® Databases**, add the user to the database with the required privileges, and use phpMyAdmin or SSH for the SQL steps below.

## 2. Configure environment variables

From the project root:

```powershell
Copy-Item .env.example .env.local
```

Set these values in `.env.local`:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=piesquare
DB_USER=piesquare_app
DB_PASSWORD=replace-with-a-strong-password
SESSION_SECRET=replace-with-a-long-random-secret
```

`SESSION_SECRET` signs the administrator session cookie. Generate a value instead of using the example:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Keep `.env.local` private. It is gitignored and must not be committed or exposed to the browser.

## 3. Create the schema and seed content

Install dependencies first if needed:

```powershell
npm install
```

Apply the schema, then the initial content seed. MySQL will prompt for the database password:

```powershell
Get-Content server/schema.sql | mysql -h 127.0.0.1 -P 3306 -u piesquare_app -p piesquare
Get-Content server/seed.sql | mysql -h 127.0.0.1 -P 3306 -u piesquare_app -p piesquare
```

The seed creates the initial contact settings, hero, about content, services, and projects. It is safe to rerun for the seeded records because the statements use duplicate-key updates where appropriate.

### Existing CMS database

Do not rerun the full schema as a substitute for migrations. For a database created before the project progress field was added, run:

```powershell
Get-Content server/migrations/001_add_project_status.sql | mysql -h 127.0.0.1 -P 3306 -u piesquare_app -p piesquare
Get-Content server/seed.sql | mysql -h 127.0.0.1 -P 3306 -u piesquare_app -p piesquare
```

The migration adds `projects.project_status` and backfills rows whose completion text contains `Present` as `ONGOING`; all other rows become `COMPLETED`.

## 4. Create the first administrator

The password must be at least 10 characters. Run:

```powershell
npm run admin:create -- admin@example.com "use-a-long-password" "Site Administrator"
```

The script hashes the password with bcrypt and creates or updates an `ACTIVE` administrator record. The optional `ADMIN_BOOTSTRAP_*` values in `.env.example` are reference placeholders; the `admin:create` command arguments are what the script uses.

## 5. Start and verify the application

For local development:

```powershell
npm run dev
```

Open:

- `http://localhost:3000/admin/login` — administrator login
- `http://localhost:3000/admin` — protected CMS dashboard
- `http://localhost:3000/projects` — public project listing

After signing in, verify that the dashboard loads Homepage, Services, Projects, Applications, and Media. Add a draft project, edit its details, switch its progress between `ONGOING` and `COMPLETED`, and publish it only when it is ready for the public site.

For a production-style local check:

```powershell
npm run build
npm run start
```

## CMS status meanings

Projects have two separate status concepts:

| Field | Values | Meaning |
| --- | --- | --- |
| Publication status | `DRAFT`, `PUBLISHED`, `ARCHIVED` | Controls whether the project is visible and whether it is retained in the CMS list. |
| Project progress | `ONGOING`, `COMPLETED` | Describes delivery progress shown on the public project card and detail page. |

Archiving a project sets its publication status to `ARCHIVED`; it does not delete the project record. Media deletion is permanent for the database record and uploaded file.

## Media uploads

Admin uploads accept JPG, PNG, WebP, GIF, and AVIF files smaller than 10 MB. Files are stored in `public/media/uploads/` and their metadata is stored in `media_library`.

The runtime must be able to create and write to `public/media/uploads/`. On a hosted server, make that directory persistent and include it in backups. Do not use a temporary deployment directory for user-uploaded media.

## Backups and restore

Create a database backup before applying migrations or making large content changes:

```powershell
mysqldump -h 127.0.0.1 -P 3306 -u piesquare_app -p --single-transaction piesquare > piesquare-backup.sql
```

Restore only after confirming the target database:

```powershell
Get-Content piesquare-backup.sql | mysql -h 127.0.0.1 -P 3306 -u piesquare_app -p piesquare
```

Back up `public/media/uploads/` separately because uploaded files are not stored inside MySQL.

## Troubleshooting

### “Admin database is not configured”

Confirm that `.env.local` exists in the project root and contains `DB_HOST`, `DB_NAME`, `DB_USER`, and `SESSION_SECRET`. Restart the Next.js process after changing environment variables.

### The public site works but the dashboard does not

This is expected when the database is unavailable: public routes fall back to static content, while admin routes require MySQL. Check the database host, port, credentials, and firewall rules.

### Projects cannot be loaded after an update

Check that `server/migrations/001_add_project_status.sql` has been applied to existing databases. The Projects API expects the `project_status` column.

### Login does not work

Confirm the administrator email is lowercased, the row has `status = 'ACTIVE'`, `SESSION_SECRET` is set, and the server was restarted after changing it. Re-run `npm run admin:create` to reset the account password.

### Image upload fails

Confirm that `public/media/uploads/` is writable by the Node.js process and that the file is an accepted image type under 10 MB.

## Production security checklist

- Use HTTPS so the secure administrator cookie is protected in transit.
- Use a long unique `SESSION_SECRET` and rotate it if it is exposed.
- Use a least-privilege MySQL user instead of root.
- Keep `.env.local`, database backups, and uploaded media outside public downloads where appropriate.
- Back up both MySQL and `public/media/uploads/`.
- Run `npm run build` before starting the production server.
