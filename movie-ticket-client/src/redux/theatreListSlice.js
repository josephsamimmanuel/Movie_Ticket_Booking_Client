import { createSlice } from "@reduxjs/toolkit";

const theatreListSlice = createSlice({
    name: 'theatreList',
    initialState: {
        addTheatre: null,
        editTheatre: null,
        deleteTheatre: null,
        getAllTheatres: null,
        getAllTheatresByUserId: null,
        getAllUniqueTheatresForAMovieOnADate: null,
        getShowDetails: null,
    },
    reducers: {
        setAddTheatre: (state, action) => {
            state.addTheatre = action.payload;
        },
        setEditTheatre: (state, action) => {
            state.editTheatre = action.payload;
        },
        setDeleteTheatre: (state, action) => {
            state.deleteTheatre = action.payload;
        },
        setGetAllTheatres: (state, action) => {
            state.getAllTheatres = action.payload;
        },
        setGetAllTheatresByUserId: (state, action) => {
            state.getAllTheatresByUserId = action.payload;
        },
        setGetAllUniqueTheatresForAMovieOnADate: (state, action) => {
            state.getAllUniqueTheatresForAMovieOnADate = action.payload;
        },
        setGetShowDetails: (state, action) => {
            state.getShowDetails = action.payload;
        },
    },
});

export const { setAddTheatre, setEditTheatre, setDeleteTheatre, setGetAllTheatres, setGetAllTheatresByUserId, setGetAllUniqueTheatresForAMovieOnADate, setGetShowDetails } = theatreListSlice.actions;
export default theatreListSlice.reducer;
