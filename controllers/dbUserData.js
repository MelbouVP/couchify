const registerSchema = require('../validation/registerValidation')
const loginSchema = require('../validation/loginValidation.js')



const handleRegister = (req, res, db, bcrypt) => {
    const { username, email, password, confirmPassword } = req.body

    const validation = registerSchema.schema.validate({
        username,
        email,
        password,
        confirm: confirmPassword
    })

    const { error } = validation

    if(error) {
        res.status(422).json({
            message: error.details[0].message
        })
    } else {

        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)

        db.transaction(trx => {
            trx.insert({
                email: email,
                hash: hash
            })
            .into('login')
            .returning('email')
            .then( email => {
                return trx('users')
                .returning('*')
                .insert({
                    name: username,
                    email: email[0],
                    joined: new Date().toLocaleDateString()
                })
                .then(userData => {
                    console.log(userData[0])
                    res.status(200).json(userData[0])
                })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch( error => {
            console.log(error)
            res.status(400).json('Something went wrong, try again')
        })
    }
}


const handleLogin = (req, res, db, bcrypt) => {
    const { email, password } = req.body

    const validation = loginSchema.schema.validate({
        email,
        password,
    })

    const { error } = validation

    if(error) {
        res.status(422).json({
            message: error.details[0].message
        })
    } else {

        db.select('email', 'hash')
        .from('login')
        .where('email', '=', email)
        .then(data => {

            const isValid = bcrypt.compareSync(password, data[0].hash)

            if(isValid){
                console.log(true)

                return db.select('*')
                .from('users')
                .where('email', '=', email)
                .then( userData => res.status(200).json(userData[0]))
                .catch(error => res.status(400).json('Unable to get user'))
            } else {
                res.status(400).json('Invalid data')
            }
        })
        .catch( error => res.status(400).json('Invalid data'))
    }

}

const handleFavourite = (req, res, db) => {
    let userID = req.body.id
    let data = JSON.stringify(req.body.data)

    return db('users')
        .where('id', userID)
        .update('favourite_movies', data)
        .then( response => res.status(200).json('Favourites updated'))
        .catch(error => res.status(400).json('Unable to update favourites'))
}

const handleMustWatch = (req, res, db) => {
    let userID = req.body.id
    let data = JSON.stringify(req.body.data)

    return db('users')
        .where('id', userID)
        .update('must_watch_movies', data)
        .then( response => res.status(200).json('Must-watch movies updated'))
        .catch(error => res.status(400).json('Unable to update must-watch movies'))
}


module.exports = {
    handleRegister,
    handleLogin,
    handleFavourite,
    handleMustWatch
}