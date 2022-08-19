import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrenUserContext} from '../contexts/CurrentUserContext.js';

function EditProfilePopup({isOpen, onClose, onUpdateUser, onLoading}) {
  //console.log(onLoading);
  // Подписка на контекст
  const currentUser = React.useContext(CurrenUserContext);
  // Стейт, в котором содержится значение инпута
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  // Обработчик изменения инпута обновляет стейт
  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm 
      name={"edit"}
      formTitle={"Редактировать профиль"}
      isOpen={isOpen} onClose={onClose}
      onSubmit={handleSubmit}
      onLoading={onLoading} >
      <section className="popup__section">
        <input 
          id="name-input"
          type="text"
          name="name"
          value={name || ""}
          onChange={handleChangeName}
          className="popup-edit__item popup__item popup-edit__item_el_name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          autoComplete="off"
          required />
        <span className="name-input-error popup__input-error"></span>
      </section>
      <section className="popup__section">
        <input
          id="descr-input"
          type="text"
          name="description"
          value={description  || ""}
          onChange={handleChangeDescription}
          className="popup-edit__item popup__item popup-edit__item_el_description"
          placeholder="Краткое описание"
          minLength="2"
          maxLength="200"
          autoComplete="off"
          required />
        <span className="descr-input-error popup__input-error"></span>
      </section>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
