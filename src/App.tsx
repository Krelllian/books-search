import React, { useEffect } from 'react';
import './App.scss';
import Books from './components/Books';
import BooksAppHeader from './components/BooksAppHeader';


function App() {

  return (
    <div className="books-app layout">
      <BooksAppHeader />
      <main>
        <Books />
      </main>
    </div>
  );

}

export default App;
