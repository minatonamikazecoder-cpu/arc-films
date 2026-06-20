const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const dns = require('dns');

dns.setDefaultResultOrder('ipv4first');

const host = "aws-1-ap-south-1.pooler.supabase.com";
const password = "%23Tpxitachi05";
const projectRef = "ertlehesvjvyfmnmjysq";
const dbName = "postgres";

async function createDatabaseIfNeeded() {
  // Connect to default 'postgres' database via Session Pooler (port 5432)
  const connectionString = `postgresql://postgres.${projectRef}:${password}@${host}:5432/postgres`;
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to default database "postgres" to verify database existence...');

    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);
    if (res.rowCount === 0) {
      console.log(`Database "${dbName}" does not exist. Creating database...`);
      // CREATE DATABASE cannot run inside a transaction block or with other queries
      await client.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database "${dbName}" created successfully!`);
    } else {
      console.log(`Database "${dbName}" already exists.`);
    }
  } catch (err) {
    console.error('Error creating database:', err);
    throw err;
  } finally {
    await client.end();
  }
}

async function runMigration() {
  // Connect to the newly created 'arc_films' database via Session Pooler (port 5432) to execute schema
  const connectionString = `postgresql://postgres.${projectRef}:${password}@${host}:5432/${dbName}`;
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log(`Connected to database "${dbName}" successfully.`);

    const sqlPath = path.join(__dirname, 'supabase', 'schema.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('Applying schema.sql...');
    await client.query(sql);
    console.log('Schema applied successfully!');
  } catch (err) {
    console.error('Error running migration:', err);
    throw err;
  } finally {
    await client.end();
  }
}

async function main() {
  try {
    await createDatabaseIfNeeded();
    await runMigration();
  } catch (err) {
    console.error('Migration process failed:', err);
    process.exit(1);
  }
}

main();
