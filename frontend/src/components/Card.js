import React from 'react';
import { CurrenUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currenUser = React.useContext(CurrenUserContext);
  const isOwn = card.owner === currenUser._id;
  const isLiked = card.likes.some(i => i === currenUser._id);

  return (
    <div className="elements__item">
      <img className="elements__img" style={{ backgroundImage: `url(${card.link})`}} onClick={_ => onCardClick(card)}/>  
      <>
        {
          isOwn && <button type="button" className='elements__delete-button' onClick={_ => onCardDelete(card._id)}></button>
        }
      </>
      <div className="elements__flex-container">
      <h2 className="elements__title">{card.name}</h2>
        <section className = "elements__section">
          <button type="button" aria-label = "Нравится" className={`elements__like-button ${isLiked && 'elements__like-button_is-liked'}`} onClick={_ => onCardLike(card, currenUser)}></button>
          <p className="elements__likes-quantity" >{card.likes.length}</p>
        </section>
      </div>
    </div>
  );
};

export default Card;