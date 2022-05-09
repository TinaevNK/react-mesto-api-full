import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { currentUserContext } from '../contexts/CurrentUserContext.js';
import avatar from '../images/avatar.png';
import api from '../utils/api.js';
import * as auth from '../utils/auth.js';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import ImagePopup from './ImagePopup.jsx';
import Main from './Main.jsx';
import EditProfilePopup from './EditProfilePopup.jsx'
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import AcceptDeleteCardPopup from './AcceptDeleteCardPopup.jsx';
import Loader from './Loader.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import InfoTooltip from './InfoTooltip.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

function App() {
  const history = useHistory();

  // стейты:
  // открытие попапа редактирования профиля
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  // открытития попапа добавления карточек
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  // открытие попапа смены аватара
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  // данные карточки на полный экран
  const [selectedCard, setSelectedCard] = useState({});
  // открытие попап карточки на весь экран
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  // открытие попапа удаления карточки
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  // данные для удалённой карточки
  const [cardDelete, setCardDelete] = useState({});
  // данные пользователя
  const [currentUser, setCurrentUser] = useState({ name: 'Имя пользователя', about: 'О пользователе', avatar: avatar});
  // карточки
  const [cards, setCards] = useState([]);
  // лоадер
  const [isLoader, setIsLoader] = useState(false);
  // успех/неудача
  const [isInfoTooltipShow, setIsInfoTooltipShow] = useState({ isOpen: false, successful: false });

  // стейты для входа
  const [loggedIn, setLoggedIn] =  useState(false);
  const [email, setEmail] = useState('');

  // проверка токена и авторизация пользователя
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
      .then(data => {
        if (data) {
          setEmail(data.email);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch(err => console.log(err))
    }
  }, [history])

  // если залогинены - получаем карточки и информацию о пользователе
  useEffect(() => {
    if (loggedIn) {
      setIsLoader(true);
      api.renderUserAndCards()
        .then(([dataUserInfo, dataCards]) => {
          setCurrentUser(dataUserInfo);
          setCards(dataCards.reverse());
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoader(false))
    }
  }, [loggedIn])

  function useEscapePress(callback, dependency) {
    useEffect(() => {
      if (dependency) {
        const onEscClose = e => {
          if (e.key === 'Escape') {
            callback()
          }
        }
        document.addEventListener('keyup', onEscClose);
        // при размонтировании удалим обработчик данным колбэком
        return () => {
          document.removeEventListener('keyup', onEscClose)
        };
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dependency])
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

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsInfoTooltipShow({ isOpen: false, successful: false })
  }

  // функция открытия на полный экран картинки
  function handleCardClick(data) {
    setIsImagePopupOpen(true);
    setSelectedCard(data)
  }

   // функция слушатель на клик по корзинке, чтобы открыть попап
  function handleDeleteCardClick(data) {
    setCardDelete(data)
    setIsDeletePopupOpen(true);
  }

  // ф-ция управляет удалением карточки
  function handleDeleteCard() {
    setIsLoader(true);
    api.deleteCard(cardDelete)
      .then(() => {
        setCards(state => state.filter(item => item._id !== cardDelete._id))
      })
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
      .finally(() => setIsLoader(false))
  }

  // функция постановки и снятия лайка
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);

    if (!isLiked) {
      api.setLike(card)
        .then(newCard => {
          setCards(state => state.map(c => c._id === card._id ? newCard : c))
        })
        .catch(err => console.log(err))
      } else {
        api.deleteLike(card)
        .then(newCard => {
          setCards(state => state.map(c => c._id === card._id ? newCard : c))
        })
        .catch(err => console.log(err))
      }
  }

  // отправка данных пользователя на сервер
  function handleUpdateUser(info) {
    setIsLoader(true);
    api.setUserInfo(info)
      .then(newInfo => { setCurrentUser(newInfo) })
      .then(() => { closeAllPopups() })
      .catch(err => console.log(err))
      .finally(() => setIsLoader(false))
  }

  // отправка аватара пользователя на сервер
  function handleUpdateAvatar(input) {
    setIsLoader(true);
      api.setUserAvatar(input)
      .then(newInfo => { setCurrentUser(newInfo) })
      .then(() => { closeAllPopups() })
      .catch(err => console.log(err))
      .finally(() => setIsLoader(false))
  }

  // отправка новой карточки и обновление стейта
  function handleAddPlace(data) {
    setIsLoader(true);
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoader(false))
  }

  function handleInfoTooltip(res) {
    setIsInfoTooltipShow({ isOpen: true, successful: res })
  }

  // регистрация пользователя
  function handleRegister({ email, password }) {
    setIsLoader(true);
    auth.register(email, password)
      .then(data => {
        if (data) {
          handleInfoTooltip(true);
          history.push('/signin');
        }
      })
      .catch(err => {
        handleInfoTooltip(false);
        console.log(err);
      })
      .finally(() => setIsLoader(false))
  }

  // вход
  function handleLogin({ email, password }) {
    setIsLoader(true);
    auth.login(email, password)
      .then(jwt => {
        if (jwt.token) {
          setEmail(email);
          setLoggedIn(true);
          localStorage.setItem('jwt', jwt.token);
          history.push('/');
        }
      })
      .catch(err => {
        handleInfoTooltip(false);
        console.log(err);
      })
      .finally(() => setIsLoader(false))
  }

  // выход
  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setEmail('');
    setLoggedIn(false);
    history.push('/signin');
  }

  return (
    <div className="page">
      <currentUserContext.Provider value={currentUser}>
        <Header
          email={email}
          onSignOut={handleSignOut} />
        <Switch>
          <ProtectedRoute exact path="/"
            component={Main}
            loggedIn={loggedIn}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardDelete={handleDeleteCardClick}
            onCardLike={handleCardLike} />
          <Route path="/signin">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/signup">
            <Register handleRegister={handleRegister} />
          </Route>
        </Switch>
        <Footer />
        <Loader
          isOpen={isLoader} />
        <InfoTooltip
          onClose={closeAllPopups}
          status={isInfoTooltipShow}
          useEscapePress={useEscapePress} />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          useEscapePress={useEscapePress}/>
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          useEscapePress={useEscapePress} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          useEscapePress={useEscapePress} />
        <AcceptDeleteCardPopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          isAccept={handleDeleteCard}
          useEscapePress={useEscapePress} />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          useEscapePress={useEscapePress} />
      </currentUserContext.Provider>
    </div>
  );
}

export default App;
