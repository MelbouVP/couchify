
export const removeMovie = (moviesArray, movieIdToBeRemoved) => {

    return moviesArray.filter( movie => movie.id !== movieIdToBeRemoved)
}