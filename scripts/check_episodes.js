const mysql = require('mysql2/promise');

async function checkEpisodes() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'NEWS'
    });

    try {
        console.log('--- AA_EPISODE Sample ---');
        const [rows] = await connection.execute('SELECT * FROM AA_EPISODE LIMIT 10');
        console.table(rows);
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await connection.end();
    }
}

checkEpisodes();
