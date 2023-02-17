import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector) { 
    super(popupSelector);
    this._form = this._element.querySelector('.popup__form');
    this._submitButton = this._element.querySelector('.popup__save-btn');
    this._submitButtonText = this._submitButton.textContent;
  }

  open({ handleFormSubmit }) {
    super.open();
    this._handleFormSubmit = handleFormSubmit;
  }

  renderLoading(isLoading, loadingText='Сохранение...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleFormSubmit();
    })
  }
}