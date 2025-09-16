import React, {useState, useEffect} from 'react'


export const MovieContext = React.createContext();

const MovieContextWrapper = ({children}) => {
    const[watchlist,setwatchlist]=useState([]);

    useEffect(()=>{
      setwatchlist(()=>{
        if(localStorage.getItem("imdbthings")){
          return JSON.parse(localStorage.getItem("imdbthings"));
        }
        return [];
      })
    },[]);

    useEffect(()=>{
      localStorage.setItem("imdbthings",JSON.stringify(watchlist));
    },[watchlist]);

    const addtowatchlist = (movie) =>{
        setwatchlist((prev)=>{
            const updatelist = prev ? [...prev,movie] : [movie];
            return updatelist;
        });
    };

    const removewatchlist =(movie)=>{
        setwatchlist((prev)=>{
            const filterlist = prev.filter((m)=>{
                return m?.id !== movie?.id;
            })
            return filterlist;
        })
    }
  return (
    <MovieContext.Provider value={{watchlist,setwatchlist,addtowatchlist,removewatchlist}}>
      {children}
    </MovieContext.Provider>
  )
}

export default MovieContextWrapper;
