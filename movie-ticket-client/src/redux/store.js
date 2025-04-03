import {configureStore} from "@reduxjs/toolkit";
import loaderReducer from "./loaderSlice";
import usersReducer from "./usersSlice";
import moviesReducer from "./moviesSlice";

const store = configureStore({
    reducer: {
        loader: loaderReducer,
        users: usersReducer,
        movies: moviesReducer,
    },
    devTools: true,
});

export default store;
