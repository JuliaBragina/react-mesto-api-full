import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PopupAuth from './PopupAuth';

const Register = ({onRegisterUser}) => {

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
    onRegisterUser({
      email,
      password,
    });
  }

  return(
    <>
      <PopupAuth
        formTitle={"Зарегистрироваться"}
        buttonText={"Регистрация"}
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
          <p className="authwindow__paragraph">Уже зарегистрирваны?</p>
          <Link to="/sign-in" className="authwindow__link">Войти</Link>
        </div>
      </>
    </>
  )
}

export default Register;