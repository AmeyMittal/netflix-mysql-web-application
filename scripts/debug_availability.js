const mysql = require('mysql2/promise');

async function checkAvailability() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'NEWS'
    });

    try {
        // 1. Find Country ID for Portugal
        console.log('--- Searching for Portugal ---');
        const [countries] = await connection.execute('SELECT * FROM AA_COUNTRY WHERE country_name LIKE ?', ['%Portugal%']);
        console.table(countries);

        if (countries.length === 0) {
            console.log('Portugal not found in AA_COUNTRY.');
            return;
        }

        const countryId = countries[0].country_id;

        // 2. Check Releases for this Country
        console.log(`--- Checking Releases for Country ID ${countryId} ---`);
        const [releases] = await connection.execute('SELECT * FROM AA_RELEASE_COUNTRY WHERE country_id = ?', [countryId]);
        console.table(releases);

        if (releases.length === 0) {
            console.log('NO SERIES released in Portugal!');
        }

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await connection.end();
    }
}

checkAvailability();
