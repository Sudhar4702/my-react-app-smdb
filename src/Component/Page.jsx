import React from 'react';
import "./page.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft,faArrowRight} from '@fortawesome/free-solid-svg-icons';

const Page = ({pageno, handleprev, handlenext}) => {

  return (
    <div className='Main_page'>
      <div className='position_page'>
        <button className='left_btn' onClick={handleprev}>
          <FontAwesomeIcon icon={faArrowLeft}/>
        </button>
        <button className='right_btn' onClick={handlenext}>
          <FontAwesomeIcon icon={faArrowRight}/>
        </button>
      </div>
    </div>
  )
}

export default Page
