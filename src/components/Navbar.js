import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.scss';

const Navbar = (props) => {
  const { about, setAbout } = props;
  return (
    <div className='navbar'>
      <Link className='navbar__brand' to='/'>
        MOON
      </Link>
      <div className='navbar__links'>
        <Link
          className='navbar__links__link'
          to='/about'
          onClick={() => {
            setAbout(!about);
          }}
        >
          {about && 'About'}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
