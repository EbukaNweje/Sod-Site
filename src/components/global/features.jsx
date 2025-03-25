import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    User : {},
    adminToken : "",
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

        GetCart: (state, {payload})=>{
            state.cart = payload
        },

        RemoveCart: (state, {payload})=>{
            state.cart = []
        },

        UserId: (state, {payload})=>{
            state.isLoggedIn = true
            state.id = payload;
        },
        AdminId: (state, {payload})=>{
            state.isLoggedIn = true
            state.adminToken = payload;
        },

        signOut: (state, {payload})=>{
            state.User = {};
            state.id = "";
            state.isLoggedIn = false;
            state.adminToken  = ""
        },

        AdminToken: (state, {payload})=>{
            state.adminToken = payload
        }

    }
})




export const {UsersData, UserId, AdminId, signOut, AdminToken, GetCart, RemoveCart} =
    features.actions;

export default features.reducer;
