const mysql = require('mysql2/promise');

async function describeCountry() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'NEWS'
    });

    try {
        console.log('--- AA_COUNTRY ---');
        const [rows] = await connection.execute('DESCRIBE AA_COUNTRY');
        console.table(rows);
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await connection.end();
    }
}

describeCountry();
