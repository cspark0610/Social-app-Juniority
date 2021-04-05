import { createAction, createReducer } from "@reduxjs/toolkit";

export const setSelectedUserPosts = createAction('SET_SELECTED_USER_POSTS');
export const removeSelectedUserPosts = createAction('REMOVE_SELECTED_USER_POSTS')

export const selectedUserPostsReducer = createReducer( [] , {
    [setSelectedUserPosts]: (state, action) => [...state, action.payload],
    [removeSelectedUserPosts]: (state, action) => []
});

