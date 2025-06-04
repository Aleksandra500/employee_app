const db = require('../db');

// DODAVANJE NOVOG ZAPOSLENOG

exports.addNewEmployee = (req, res, next) => {
	const employeesData = req.body;
	const sql =
		'INSERT INTO employees (first_name, last_name, position, salary ) VALUES (?, ?, ?, ?)';
	const values = [
		employeesData.first_name,
		employeesData.last_name,
		employeesData.position,
		employeesData.salary,
	];

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
};

// izlistavanje svih zaposlenih

exports.getAllEmployees = (req, res, next) => {
	const sql = 'SELECT * FROM employees';

	db.query(sql, (err, result) => {
		if (err) {
			return res.status(500).json({ message: 'Greska na Serveru' });
		}

		return res.status(200).json({
			data: result,
			status: 'success',
		});
	});
};

// TRAZIMO PO ID-u ZA UNOSH RADNIH SATI

exports.getEmployeeById = (req, res, next) => {
	const employeeId = req.params.id;
	const sql = 'SELECT * FROM employees WHERE id = ?';

	db.query(sql, [employeeId], (err, result) => {
		if (err) {
			console.error('❌ Greška pri pretrazi zaposlenih:', err);
			return res.status(500).json({ message: 'Greška na Serveru' });
		}

		if (result.length === 0) {
			return res
				.status(404)
				.json({ message: 'Zaposleni sa tim ID-jem nije pronađen' });
		}

		return res.status(200).json(result[0]);
	});
};

// DODAVANJE RADIH SATI, OSMOCASOVNO JE DEFAULTNO

exports.addHours = (req, res, next) => {
	const { employeeId, date, hoursWorked } = req.body;

	if (!employeeId || !date || !hoursWorked) {
		return res.status(400).json({
			message: 'Svi podaci moraju biti uneti (employeeId, date, hoursWorked)',
		});
	}

	const checkEmployeeQuery = 'SELECT * FROM employees WHERE id = ?';
	db.query(checkEmployeeQuery, [employeeId], (err, result) => {
		if (err) {
			console.error('❌ Greška pri pretrazi zaposlenih:', err);
			return res.status(500).json({ message: 'Greška u serveru' });
		}

		if (result.length === 0) {
			return res.status(404).json({ message: 'Zaposleni sa tim ID-jem nije pronađen' });
		}

		const checkWorkHoursQuery = 'SELECT * FROM work_hours WHERE employee_id = ? AND date = ?';
		db.query(checkWorkHoursQuery, [employeeId, date], (err, result) => {
			if (err) {
				console.log('❌ Greška pri proveri radnih sati:', err);
				return res.status(500).json({ message: 'Greška na serveru' });
			}

			if (result.length > 0) {
				return res.status(200).json({
					message: 'Radni sati za ovog zaposlenog na taj datum već postoje',
				});
			}

			
			const insertWorkHoursQuery =
				'INSERT INTO work_hours (employee_id, date, hours_worked) VALUES (?, ?, ?)';
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
	});
};

exports.deleteOne = (req, res, next) => {
	const { id } = req.params;

	const sql = 'DELETE FROM employees WHERE id = ?';

	db.query(sql, [id], (err, result) => {
		if (err) {
			console.log('❌ Greska pri brisanju', err);
			return res.status(500).json({ message: 'Greska pri brisanju' });
		}

		return res.status(200).json({
			status: 'success',
			message: 'Ovaj korisnik je uspesno obrisan',
		});
	});
};

exports.putOne = (req, res, next) => {
	const { id } = req.params;
	const { first_name, last_name, position, salary } = req.body;

	if (!first_name || !last_name || !position || !salary) {
		return res.status(400).json({
			status: 'error',
			message: 'All fields are required.',
		});
	}

	const sql = `
		UPDATE employees 
		SET first_name = ?, last_name = ?, position = ?, salary = ?
		WHERE id = ?
	`;

	db.query(sql, [first_name, last_name, position, salary, id], (err, result) => {
		if (err) {
			console.error('MySQL Error:', err);
			return res.status(500).json({
				status: 'error',
				message: 'Database error.',
			});
		}

		if (result.affectedRows === 0) {
			return res.status(404).json({
				status: 'error',
				message: 'Employee not found.',
			});
		}

		return res.status(200).json({
			status: 'success',
			message: 'Employee updated successfully.',
		});
	});
};
