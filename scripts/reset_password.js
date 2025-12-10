const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

async function resetPassword() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'NEWS'
    });

    try {
        const email = 'leomessi@example.com';
        const newPassword = 'password123';
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        console.log(`Resetting password for ${email}...`);

        const [result] = await connection.execute(
            'UPDATE AA_USERS SET password_hash = ? WHERE email = ?',
            [hashedPassword, email]
        );

        if (result.affectedRows > 0) {
            console.log('✅ Password reset successfully.');
        } else {
            console.log('❌ User not found in AA_USERS table (maybe they are only in AA_VIEWER_ACCOUNT?)');

            // If checking AA_USERS failed, we might need to verify if the user exists there at all.
            // But registration should have put them there. 
        }

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await connection.end();
    }
}

resetPassword();
