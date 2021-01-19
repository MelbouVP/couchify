
import { createSelector } from 'reselect';

const selectUserData = state => state.userData;

export const selectUserProfile = createSelector(
    [selectUserData],
    data => data.profile
)

export const selectUserID = createSelector(
    [selectUserData],
    data => data.profile.id
)

export const selectUserIsAuthenticated = createSelector(
    [selectUserData],
    data => data.isAuthenticated
)

export const selectUserFavourites = createSelector(
    [selectUserData],
    data => data.profile.favourite_movies
)

export const selectUserMustWatch = createSelector(
    [selectUserData],
    data => data.profile.must_watch_movies
)