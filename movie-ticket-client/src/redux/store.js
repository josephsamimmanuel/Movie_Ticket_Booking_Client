import {configureStore} from "@reduxjs/toolkit";
import loaderReducer from "./loaderslice";
import usersReducer from "./usersSlice";
import moviesReducer from "./moviesSlice";
import theatreListReducer from "./theatreListSlice";
import showsReducer from "./showsSlice";

const store = configureStore({
    reducer: {
        loader: loaderReducer,
        users: usersReducer,
        movies: moviesReducer,
        theatreList: theatreListReducer,
        shows: showsReducer,
    },
});

export default store;
