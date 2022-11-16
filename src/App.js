import './App.css';
import { Routes, Route } from "react-router-dom";
import MusicLibrary from './components/music-library';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MusicLibrary />} />
    </Routes>
  );
}

export default App;
