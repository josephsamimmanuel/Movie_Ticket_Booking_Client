import {configureStore} from "@reduxjs/toolkit";
import loaderReducer from "./loaderSlice";
import usersReducer from "./usersSlice";
import moviesReducer from "./moviesSlice";
import theatreListReducer from "./theatreListSlice";

const store = configureStore({
    reducer: {
        loader: loaderReducer,
        users: usersReducer,
        movies: moviesReducer,
        theatreList: theatreListReducer,
    },
    devTools: true,
});

export default store;
