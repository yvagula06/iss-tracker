import React from 'react';

import '../styles/Legend.scss';
import legend from '../assets/legend.png';

function Legend() {
  return (
    <div className='legend'>
      <div className='legend__top'>+1000m</div>
      <div className='legend__bottom'>-1000m</div>
      <img src={legend} alt='' className='legend__img' />
    </div>
  );
}

export default Legend;
