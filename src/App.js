import React, { Component } from 'react';
import Button from './components/Button';
import logo from './logo.svg';
import './styles/App.css';
import rows from './config/rows'

class App extends Component {

  state = {
    inputNum: "",
  }

  handleClick = (element) => {
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
      this.addToDisplay();
    }
  }

  clear = () => {
    this.setState({
      inputNum: "",
    })
  }

  addToDisplay = (e) => {
    e.preventDefault();

    const reg = /[+-/x]/;
    let input = this.state.inputNum;

    if (input.length > 8) {
      return;
    }

    let newInputValue;

    let lastChar = input[input.length - 1]

    if (reg.test(e.target.value) && reg.test(lastChar)) {
      // rewrite string in inputNum so that the last character is event.target.value
      input = input.substr(0, input.length - 1);
    }

    newInputValue = input + e.target.value

    this.setState({
      inputNum: newInputValue.toFixed(8),
    });
  }

  calculate = () => {
    const reg = /[+-/x]/g;
    const signs = this.state.inputNum.match(reg);
    let numbers = this.state.inputNum.split(reg);

    const result = numbers.reduce((acc, num, i) => {
      if (i === 0) {
        acc += parseInt(num);
      }
      else {
        if (signs[0] === "+") {
          acc += parseInt(num);
          signs.shift();
        }
        else if (signs[0] === "-") {
          acc -= parseInt(num);
          signs.shift();
        }
        else if (signs[0] === "x") {
          acc *= parseInt(num);
          signs.shift();
        }
        else if (signs[0] === "/") {
          acc /= parseInt(num);
          signs.shift();
        }
      }
      return acc;
    }, 0)

    this.setState({
      inputNum: result
    })
  }

  render() {
    const newRows = Object.values(rows);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Calculator</h1>
        </header>

        <section>
          <div id="calc">
            <div class="input-div">
              {this.state.inputNum}
            </div>
            <div className="calc-body">
              {newRows.map(row => {
                return <div className="calculator__row">{row.map(element => {
                  return (
                    <Button value={element} onClick={this.handleClick}/>
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

