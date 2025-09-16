import React, {useContext, useEffect, useState} from 'react';
import "./movielist.css";
import Movieinfo from '../features/Movieinfo';
import { MovieContext } from '../Component/MovieContextWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCheckToSlot} from '@fortawesome/free-solid-svg-icons';
import genre_id from '../additional things/genre_id';

const Movielist = ({movies}) => {

    const [openmodel, setopenmodel]=useState(false);
    const [selectedmovie, setseletedmovie]=useState(null);
    const {watchlist,addtowatchlist,removewatchlist}=useContext(MovieContext);

    const movie_present_in_watchlist = (movie)=>{
        return watchlist.find((m)=> m?.id === movie?.id) ? true : false;
    };

    const handleopenmodel=(movie)=>{
        setopenmodel(true);
        setseletedmovie(movie);
    };

    const handleclosemodel=()=>{
        setopenmodel(false);
        setseletedmovie(null);
    };

  return (
    <>
        <div className='main_for_all'>
            {movies?.length > 0 && (
                movies?.slice(0,5).map((movie,idx)=>{
                    return(
                        <div className='movie_card_main' key={idx}>
                            <div className='movie_card_backimg' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})` }}>
                                {movie_present_in_watchlist(movie) ? (
                                    <div className='remove_watchlist' onClick={()=> removewatchlist(movie)}>
                                        <FontAwesomeIcon icon={faCheckToSlot} style={{ marginRight: '8px' }}/>
                                    </div>
                                ) : (
                                    <div className='add_watchlist' onClick={()=>addtowatchlist(movie)}>
                                        <FontAwesomeIcon icon={faBookmark} style={{ marginRight: '8px' }}/>
                                    </div>
                                )}
                                <div className='movie_card_title' onClick={()=> handleopenmodel(movie)}>
                                    <div className='movie_title'>{movie?.title}</div>
                                    <div className='movie_overview'>Genre: {movie?.genre_ids.map((id)=> genre_id[id]).join(", ")}</div>
                                    <div className='movie_language'>Language: {movie?.original_language?.toUpperCase()}</div>
                                </div>
                            </div>
                        </div>
                    )
                })
            )}
        </div>
        {openmodel && (
            <div className='movie_info_model'>
                <Movieinfo movie={selectedmovie} handleclosemodel={handleclosemodel}/>
            </div>
        )}
    </>
  )
}

export default Movielist;
