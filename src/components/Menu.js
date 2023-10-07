import React from 'react';

import '../styles/Menu.scss';
import Timeline from './Timeline';

function Menu(props) {
  const {
    axes,
    setAxes,
    directionalLightIntensity,
    setDirectionalLightIntensity,
    ambientLightIntensity,
    setAmbientLightIntensity,
    wireframe,
    setWireframe,
    heightMap,
    setHeightMap,
    apolloLanders,
    setApolloLanders,
    quake,
    setQuake,
    places,
    setPlaces,
    setCamera,
  } = props;

  return (
    <div className='menu'>
      <table className='table table__1'>
        <tbody>
          <tr>
            <td className='td__info'>
              World Axes
              <br />
              &emsp;x-axis : <span className='orange'>orange</span>
              <br />
              &emsp;y-axis : <span className='green'>green</span>
              <br />
              &emsp;z-axis : <span className='blue'>blue</span>
            </td>
            <td>
              <button
                className='btn'
                onClick={() => {
                  setAxes(axes === 0 ? 10 : 0);
                }}
              >
                {axes === 0 ? 'Off' : 'On'}
              </button>
            </td>
          </tr>
          <tr>
            <td className='td__info'>Latitude & Longitude</td>
            <td>
              <button
                className='btn'
                onClick={() => {
                  setWireframe(!wireframe);
                }}
              >
                {wireframe === true ? 'On' : 'Off'}
              </button>
            </td>
          </tr>
          <tr>
            <td className='td__info'>Height Map</td>
            <td>
              <button
                className='btn'
                onClick={() => {
                  setHeightMap(!heightMap);
                }}
              >
                {heightMap === true ? 'On' : 'Off'}
              </button>
            </td>
          </tr>
          <tr>
            <td className='td__info'>Apollo Landers</td>
            <td>
              <button
                className='btn'
                onClick={() => {
                  setApolloLanders(!apolloLanders);
                }}
              >
                {apolloLanders === true ? 'On' : 'Off'}
              </button>
            </td>
          </tr>
          <tr>
            <td className='td__info'>Seas & Oceans</td>
            <td>
              <button
                className='btn'
                onClick={() => {
                  setPlaces(!places);
                }}
              >
                {places === true ? 'On' : 'Off'}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <table className='table table__2'>
        <tbody>
          <tr>
            <td className='td__info'>
              <div className='data'>
                Directional Light Intensity
                <span>{directionalLightIntensity}</span>
              </div>
              <input
                type='range'
                min={0}
                max={100}
                value={directionalLightIntensity}
                onChange={(e) => {
                  setDirectionalLightIntensity(e.target.value);
                }}
              />
            </td>
            <td>
              <button
                className='btn'
                onClick={() => {
                  setDirectionalLightIntensity(50);
                }}
              >
                Reset
              </button>
            </td>
          </tr>
          <tr>
            <td className='td__info'>
              <div className='data'>
                Ambient Light Intensity &emsp;
                <span>{ambientLightIntensity}</span>
              </div>
              <input
                type='range'
                min={1}
                max={5}
                value={ambientLightIntensity}
                onChange={(e) => {
                  setAmbientLightIntensity(e.target.value);
                }}
              />
            </td>
            <td>
              <button
                className='btn'
                onClick={() => {
                  setAmbientLightIntensity(3);
                }}
              >
                Reset
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Timeline quake={quake} setQuake={setQuake} setCamera={setCamera} />
    </div>
  );
}

export default Menu;
