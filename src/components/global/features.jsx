import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    User : {},
    id : "",
    cart: [],
    isLoggedIn: false
}


const features = createSlice({
    name: "SODSITE",
    initialState,

    reducers: {
        UsersData: (state, {payload})=>{
            state.User = payload
        },

        UserId: (state, {payload})=>{
            state.isLoggedIn = true
            state.id = payload;
        },

        signOut: (state, {payload})=>{
            state.User = {};
            state.id = "";
            state.isLoggedIn = false
        }

    }
})




export const {UsersData, UserId, signOut} =
    features.actions;

export default features.reducer;
