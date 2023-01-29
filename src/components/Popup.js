export class Popup {
  constructor( popupSelector ) {
    this._popup = document.querySelector(popupSelector);
  };
  
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    };
  };
  
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  };
  
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  };

  setEventListeners() {
    document.querySelectorAll('.popup').forEach( popup => {
      popup.addEventListener('mousedown', (evt) => { 
        if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) { 
          this.close();
        };
      });
    });
  };
};