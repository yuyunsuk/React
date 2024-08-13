import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MainMenu1 from './MainMenu1';
import MainMenu2 from './MainMenu2';
import SubMenu1 from './SubMenu1';
import SubMenu2 from './SubMenu2';
import SubMenu3 from './SubMenu3';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/menu1">Menu 1</Link>
          <Link to="/menu2">Menu 2</Link>
        </nav>
        <Routes>
          <Route path="/menu1/*" element={<MainMenu1 />} />
          <Route path="/menu2/*" element={<MainMenu2 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;