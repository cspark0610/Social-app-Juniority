import { createAction, createReducer } from "@reduxjs/toolkit";

export const setLocationUrl = createAction("SET_LOCATION_URL");

export const locationUrlReducer = createReducer('',
  {
    [setLocationUrl]: (state, action) => action.payload,
  }
);