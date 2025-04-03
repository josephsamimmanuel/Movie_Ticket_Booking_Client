import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        addMovie: null,
        editMovie: null,
        deleteMovie: null,
        getAllMovies: null,
    },
    reducers: {
        setAddMovie: (state, action) => {
            state.addMovie = action.payload;
        },
        setEditMovie: (state, action) => {
            state.editMovie = action.payload;
        },
        setDeleteMovie: (state, action) => {
            state.deleteMovie = action.payload;
        },
        setGetAllMovies: (state, action) => {
            state.getAllMovies = action.payload;
        },
    },
});

export const { setAddMovie, setEditMovie, setDeleteMovie, setGetAllMovies } = moviesSlice.actions;
export default moviesSlice.reducer;

