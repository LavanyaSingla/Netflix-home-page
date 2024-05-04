import React from 'react'
import logo from './../../logo.png'
import { LuSearch } from "react-icons/lu";
import {Link} from 'react-router-dom';
const Header = () => {
  return (
    <nav className="header">
        <img src={logo} alt="netflix-logo" />
        <div>
            <Link to ="/">TV Shows</Link>
            <Link to ="/">Movies</Link>
            <Link to ="/">Recently Added</Link>
            <Link to ="/">My List</Link>
        </div>
        <LuSearch />
    </nav>
  )
}

export default Header