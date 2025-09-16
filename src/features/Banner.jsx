import React,{ useEffect, useState } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight,faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import "./banner.css"
import genre_id from '../additional things/genre_id';

const Banner = () => {
    const [loader,setloader]=useState(false);
    const [Movies, setMovies]=useState([]);
    const [currentidx,setcurrentidx]=useState(0);

    useEffect(()=>{
        try{
            setloader(true);
            const url=`https://api.themoviedb.org/3/trending/movie/day?api_key=eb5db16ad9cba61839d8ea1ed7ce5aca`;
            axios.get(url).then((response)=>{
                const movieData=response?.data?.results?.slice(0,20) || [];
                setMovies(
                    movieData.map((movie)=>{
                        return{
                            title: movie?.title,
                            bannerImage: `https://image.tmdb.org/t/p/original${movie?.backdrop_path.startsWith('/') ? movie.backdrop_path : '/' + movie.backdrop_path}`,
                            genre_ids: movie?.genre_ids,
                            original_language: movie?.original_language,
                        };
                        
                    })
                );
            });
        }
        catch(error){
            console.log("error while fetching banner data",error);
        }
        finally{
            setloader(false);
        }
    },[]);

    useEffect(()=>{
        if(Movies.length===0){
            return;
        }
        const setinterval_id=setInterval(()=>{
            setcurrentidx((prev)=>(prev+1)%Movies.length);
        },10000)

        return ()=> clearInterval(setinterval_id);
    },[Movies]);

    const handleprev=()=>{
        setcurrentidx((prev)=> prev===0 ? Movies.length -1: prev-1);
    };

    const handlenext = ()=>{
        setcurrentidx((prev)=> (prev+1)%Movies.length);
    };
  return (
    <div className='style_banner_main'>
      <>
        {Movies.length >0 && (
            <div className='style_banner'>
                <div className='banner_main_style'>
                    <div className='banner_backimg' style={{backgroundImage: `url(${Movies[currentidx]?.bannerImage})`}}>
                    </div>
                    <div className='banner_text'>
                        {Movies[currentidx]?.title}
                        <div className='banner_genre'>Genre: {Movies[currentidx]?.genre_ids?.map((id)=> genre_id[id]).filter(name => name !== undefined).join(", ")}</div>
                        <div className='banner_language'>Language: {Movies[currentidx]?.original_language?.toUpperCase()}</div>
                    </div>
                </div>
                <button className='banner_leftbtn' onClick={handleprev}><FontAwesomeIcon icon={faArrowLeft}/></button>
                <button className='banner_rightbtn' onClick={handlenext}><FontAwesomeIcon icon={faArrowRight}/></button>
            </div>
        )}
      </>
    </div>
  )
}

export default Banner
