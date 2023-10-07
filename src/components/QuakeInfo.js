import React from 'react';

import '../styles/QuakeInfo.scss';

function QuakeInfo(props) {
  const { quake } = props;
  const { day, hour, latitude, longitude, magnitude, minute, seconds, station, year } = quake;

  return (
    Object.keys(quake).length !== 0 && (
      <div className='quakeInfo'>
        <div className='quakeInfo__header'>Quake Details: </div>
        <div className='quakeInfo__body'>
          Year: {year}
          <br />
          Day: {day}
          <br />
          Time of detection(hour: minute: second): {hour}: {minute}: {seconds}
          <br />
          Location:
          <br />
          &emsp;Latitude: {latitude}
          <br />
          &emsp;Longitude: {longitude}
          <br />
          Magnitude: {magnitude}
          <br />
          Quake Detected by Stations:{' '}
          {Object.keys(station).length === 0
            ? 'Insuffient Data'
            : station.map((st, index) => {
                return st.value + ' ';
              })}
        </div>
      </div>
    )
  );
}

export default QuakeInfo;
