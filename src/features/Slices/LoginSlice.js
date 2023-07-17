// create a slice
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    loginToken: {},
    auth: true,
    authUser: {},
    openModal: false,
    shipping: {},
    shippingAll: [],
    paypalToken: "",
    myToken: ""
};
export const getLoginId = createAsyncThunk('login/getId', async (value) => {
        // console.log(value)


        // return {
        //     initialRememberValue: cookies.moon
        // }

    }
)

export const LoginTokenSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setLoginToken: (state, action) => {
            state.loginToken = action.payload
        },
        setAuth: (state, action) => {
            state.auth = action.payload

        },
        setUser: (state, action) => {
            // console.log(action.payload, "asdasdasdasdasd")
            // if (action.payload.error === false) {
            state.authUser = action.payload
            // }
        },
        signOut: (state, action) => {
            // state.authUser = action.payload
            state.loginToken = {}
            state.auth = true
            state.authUser = {}
        },
        toggleDivVisibility: (state, action) => {
            // state.authUser = action.payload
            state.openModal = action.payload;

        },
        setShippingSing: (state, action) => {
            // console.log(action.payload,"checkoutDetails")
            state.shipping = action.payload
        },
        setShippingAll: (state, action) => {
            // console.log(action.payload,"checkoutDetails")
            state.shippingAll = action.payload
        },
        setPaypalToken: (state, action) => {
            // console.log(action.payload,"paypalToken")
            state.paypalToken = action.payload
        },
        setMyToken: (state, action) => {
            // console.log(action.payload,"paypalToken")
            state.myToken = action.payload
        },
    },
    extraReducers: {
        [getLoginId.pending]: (state, action) => {

        },
        [getLoginId.fulfilled]: (state, action) => {
            // state.page = action.payload
        },
        [getLoginId.rejected]: (state, action) => {

        },
    }
})
export const selectLoginToken = (state) => state.LoginTokenSlice.loginToken;
export const selectAuth = (state) => state.LoginTokenSlice.auth;
export const selectAuthUser = (state) => state.LoginTokenSlice.authUser;
export const selectOpenModal = (state) => state.LoginTokenSlice.openModal;
export const shippingSing = (state) => state.LoginTokenSlice.shipping;
export const shippingAll = (state) => state.LoginTokenSlice.shippingAll;
export const selectPaypalToken = (state) => state.LoginTokenSlice.paypalToken;
export const selectMyToken = (state) => state.LoginTokenSlice.myToken;


export const {
    setLoginToken,
    setAuth,
    setUser,
    signOut,
    toggleDivVisibility,
    setShippingSing,
    setShippingAll,
    setPaypalToken,
    setMyToken
} = LoginTokenSlice.actions;