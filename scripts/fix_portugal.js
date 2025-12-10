const mysql = require('mysql2/promise');

async function releaseInPortugal() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'NEWS'
    });

    try {
        console.log('--- Acquiring Rights for Portugal (ID 16) ---');

        // 1. Get all series IDs
        const [series] = await connection.execute('SELECT webseries_id FROM AA_WEB_SERIES');

        if (series.length === 0) {
            console.log('No series found to release.');
            return;
        }

        // 2. Insert Release records
        // We use IGNORE to avoid duplicates if any exist (though we found none)
        for (const s of series) {
            await connection.execute(
                'INSERT IGNORE INTO AA_RELEASE_COUNTRY (webseries_id, country_id) VALUES (?, 16)',
                [s.webseries_id]
            );
            console.log(`Released Series ID ${s.webseries_id} in Portugal.`);
        }

        console.log('Success! Portugal now has content.');

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await connection.end();
    }
}

releaseInPortugal();
