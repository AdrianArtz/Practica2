import React from 'react';
import './App.css';
import { Route, Routes} from 'react-router-dom';
import { PresentarLibros} from './fragment/PresentarLibros';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/Libritos' element={<PresentarLibros/>}/>
      </Routes>
      </div>
  );
}

export default App;