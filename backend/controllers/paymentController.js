const db = require('../db');

exports.getAll = async (req, res) => {
  try {
    const query = `
      SELECT 
        wh.employee_id,
        e.first_name,
        e.last_name,
        DATE_FORMAT(wh.date, '%Y-%m') AS month,
        SUM(wh.hours_worked) AS total_hours,
        e.salary,
        SUM(wh.hours_worked) * e.salary AS total_payment
      FROM work_hours AS wh
      JOIN employees AS e ON wh.employee_id = e.id
      GROUP BY wh.employee_id, month
      ORDER BY month ASC;
    `;

    db.query(query, (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({
          status: 'error',
          message: 'Something went wrong.'
        });
      }

      return res.json({
        status: 'success',
        data: result
      });
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong.'
    });
  }
};
