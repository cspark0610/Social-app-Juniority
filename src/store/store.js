import { configureStore } from '@reduxjs/toolkit'
import { currentUserReducer } from './currentUser'
import { selectedUserReducer } from './selectedUser'
import { selectedUserPostsReducer } from './selectedUserPosts'

import userReducer from './userSlice'

export default configureStore({
    reducer:{
        user: userReducer,
        currentUser: currentUserReducer,
        selectedUser: selectedUserReducer,
        selectedUserPosts: selectedUserPostsReducer
    }
});