import { configureStore } from '@reduxjs/toolkit'
import { currentUserReducer } from './currentUser'

import userReducer from './userSlice'

export default configureStore({
    reducer:{
        user: userReducer,
        currentUser: currentUserReducer
    }
})