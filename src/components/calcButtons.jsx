import React, { useContext, useEffect } from 'react';
import c from '../App.module.css';
import { ThemeContext } from '../App';

const CalcButtons = ({ calculate }) => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const onKeypress = e => calcKey(e);
    const calcKey = e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        calculate('=');
      } else if (e.key === 'Delete' || e.key === 'Escape') {
        e.preventDefault();
        calculate('C');
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        calculate('backspace');
      } else {
        calculate(e.key);
      }
    };

    document.addEventListener('keydown', onKeypress);

    return () => {
      document.removeEventListener('keydown', onKeypress);
    };
  }, [calculate]);

  return (
    <div className={theme(c.calc)}>
      <button value={'backspace'} onClick={e => calculate(e.target.value)}>
        X
      </button>
      <button value={'C'} onClick={e => calculate(e.target.value)}>
        C
      </button>
      <button value={'%'} onClick={e => calculate(e.target.value)}>
        %
      </button>
      <button
        value={'/'}
        onClick={e => calculate(e.target.value)}
        className={theme(c.operator)}
      >
        /
      </button>
      <button value={'1'} onClick={e => calculate(e.target.value)}>
        1
      </button>
      <button value={'2'} onClick={e => calculate(e.target.value)}>
        2
      </button>
      <button value={'3'} onClick={e => calculate(e.target.value)}>
        3
      </button>
      <button
        value={'*'}
        onClick={e => calculate(e.target.value)}
        className={c.operator}
      >
        *
      </button>
      <button value={'4'} onClick={e => calculate(e.target.value)}>
        4
      </button>
      <button value={'5'} onClick={e => calculate(e.target.value)}>
        5
      </button>
      <button value={'6'} onClick={e => calculate(e.target.value)}>
        6
      </button>
      <button
        value={'-'}
        onClick={e => calculate(e.target.value)}
        className={c.operator}
      >
        -
      </button>
      <button value={'7'} onClick={e => calculate(e.target.value)}>
        7
      </button>
      <button value={'8'} onClick={e => calculate(e.target.value)}>
        8
      </button>
      <button value={'9'} onClick={e => calculate(e.target.value)}>
        9
      </button>
      <button
        value={'+'}
        onClick={e => calculate(e.target.value)}
        className={c.operator}
      >
        +
      </button>
      <button value={'.'} onClick={e => calculate(e.target.value)}>
        .
      </button>
      <button value={'0'} onClick={e => calculate(e.target.value)}>
        0
      </button>
      <button
        value={'='}
        onClick={e => calculate(e.target.value)}
        className={c.operator}
      >
        =
      </button>
    </div>
  );
};

export default CalcButtons;
