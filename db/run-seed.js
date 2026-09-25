// Executes db/seed.sql against the database configured in server/.env.
// Run with:  npm run db:seed   (after `npm run install-all` and `npm run db:up`)
const fs = require('fs');
const path = require('path');
const connect = require('./connect');

(async () => {
  const conn = await connect();
  try {
    await conn.query(fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8'));
    console.log('Seed applied (existing rows were left untouched).');
  } finally {
    await conn.end();
  }
})().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
