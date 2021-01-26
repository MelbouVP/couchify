require('dotenv').config();
const axios = require('axios');

const handleCast = (req, res) => {
    const { id } = req.params

    axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}`)
        .then(response => {

            const castData = response.data.cast.map( ({ id, name, profile_path }) => {

                return { id, actorName: name, profile_path}
            })
            return castData
        })
        .then( async data => {

            let castData = await Promise.all(data.map( async (actor) => {

                let fullData = await axios.get(`https://api.themoviedb.org/3/person/${actor.id}?api_key=${process.env.API_KEY}`)
                    .then(response => {
                        actor.imdb_id  = response.data.imdb_id
                        return actor
                    })
                    .catch(error => console.log(error.msg))

                return fullData
            }))
            res.send(castData)
        })
        .catch(err => res.send(err));
}

module.exports = {
    handleCast
}