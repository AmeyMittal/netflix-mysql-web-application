const mysql = require('mysql2/promise');

async function describeTables() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'NEWS'
    });

    try {
        console.log('--- AA_VIEWER_ACCOUNT ---');
        const [viewers] = await connection.execute('DESCRIBE AA_VIEWER_ACCOUNT');
        console.table(viewers);

        console.log('--- AA_PRODUCER ---');
        const [producers] = await connection.execute('DESCRIBE AA_PRODUCER');
        console.table(producers);

        console.log('--- AA_USERS ---');
        const [users] = await connection.execute('DESCRIBE AA_USERS');
        console.table(users);

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await connection.end();
    }
}

describeTables();
