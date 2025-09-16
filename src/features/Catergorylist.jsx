import React from 'react';
import "./catergorylist.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight,faArrowLeft, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import genre_id from '../additional things/genre_id';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { MovieContext } from '../Component/MovieContextWrapper';
import Allcatergory from './Allcatergory';
import { useSelector, useDispatch } from 'react-redux';
import { handleNext, handlePrev } from '../redux/Pagesall';
import fetchallmovies  from '../redux/middlewares/fetchallmovies';



const Catergorylist = () => {
    const [search, setsearch] = useState("");
    const [currentgenre,setcurrentgenre]=useState("all");
    const [genrelist, setgenrelist]=useState("All Genres");
    const [showmodel, setshowmodel]=useState(false);
    const [sortlist, setsortlist]=useState("");
    const [type, settype]=useState("All");
    const [lang, setlang]=useState("All");

    const {error, loading, movies}=useSelector((state)=> state.Moviesall);
    const {pageno}=useSelector((state)=> state.Pagesall);
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(fetchallmovies(pageno));
    },[pageno]);

    const {watchlist, addtowatchlist, removewatchlist, setwatchlist}=useContext(MovieContext);

    useEffect(()=>{
        const all_genreslist= new Set(watchlist?.map((movie)=> {
            movie?.genre_ids?.map((id)=> genre_id[id]).join(", ")}));
            setgenrelist(["All Genres", ...all_genreslist]);
    },[]);

    const filteredMovies = React.useMemo(() => {
        let list = [...movies];

        if (search.trim() !== "") {
            list = list.filter((movie) =>
            movie.title?.toLowerCase().includes(search.toLowerCase()));
        }
        return list;
    }, [movies, search, currentgenre, lang, type, sortlist]);



    const handlesorts = (e) => {
        setsortlist(e.target.value);
    };
    



  return (
    <div className='main_list_catorgory'>
        <div className='catergory_things_all'>
            <div className='search_box_catergory'>
                <span className='search_icon_catergory'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
                <input className='input_search_catergory' type='text' placeholder='Search here' value={search} onChange={(e)=> setsearch(e.target.value)}/>
            </div>
            <div className='total_catergory_movies'>All Movies</div>
            <div className='all_catergory_movies'>
                <Allcatergory movies={filteredMovies} />
            </div>
            <div className='pagination_buttons_catergory'>
                <button className='prev_button_catergory' onClick={()=> dispatch(handlePrev())}>
                    <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '8px' }}/>
                </button>
                <div className='page_number_catergory'>{pageno}</div>
                <button className='next_button_catergory' onClick={()=> dispatch(handleNext())}>
                    <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '8px' }}/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Catergorylist;
