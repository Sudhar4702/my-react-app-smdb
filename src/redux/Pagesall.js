import { createSlice } from "@reduxjs/toolkit";

const Pagesall=createSlice({
    name:"Pagesall",
    initialState:{
        pageno:1,
    },
    reducers:{
        handleNext:(state)=>{
            state.pageno= state.pageno +1;
        },
        handlePrev:(state)=>{
            state.pageno= state.pageno === 1 ? 1 : state.pageno -1;
        },
    },
});

export const {handleNext, handlePrev}=Pagesall.actions;
export default Pagesall.reducer;