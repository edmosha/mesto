import Card from './Card.js';
import {initialCards} from './initial-array.js';
import FormValidator from './FormValidator.js';

// edit profile
const profilePopup = document.querySelector('.popup_type_edit-profile');
const profilePopupOpenButton = document.querySelector('.profile__edit-btn');
const profilePopupForm = profilePopup.querySelector('.popup__form_type_edit-profile');

const nameInput = profilePopup.querySelector('.popup__input_type_name'); 
const descriptionInput = profilePopup.querySelector('.popup__input_type_description'); 
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');

// add card
const cardPopup = document.querySelector('.popup_type_new-picture');
const cardPopupOpenButton = document.querySelector('.profile__add-new-post-btn');
const cardPopupForm = cardPopup.querySelector('.popup__form_type_new-picture');

const cardNameInput = cardPopup.querySelector('.popup__input_type_card-name');
const linkInput = cardPopup.querySelector('.popup__input_type_link');
const cardsContainer = document.querySelector('.post-feed__list');

// picture popup
const picturePopup = document.querySelector('.popup_type_view-picture');
const picturePopupImage = document.querySelector('.popup__image');
const picturePopupSign = document.querySelector('.popup__sign');

// validation
const editForm = document.querySelector('.popup__form_type_edit-profile');
const addCardForm = document.querySelector('.popup__form_type_new-picture');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  errorElementSelector: '.popup__input-error_field_',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
};

const profileFormValidator = new FormValidator(validationConfig, editForm);
const cardFormValidator = new FormValidator(validationConfig, addCardForm);

// card

function createCard(data, templateSelector) {
  return new Card(data, templateSelector, handleOpenPicturePopup).createCard();
}

function addCard(data, templateSelector) {
  cardsContainer.prepend(createCard(data, templateSelector));
}

function renderInitialCards(initialArray) {
  initialArray.forEach(elem => { 
    addCard(elem, '#card'); 
  });
}

// open close popup

function handleOpenProfilePopup() {    
  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;

  profileFormValidator.resetValidation();
  openPopup(profilePopup);
}

function handleOpenCardPopup() {
  cardFormValidator.resetValidation();
  cardPopupForm.reset();
  openPopup(cardPopup);
}

function handleOpenPicturePopup(name, image) {
  picturePopupImage.src = image;
  picturePopupImage.alt = name;
  picturePopupSign.textContent = name;
  
  openPopup(picturePopup);
}

function openPopup(popup) { 
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', pressEscClosePopup);
}

function closePopup(popup) { 
  document.removeEventListener('keydown', pressEscClosePopup);
  popup.classList.remove('popup_opened');
}

function pressEscClosePopup(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function setListenerClosePopup() { 
  const popupList = Array.from(document.querySelectorAll('.popup'));

  popupList.forEach(popup => {
    const popupCloseButton = popup.querySelector('.popup__close-btn');
    
    popupCloseButton.addEventListener('click', () => {closePopup(popup)});
    popup.addEventListener('click', (evt) => {
      if (evt.target.closest('.popup__container') === null) {
        closePopup(popup);
      };
    });
  })
}

// отправка форм

function handleSubmitProfileForm(evt) {
  evt.preventDefault(); 

  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;
  closePopup(profilePopup);
  profileFormValidator.resetValidation();
}

function handleSubmitCardForm(evt) {
  evt.preventDefault(); 

  addCard({title: cardNameInput.value, image: linkInput.value}, '#card');
  cardPopupForm.reset();
  closePopup(cardPopup);
  cardFormValidator.resetValidation();
}

renderInitialCards(initialCards);
setListenerClosePopup();

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

// edit popup 
profilePopupOpenButton.addEventListener('click', () => { handleOpenProfilePopup(); });
profilePopupForm.addEventListener('submit', handleSubmitProfileForm);

// add new picture popup 
cardPopupOpenButton.addEventListener('click', () => { handleOpenCardPopup(); });
cardPopupForm.addEventListener('submit', handleSubmitCardForm);
