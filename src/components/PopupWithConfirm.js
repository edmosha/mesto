import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
    constructor(PopupSelector) { 
    super(PopupSelector);
    this._form = this._element.querySelector('.popup__form');
  }

  open({ handleFormSubmit }) {
    super.open();
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleFormSubmit();
    })
  }
}