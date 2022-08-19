import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, onLoading}) {
  const imageRef = React.useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: imageRef.current.value
    });
  }

  React.useEffect(() => {
    if(isOpen) {
      imageRef.current.value="";
    }
  }, [isOpen]);

  return(
    <PopupWithForm 
      name={"update"}
      formTitle={"Обновить аватар"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onLoading={onLoading} >
      <section className="popup__section">
        <input
          type="url"
          name="link"
          ref={imageRef}
          className="popup-update__item popup__item popup-update__item"
          placeholder="Ссылка на новый аватар"
          autoComplete="off"
          required />
        <span className="descr-input-error popup__input-error"></span>
      </section>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;