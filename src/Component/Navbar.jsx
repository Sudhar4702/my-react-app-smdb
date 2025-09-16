import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBookmark, faBars, faUser} from '@fortawesome/free-solid-svg-icons';
import "./navbar.css"
import main_logo from '../assets/1100.jpg';
import { NavLink } from 'react-router-dom';
const Navbar = () => {

  return (
    <>
    <nav className='nav_bar_main'>
        <ul className='nav_bar_ul'>
            <li>
                <NavLink to="/">
                <img className='Main_logo' src={main_logo}/>
                </NavLink>
            </li>
            <div className='nav_bar_li'>
                <li className='adding_back_color'>
                    <NavLink to="/" style={({isActive})=>{
                        return {
                            backgroundColor: isActive ? "white" : "#0f0f0f",
                            color: isActive ? "black" : "white",
                        };
                    }} className="home_background_color color_change">
                    <FontAwesomeIcon icon={faHouse} style={{ marginRight: '8px' }}/>Home</NavLink>
                </li>
                <li className='adding_back_color'> 
                    <NavLink to="/watchlist" style={({isActive})=>{
                        return {
                            backgroundColor: isActive ? "white" : "#0f0f0f",
                            color: isActive ? "black" : "white",
                        };
                    }} className="watchlist_background_color color_change">
                    <FontAwesomeIcon icon={faBookmark} style={{ marginRight: '8px' }}/>WatchList</NavLink>
                </li>
                <li className='adding_back_color'>
                    <NavLink to="/categories" style={({isActive})=>{
                        return {
                            backgroundColor: isActive ? "white" : "#0f0f0f",
                            color: isActive ? "black" : "white",
                        };
                    }} className="categories_background_color color_change">
                    <FontAwesomeIcon icon={faBars} style={{ marginRight: '8px' }}/>All Movies</NavLink>
                </li>
                <li className='adding_back_color'>
                    <NavLink to="/sigin" style={({isActive})=>{
                        return {
                            backgroundColor: isActive ? "white" : "#0f0f0f",
                            color: isActive ? "black" : "white",
                        };
                    }} className="sigin_background_color color_change">
                    <FontAwesomeIcon icon={faUser} style={{ marginRight: '8px' }}/>Sign-in</NavLink>
                </li>
            </div>
        </ul>
    </nav>
    </>
  )
}

export default Navbar

