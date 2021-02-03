require('dotenv').config();
const axios = require('axios');


// retrieves movie cast for specific movie(id)
const handleCast = (req, res) => {
    const { id } = req.params

    axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}`)
        .then(response => {

            // collect cast data from movie
            const castData = response.data.cast.map( ({ id, name, profile_path }) => {

                return { id, actorName: name, profile_path}
            })
            return castData
        })
        .then( async data => {

            // additionally collect imdb_id data for each actor in order to link to actor's imdb page
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