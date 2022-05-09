export default function InfoTooltip({ onClose, status: { isOpen, successful }, useEscapePress}) {
  function handleClickOverlay(e) {
    e.stopPropagation();
  }

  useEscapePress(onClose, isOpen);

  return(
    <div id="popup-info-tooltip" className={`popup ${isOpen && 'popup_opened'}`} onClick={onClose}>
      <div className="popup__container" onClick={handleClickOverlay}>
        <div className={`popup__status ${successful ? 'popup__status_success' : 'popup__status_fail'}`}></div>
        <h2 className="popup__title popup__title_center">{successful ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
        <button type="button" className="popup__close-button popup__close-button_general" onClick={onClose}></button>
      </div>
    </div>
  );
}
