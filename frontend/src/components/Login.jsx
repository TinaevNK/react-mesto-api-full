import { useEffect } from 'react';
import useFormWithValidation from '../hooks/useFormWithValidation.jsx';

export default function Login({ onLogin }) {
  const {values, handleChange, resetForm, errors, isValid} = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values);
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <div className="register page__register">
      <h2 className="register__title">Вход</h2>
      <form name="form_register" className="register__form" noValidate onSubmit={handleSubmit}>
        <fieldset className="register__fieldset">
          <label className="register__label">
            <input
              className="register__input"
              type="email"
              placeholder="Email"
              name="email"
              minLength="2"
              maxLength="40"
              value={values.email || ''}
              onChange={handleChange}
              required
            />
            <span className="register__error" id="email-error">
              {errors.email || ''}
            </span>
          </label>
          <label className="register__label">
            <input
              className="register__input"
              type="password"
              placeholder="Пароль"
              name="password"
              minLength="2"
              maxLength="40"
              value={values.password || ''}
              onChange={handleChange}
              required
            />
            <span className="register__error" id="password-error">
              {errors.password || ''}
            </span>
          </label>
        </fieldset>
        <button
          type="submit"
          className={`register__button ${!isValid && 'register__button_disabled'}`}
          disabled={!isValid}
        >
          Войти
        </button>
      </form>
    </div>
  )
}
