import React from 'react';
import Card from './Card';
import {CurrenUserContext} from '../contexts/CurrentUserContext.js';

function Main({data, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete}) {
  const currenUser = React.useContext(CurrenUserContext);
  return (
    <main className="content">
      <section className="profile">
        <img className="profile__avatar" onClick={onEditAvatar} style={{ backgroundImage: `url(${currenUser.avatar})` }}/>
        <button type="button" aria-label="Редактировать" className="profile__edit-avatar"></button>
        <div className="profile__info">
          <div className="profile__edit-container">
            <h1 className ="profile__name">{currenUser.name}</h1>
            <button type="button" aria-label="Редактировать" className="profile__edit-button" onClick={onEditProfile}></button>
          </div>
          <p className = "profile__description">{currenUser.about}</p>
        </div>
        <button type="button" aria-label="Добавить" className="profile__add-button" onClick={onAddPlace}></button>
      </section>

      <section className="elements">
        <>
          {
              data.map((card) => <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>)          
          }
        </>
      </section>
    </main>
  );
};

export default Main;