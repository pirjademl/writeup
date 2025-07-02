import mysql from 'mysql2/promise';
import { createPool, Pool } from 'mysql2/promise';

const pool: Pool = mysql.createPool({
    host: process.env.MYSQL_PROTOCOL,
    database: process.env.DATABASE_NAME,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

pool.on('connection', () => {
    console.log('✅ MySQL pool connection established');
});


export { pool };
