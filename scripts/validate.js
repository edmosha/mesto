// обработчик ввода инпутов и проверка ошибок для них

function showInputError(formElem, inputElem, errorMessage, settingsObj) {
  const errorElem = formElem.querySelector(`.popup__input-error_field_${inputElem.id}`);

  inputElem.classList.add(settingsObj.inputErrorClass);
  errorElem.textContent = errorMessage;
  errorElem.classList.add(settingsObj.errorClass);
}

function hideInputError(formElem, inputElem, settingsObj) {
  const errorElem = formElem.querySelector(`.popup__input-error_field_${inputElem.id}`);

  inputElem.classList.remove(settingsObj.inputErrorClass);
  errorElem.classList.remove(settingsObj.errorClass);
  errorElem.textContent = '';
}

function isValid(formElem, inputElem, settingsObj) {
  if (!inputElem.validity.valid) {
    showInputError(formElem, inputElem, inputElem.validationMessage, settingsObj);
  } else {
    hideInputError(formElem, inputElem, settingsObj);
  }
}

// смена состояния кнопки

function hasInvalidInput(inputList) {
  return inputList.some(inputElem => {
    return !inputElem.validity.valid;
  })

}

function toggleButtonState(inputList, buttonElem, settingsObj) {
  if (hasInvalidInput(inputList)) {
    buttonElem.classList.add(settingsObj.inactiveButtonClass);
    buttonElem.setAttribute('disabled', 'true');
  } else {
    buttonElem.classList.remove(settingsObj.inactiveButtonClass);
    buttonElem.removeAttribute('disabled');
  }
}

// поиск и валидация форм

function setEventListener(formElem, settingsObj) {
  const inputList = Array.from(formElem.querySelectorAll(settingsObj.inputSelector));
  const buttonElem = formElem.querySelector(settingsObj.submitButtonSelector);

  toggleButtonState(inputList, buttonElem, settingsObj);

  inputList.forEach(inputElem => {
    inputElem.addEventListener('input', () => {

      isValid(formElem, inputElem, settingsObj);
      toggleButtonState(inputList, buttonElem, settingsObj);
    })
  })
}

function enableValidation(settingsObj) {
  const formList = Array.from(document.querySelectorAll(settingsObj.formSelector));
  formList.forEach(formElem => {
    setEventListener(formElem, settingsObj);
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});