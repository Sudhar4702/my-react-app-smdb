import React from 'react';
import "./movierecommend.css";
import Spinner from '../Component/Spinner';
import { useState, useEffect } from 'react';
import {getMovieRecommendations} from '../additional things/gemini';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark} from '@fortawesome/free-solid-svg-icons';

const MovieRecommend = ({watchlist, setshowmodel, addtowatchlist}) => {
    const [loader, setloader] = useState(false);
    const[recommendation, setrecommendation]=useState([]);

    useEffect(()=>{
          if(watchlist?.length<=2){
              return;
            }
        const fetchRecommendations= async()=>{  
            try{
                setloader(true);
                const result= await getMovieRecommendations(watchlist);
                setrecommendation(result?.recommendations);
            }
            catch(error){
                console.log("error while fetching recommendations: ", error);
            }
            finally{
                setloader(false);
            }
        }
     fetchRecommendations();
    },[watchlist]);
  return (
    <div className="ai-modal-backdrop">
    <div className="ai-modal-content">
      <h2 className="ai-modal-title">AI Recommended Movies</h2>
      {loader ? (
        <div className="ai-modal-loader">
          <Spinner />
          <span className="ai-modal-loader-text">
            Getting your personalized recommendations...
          </span>
          <button
            className="ai-modal-close"
            onClick={() => setshowmodel((prevState) => !prevState)}
          >
            ✖
          </button>
        </div>
      ) : (
        <>
          <button
            className="ai-modal-close"
            onClick={() => setshowmodel((prevState) => !prevState)}
          >
            ✖
          </button>
          {watchlist?.length <= 2 ? (
            <div className="ai-modal-warning">
              <p>
                Add at least 2 movies to your watchList to get personalized
                recommendations
              </p>
            </div>
          ) : (
            <div className="ai-modal-grid">
              {recommendation?.map((movie, index) => (
                <div key={index} className="ai-modal-movie-card">
                  <div className="ai-modal-movie-header">
                    <h3 className="ai-modal-movie-title">{movie.title}</h3>
                    <span className="ai-modal-confidence">{movie.confidence}% Match</span>
                  </div>
                  <p className="ai-modal-reason">{movie.reason}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  </div>
  )
}

export default MovieRecommend;
