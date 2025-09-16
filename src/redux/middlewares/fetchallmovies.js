import {moviesdata, movieserror, moviesloading, stoploading} from '../Moviesall';
import axios from 'axios';

const fetchallmovies =(pageno)=>{

    return async (dispatch)=>{
        dispatch(moviesloading());
        try{
            const url=`https://api.themoviedb.org/3/trending/movie/day?api_key=eb5db16ad9cba61839d8ea1ed7ce5aca&language=en-US&page=${pageno}`;
            const res = await axios.get(url);
            const data = res?.data?.results;
            dispatch(moviesdata(data));
        }
        catch(error){
            dispatch(movieserror(error));
        }
        finally{
            dispatch(stoploading());
        }
    };
};

export default fetchallmovies;