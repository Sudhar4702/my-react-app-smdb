import React from 'react';
import "./movies.css";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Page from '../Component/Page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileVideo, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import Movielist from '../features/Movielist';

const Movies = () => {
    const [Movies, setMovies]=useState([]);
    const [pageno,setpageno]=useState(1);
    const [loader,setloader]=useState(false);

    useEffect(()=>{
        try{
            setloader(true);
            const url=`https://api.themoviedb.org/3/trending/movie/day?api_key=eb5db16ad9cba61839d8ea1ed7ce5aca&language=en-US&page=${pageno}`;
            axios.get(url).then((response)=>{
                const movieData=response?.data?.results || [];
                setMovies(movieData);
            });
        }
        catch(error){
            console.log("error while fetching movies data",error);
        }
        finally{
            setloader(false);
        }
    },[pageno]);

    const handleprev=()=>{
        setpageno((prev)=> prev === 1? 1 : prev-1);
    } ;  

    const handlenext = ()=>{
        setpageno((prev)=> prev+1);
    };
  return (
    <div>
      <div className='movie_main'> <FontAwesomeIcon icon={faFileVideo} style={{ marginRight: '5px'}}/>Trending Movies<FontAwesomeIcon icon={faAngleRight} style={{marginLeft:"8px", cursor:"pointer"}}/></div>
      <Movielist movies={Movies}/>
      <Page pageno = {pageno} handleprev={handleprev} handlenext={handlenext}/>
    </div>
  )
}

export default Movies;
