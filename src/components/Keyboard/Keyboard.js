import React from 'react';

function Keyboard({ keys }) {
  return (
    <div className="keyboard">
      <div className="row">
        <button className={`key ${keys['Q'].status}`}>Q</button>
        <button className={`key ${keys['W'].status}`}>W</button>
        <button className={`key ${keys['E'].status}`}>E</button>
        <button className={`key ${keys['R'].status}`}>R</button>
        <button className={`key ${keys['T'].status}`}>T</button>
        <button className={`key ${keys['Y'].status}`}>Y</button>
        <button className={`key ${keys['U'].status}`}>U</button>
        <button className={`key ${keys['I'].status}`}>I</button>
        <button className={`key ${keys['O'].status}`}>O</button>
        <button className={`key ${keys['P'].status}`}>P</button>
      </div>
      <div className="row">
        <button className={`key ${keys['A'].status}`}>A</button>
        <button className={`key ${keys['S'].status}`}>S</button>
        <button className={`key ${keys['D'].status}`}>D</button>
        <button className={`key ${keys['F'].status}`}>F</button>
        <button className={`key ${keys['G'].status}`}>G</button>
        <button className={`key ${keys['H'].status}`}>H</button>
        <button className={`key ${keys['J'].status}`}>J</button>
        <button className={`key ${keys['K'].status}`}>K</button>
        <button className={`key ${keys['L'].status}`}>L</button>
      </div>
      <div className="row">
        <button className={`key ${keys['Z'].status}`}>Z</button>
        <button className={`key ${keys['X'].status}`}>X</button>
        <button className={`key ${keys['C'].status}`}>C</button>
        <button className={`key ${keys['V'].status}`}>V</button>
        <button className={`key ${keys['B'].status}`}>B</button>
        <button className={`key ${keys['N'].status}`}>N</button>
        <button className={`key ${keys['M'].status}`}>M</button>
      </div>
    </div>
  );
}

export default Keyboard;
