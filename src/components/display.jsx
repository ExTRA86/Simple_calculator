import React from 'react';
import c from '../App.module.css';

function Display({ result, num1, num2, operator }) {
  return (
    <div className={c.containerDisplay}>
      <p className={c.numbers}>
        {num1} {operator} {num2}
      </p>
      <p className={c.result}>{result}</p>
    </div>
  );
}

export default Display;
