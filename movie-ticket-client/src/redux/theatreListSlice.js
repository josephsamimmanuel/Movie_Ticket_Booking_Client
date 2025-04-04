import { createSlice } from "@reduxjs/toolkit";

const theatreListSlice = createSlice({
    name: 'theatreList',
    initialState: {
        addTheatre: null,
        editTheatre: null,
        deleteTheatre: null,
        getAllTheatres: null,
        getAllTheatresByUserId: null,
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
    },
});

export const { setAddTheatre, setEditTheatre, setDeleteTheatre, setGetAllTheatres, setGetAllTheatresByUserId } = theatreListSlice.actions;
export default theatreListSlice.reducer;
