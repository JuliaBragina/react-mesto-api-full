import React from 'react';

function PopupAuth({children, formTitle, buttonText, onSubmit}) {
  return(
    <div className="authwindow">
      <div className="authwindow__container">
        <h2 className="authwindow__title">{formTitle}</h2>
        <form name="register" className="authwindow__form" noValidate>
          <fieldset className="popup__form-container">
            {children}
            <button 
              type="submit"
              className="authwindow__button"
              onClick={onSubmit}>{buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default PopupAuth;