import { configureStore } from "@reduxjs/toolkit";
import { currentUserReducer } from "./currentUser";
import { selectedUserReducer } from "./selectedUser";
import { selectedUserPostsReducer } from "./selectedUserPosts";

export default configureStore({
    reducer:{
        currentUser: currentUserReducer,
        selectedUser: selectedUserReducer,
        selectedUserPosts: selectedUserPostsReducer
    }
});
