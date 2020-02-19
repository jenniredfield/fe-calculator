import React, { Component } from 'react';
import Button from './components/Button';
import logo from './logo.svg';
import './styles/App.css';
import {calculateHelper} from './helpers/CalculatorHelpers';
import rows from './config/rows'

class App extends Component {

  state = {
    inputNum: '',
    rows: Object.values(rows)
  }

  handleClick = (e, element) => {
    if (!element) {
      return;
    }

    switch(element) {
      case 'C': 
      this.clear();
      break;
      case '=':
      this.calculate();
      break;
      default: 
      this.addToDisplay(e);
    }
  }

  clear = () => {
    this.setState({
      inputNum: '',
    })
  }

  addToDisplay = (e) => {
    e.preventDefault();

    const input = this.state.inputNum;
    const newInputValue = input + e.target.value

    if (newInputValue.length > 15) {
      return;
    }

    this.setState({
      inputNum: newInputValue
    });
  }

  calculate = () => {
    const {inputNum} = this.state;
    const result = calculateHelper(inputNum);

    this.setState({
      inputNum: String(result).substring(0, 15)
    })
  }

  render() {
   const {rows, inputNum} = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Calculator</h1>
        </header>

        <section>
          <div className="calculator">
            <div className="calculator__display">
              {inputNum}
            </div>
            <div className="calculator__rows">
              {rows.map((row, j) => {
                return <div className="calculator__row" key={`row_${j}`}>
                  {row.map((element, i) => {
                  return (
                    <Button value={element} onClick={this.handleClick} key={`${element}_${i}`}/>
                  )
                })}</div>
              })}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;

