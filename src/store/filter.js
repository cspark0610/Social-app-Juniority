import { createAction, createReducer } from "@reduxjs/toolkit";

export const setFilter = createAction("SET_FILTER");

export const filterReducer = createReducer({},{
      [setFilter]: (state, action) => action.payload,
    }
);
