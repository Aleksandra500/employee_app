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

exports.getEmployeeById = (req, res, next) => {
  const employeeId = req.params.id;  // Preuzimamo ID iz parametra URL-a

  // SQL upit za pretragu zaposlenog u bazi prema ID-u
  const sql = 'SELECT * FROM employees WHERE id = ?';
  
  db.query(sql, [employeeId], (err, result) => {
    if (err) {
      console.error('❌ Greška pri pretrazi zaposlenih:', err);
      return res.status(500).json({ message: 'Greška u serveru' });
    }

    if (result.length === 0) {
      // Ako zaposleni nije pronađen
      return res.status(404).json({ message: 'Zaposleni sa tim ID-jem nije pronađen' });
    }

    // Ako je zaposleni pronađen, šaljemo podatke
    return res.status(200).json(result[0]);  // Vraćamo samo prvog zaposlenog (ako je ID jedinstven)
  });
};

exports.addHours = (req, res, next) => {
  const { employeeId, date, hoursWorked } = req.body;
 console.log(req.body);
 
  // Validacija unosa
  if (!employeeId || !date || !hoursWorked) {
      return res.status(400).json({ message: 'Svi podaci moraju biti uneti (employeeId, date, hoursWorked)' });
  }

  console.log('caoo iz hoursa');

  // Provera da li zaposleni postoji u bazi
  const checkEmployeeQuery = 'SELECT * FROM employees WHERE id = ?';
  db.query(checkEmployeeQuery, [employeeId], (err, result) => {
      if (err) {
          console.error('❌ Greška pri pretrazi zaposlenih:', err);
          return res.status(500).json({ message: 'Greška u serveru' });
      }

      if (result.length === 0) {
          return res.status(404).json({ message: 'Zaposleni sa tim ID-jem nije pronađen' });
      }

      // Unos radnih sati u tabelu `works_hour`
      const insertWorkHoursQuery = 'INSERT INTO work_hours (employee_id, date, hours_worked) VALUES (?, ?, ?)';
      db.query(insertWorkHoursQuery, [employeeId, date, hoursWorked], (err, result) => {
          if (err) {
              console.error('❌ Greška pri unosu radnih sati:', err);
              return res.status(500).json({ message: 'Greška pri unosu radnih sati' });
          }

          return res.status(200).json({
              status: 'success',
              message: 'Radni sati su uspešno dodati!',
          });
      });
  });
};
