const bcrypt = require('bcrypt');

// Replace these plaintext passwords with actual passwords
const password1 = 'password_for_project_x';
const password2 = 'password_for_project_y';
const password3 = 'password_for_project_z';
const password4 = 'password_for_project_w';

// Generate password hashes
const saltRounds = 10; // Number of salt rounds, higher is better but slower

bcrypt.hash(password1, saltRounds, (err, hash1) => {
    if (err) throw err;
    console.log('Hash for password1:', hash1);

    bcrypt.hash(password2, saltRounds, (err, hash2) => {
        if (err) throw err;
        console.log('Hash for password2:', hash2);

        bcrypt.hash(password3, saltRounds, (err, hash3) => {
            if (err) throw err;
            console.log('Hash for password3:', hash3);

            bcrypt.hash(password4, saltRounds, (err, hash4) => {
                if (err) throw err;
                console.log('Hash for password4:', hash4);

                // Now you can insert these password hashes into your users table
                // Use hash1, hash2, hash3, and hash4 as the password_hash values
                // for your users
            });
        });
    });
});

