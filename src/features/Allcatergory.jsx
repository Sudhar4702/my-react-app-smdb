import React from 'react';
import { useState, useEffect, useContext } from 'react';
import "./allcategories.css";
import Movieinfo from '../features/Movieinfo';
import { MovieContext } from '../Component/MovieContextWrapper';
import genre_id from '../additional things/genre_id';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCheckToSlot} from '@fortawesome/free-solid-svg-icons';

const Allcatergory = ({movies}) => {
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
        <div className='mainall_list'>
            {movies?.length > 0 ? (
                movies.slice(0, 8).map((movie, idx) => (
                <div className='movie_card_main_all_catergory' key={idx}>
                    <div 
                    className='movie_card_backimg_all_catergory' 
                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})` }}
                    >
                    {movie_present_in_watchlist(movie) ? (
                        <div 
                        className='remove_watchlist_all_catergory' 
                        onClick={() => removewatchlist(movie)}
                        >
                        <FontAwesomeIcon icon={faCheckToSlot} style={{ marginRight: '8px' }} />
                        </div>
                    ) : (
                        <div 
                        className='add_watchlist_all_catergory' 
                        onClick={() => addtowatchlist(movie)}
                        >
                        <FontAwesomeIcon icon={faBookmark} style={{ marginRight: '8px' }} />
                        </div>
                    )}
                    <div 
                        className='movie_card_title_all_catergory' 
                        onClick={() => handleopenmodel(movie)}
                    >
                        <div className='movie_title_all_catergory'>{movie?.title}</div>
                        <div className='movie_overview_all_catergory'>
                        Genre: {movie?.genre_ids.map((id) => genre_id[id]).join(", ")}
                        </div>
                        <div className='movie_language_all_catergory'>
                        Language: {movie?.original_language?.toUpperCase()}
                        </div>
                    </div>
                    </div>
                </div>
                ))
            ) : (
                <div className="no-results">
                <p>No results found 😕</p>
                </div>
            )}
        </div>

    </>
  )
}

export default Allcatergory;
