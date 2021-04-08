import { createAction, createReducer } from "@reduxjs/toolkit";

export const setKeynavbar = createAction("SET_KEYNAVBAR");

export const keynavbarReducer = createReducer("",{
      [setKeynavbar]: (state, action) => action.payload,
    }
);
  