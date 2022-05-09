import { useContext } from 'react';
import Card from './Card.jsx';
import { currentUserContext } from '../contexts/CurrentUserContext.js';

export default function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardDelete, onCardLike }) {

  const currentUser = useContext(currentUserContext); // подписываемся на контекст

  return (
    <main className="main page__main">
      <section aria-label="блок с профилем пользователя" className="profile main__profile" >
        <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}  onClick={onEditAvatar}></div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__job">{currentUser.about}</p>
          <button id="profile__edit-button" type="button" className="profile__edit-button" onClick={onEditProfile}></button>
        </div>
        <button id="profile__add-button" type="button" className="profile__add-button" onClick={onAddPlace}></button>
      </section>
      <section aria-label="блок с фото-карточками" className="elements">
        <ul className="elements__list">
          {cards.map(card => {
            return(
              <Card key={card._id} card={card} onCardClick={onCardClick} onCardDelete={onCardDelete} onCardLike={onCardLike}/>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
