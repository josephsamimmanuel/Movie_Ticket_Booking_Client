import { createSlice } from '@reduxjs/toolkit'

const showsSlice = createSlice({
    name: 'shows',
    initialState: {
        getAllShows: null,
        getShowsByTheatre: null,
        addShow: null,
        editShow: null,
        deleteShow: null,
    },
    reducers: {
        setGetAllShows: (state, action) => {
            state.getAllShows = action.payload      
        },
        setGetShowsByTheatre: (state, action) => {
            state.getShowsByTheatre = action.payload
        },
        setAddShow: (state, action) => {
            state.addShow = action.payload
        },
        setEditShow: (state, action) => {
            state.editShow = action.payload
        },
        setDeleteShow: (state, action) => {
            state.deleteShow = action.payload
        },
    },
})

export const { setGetAllShows, setGetShowsByTheatre, setAddShow, setEditShow, setDeleteShow } = showsSlice.actions
export default showsSlice.reducer

