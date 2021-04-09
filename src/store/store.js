import { configureStore } from "@reduxjs/toolkit";
import { currentUserReducer } from "./currentUser";
import { selectedUserReducer } from "./selectedUser";
import { selectedUserPostsReducer } from "./selectedUserPosts";
import { filterReducer } from "./filter";


export default configureStore({
    reducer:{
        currentUser: currentUserReducer,
        selectedUser: selectedUserReducer,
        selectedUserPosts: selectedUserPostsReducer,
        filter: filterReducer
    }
});
