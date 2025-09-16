import {createSlice} from '@reduxjs/toolkit';

const Moviesall=createSlice({
    name:"Moviesall",
    initialState:{
        movies:[],
        error: false,
        loading: false,
    },
    reducers:{
        movieserror: (state)=>{
            state.error=true;
            state.loading=false;
        },
        moviesloading: (state)=>{
            state.loading=true;
            state.error=false;
        },
        moviesdata: (state, data)=>{
            state.movies=data.payload;
            state.loading=false;
            state.error=false;
        },
        stoploading:(state)=>{
            state.loading=false;
            state.error=false;
        },
    },
});

export const {moviesdata, movieserror, moviesloading, stoploading}=Moviesall.actions;
export default Moviesall.reducer;