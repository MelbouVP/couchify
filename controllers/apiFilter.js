require('dotenv').config();
const axios = require('axios');

// fetch filtering results based on provided filtering options
const handleFilter = (req, res) => {

    // filtering options
    const { sortBy, releaseDate, genres, initialFetch} = req.body

    let pageNum = req.body.pageNum
    let genresToSearch = [];
    let minReleaseDate;
    let maxReleaseDate;


    // On initial search format the filtering options in correct form for API request.
    // On all subsequent searches, the data is already formatted correctly, only assignment to API request variables is needed.
    if( initialFetch ) {
        const currentYear = parseInt(new Date().toISOString().replace('T', ' ').substr(0, 4))
        // THMDB API movie genre IDs
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

        // on initial request from front-end, genre name is received as a string(-s)
        // for API request, genres need to be reformatted from string(-s) into corresponding ID(-s)
        for(key in genres){
            if(genres[key] === true){
                genresToSearch.push(movieGenre[key])
            }
        }

        // Dates have to be formatted as yyyy-mm-dd for API request
        // mininmum date of yyyy-01-01 and max date of yyyy-12-12 formats
        // are specified for correct display of movies for year to year
        // currentYear case is neccessary if user want's to know about movies within current year as of present day
        if(releaseDate[0] === currentYear){
            minReleaseDate = `${currentYear}-01-01`
        } else {
            minReleaseDate = `${releaseDate[0]}-01-01`
        }
        
        if(releaseDate[1] === currentYear){
            maxReleaseDate = new Date().toISOString().replace('T', ' ').substr(0, 10)
        } else {
            maxReleaseDate = `${releaseDate[1]}-12-12`
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