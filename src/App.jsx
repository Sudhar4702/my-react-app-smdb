import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Home from './Pages/Home';
import Watchlist from './Pages/Watchlist'
import MovieContextWrapper from "./Component/MovieContextWrapper";
import Catergory from "./Pages/Catergory";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";

export default function App() {
  return (
    <>
    <MovieContextWrapper>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/watchlist" element={<Watchlist/>} />
        <Route path="/categories" element={<Catergory/>}/>
        <Route path="/sigin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </MovieContextWrapper>
    </>
  );
}
