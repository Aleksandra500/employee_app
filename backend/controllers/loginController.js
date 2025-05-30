const db = require('../db');
const bcrypt = require('bcrypt');

exports.register = (req, res) => {
    const {username, password} = req.body

    if(!username || !password) {
      return res.status(400).json({
        message: "Sva polja su obavezna"
      })
    }


    const chekDb = "SELECT * FROM auth WHERE username = ?"
 
    db.query(chekDb, [username], async (err, results) => {
         if(err) {
            return res.status(500).json({
             message: 'Greska je na serveru'
            })
         }
         if(results.length > 0){
            return res.status(409).json({
                message: 'Korisnicko ime je vec zauzeto'
            })
         }
    
    
    const hashedPass = await bcrypt.hash(password, 10)

    const insertQuery = "INSERT INTO auth (username, password) VALUES ( ?, ? )"
    db.query(insertQuery, [username, hashedPass], async (err, results) => {
        if(err){
            return res.status(500).json({
                message: 'doslo je do greske prilikom registracije'
            })
        }

        res.status(200).json({
            message: 'Uspesno ste se registrovali!'
        })
        
    })
})
}

exports.login = (req, res, next) => {
    const {username, password} = req.body

    if(!username || !password) {
        return res.status(400).json({
          message: "Sva polja su obavezna"
        })
      }

      const query = "SELECT * FROM auth WHERE username = ? "

      db.query(query, [username], (err, results) => {
        if(err){
            return res.status(500).json({
                message: 'Greska na serveru'
            })
        }
        if(results.length === 0){
            return res.status(409).json({
                message: 'Netacni kredencijali'
            })
        }

        const user = results[0]

        const isPasswordValid = bcrypt.compare(password, user.password)

       if( !isPasswordValid ){
        return res.status(500).json({
            message: 'Netacni kredencijali'
        })
       }
       
       res.status(200).json({
        message: 'Uspesno ste se ulogovali',
        userId: user.id
       })
    })
}

