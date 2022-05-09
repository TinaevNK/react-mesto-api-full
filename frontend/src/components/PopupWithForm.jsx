export default function PopupWithForm({ name, title, isOpen, onClose, children, onSubmit, useEscapePress, submitText="Сохранить", isDisabled = false }) {
  function handleClickOverlay(e) {
    e.stopPropagation();
  }
  // навешиваем обработчик по нажитию Esc
  useEscapePress(onClose, isOpen);

  return(
    <div id={`popup-${name}`} className={`popup ${isOpen && "popup_opened"}`} onClick={onClose}>
      <div className="popup__container" onClick={handleClickOverlay}>
        <h2 className="popup__title">{title}</h2>
        <form id={`popup-${name}__form`} name={`${name}-popup`} className="popup__form" noValidate onSubmit={onSubmit}>
          {children}
          <button
            id={`popup-${name}__save-button`}
            type="submit"
            className={`popup__save-button ${isDisabled && 'popup__save-button_disabled'}`}
            disabled={isDisabled}
          >
            {submitText}
          </button>
          <button
            type="button"
            className="popup__close-button popup__close-button_general"
            onClick={onClose}
          ></button>
        </form>
      </div>
    </div>
  );
}
