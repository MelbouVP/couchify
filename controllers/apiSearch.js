require('dotenv').config();
const axios = require('axios');

const handleSearch = (req, res, nextPage = undefined, prevPage = undefined) => {
    const searchValue = req.body.searchValue
    let encodedSearch = encodeURIComponent(searchValue)
    let pageNum = 1

    if( nextPage) {
        pageNum++
    } else if ( prevPage) {
        pageNum--
    }

    console.log('Find path: ', searchValue)

    axios.get(`https://api.themoviedb.org/3/search/movie?query=${encodedSearch}&api_key=${process.env.API_KEY}&page=${pageNum}`)
        .then( ({ data: { page, total_pages, results}}) => {
            const modifiedResponse = {
                searchValue: searchValue,
                page: page,
                total_pages: total_pages,
                results : results
            }
            res.json(modifiedResponse)
        })
        .catch(err => res.send(err));
}

module.exports = {
    handleSearch
}