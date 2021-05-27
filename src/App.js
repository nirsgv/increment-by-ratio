import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
function App() {
  const [skills, setSkills] = useState([0,0,0,0]);

  const changeHandler = (value, index) => {
    const copy = [...skills];
    copy[index] = value;
    setSkills(copy);
  }


  return (
    <div className="App">
      <header className="App-header">
      {skills.map((skill, index) => (
      <input type="range" 
        key={index}
        value={skill} 
        min="0" 
        max="100" 
        step="1" 
        onChange={(e) => changeHandler(e.target.value, index)} />
      ))}


      </header>
    </div>
  );
}

export default App;
