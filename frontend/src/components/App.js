import React, { useState, useEffect } from 'react';
import { Redirect, Switch, Route, useHistory } from "react-router-dom";
import { CurrenUserContext } from '../contexts/CurrentUserContext';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api.js';
import * as auth from '../utils/Auth.js'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectCard, setSelectCard] = useState(null);
  const [currenUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const [isRegPopupOpen, setIsRegPopupOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    console.log('useEffect1.1 - ', loggedIn);
    if(loggedIn){
      api.getUser()
      .then(res => {
        setCurrentUser(res);
        setUserEmail(res.email);
        api.getAllCards()
        .then(allCards => setCards(allCards))
        .catch(err => alert(err));
      })
      .catch(err => {
        alert(err);
        setLoggedIn(false);
        console.log('useEffect1.2 - ', loggedIn);
      });
    }
  }, [loggedIn]);

  useEffect(() => {
    console.log('useEffect2.1 - ', loggedIn);
    if(loggedIn) {
    } else {
      history.push('/sign-in');
      setCurrentUser({});
      localStorage.clear();
      console.log('useEffect2.2 - ', loggedIn);
    }
  }, [loggedIn]);


  const onCardClick = (cards) => setSelectCard(cards);

  const onLoggedIn = () => {
    //setLoggedIn(false);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  const handleOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleCloseButton() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsRegPopupOpen(false);
    setSelectCard(null);
  }

  function handleCloseWindow() {
    auth.signout()
      .then(() => {
        history.push('/sign-in');
        setLoggedIn(false); 
        console.log('handleCloseWindow + ', loggedIn);
      })
      .catch(err => {
        console.log('handleCloseWindow - ', loggedIn);
      });
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.setUserInfo(data)
    .then((newUser) => {
      setCurrentUser(newUser);
      handleCloseButton();
    })
    .catch(err => alert(err))
    .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api.setUserAvatar(data)
    .then((newAvatar) => {
      setCurrentUser(newAvatar);
      handleCloseButton();
    })
    .catch(err => alert(err))
    .finally(() => setIsLoading(false));
  }

  function handleAddPlace(data) {
    setIsLoading(true);
    api.addCards(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      handleCloseButton();
    })
    .catch(err => alert(err))
    .finally(() => setIsLoading(false));
  }

  function handleCardLike(data, currenUser) {
    const isLiked = data.likes.some(i => i === currenUser._id);
    api.changeLikeCardStatus(data._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === data._id ? newCard : c));
    })
    .catch(err => alert(err));
  } 

  function handleCardDelete(idCard) {
    api.deletCard(idCard)
    .then(() => {
      setCards(cards => cards.filter(c => c._id != idCard));
    })
    .catch(err => alert(err));
  }

  function handleRegisterUser(data){
    auth.register(data.email, data.password)
    .then((res) => {
      setIsRegPopupOpen(true);
      setIsRegister(true);
    })
    .catch(() => {
      setIsRegister(false);
      setIsRegPopupOpen(true);
    });
  }

  function handleLoggedUser(data) {
    setUserEmail(data.email);
    auth.login(data.email, data.password)
    .then((res) => {
      if (res) {
        setLoggedIn(true);
        history.push("/mesto-react-auth");
        console.log('handleLoggedUser + ', loggedIn)
      }
    })
    .catch(() => {
      setIsRegister(false);
      setIsRegPopupOpen(true);
      setLoggedIn(false);
      console.log('handleLoggedUser - ', loggedIn);
    });
  }

  return (
    <CurrenUserContext.Provider value={currenUser}>
      <div className="App">
        <div className="page">
          <Switch>
            <ProtectedRoute exact
              loggedIn={loggedIn}
              path="/mesto-react-auth"
              onLoggedout={onLoggedIn}
              componentHeader={Header}
              isMenuOpen={isMenuOpen}
              onOpenMenu={handleOpenMenu}
              buttonTitle={"Выход"}
              emailText={userEmail}
              onSignOut={handleCloseWindow}
              pathNav={"/sign-in"}
              componentMain={Main}
              data={cards}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={onCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              componentFooter={Footer} >
            </ProtectedRoute>
            <Route path="/sign-in">
              <Header pathNav={"/sign-up"} emailText={false} buttonTitle={"Зарегистрироваться"} />
              <Login onLoggedUser={handleLoggedUser} />
            </Route>
            <Route path="/sign-up">
              <Header pathNav={"/sign-in"} emailText={false} buttonTitle={"Войти"} />
              <Register onRegisterUser={handleRegisterUser} />
            </Route>
          </Switch>
        </div>

        <InfoTooltip 
          name={"info"}
          isOpen={isRegPopupOpen}
          onClose={handleCloseButton}
          isRegister={isRegister} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={handleCloseButton}
          onUpdateUser={handleUpdateUser}
          onLoading={isLoading} />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={handleCloseButton}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isLoading} />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={handleCloseButton}
          onAddCard={handleAddPlace}
          onLoading={isLoading} />

        <PopupWithForm 
          name={"delete"}
          formTitle={"Вы уверенны?"}
          buttonText={"Да"} />

        <ImagePopup card={selectCard} onClose={handleCloseButton}/>
      </div>
    </CurrenUserContext.Provider>
  );
}

export default App;
