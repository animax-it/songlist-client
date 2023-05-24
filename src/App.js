import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom'; 
import React from 'react'
import GenreList from './components/Genrelist';
import SongList from './components/Songlist';
import SongDetails from './components/Songdetails';
import Home from './Home'
import SongForm from './components/Songform';

const App = () => {
  return (
    <div>
        <Router>
            <Routes>
            <Route exact path='/' element={< Home />}></Route>  
            <Route path='/Songform' element={< SongForm />}></Route>  


            </Routes>
        </Router>
    </div>
  )
}

export default App