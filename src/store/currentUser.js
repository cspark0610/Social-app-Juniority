import { createAction, createReducer } from '@reduxjs/toolkit'

export const setCurrentUser = createAction('SET_CURRENT_USER');
/* export const setCurrentUserFollow = createAction('SET_CURRENT_USER_FOLLOW'); */

export const currentUserReducer = createReducer( false , {
    [setCurrentUser]: (state, action) => action.payload,
    /* [setCurrentUserFollow]: (state, action) => {
        const follower = state.followers.push(action.payload.id);
        state
    } */
});