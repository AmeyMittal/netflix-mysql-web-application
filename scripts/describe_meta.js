const mysql = require('mysql2/promise');

async function describeMeta() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'NEWS'
    });

    try {
        console.log('--- AA_RELEASE_COUNTRY ---');
        let [rows] = await connection.execute('DESCRIBE AA_RELEASE_COUNTRY');
        console.table(rows);

        console.log('--- AA_WEBSERIES_DUBBING ---');
        [rows] = await connection.execute('DESCRIBE AA_WEBSERIES_DUBBING');
        console.table(rows);

        console.log('--- AA_WEBSERIES_SUBTITLE ---');
        [rows] = await connection.execute('DESCRIBE AA_WEBSERIES_SUBTITLE');
        console.table(rows);

        console.log('--- AA_LANGUAGE ---');
        [rows] = await connection.execute('DESCRIBE AA_LANGUAGE');
        console.table(rows);

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await connection.end();
    }
}

describeMeta();
