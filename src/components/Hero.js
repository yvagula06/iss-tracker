import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Hero.scss';

function Hero() {
  return (
    <div className='hero'>
      <div className='hero__title'>
        <div className='hero__title__main'>MOONQUAKE VISUALIZED</div>
        <div className='hero__title__sub'>VISUALIZING THE MOON SINCE 1969</div>
      </div>
      <div className='hero__links'>
        <Link to='/model' className='hero__links__link'>
          &lt;Visit Moon&gt;
        </Link>
      </div>
    </div>
  );
}

export default Hero;
