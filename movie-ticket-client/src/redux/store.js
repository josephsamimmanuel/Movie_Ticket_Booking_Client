import {configureStore} from "@reduxjs/toolkit";
import loaderReducer from "./loaderslice";
import usersReducer from "./usersSlice";

const store = configureStore({
    reducer: {
        loader: loaderReducer,
        users: usersReducer,
    },
    devTools: true,
});

export default store;
