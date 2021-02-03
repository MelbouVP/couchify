const registerSchema = require('../validation/registerValidation')
const loginSchema = require('../validation/loginValidation.js')


// Validates received data from front-end and registers new user in database
// for security purposes password is hashed and stored as a hash
// for secuity purposes user is not informed on front-end if he types email that is already registered
const handleRegister = (req, res, db, bcrypt) => {
    const { username, email, password, confirmPassword } = req.body

    // validate data based on validation schema
    const validation = registerSchema.schema.validate({
        username,
        email,
        password,
        confirm: confirmPassword
    })

    const { error } = validation

    // if validation has failed reject registration
    // else proceed with received registration data
    if(error) {
        res.status(422).json('Provide data in specified format')
    } else {

        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)

        // db uses two tables:
        // 1. Login - storing email adresses and related hash(password)
        // 2. Users - storing overall information about the user
        // If registration is successful, return overall information about the user to the front-end
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

// Operates similar to handleRegister, see previous documentation
const handleLogin = (req, res, db, bcrypt) => {
    const { email, password } = req.body

    const validation = loginSchema.schema.validate({
        email,
        password,
    })
    
    const { error } = validation
    
    if(error) {
        res.status(422).json('Provide data in specified format')
    } else {
        
        db.select('email', 'hash')
        .from('login')
        .where('email', '=', email)
        .then(data => {
            
            // Compares password hashes to determine if user has provided correct password
            const isValid = bcrypt.compareSync(password, data[0].hash)

            if(isValid){

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

// Updates favourite movies of user
const handleFavourite = (req, res, db) => {
    let userID = req.body.id
    // updated array of objects that each contains data about favourite movie
    let data = JSON.stringify(req.body.data)

    return db('users')
        .where('id', userID)
        .update('favourite_movies', data)
        .then( response => res.status(200).json('Favourites updated'))
        .catch(error => res.status(400).json('Unable to update favourites'))
}


// see documentation for handleFavourite
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