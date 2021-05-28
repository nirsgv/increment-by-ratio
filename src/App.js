import './App.css';
import { useState } from 'react';

function incrementAtIndex(values, acc, i) {
  const sum = arr => arr.reduce((x, y) => x + y, 0);
  const rel = arr => arr.map(x => x / sum(arr));
  const round = arr => arr.map(Math.round);
  const sub = (a, b) => a.map((x, i) => x - b[i]);
  if (sum(values) >= 100) {
      const v = values[i];
      values[i] = 0;
      let l = rel(values);
      let r = round(l);
      acc = acc.map((x, j) => x + l[j]);
      let b = true;
      for (let j = 0; j < acc.length; j++) {
          const a = acc[j];
          if (a >= 1) {
              acc[j] = a - 1;
              values[j]--;
              b = false;
              break;
          }
      }
      if (b) {
          if (!r.some(x => x > 0)) {
              let max = Math.max(...l);
              let j = l.indexOf(max);
              values[j]--;
          } else {
            values = sub(values, r);
          }
      }
      values[i] = v + 1;

  } else {
      values[i]++;
      debugger;
  }
  return [values, acc];
}





function App() {
  const [skills, setSkills] = useState([0,0,0,0,0,0,0]);
  const [accumulator, setAccumulator] = useState([0,0,0,0,0,0,0]);
  const sum = arr => arr.reduce((x, y) => x + y, 0);

  const changeHandler = (value, index) => {
    if (value > 100) return;  
    let newSkills = [...skills];
    let newAccumulator = [...accumulator];
    let theSum = sum(newSkills);
    if (value < newSkills[index]) {
      newSkills[index] = value;
      setSkills(newSkills);
      setAccumulator(newAccumulator.map(v => 0));
      return;
    }
     
    let incrementBy = theSum - 99;
    if (theSum > 99) {
      for (let i = incrementBy; i > 0; i--) {
        [newSkills, newAccumulator] = incrementAtIndex(newSkills, accumulator, index)
      }
      setSkills(newSkills);
      setAccumulator(newAccumulator);
      incrementBy = 0;
    } else {
      newSkills[index] = value;
      setSkills(newSkills);
      setAccumulator(newAccumulator);
    }
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
        onChange={(e) => changeHandler(Number(e.target.value), index)} />
      ))}
      </header>
      <h2>{`Remaining Points${100 - sum(skills)}`}</h2>
    </div>
  );
}

export default App;
