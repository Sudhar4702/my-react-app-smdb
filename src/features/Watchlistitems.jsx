import React, { use } from 'react'
import "./watchlistitems.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTrash, faRobot} from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { MovieContext } from '../Component/MovieContextWrapper';
import { useState, useEffect } from 'react';
import genre_id from '../additional things/genre_id';
import MovieRecommend from '../Component/MovieRecommend';


const Watchlistitems = () => {
    const [search, setsearch] = useState("");
    const [currentgenre,setcurrentgenre]=useState("all");
    const [genrelist, setgenrelist]=useState("All Genres");
    const [showmodel, setshowmodel]=useState(false);
    const [sortlist, setsortlist]=useState("");

    const {watchlist, addtowatchlist, removewatchlist, setwatchlist}=useContext(MovieContext);
    

    useEffect(()=>{
        const all_genreslist= new Set(watchlist?.map((movie)=> {
            movie?.genre_ids?.map((id)=> genre_id[id]).join(", ")}));
            setgenrelist(["All Genres", ...all_genreslist]);
    },[]);

    const handlesorts =(e)=>{
        const value = e.target.value;
        setsortlist(value);
        if(!watchlist || watchlist.length===0){
            return;
        }
        let sortinglist =[...watchlist];
        if(value ==="Rating Low to High"){
            sortinglist=watchlist?.sort((a,b)=> a.vote_average -b.vote_average);
        }
        else if(value === "Rating High to Low"){
            sortinglist.sort((a,b)=> b.vote_average - a.vote_average);
        }
        else if(value === "Popularity Low to High"){
            sortinglist.sort((a,b)=> a.popularity - b.popularity);
        }
        else if(value === "Popularity High to Low"){
            sortinglist.sort((a,b)=> b.popularity - a.popularity);
        }
        setwatchlist([...sortinglist]);
    };


  return (
    <div className='watchlist_main'>
        <div className='search_box'>
            <span className='search_icon'>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
            <input className='input_search' type='text' placeholder='Search here' value={search} onChange={(e)=> setsearch(e.target.value)}/>
        </div>
      <div className='watchlist_text'>
        My Watchlist
      </div>
      <div className='watchlist_sort_options'>Sort by:
        <select value={sortlist} onChange={handlesorts} className='select_options' name="types" id="types_state">
            <option value="Rating Low to High">Rating Low to High</option>
            <option value="Rating High to Low">Rating High to Low</option>
            <option value="Popularity Low to High" >Popularity Low to High</option>
            <option value="Popularity High to Low" >Popularity High to Low</option>
        </select>
        <div className='genre_options'>
          <select value={currentgenre} onChange={(e)=> setcurrentgenre(e.target.value)} className='select_options_genre' name='genre_parts' id='genre_parts'>
            <option value="all">All</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Animation">Animation</option>
            <option value="Comedy">Comedy</option>
            <option value="Crime">Crime</option>
            <option value="Documentary">Documentary</option>
            <option value="Drama">Drama</option>
            <option value="Family">Family</option>
            <option value="Fantasy">Fantasy</option>
            <option value="History">History</option>
            <option value="Horror">Horror</option>
            <option value="Music">Music</option>
            <option value="Mystery">Mystery</option>
            <option value="Romance">Romance</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="TV">TV</option>
            <option value="Thriller">Thriller</option>
            <option value="War">War</option>
            <option value="Western">Western</option>
          </select>
        </div>
      </div>
      <div className='watchlist_details_things'>
        {watchlist?.length>0 && watchlist?.filter((movie)=>{
            return ( currentgenre === "all" || movie.genre_ids?.some(id => genre_id[id] === currentgenre));
        }).filter((movie)=>{
            return movie?.title?.toLowerCase().trim().includes(search.toLowerCase());
        }).map((movie,idx)=>{
            return(
                <div className='watchlist_each_movie' key={idx}>
                    <div className='watchlist_movie_img' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})` }}></div>
                    <div className='watchlist_movie_title'><div className='title_center title_todo'>TITLE</div>
                    <div className='title_center'>{movie?.title}</div></div>
                    <div className='watchlist_details_rating'><div className='title_center title_todo'>Rating</div ><div className='title_center'>⭐{movie?.vote_average}</div></div>
                    <div className='watchlist_details_popularity'><div className='title_center title_todo'>Popularity</div><div className='title_center'>{movie?.popularity}</div></div>
                    <div className='watchlist_details_genre'><div className='title_center title_todo'>Genre</div><div className='title_center'>{(movie.genre_ids || []).map(id => genre_id[id]).join(", ")}</div></div>
                    <div className='watchlist_details_language'><div className='title_center title_todo'>Language</div><div className='title_center'>{movie?.original_language?.toUpperCase()}</div></div>
                    <div className='watchlist_remove' onClick={()=> removewatchlist(movie)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </div>
                </div>
            );
        })}
      </div>
      <div className='AI_recommendation' onClick={() => setshowmodel((prevState) => !prevState)}>
        <FontAwesomeIcon icon={faRobot} className='robot_AI'/>
      </div>
      {showmodel && (
        <MovieRecommend watchlist={watchlist} setshowmodel={setshowmodel} addtowatchlist={addtowatchlist}/>
      )}
    </div>
  )
}

export default Watchlistitems;
