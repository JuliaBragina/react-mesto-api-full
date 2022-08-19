import React from "react";

function ImagePopup({card, onClose}) {
  return (
    <div className ={`popup-img popup popup_theme_dark ${card && "popup_is_opened"}`}>
      <div className="popup-img__container">
        <button type="button" className="popup-img__close popup__close" onClick={onClose}></button>
        <figure className="popup-img__section">
          <img className="popup-img__img" alt="" src={`${card ? card.link : '#'}`}/>
          <figcaption className ="popup-img__description">{`${card ? card.name : ''}`}</figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup;