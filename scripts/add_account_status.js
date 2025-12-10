const mysql = require('mysql2/promise');

async function addAccountStatus() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'NEWS'
    });

    try {
        console.log('--- Adding account_status column ---');

        // Add account_status column
        try {
            await connection.execute(`
                ALTER TABLE AA_VIEWER_ACCOUNT 
                ADD COLUMN account_status ENUM('ACTIVE', 'LOCKED', 'FLAGGED') DEFAULT 'ACTIVE'
            `);
            console.log('✅ Added account_status column to AA_VIEWER_ACCOUNT');
        } catch (err) {
            if (err.code === 'ER_DUP_FIELDNAME') {
                console.log('ℹ️ Column account_status already exists.');
            } else {
                throw err;
            }
        }

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await connection.end();
    }
}

addAccountStatus();
