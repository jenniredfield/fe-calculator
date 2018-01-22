import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import rows from './components/buttons'

class App extends Component {

  state =  {
      inputNum : "",
  }

  clear = () => {

    this.setState({
      inputNum: "",
    })


  }

  addToDisplay = (event) => {
    event.preventDefault();

    
    const reg = /[+-/x]/;
    let input = this.state.inputNum;

    if(input.length > 8) {
      return;
    }

    let newInputValue;

    let lastChar = input[input.length-1]

    if(reg.test(event.target.value) && reg.test(lastChar)  ){
      // rewrite string in inputNum so that the last character is event.target.value
      input = input.substr(0, input.length-1);
    }

    newInputValue = input + event.target.value
 
    this.setState({
      inputNum : newInputValue,
    });
  
  }
  

  calculate = () => {

    
    const reg = /[+-/x]/g;
    const signs = this.state.inputNum.match(reg);
    let numbers = this.state.inputNum.split(reg);



    const result = numbers.reduce((acc, num, i) => {
      if(i === 0) {
        acc += parseInt(num);
      }
      else {
        if(signs[0] === "+"){
          acc += parseInt(num);
          signs.shift();
        }
        else if(signs[0] === "-"){
          acc -= parseInt(num);
          signs.shift();
        }
        else if(signs[0] === "x"){
          acc *= parseInt(num);
          signs.shift();
        }
        else if(signs[0] === "/"){
          acc /= parseInt(num);
          signs.shift();
        }
      }
    
      return acc;
    },0)

    this.setState({
      inputNum : result
    })

  }

  
  render() {
    
    let newRows = Object.values(rows) 

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
                   return <span>{row.map(element => {
                            if(element === "C") { return <button className={element} value={element} onClick={this.clear}>{element}</button>; }
                            if(element === "=") { return <button className={element} value={element} onClick={this.calculate}>{element}</button>; }
                            return <button className={element} value={element} onClick={this.addToDisplay}>{element}</button>;
                   })}</span>

                 })}
             </div>
         </div>

      </section>
      </div>
    );
  }
}




export default App;
