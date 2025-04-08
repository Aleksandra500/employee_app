const db = require('../db')

exports.addNewEmployee = (req, res, next) => {
    console.log('caooo');
    
    const employeesData = req.body;
  console.log(employeesData);
  
      const sql = 'INSERT INTO employees (first_name, last_name, position, salary ) VALUES (?, ?, ?, ?)';
      const values = [employeesData.first_name, employeesData.last_name, employeesData.position, employeesData.salary];
  
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('❌ Greška pri dodavanju korisnika:', err);
          return res.status(500).json({ message: 'Greška u serveru' });
        }
  
        return res.status(200).json({
          status: 'success',
          message: 'Uspešno dodat employees',
        });
      });
    ;
}