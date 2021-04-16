import { configureStore } from "@reduxjs/toolkit";
import { currentUserReducer } from "./currentUser";
import { locationUrlReducer } from "./locationUrl";
import { selectedUserReducer } from "./selectedUser";
import { selectedUserPostsReducer } from "./selectedUserPosts";
import { filterReducer } from "./filter";

import { keywordReducer } from "./keyword";
import { keynavbarReducer } from "./keywordNavbar";
import { targetEmailReducer } from "./targetEmail";

export default configureStore({
    reducer:{
        currentUser: currentUserReducer,
        selectedUser: selectedUserReducer,
        selectedUserPosts: selectedUserPostsReducer,
        filter: filterReducer,
        keyword: keywordReducer,
        keynavbar:keynavbarReducer,
        locationUrl: locationUrlReducer,
        targetEmail: targetEmailReducer,
    }
});