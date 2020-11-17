import { createSelector } from 'reselect';

const selectUtilities = state => state.utilityEvents;

export const selectMovieFilterHidden = createSelector(
    [selectUtilities],
    event => event.movieFilterHidden
)