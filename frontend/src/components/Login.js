import React, { useState } from 'react';
import PopupAuth from './PopupAuth';
import { Link } from 'react-router-dom';

const Login = ({onLoggedUser}) => {
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePass(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLoggedUser({
      email,
      password,
    });
  }

  return(
    <>
      <PopupAuth
        formTitle={"Вход"}
        buttonText={"Войти"}
        onSubmit={handleSubmit} >
        <section className='authwindow__section'>
          <input
            type="email"
            name="email"
            className="authwindow__item"
            placeholder="Email"
            autoComplete="off"
            value={email || ""}
            onChange={handleChangeEmail}
            required />
        </section>
        <section className='authwindow__section'>
          <input
            type="password"
            name="password"
            className="authwindow__item"
            placeholder="Пароль"
            autoComplete="off"
            value={password || ""}
            onChange={handleChangePass}
            required />
        </section>
      </PopupAuth>
      <>
        <div className="authwindow__enter">
          <p className="authwindow__paragraph">Еще не зарегистрирваны?</p>
          <Link to="/sign-up" className="authwindow__link">Зарегистрироваться</Link>
        </div>
      </>
    </>
    
  )
}

export default Login;