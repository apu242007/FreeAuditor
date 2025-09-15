import React from 'react';
import { FormBuilder } from './components/form-builder/FormBuilder';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>FreeAuditor</h1>
        <p>Constructor de formularios reutilizables</p>
      </header>
      <main>
        <FormBuilder />
      </main>
    </div>
  );
}

export default App;