import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Item from './components/Item';
import Footer from './components/Footer';
import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

class App extends Component {
  constructor() {
    super()

    this.handleShuffleHelmets = this.handleShuffleHelmets.bind(this)
  }

  state = {
    score: 0,
    topScore: 0,
    maxScore: 12,
    message: 'Click an image to begin!',
    messageClass: '',
    helmets: helmets
  };

  shuffle = (array) => {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // If still remaining option to shuffle
    while (0 !== currentIndex) {
      // Pick a remaining option
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // Swap with current option
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  handleCorrectSelection = () => {
    // Correct selection, score +1
    if (this.state.score+1 > this.state.topScore) {
      this.setState({topScore: this.state.topScore+1});
    }
    if (this.state.score+1 === this.state.maxScore) {
      this.setState({score: this.state.score+1, message: 'Congratulation! You Win!', messageClass: 'correct'});
    } else {
      this.setState({score: this.state.score+1, message: 'You guessed correctly!', messageClass: 'correct'});
    }
  }

  handleResetWin = (currentHelmets) => {
    // If current score is at max, reset score to 0 and top score to 0
    if (this.state.score+1 === this.state.maxScore) {
      this.setState({score: 0, topScore: 0});
      // Reset clicked state for helmets
      const updatedHelmets = currentHelmets.map(helmet => (true) ? { ...helmet, isClicked: false } : helmet);

      return updatedHelmets;
    } else {
      return currentHelmets;
    }
  }

  handleIncorrectSelection = () => {
    // Incorrect selection, reset score to 0
    this.setState({score: 0, message: 'You guessed incorrectly!'});
    // Reset clicked state for helmets
    const updatedHelmets = this.state.helmets.map(helmet => helmet.isClicked === true ? { ...helmet, isClicked: false } : helmet);

    return updatedHelmets;
  }

  handleShuffleHelmets = (name) => {
    var resetNeeded = false;
    const helmets = this.state.helmets.map(helmet => {
      if (helmet.name === name) {
        if (helmet.isClicked === false) {
          this.handleCorrectSelection();
          return { ...helmet, isClicked: true };
        } else {
          resetNeeded = true;
          return { ...helmet, isClicked: false };
        }
      }

      return helmet;
    });

    if (resetNeeded) {
      this.setState({
        helmets: this.shuffle(this.handleIncorrectSelection()),
        messageClass: 'incorrect'
      })
    } else {
      // Check if game is won before rendering helmets
      this.setState({ helmets: this.shuffle(this.handleResetWin(helmets)) });
    }
  }

  handleRenderHelmets = () => {
    return this.state.helmets.map((helmet) =>
      <Item
        image={helmet.image}
        name={helmet.name}
        key={helmet.id}
        onClick={this.handleShuffleHelmets}
      />
    );
  }

  render() {
    return (
      <div className='App'>
        <Navbar
          score={this.state.score}
          topScore={this.state.topScore}
          message={this.state.message}
          messageClass={this.state.messageClass}
        />
        <Header />
        <div className='content'>
          {this.handleRenderHelmets()}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
