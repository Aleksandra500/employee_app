const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "my_sql_pass", 
    database: "employee_app"
});

db.connect((err) => {
    if (err) {
        console.error('❌ Greška pri konekciji sa bazom:', err.message);
    } else {
        console.log('✅ Uspostavljena konekcija sa MySQL bazom!');
    }
});

module.exports = db;