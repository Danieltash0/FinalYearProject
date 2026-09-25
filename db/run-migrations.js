// Applies db/migrations/*.sql in filename order, skipping any already recorded in
// the `schema_migrations` table.
// Run with:  npm run db:migrate
const fs = require('fs');
const path = require('path');
const connect = require('./connect');

const dir = path.join(__dirname, 'migrations');

(async () => {
  const conn = await connect();
  try {
    await conn.query(
      `CREATE TABLE IF NOT EXISTS schema_migrations (
         filename VARCHAR(255) PRIMARY KEY,
         applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
       )`
    );
    const [rows] = await conn.query('SELECT filename FROM schema_migrations');
    const done = new Set(rows.map((r) => r.filename));

    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.sql')).sort();
    let applied = 0;
    for (const file of files) {
      if (done.has(file)) continue;
      await conn.query(fs.readFileSync(path.join(dir, file), 'utf8'));
      await conn.query('INSERT INTO schema_migrations (filename) VALUES (?)', [file]);
      console.log(`Applied ${file}`);
      applied++;
    }
    console.log(applied ? `${applied} migration(s) applied.` : 'Database is up to date.');
  } finally {
    await conn.end();
  }
})().catch((err) => {
  console.error('Migration failed:', err.message);
  process.exit(1);
});
