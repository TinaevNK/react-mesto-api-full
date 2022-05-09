import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm.jsx';
import useFormWithValidation from '../hooks/useFormWithValidation.jsx';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, useEscapePress}) {
  const {values, handleChange, resetForm, errors, isValid} = useFormWithValidation();

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
  }

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm])

  return(
    <PopupWithForm
      name="create-card"
      title="Новое место"
      submitText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}
      useEscapePress={useEscapePress}
      isDisabled={!isValid}
    >
      <fieldset className="popup__info">
        <label className="popup__label">
          <input
            type="text"
            placeholder="Название"
            name="name"
            value={values.name || ''}
            onChange={handleChange}
            id="create-card__title"
            minLength="2"
            maxLength="30"
            required
            className="popup__input"
          />
          <span className="popup__error" id="create-card__title-error">
            {errors.name || ''}
          </span>
        </label>
        <label className="popup__label">
          <input
            type="url"
            placeholder="Ссылка на картинку"
            name="link"
            value={values.link || ''}
            onChange={handleChange}
            id="create-card__link"
            required
            className="popup__input"
          />
          <span className="popup__error" id="create-card__link-error">
            {errors.link || ''}
          </span>
        </label>
      </fieldset>
    </PopupWithForm>
  )
}


