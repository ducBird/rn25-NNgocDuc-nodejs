import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function NavBar() {
  return (
    <nav className="rounded bg-primary">
      <ul className="flex justify-between w-[70%] mx-auto font-bold">
        <li className="li-nav">
          <Link to={'/categories'}>Categories</Link>
        </li>
        <li className="li-nav">
          <Link to={'/employees'}>Employees</Link>
        </li>
        <li className="li-nav">
          <Link to={'/suppliers'}>Suppliers</Link>
        </li>
        <li className="li-nav">
          <Link to={'/products'}>Products</Link>
        </li>
        <li className="li-nav">
          <Link to={'/customers'}>Customers</Link>
        </li>
        <li className="li-nav">
          <Link to={'/orders'}>Orders</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
