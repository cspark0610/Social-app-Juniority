import { createAction, createReducer } from "@reduxjs/toolkit";

export const setRoomId = createAction("SET_ROOM_ID");

export const roomIdReducer = createReducer("",{
      [setRoomId]: (state, action) => action.payload,
    }
);
  