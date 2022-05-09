function Loader({ isOpen }) {

  return (
    <div className={`popup popup_loader ${isOpen && 'popup_opened'}`}>
      <div className='popup__loader'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  );

}

export default Loader;
