import React from "react";

function PopupWithForm({name, formTitle, buttonText='Сохранить', children, isOpen, onClose, onSubmit, onLoading}) {
  return (
    <div className={`popup-${name} popup ${isOpen && "popup_is_opened"}`}>
      <div className={`popup-${name}__container popup__container`}>
        <button type="button" className={`popup-${name}__close popup__close`} onClick={onClose}></button>
        <form name={`${name}-form`} className={`popup-${name}__form popup__form`} noValidate>
          <h2 className={`popup-${name}__form-heading popup__heading`}>{formTitle}</h2>
          <fieldset className={`popup-${name}__form-container popup__form-container`}>
            {children}
            <button 
              type="submit"
              className={`popup-${name}__button popup__button`}
              onClick={onSubmit} disabled={onLoading}>
                {onLoading ? 'Сохранение...' : buttonText}
              </button>
          </fieldset>
        </form>
      </div>
    </div>       
  );
};

export default PopupWithForm;