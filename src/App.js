import React, {useState, useEffect} from 'react';
import Home from './page/Home';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';



function App() {
 
  return (
    <Router>
      <div>
        <section>                              
            <Routes>                                                                        
               <Route path="/" element={<Home/>}/>
            </Routes>                    
        </section>
      </div>
    </Router>
  );
}
 
export default App;