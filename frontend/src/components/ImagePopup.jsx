export default function ImagePopup({ card, onClose, isOpen, useEscapePress }) {
  function handleClickOverlay(e) {
    e.stopPropagation();
  }

  useEscapePress(onClose, isOpen);

  return(
    <div id="popup-picture" className={`popup popup_opasity-high ${isOpen && 'popup_opened'}`} onClick={onClose}>
      <figure className="popup__picture-container" onClick={handleClickOverlay}>
        <img className="popup__photo" alt={`карточка "${card.name}"`} src={card.link}/>
        <button type="button" className="popup__close-button popup__close-button_general" onClick={onClose}></button>
        <figcaption className="popup__photo-name">{card.name}</figcaption>
      </figure>
    </div>
  )
}
