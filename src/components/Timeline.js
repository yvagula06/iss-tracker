import React, { useState, useEffect } from 'react';

import '../styles/Timeline.scss';
import { getData } from '../data/getData';

function Timeline(props) {
  const { quake, setQuake, setCamera } = props;
  const [data, setData] = useState([]);
  const [year, setYear] = useState([]);

  const years = [1971, 1972, 1973, 1974, 1975, 1976];

  useEffect(() => {
    getData()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getQuake = (id) => {
    data.forEach((item) => {
      if (item._id === id) {
        setQuake(item);
      }
    });
  };

  const degToRad = (deg) => (deg * Math.PI) / 180.0;

  return (
    <>
      <div className='timeline'>
        <select
          className='timeline__label'
          onChange={(e) => {
            setYear(e.target.value);
            setQuake({});
          }}
        >
          <option className='timeline__label__list' value='none' disabled hidden selected>
            Year
          </option>
          {years.map((year, index) => {
            return (
              <option key={index} value={year}>
                {year}
              </option>
            );
          })}
        </select>
        <select
          className='timeline__label'
          onChange={(e) => {
            getQuake(e.target.value);
          }}
        >
          <option className='timeline__label__list' value='none' hidden selected>
            Day
          </option>
          {data.map((item, index) => {
            return (
              item.year === year && (
                <option className='timeline__label__list' key={index} value={item._id}>
                  {item.day}
                </option>
              )
            );
          })}
        </select>
        <button
          className='apply'
          onClick={() => {
            console.log('click');
            setCamera([
              6 * Math.sin(Math.PI / 2 - degToRad(quake.latitude)) * Math.sin(degToRad(quake.longitude)),
              6 * Math.cos(Math.PI / 2 - degToRad(quake.latitude)),
              6 * Math.sin(Math.PI / 2 - degToRad(quake.latitude)) * Math.cos(degToRad(quake.longitude)),
            ]);
          }}
        >
          Apply
        </button>
      </div>
      <a target='_blank' rel='noreferrer' className='fpBtn' href='https://cucumburr.itch.io/moonquake-simulator'>
        View in First Person!
      </a>
    </>
  );
}

export default Timeline;
