import { createAction, createReducer } from "@reduxjs/toolkit";

export const setKeyword = createAction("SET_KEYWORD");

export const keywordReducer = createReducer("",{
      [setKeyword]: (state, action) => action.payload,
    }
);
  