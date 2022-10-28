import './App.css';
import { Routes, Route } from "react-router-dom";
import MusicLibrary from './components/music-library';
import Employee from './components/employee/employee';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Employee />} />
    </Routes>
  );
}

export default App;
