require('dotenv').config();
const mysql = require('mysql2/promise');

async function checkTables() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    console.log('Connected to DB');
    const [rows] = await connection.execute('SHOW TABLES');
    console.log('Tables:', rows);

    // Check AA_VIEWER_ACCOUNT columns
    try {
        const [cols] = await connection.execute('DESCRIBE AA_VIEWER_ACCOUNT');
        console.log('AA_VIEWER_ACCOUNT Columns:', cols.map(c => c.Field));
    } catch (err) {
        console.log('Error describing AA_VIEWER_ACCOUNT:', err.message);
    }

    await connection.end();
}

checkTables();
