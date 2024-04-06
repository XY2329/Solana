
import React from 'react'


//INTERNAL IMPORT
import Style from './Banner.module.css';

const Banner = () => {
  return (
    <div className={Style.banner}>
      <div>
        <img src="/card_image/navbar-icons.png" objectFit="cover" alt="background" width={2000} height={100}/>
      </div>
      </div> 
  )
}

export default Banner
