import './App.css';
import { Routes, Route } from "react-router-dom";
import MusicLibrary from './components/music-library';

function App() {
  return (
    <div>
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<MusicLibrary/>} />
          </Routes>
        </div>
      </div>
  );
}

export default App;
