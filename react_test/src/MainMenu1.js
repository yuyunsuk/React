import React from 'react';
import { Route, Routes, Link, Outlet } from 'react-router-dom';
import SubMenu1 from './SubMenu1';
import SubMenu2 from './SubMenu2';
import SubMenu3 from './SubMenu3';

export function MainMenu1() {
  return (
    <div>
      <h1>Main Menu 1</h1>
      <nav>
        <Link to="submenu1">SubMenu 1</Link>
        <Link to="submenu2">SubMenu 2</Link>
        <Link to="submenu3">SubMenu 3</Link>
      </nav>
      <Routes>
        <Route path="submenu1" element={<SubMenu1 />} />
        <Route path="submenu2" element={<SubMenu2 />} />
        <Route path="submenu3" element={<SubMenu3 />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default MainMenu1;