require('dotenv').config();
const axios = require('axios');


const handleFilter = (req, res, prevPage = undefined, nextPage = undefined) => {
    const { sortBy, releaseDate, genres} = req.body

    let pageNum = req.body.pageNum
    let genresToSearch = [];
    let minReleaseDate;
    let maxReleaseDate;

    if(prevPage === undefined && nextPage === undefined) {
        const currentYear = parseInt(new Date().toISOString().replace('T', ' ').substr(0, 4))
        let movieGenre = {
            Action: 28,
            Adventure: 12,
            Animation: 16,
            Comedy: 35,
            Crime: 80,
            Documentary: 99,
            Drama: 18,
            Family: 10751,
            Fantasy: 14,
            History: 36,
            Horror: 27,
            Music: 10402,
            Mystery: 9648,
            Romance: 10749,
            Science_Fiction: 878,
            TV_Movie: 10770,
            Thriller: 53,
            War: 10752,
            Western: 37
        }

        for(key in genres){
            if(genres[key] === true){
                genresToSearch.push(movieGenre[key])
            }
        }

        if(releaseDate[0] === 2020){
            minReleaseDate = '2020-01-01'
        } else {
            minReleaseDate = `${releaseDate[0]}-01-01`
        }
        
        if(releaseDate[1] === currentYear){
            maxReleaseDate = new Date().toISOString().replace('T', ' ').substr(0, 10)
        } else {
            maxReleaseDate = `${releaseDate[1]}-01-01`
        }
    } else {
        minReleaseDate = releaseDate[0]
        maxReleaseDate = releaseDate[1]
        genresToSearch = genresToSearch.concat(genres)

        if (prevPage === true) {
            pageNum--
        } else if (nextPage === true) {
            pageNum++
        }
    }
    
    axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&sort_by=${sortBy}&primary_release_date.gte=${minReleaseDate}&primary_release_date.lte=${maxReleaseDate}&with_genres=${[...genresToSearch]}&page=${pageNum}`
        )
        .then( ({ data: { page, total_pages, results}}) => {
            const modifiedResponse = {
                sort_by: sortBy,
                primary_release_date: [minReleaseDate, maxReleaseDate],
                with_genres: genresToSearch,
                page: page,
                total_pages: total_pages,
                results : results
            }
            res.json(modifiedResponse)
        })
        .catch(err => res.send(err));
}

module.exports = {
    handleFilter
}