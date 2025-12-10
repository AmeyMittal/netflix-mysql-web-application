const mysql = require('mysql2/promise');

async function findUser() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'NEWS'
    });

    try {
        console.log('Searching for Leo Messi...');

        // Check Viewers
        const [viewers] = await connection.execute(
            "SELECT * FROM AA_VIEWER_ACCOUNT WHERE viewer_first_name LIKE '%Leo%' OR viewer_last_name LIKE '%Messi%'"
        );
        if (viewers.length > 0) console.log('Found in Viewers:', viewers);

        // Check Producers
        const [producers] = await connection.execute(
            "SELECT * FROM AA_PRODUCER WHERE producer_first_name LIKE '%Leo%' OR producer_last_name LIKE '%Messi%'"
        );
        if (producers.length > 0) console.log('Found in Producers:', producers);

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await connection.end();
    }
}

findUser();
