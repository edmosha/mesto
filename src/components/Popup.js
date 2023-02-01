export default class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose)
    this._element.classList.add('popup_opened');
  }
  
  close() {
    document.removeEventListener('keydown', this._handleEscClose)
    this._element.classList.remove('popup_opened');
  }

  setEventListeners() {
    const closeButton = this._element.querySelector('.popup__close-btn');
    closeButton.addEventListener('click', () => {
      this.close();
    });
    
    this._element.addEventListener('click', (evt) => {
      if (evt.target.closest('.popup__container') === null) {
        this.close();
      };
    })
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}