// create a slice
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    loginToken: {},
    auth: true,
    userAuth: {}
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
            state.authUser = action.payload
        },
        signOut: (state, action) => {
            // state.authUser = action.payload
            state.loginToken = {}
            state.auth = true
            state.authUser = {}

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
export const selectAuthUser = (state) => state.LoginTokenSlice.userAuth;

export const {setLoginToken, setAuth, setUser,signOut} = LoginTokenSlice.actions;