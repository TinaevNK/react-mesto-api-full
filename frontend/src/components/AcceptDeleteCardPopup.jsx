import PopupWithForm from './PopupWithForm.jsx';

export default function AcceptDeleteCardPopup({ isOpen, onClose, isAccept, useEscapePress }) {
  function handleDeleteCard (e) {
    e.preventDefault();
    isAccept()
  }

  return(
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      submitText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleDeleteCard}
      useEscapePress={useEscapePress}
    />
  )
}
