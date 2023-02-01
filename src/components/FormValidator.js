export default class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._errorElementSelector = config.errorElementSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
  }

  _showInputError(inputElem, errorMessage) {
    const errorElem = this._formElement.querySelector(`${this._errorElementSelector}${inputElem.id}`);

    inputElem.classList.add(this._inputErrorClass);
    errorElem.textContent = errorMessage;
    errorElem.classList.add(this._errorClass);
  }

  _hideInputError(inputElem) {
    const errorElem = this._formElement.querySelector(`${this._errorElementSelector}${inputElem.id}`);
  
    inputElem.classList.remove(this._inputErrorClass);
    errorElem.classList.remove(this._errorClass);
    errorElem.textContent = '';
  }
  
  _isValid(inputElem) {
    if (!inputElem.validity.valid) {
      this._showInputError(inputElem, inputElem.validationMessage);
    } else {
      this._hideInputError(inputElem);
    }
  }

   _hasInvalidInput() {
    return this._inputList.some(inputElem => {
      return !inputElem.validity.valid;
    })
  
  }
  
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElem.classList.add(this._inactiveButtonClass);
      this._buttonElem.setAttribute('disabled', 'true');

    } else {
      this._buttonElem.classList.remove(this._inactiveButtonClass);
      this._buttonElem.removeAttribute('disabled');

    }
  }
  
  _setEventListener() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));    
    this._buttonElem = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState();
  
    this._inputList.forEach(inputElem => {
      inputElem.addEventListener('input', () => {
  
        this._isValid(inputElem);
        this._toggleButtonState();
      })
    })
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach(inputElem => {
      this._hideInputError(inputElem)
    })
  }

  enableValidation() {
      this._setEventListener();
  }
}