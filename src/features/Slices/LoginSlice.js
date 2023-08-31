import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    language:{},
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
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
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
            state.loginToken = {};
            state.auth = true;
            state.authUser = {};
        },
        setIsLoading: (state, action) => {

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
export const selectLanguage = (state) => state.LoginTokenSlice.language;
export const selectLoginToken = (state) => state.LoginTokenSlice.loginToken;
export const selectAuth = (state) => state.LoginTokenSlice.auth;
export const selectAuthUser = (state) => state.LoginTokenSlice.authUser;
export const selectIsLoading = (state) => state.LoginTokenSlice.isLoading;


export const {
    setLanguage,
    setLoginToken,
    setAuth,
    setUser,
    signOut,
    setIsLoading
} = LoginTokenSlice.actions;