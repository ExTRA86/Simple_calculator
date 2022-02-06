import React, { useContext, useState } from 'react';
import c from '../App.module.css';
import Display from './display';
import CalcButtons from './calcButtons';
import ThemeSwitch from './ThemeSwitch';
import { ThemeContext } from '../App';

const Calculator = () => {
  const { theme } = useContext(ThemeContext);

  const [numDisplay1, setNumDisplay1] = useState('');
  const [numDisplay2, setNumDisplay2] = useState('');
  const [operatorPressed, setOperatorPressed] = useState('');
  const [result, setResult] = useState('');

  const [operator1, setOperator1] = useState(false);
  const [operator2, setOperator2] = useState(true);
  const [firstClick, setFirstClick] = useState(false);
  const [calculation, setCalculation] = useState(false);

  const [calc, setCalc] = useState({
    firstNum: '',
    operator: '',
    secondNum: '',
    resultNum: '',
  });

  const receivedValues = num => {
    if (operator1 === false) {
      if (calculation) {
        clearValues(num, true);
        setCalculation(false);
      }
      if (num === '.') {
        calc.firstNum += num;
        setNumDisplay1(numDisplay1 + num);
        calc.resultNum = '';
      } else if (num === 'backspace') {
        setCalc({
          firstNum: calc.firstNum.slice(0, -1),
          operator: '',
          secondNum: '',
        });
        setNumDisplay1(numDisplay1);
      } else {
        calc.firstNum += +num;
        setNumDisplay1(numDisplay1 + +num);
        calc.resultNum = '';
      }
    } else {
      if (num === '.') {
        calc.secondNum += num;
        setNumDisplay2(numDisplay2 + num);
      } else if (num === 'backspace') {
        setCalc({
          firstNum: calc.firstNum,
          operator: calc.operator,
          secondNum: calc.secondNum.slice(0, -1),
        });
      } else {
        calc.secondNum += num;
        setNumDisplay2(numDisplay2 + num);
      }
    }
  };

  const getOperator = num => {
    calc['operator'] = num;
    setOperatorPressed(num);
    setOperator1(true);
    setOperator2(false);

    if (firstClick) {
      setCalc({
        firstNum: calc.resultNum,
        operator: calc.operator,
        secondNum: '',
      });
      setNumDisplay1(calc.resultNum);
      setNumDisplay2('');
    }

    setFirstClick(true);
  };

  const calcOperator = num => {
    const actions = {
      '+': (num1, num2) => parseFloat(num1) + parseFloat(num2),
      '-': (num1, num2) => parseFloat(num1) - parseFloat(num2),
      '/': (num1, num2) => parseFloat(num1) / parseFloat(num2),
      '%': (num1, num2) => parseFloat(num1) % parseFloat(num2),
      '*': (num1, num2) => parseFloat(num1) * parseFloat(num2),
    };

    let result = actions[calc['operator']](calc.firstNum, calc.secondNum);
    calc.resultNum = result;
    setResult(result);

    setOperator2(true);
    setOperator1(false);
    setCalculation(true);
  };

  const clearValues = (num, calcDnv) => {
    if (calcDnv) {
      setCalc({
        firstNum: num,
        operator: calc.operator,
        secondNum: '',
      });

      setFirstClick(false);
      setResult('');
      setNumDisplay1('');
      setNumDisplay2('');
      setOperatorPressed('');
    } else {
      setCalc({
        firstNum: '',
        operator: calc.operator,
        secondNum: '',
      });

      setFirstClick(false);
      setResult('');
      setNumDisplay1('');
      setNumDisplay2('');
      setOperatorPressed('');
    }
  };

  const showError = () => {
    setResult('Error');

    setOperator1(false);
    setOperator2(true);
    setFirstClick(false);
    setCalculation(false);
  };

  const calculate = num => {
    console.log(num);
    if (!isNaN(num) || num === '.' || num === 'backspace') {
      receivedValues(num);
    } else if (
      (num === '+' ||
        num === '-' ||
        num === '/' ||
        num === '*' ||
        num === '%') &&
      operator2
    ) {
      getOperator(num);
    } else if (num === 'C') {
      clearValues();
    } else if (num === '=') {
      if (calc.secondNum !== '') {
        calcOperator(num);
      } else {
        showError();
      }
    }
  };

  return (
    <section className={theme(c.calculator)}>
      <ThemeSwitch />
      <Display
        result={result}
        num1={calc.firstNum}
        num2={calc.secondNum}
        operator={operatorPressed}
      />
      <CalcButtons calculate={calculate} theme={theme()} />
    </section>
  );
};

export default Calculator;
