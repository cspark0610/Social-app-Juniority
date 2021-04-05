import { createAction, createReducer } from '@reduxjs/toolkit'

export const setSelectedUser = createAction('SET_SELECTED_USER');

export const selectedUserReducer = createReducer( {} , {
     [setSelectedUser]: (state, action) => action.payload,
});