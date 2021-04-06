import { createAction, createReducer } from '@reduxjs/toolkit'

export const setSelectedUser = createAction('SET_SELECTED_USER');
export const setFollowersSelectedUser = createAction('SET_FOLLOW_SELECTED_USER');

export const selectedUserReducer = createReducer( {} , {
     [setSelectedUser]: (state, action) => action.payload,
     [setFollowersSelectedUser]: (state, action) => [...state.followers, action.payload],
});