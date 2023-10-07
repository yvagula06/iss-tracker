import React from 'react';

import arkadeep from '../assets/arkadeep.jpeg';
import maaz from '../assets/maaz.jpeg';
import soham from '../assets/soham.jpg';
import vishal from '../assets/vishal.jpg';

import { AiOutlineLinkedin } from 'react-icons/ai';
import { VscGithub } from 'react-icons/vsc';

import '../styles/Developers.scss';

function Developers() {
  return (
    <div className='developers'>
      <div className='developers__header'>Our Team:</div>
      <ul className='developers__list'>
        <div className='row'>
          <li classname='developers__list__item'>
            <img className='developers__list__item__img' src={arkadeep} alt='' />
            <div className='developers__list__item__name'>Arkadeep Mitra</div>
            <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/arkadeep-mitra-774695224/' className='developers__list__item__logo'>
              <AiOutlineLinkedin />
            </a>
            <a target='_blank' rel='noreferrer' href='https://github.com/ArkMitra' className='developers__list__item__logo'>
              <VscGithub />
            </a>
          </li>
          <li classname='developers__list__item'>
            <img className='developers__list__item__img' src={maaz} alt='' />
            <div className='developers__list__item__name'>Maaz Shahid</div>
            <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/maaz-shahid-96998720a/' className='developers__list__item__logo'>
              <AiOutlineLinkedin />
            </a>
            <a target='_blank' rel='noreferrer' href='https://github.com/maaz-shahid99' className='developers__list__item__logo'>
              <VscGithub />
            </a>
          </li>
        </div>
        <div className='row'>
          <li classname='developers__list__item'>
            <img className='developers__list__item__img' src={soham} alt='' />
            <div className='developers__list__item__name'>Soham Deb Majumdar</div>
            <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/soham-deb-majumder-35b959210/' className='developers__list__item__logo'>
              <AiOutlineLinkedin />
            </a>
            <a target='_blank' rel='noreferrer' href='https://github.com/samwilson0745' className='developers__list__item__logo'>
              <VscGithub />
            </a>
          </li>
          <li classname='developers__list__item'>
            <img className='developers__list__item__img' src={vishal} alt='' />
            <div className='developers__list__item__name'>Vishal Kumar Sharma</div>
            <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/vishal-kumar-sharma-955aa0201/' className='developers__list__item__logo'>
              <AiOutlineLinkedin />
            </a>
            <a target='_blank' rel='noreferrer' href='https://github.com/vishalkrsharma' className='developers__list__item__logo'>
              <VscGithub />
            </a>
          </li>
        </div>
      </ul>
    </div>
  );
}

export default Developers;
