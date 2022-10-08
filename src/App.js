import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from './Context';
import './App.css';

function App() {
  const [output, setOutput] = useState('0');
  const [prevValue, setPrevValue] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  useEffect(() => {
    setOutput(currentValue);
  }, [currentValue]);

  useEffect(() => {
    setOutput('0');
  }, []);

  const resetOutput = () => {
    setCurrentValue('');
    setOutput('');
    setPrevValue('');
  };

  const inputNumbers = (e) => {
    if (currentValue.includes('.') && e.target.innerText === '.') return;
    if (total) {
      setPrevValue('');
    }

    // if (currentValue) {
    //   setCurrentValue((prev) => prev + e.target.innerText);
    // } else {
    //   setCurrentValue(e.target.innerText);
    // }
    currentValue
      ? setCurrentValue((prev) => prev + e.target.innerText)
      : setCurrentValue(e.target.innerText);
    setTotal(false);
  };

  const operatorType = (e) => {
    setTotal(false);
    setOperator(e.target.innerText);
    if (currentValue === '') return;
    if (prevValue !== '') {
      equalTo();
    } else {
      setPrevValue(currentValue);
      setCurrentValue('');
    }
  };
  const equalTo = (e) => {
    if (e?.target.innerText === '=') {
      setTotal(true);
    }

    let calculate;

    switch (operator) {
      case '/':
        calculate = String(parseFloat(prevValue) / parseFloat(currentValue));
        break;
      case 'X':
        calculate = String(parseFloat(prevValue) * parseFloat(currentValue));
        break;
      case '-':
        calculate = String(parseFloat(prevValue) - parseFloat(currentValue));
        break;
      case '+':
        calculate = String(parseFloat(prevValue) + parseFloat(currentValue));
        break;
      case '%':
        calculate = String(parseFloat(prevValue) % parseFloat(currentValue));
        break;
      default:
        return;
    }
    setOutput(calculate);
    setPrevValue(calculate);
    setCurrentValue(calculate);
  };

  // const darkTheme = useContext(ThemeContext)
  const [darkTheme, setDarkTheme] = useState(true);

  return (
    <ThemeContext.Provider value={darkTheme}>
      <div className="main">
        <h1>Calculator</h1>
        <button className="button">Dark Mode</button>
        <div className="container">
          <div className="calculator">
            <div className="output">{output}</div>
            <div onClick={resetOutput} className="btn gray" content="AC">
              AC
            </div>
            <div onClick={operatorType} className="btn gray">
              +/-
            </div>
            <div onClick={operatorType} className="btn gray">
              %
            </div>
            <div onClick={operatorType} className="btn orange">
              /
            </div>
            <div onClick={inputNumbers} className="btn seven">
              7
            </div>
            <div onClick={inputNumbers} className="btn eight">
              8
            </div>
            <div onClick={inputNumbers} className="btn nine">
              9
            </div>
            <div onClick={operatorType} className="btn orange">
              X
            </div>
            <div onClick={inputNumbers} className="btn four">
              4
            </div>
            <div onClick={inputNumbers} className="btn five">
              5
            </div>
            <div onClick={inputNumbers} className="btn six">
              6
            </div>
            <div onClick={operatorType} className="btn orange">
              -
            </div>
            <div onClick={inputNumbers} className="btn one">
              1
            </div>
            <div onClick={inputNumbers} className="btn two">
              2
            </div>
            <div onClick={inputNumbers} className="btn three">
              3
            </div>
            <div onClick={operatorType} className="btn orange">
              +
            </div>
            <div onClick={inputNumbers} className="btn zero">
              0
            </div>
            <div onClick={inputNumbers} className="btn decimal">
              .
            </div>
            <div onClick={equalTo} className="btn orange">
              =
            </div>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
