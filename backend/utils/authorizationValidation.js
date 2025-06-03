const jwt = require('jsonwebtoken');
const db = require('../db');
require('dotenv').config();

exports.protect = (req, res, next) => {
    let token;

    // 1. Uzimamo token iz headera
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1]; // uzima samo token
    }

    if (!token) {
        return res.status(401).json({ message: 'Niste ulogovani, ulogujte se prvo' });
    }

    // 2. Verifikujemo token (ali čekamo da se završi pre nego idemo dalje!)
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Netacan ili istekao token, ulogujte se ponovo' });
        }

        const userId = decoded.id;

        // 3. Tražimo korisnika u bazi
        const query = 'SELECT * FROM auth WHERE id = ?';
        db.query(query, [userId], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Greška na serveru prilikom pretrage korisnika' });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'Korisnik ne postoji' });
            }

            // 4. Ako je sve ok, stavljamo korisnika na req.user i idemo dalje
            req.user = results[0];
            next(); 
        });
    });
};