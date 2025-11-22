import React from 'react';
import logo from '../../../logo.svg';
import './App.css';
import { JuryList } from '../components/JuryList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Jury App - CV Groenlo</h1>
        <p>
          Hexagonal Architecture Demo
        </p>
      </header>
      <main>
        <JuryList />
      </main>
    </div>
  );
}

export default App;
