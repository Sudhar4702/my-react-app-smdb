import { configureStore } from "@reduxjs/toolkit";

import Moviesall from "./Moviesall";
import Pagesall from "./Pagesall";

const store=configureStore({
    reducer:{
        Moviesall: Moviesall,
        Pagesall: Pagesall,
    },
});

export default store;