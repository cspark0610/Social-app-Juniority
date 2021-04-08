import { configureStore } from "@reduxjs/toolkit";
import { currentUserReducer } from "./currentUser";
import { locationUrlReducer } from "./locationUrl";
import { selectedUserReducer } from "./selectedUser";
import { selectedUserPostsReducer } from "./selectedUserPosts";
import { keywordReducer } from "./keyword";
import { keynavbarReducer } from "./keywordNavbar";

export default configureStore({
    reducer:{
        currentUser: currentUserReducer,
        selectedUser: selectedUserReducer,
        selectedUserPosts: selectedUserPostsReducer,
        keyword: keywordReducer,
        keynavbar:keynavbarReducer,
        locationUrl: locationUrlReducer
    }
});