import React from 'react';
import headerLogo from '../../source/images/headerLogo.svg';
import './Header.scss'

const Header = (props) => {
  return (
    <header>
      <div className='header_content'>
        <img
          src={headerLogo}
          alt='headerLogo'
        />
        {props.children}
      </div>
    </header>
  )
}

export default Header;