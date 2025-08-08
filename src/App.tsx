import React from 'react';
import './App.css';
import TagCategoryManager from './components/TagCategory/TagCategoryManager';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tag Category Management System</h1>
      </header>
      <main>
        <TagCategoryManager />
      </main>
    </div>
  );
}

export default App;
