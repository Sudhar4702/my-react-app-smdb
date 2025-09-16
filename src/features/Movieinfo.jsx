import React from 'react';
import "./movieinfo.css";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark} from '@fortawesome/free-solid-svg-icons';

const Movieinfo = ({movie, handleclosemodel}) => {

    const {id, title, overview, release_date, vote_average, poster_path} = movie;
    const [loader, setloader] = useState(false);
    const [trailerurl, settrailerurl] = useState(null);
    const TMDB_API_KEY = "eb5db16ad9cba61839d8ea1ed7ce5aca";
    
    useEffect(()=>{
        const fetch_trailer =async()=>{
            try{
                setloader(true);
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${TMDB_API_KEY}`);
                const objtrailer = response?.data?.results.find((video) => video.type === "Trailer" && video.site === "YouTube");
                if(objtrailer){
                    settrailerurl(`https://www.youtube.com/embed/${objtrailer?.key}`);
                }
            }
            catch(error){
                console.log("error while fetching trailer", error);
            }
            finally{
                setloader(false);
            }
        }
        fetch_trailer();
    },[]);
  return (
    <div className='movie_info_main'>
            <>
                <div className='movie_info_class'>
                    {poster_path ? (
                        <img src={`https://image.tmdb.org/t/p/original/${poster_path}`} alt={`${title} poster`} className='movie_img'/>
                    ):(
                        <div>No Image Available</div>
                    )}
                    <div className='movie_info_details' >
                        <h2 className='movie_title_info'>TITLE: {title}</h2>
                        <p className='movie_releasedate'>Release_Date: - {release_date}</p>
                        <p className='movie_overview_info'>OverView: {overview ? overview : "No Overview Available"}</p>
                        <p className='movie_voting'>Average Voting: - {vote_average ? vote_average.toFixed(1) : "N/A"}</p>
                    </div>
                </div>
                <div className='movie_trailer_section'>
                    <h3 className='trailer_text'>Trailer</h3>
                    <div className='trailer_iframe'>
                        {trailerurl ? (
                            <iframe className='trailer_iframe' src={trailerurl} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        ) : (
                            <p className='p_trailer'>No Trailer Available</p>
                        )}
                    </div>
                </div>
                <button className='close_btn' onClick={handleclosemodel}><FontAwesomeIcon icon={faCircleXmark} style={{ marginRight: '8px' }}/></button>
            </>
      
    </div>
  )
}

export default Movieinfo
