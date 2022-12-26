validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  errorElementSelector: '.popup__input-error_field_',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

// обработчик ввода инпутов и проверка ошибок для них

function showInputError(formElem, inputElem, errorMessage, validationConfig) {
  const errorElem = formElem.querySelector(`${validationConfig.errorElementSelector}${inputElem.id}`);

  inputElem.classList.add(validationConfig.inputErrorClass);
  errorElem.textContent = errorMessage;
  errorElem.classList.add(validationConfig.errorClass);
}

function hideInputError(formElem, inputElem, validationConfig) {
  const errorElem = formElem.querySelector(`${validationConfig.errorElementSelector}${inputElem.id}`);

  inputElem.classList.remove(validationConfig.inputErrorClass);
  errorElem.classList.remove(validationConfig.errorClass);
  errorElem.textContent = '';
}

function isValid(formElem, inputElem, validationConfig) {
  if (!inputElem.validity.valid) {
    showInputError(formElem, inputElem, inputElem.validationMessage, validationConfig);
  } else {
    hideInputError(formElem, inputElem, validationConfig);
  }
}

// смена состояния кнопки

function hasInvalidInput(inputList) {
  return inputList.some(inputElem => {
    return !inputElem.validity.valid;
  })

}

function toggleButtonState(inputList, buttonElem, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElem.classList.add(validationConfig.inactiveButtonClass);
    buttonElem.setAttribute('disabled', 'true');
  } else {
    buttonElem.classList.remove(validationConfig.inactiveButtonClass);
    buttonElem.removeAttribute('disabled');
  }
}

function disableSubmitButton(submitButton) {
  submitButton.setAttribute('disabled', 'true');
  submitButton.classList.add('popup__save-btn_inactive');
}

// поиск и валидация форм

function setEventListener(formElem, validationConfig) {
  const inputList = Array.from(formElem.querySelectorAll(validationConfig.inputSelector));
  const buttonElem = formElem.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputList, buttonElem, validationConfig);

  inputList.forEach(inputElem => {
    inputElem.addEventListener('input', () => {

      isValid(formElem, inputElem, validationConfig);
      toggleButtonState(inputList, buttonElem, validationConfig);
    })
  })
}

function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach(formElem => {
    setEventListener(formElem, validationConfig);
  })
}

enableValidation(validationConfig);