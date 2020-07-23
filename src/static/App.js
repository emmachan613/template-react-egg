import React from 'react';
import logo from './logo.svg';
import './App.css';
import routes from './routes'
import { HashRouter } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <header className="App-header">
          header
          {routes}
        </header>
      </div>
    </HashRouter>
  );
}

export default App;
