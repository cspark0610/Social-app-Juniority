import { createAction, createReducer } from '@reduxjs/toolkit'

export const setCurrentUser = createAction('SET_CURRENT_USER');

export const currentUserReducer = createReducer( false , {
    [setCurrentUser]: (state, action) => action.payload,
});