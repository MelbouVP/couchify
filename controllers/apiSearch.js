require('dotenv').config();
const axios = require('axios');


// fetch search results based on provided search value
const handleSearch = (req, res) => {
    const searchValue = req.body.searchValue
    // encodedURI allows to search with other letters (ex. asian characters or cyrillic) beside latin letters
    let encodedSearch = encodeURIComponent(searchValue)
    let pageNum = req.body.pageNum

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