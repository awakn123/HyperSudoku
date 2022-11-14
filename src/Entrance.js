import logo from './logo.svg';
import './App.css';

function Entrance() {
  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <p>
            Solve the Hyper Sudoku!
          </p>
          <a
              className="App-link"
              href="/solution"
              rel="noopener noreferrer"
          >
            Enter
          </a>
        </header>
      </div>
  );
}

export default Entrance;
