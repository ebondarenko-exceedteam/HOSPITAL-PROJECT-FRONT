import React from 'react';
import headerLogo from '../../source/images/headerLogo.svg';
import './Header.scss'

const Header = ({headerTitle, textButton}) => {
  return (
    <header>
      <div className='header_content'>
        <img
          src={headerLogo}
          alt='headerLogo'
        />
        <p>{headerTitle}</p>
        {textButton && <button>textButton</button>}
      </div>
    </header>
  )
}

export default Header;