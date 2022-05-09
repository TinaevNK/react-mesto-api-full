import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm.jsx';
import useFormWithValidation from '../hooks/useFormWithValidation.jsx';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, useEscapePress }) {
  const {values, handleChange, resetForm, errors, isValid} = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(values);
  }

  // очищаем поля
  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  return(
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      useEscapePress={useEscapePress}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
    >
      <fieldset className="popup__info">
        <label className="popup__label">
          <input
            type="url"
            placeholder="Ссылка на изображение"
            name="avatar"
            id="avatar__link"
            className="popup__input"
            value={values.avatar || ''}
            onChange={handleChange}
            required
          />
          <span className="popup__error" id="avatar__link-error">
            {errors.avatar || ''}
          </span>
        </label>
      </fieldset>
    </PopupWithForm>
  )
}
