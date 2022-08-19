import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddCard, onLoading}) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddCard({
      name,
      link: description,
    });
  }

  React.useEffect(() => {
    if(isOpen) {
      setName("");
      setDescription("");
    }
  }, [isOpen]);

  return(
    <PopupWithForm
      name={"add"}
      formTitle={"Новое место"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onLoading={onLoading} >
      <section className="popup__section">
        <input
          type="text"
          name="name"
          value={name || ""}
          onChange={handleChangeName}
          className="popup-add__item popup__item popup-add__item_el_name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          autoComplete="off"
          required />
        <span className="name-input-error popup__input-error"></span>
      </section>
      <section className="popup__section">
        <input
          type="url"
          name="link"
          value={description || ""}
          onChange={handleChangeDescription}
          className="popup-add__item popup__item popup-add__item_el_description"
          placeholder="Ссылка на картинку"
          autoComplete="off"
          required />
        <span className="descr-input-error popup__input-error"></span>
      </section>
    </PopupWithForm>
  )
}

export default AddPlacePopup;