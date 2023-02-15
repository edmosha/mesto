import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit, isInitialValues }, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._element.querySelector('.popup__form');
    this._submitButton = this._element.querySelector('.popup__save-btn');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._isInitialValues = isInitialValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    this._formValues = {};
    
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setInputValues(userData) {
    if(this._isInitialValues) {
      this._inputList.forEach((input, index) => {
        input.value = userData[Object.keys(userData)[index]];
      });
    }
  }

  setSubmitButtonText(text) {
    this._submitButton.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}