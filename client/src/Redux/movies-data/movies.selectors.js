import { createSelector } from 'reselect';

const selectMovies = state => state.moviesData;

const selectMoviesSearchData = createSelector(
    [selectMovies],
    data => data.searchData
)

// const selectMoviesFilteredData = createSelector(
//     [selectMovies],
//     data => data.filteredData
// )

export const selectMoviesSearchResults = createSelector(
    [selectMoviesSearchData],
    data => data.results
)

export const selectMoviesSearchValue = createSelector(
    [selectMoviesSearchData],
    data => data.searchValue
)

export const selectMoviesCurrentSearchPage = createSelector(
    [selectMoviesSearchData],
    data => data.page
)

export const selectMoviesTotalSearchPage = createSelector(
    [selectMoviesSearchData],
    data => data.total_pages
)

// export const selectMoviesFilteredResults = createSelector(
//     [selectMoviesFilteredData],
//     data => data.results
// )

export const selectMoviesFilteredSortByValue = createSelector(
    [selectMoviesSearchData],
    data => data.sort_by
)

export const selectMoviesFilteredReleaseDates = createSelector(
    [selectMoviesSearchData],
    data => data.primary_release_date
)

export const selectMoviesFilteredGenres = createSelector(
    [selectMoviesSearchData],
    data => data.with_genres
)

// export const selectMoviesCurrentFilteredPage = createSelector(
//     [selectMoviesFilteredData],
//     data => data.page
// )

// export const selectMoviesTotalFilteredPage = createSelector(
//     [selectMoviesFilteredData],
//     data => data.total_pages
// )


export const selectMoviesTrendingData = createSelector(
    [selectMovies],
    data => data.trendingData
)

export const selectMoviesPopularData = createSelector(
    [selectMovies],
    data => data.popularData
)

export const selectMoviesIsFetching = createSelector(
    [selectMovies],
    data => data.isFetching
)

export const selectMoviesCurrentlyViewedMovie = createSelector(
    [selectMovies],
    data => data.currentlyViewedMovie
)