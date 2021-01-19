const GENRE_ID = {
    Action: 28,
    Animated: 16,
    Documentary: 99,
    Drama: 18,
    Family: 10751,
    Fantasy: 14,
    History: 36,
    Comedy: 35,
    War: 10752,
    Crime: 80,
    Music: 10402,
    Mystery: 9648,
    Romance: 10749,
    'Sci-fi': 878,
    Horror: 27,
    'TV-movie': 10770,
    Thriller: 53,
    Western: 37,
    Adventure: 12,
}

const getGenre = (arrayOfGenres) => {

    let result = Object.entries(GENRE_ID)
        .map(genre => {

            let matchingGenre
            arrayOfGenres.forEach( data => {
                if(genre.includes(data.id)){
                    matchingGenre = data.name
                }
            })

            return matchingGenre
            console.log(matchingGenre)
        })
        .filter( genre => genre)

    return result
}

export default getGenre