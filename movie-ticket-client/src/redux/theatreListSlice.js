import { createSlice } from "@reduxjs/toolkit";

const theatreListSlice = createSlice({
    name: 'theatreList',
    initialState: {
        addTheatre: null,
        editTheatre: null,
        deleteTheatre: null,
        getAllTheatres: null,
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
    },
});

export const { setAddTheatre, setEditTheatre, setDeleteTheatre, setGetAllTheatres } = theatreListSlice.actions;
export default theatreListSlice.reducer;
