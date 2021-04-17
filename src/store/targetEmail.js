import { createAction, createReducer } from "@reduxjs/toolkit";

export const setTargetEmail = createAction("SET_TARGET_EMAIL");

export const targetEmailReducer = createReducer("",{
      [setTargetEmail]: (state, action) => action.payload,
    }
);
  