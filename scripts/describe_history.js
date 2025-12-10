const mysql = require('mysql2/promise');

async function describeHistory() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'NEWS'
    });

    try {
        console.log('--- AA_VIEW_HISTORY ---');
        let [rows] = await connection.execute('DESCRIBE AA_VIEW_HISTORY');
        console.table(rows);

        console.log('--- AA_EPISODE ---');
        [rows] = await connection.execute('DESCRIBE AA_EPISODE');
        console.table(rows);

        console.log('--- AA_WEB_SERIES ---');
        [rows] = await connection.execute('DESCRIBE AA_WEB_SERIES');
        console.table(rows);
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await connection.end();
    }
}

describeHistory();
