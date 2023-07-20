import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    loginToken: {},
    auth: true,
    authUser: {},
    isLoading: false
};
export const getLoginId = createAsyncThunk('login/getId', async (value) => {

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
            // console.log(action.payload, "payload")
            state.authUser = action.payload
        },
        signOut: (state, action) => {
            // state.authUser = action.payload
            state.loginToken = {};
            state.auth = true;
            state.authUser = {};
        },
        setIsLoading: (state, action) => {
            // console.log(action.payload, "payload")
            state.isLoading = action.payload
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
export const selectIsLoading = (state) => state.LoginTokenSlice.isLoading;


export const {
    setLoginToken,
    setAuth,
    setUser,
    signOut,
    setIsLoading
} = LoginTokenSlice.actions;