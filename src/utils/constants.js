export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  errorElementSelector: '.popup__input-error_field_',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
};

export const profilePopupOpenButton = document.querySelector('.profile__edit-btn');
export const cardPopupOpenButton = document.querySelector('.profile__add-new-post-btn');
export const editForm = document.querySelector('.popup__form_type_edit-profile');
export const addCardForm = document.querySelector('.popup__form_type_new-picture');
