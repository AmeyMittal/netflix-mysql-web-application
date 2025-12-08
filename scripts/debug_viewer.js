require('dotenv').config();
const mysql = require('mysql2/promise');

async function debugViewer() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    console.log('Connected. Fetching Account 40...');
    const [rows] = await connection.execute('SELECT * FROM AA_VIEWER_ACCOUNT WHERE account_id = 40');
    console.log('Raw DB Record:', rows[0]);
    await connection.end();
}

debugViewer();
