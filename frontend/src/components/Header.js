import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import burgerCloseButton from '../images/burgerClose.svg';
import burgerMenuButton from '../images/burgerMenu.svg';

function Header({pathNav, buttonTitle, emailText, isMenuOpen, onOpenMenu, onSignOut}) {
  return( 
      <header className={`header ${isMenuOpen && "header_is_lower"}`}>
        <section className="header__nav">
          <img src={logo} className="header__logo" alt="Логотип сервиса Mesto"/>
          <nav className="header__menu">
            {!emailText
              ?  <Link to={pathNav} className="header__link header__link_is_auth">{buttonTitle}</Link>
              : <>
                  <button className="header__burger-button" 
                  style={isMenuOpen ? {backgroundImage: `url(${burgerCloseButton})`}
                                    : {backgroundImage: `url(${burgerMenuButton})`}} onClick={onOpenMenu}></button>
                  <div className={`header__section ${isMenuOpen && "header__section_is_active"}`}>
                    <p className='header__email'>{emailText}</p>
                    <Link to={pathNav} className="header__link" onClick={onSignOut}>{buttonTitle}</Link>
                  </div>
                </>
            }
          </nav>
        </section>
      </header>
  )
}

export default Header;