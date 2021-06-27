import React from 'react';
import './App.css';
import { Sheet } from './component';

function App() {
  return (
    <div className="App">
      <Sheet options={{ data: null }} className="sheet-fullpage" />
    </div>
  );
}

export default App;
