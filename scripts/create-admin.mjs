import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

const [email, password, name = 'Site administrator'] = process.argv.slice(2);
if (!email || !password || password.length < 10) {
  console.error('Usage: npm run admin:create -- admin@example.com "a-long-password" "Name"');
  process.exit(1);
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 3306),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const hash = await bcrypt.hash(password, 12);
await pool.execute('INSERT INTO admins (name, email, password_hash, status) VALUES (?, ?, ?, \'ACTIVE\') ON DUPLICATE KEY UPDATE name = VALUES(name), password_hash = VALUES(password_hash), status = \'ACTIVE\'', [name, email.toLowerCase(), hash]);
await pool.end();
console.log(`Admin account ready for ${email.toLowerCase()}`);
