const mysql = require('mysql2/promise');

async function updateSchema() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'NEWS'
    });

    try {
        console.log('--- Updating Schema for Country Separation ---');

        // 1. Add suggested_country_name column
        try {
            await connection.execute('ALTER TABLE AA_VIEWER_ACCOUNT ADD COLUMN suggested_country_name VARCHAR(100) NULL');
            console.log('✅ Added column `suggested_country_name` to AA_VIEWER_ACCOUNT');
        } catch (err) {
            if (err.code === 'ER_DUP_FIELDNAME') {
                console.log('ℹ️ Column `suggested_country_name` already exists.');
            } else {
                throw err;
            }
        }

        // 2. Insert "Unknown/Other" Country
        // We set ID to 999 to be distinct. If 999 exists, we skip.
        try {
            await connection.execute(`
                INSERT INTO AA_COUNTRY (country_id, country_name, country_code_iso) 
                VALUES (999, 'Other / Unknown', 'XX')
                ON DUPLICATE KEY UPDATE country_name = country_name
            `);
            console.log('✅ Ensured "Other / Unknown" country exists (ID 999).');
        } catch (err) {
            console.error('Failed to insert placeholder country:', err);
        }

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await connection.end();
    }
}

updateSchema();
