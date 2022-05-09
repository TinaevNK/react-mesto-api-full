import { useContext, useEffect } from 'react';
import { currentUserContext } from '../contexts/CurrentUserContext.js';
import useFormWithValidation from '../hooks/useFormWithValidation.jsx';
import PopupWithForm from './PopupWithForm.jsx';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, useEscapePress }) {
  const currentUser = useContext(currentUserContext); // подписка на контекст

  const {values, handleChange, resetForm, errors, isValid} = useFormWithValidation();  // подключаем универсальный обработчик полей

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [isOpen, currentUser, resetForm]);

  // Передаём значения управляемых компонентов во внешний обработчик
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      useEscapePress={useEscapePress}
      isDisabled={!isValid}
    >
      <fieldset className="popup__info">
        <label className="popup__label">
          <input
            type="text"
            placeholder="Имя"
            name="name"
            value={values.name || ''}
            id="name" minLength="2"
            maxLength="40"
            required
            className="popup__input"
            onChange={handleChange}
          />
          <span className="popup__error" id="name-error">
            {errors.name || ""}
          </span>
        </label>
        <label className="popup__label">
          <input
            type="text"
            placeholder="О себе"
            name="about"
            value={values.about || ''}
            id="about"
            minLength="2"
            maxLength="200"
            required className="popup__input"
            onChange={handleChange}
          />
          <span className="popup__error" id="about-error">
            {errors.about || ''}
          </span>
        </label>
      </fieldset>
    </PopupWithForm>
  )
}
