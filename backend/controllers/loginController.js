const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// REGISTER
exports.register = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Sva polja su obavezna" });
  }

  const checkDb = "SELECT * FROM auth WHERE username = ?";

  db.query(checkDb, [username], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Greska je na serveru' });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: 'Korisnicko ime je vec zauzeto' });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const insertQuery = "INSERT INTO auth (username, password) VALUES (?, ?)";
    db.query(insertQuery, [username, hashedPass], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Doslo je do greske prilikom registracije' });
      }

      const newUserId = results.insertId;
      const token = createToken(newUserId);

 
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ,
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000
      })

      res.status(200).json({
        message: 'Uspesno ste se registrovali!',
        status: 'success',
        user: {
          id: newUserId,
          username,
        },
      });
    });
  });
};

// LOGIN
exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Sva polja su obavezna" });
  }

  const query = "SELECT * FROM auth WHERE username = ?";

  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Greska na serveru' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Netacni kredencijali' });
    }

    const user = results[0];

    // bcrypt.compare je async i vraca promise
    bcrypt.compare(password, user.password)
      .then(isPasswordValid => {
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Netacni kredencijali' });
        }

        const token = createToken(user.id);

        res.cookie('jwt', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'None',
          maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
          message: 'Uspesno ste se ulogovali',
          status:'success',
          user: {
            id: user.id,
            username: user.username
          }
        });
      })
      .catch(() => {
        return res.status(500).json({ message: 'Greska pri proveri lozinke' });
      });
  });
};

exports.logout = (req, res) => {
  res.clearCookie('jwt', {
  httpOnly: true,
  secure:process.env.NODE_ENV == 'production',
  sameSite: 'None'
  })

  res.status(200).json({
    message: 'USpesan logout'
  })
}