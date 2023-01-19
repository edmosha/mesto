// редактирование профиля
const editPopup = document.querySelector('.popup_type_edit-profile');
const editPopupOpenButton = document.querySelector('.profile__edit-btn');
const editPopupForm = editPopup.querySelector('.popup__form_type_edit-profile');
const editPopupSubmitButton = editPopup.querySelector('.popup__save-btn');

const nameInput = editPopup.querySelector('.popup__input_type_name'); 
const descriptionInput = editPopup.querySelector('.popup__input_type_description'); 
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');

// добавление фото
const addCardPopup = document.querySelector('.popup_type_new-picture');
const addCardPopupOpenButton = document.querySelector('.profile__add-new-post-btn');
const addCardPopupForm = addCardPopup.querySelector('.popup__form_type_new-picture');
const addCardPopupSubmitButton = addCardPopup.querySelector('.popup__save-btn');

const cardNameInput = addCardPopup.querySelector('.popup__input_type_card-name');
const linkInput = addCardPopup.querySelector('.popup__input_type_link');

const cardList = document.querySelector('.post-feed__list');

// просмотр картинки
const viewPicturePopup = document.querySelector('.popup_type_view-picture');
const viewPicturePopupImage = document.querySelector('.popup__image');
const viewPicturePopupSign = document.querySelector('.popup__sign');

const page = document.querySelector('.page');


import Card from './card.js';
import {initialCards} from './initial-array.js';


// работа с карточками 

function addCard(data, templateSelector) {
  const card = new Card(data, templateSelector);
  const cardElement = card.createCard();

  cardList.prepend(cardElement);
}

function renderInitialCards(initialArray) {
  initialArray.forEach(elem => { 
    addCard(elem, '#card'); 
  });
}

// вставляет в поля формы значения из профиля

function fillEditPopupInputValues() {    
  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;
}

// открытие закрытие попапов

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

function setCloseEventPopup() {
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

// работа с попапом просмотра картинки 

function openViewPicPopup(cardName, imageLink) {
  fillViewPicturePopupValues(imageLink, cardName);
  openPopup(viewPicturePopup);
}

function fillViewPicturePopupValues(imageLink, signText) {
  viewPicturePopupImage.src = imageLink;
  viewPicturePopupImage.alt = signText;
  viewPicturePopupSign.textContent = signText;
}

// отправка форм

function editFormSubmitHandler (evt) {
  evt.preventDefault(); 

  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;
  closePopup(editPopup);
  disableSubmitButton(editPopupSubmitButton);
}

function addCardFormSubmitHandler(evt) {
  evt.preventDefault(); 

  addCard(cardNameInput.value, linkInput.value);
  addCardPopupForm.reset();
  closePopup(addCardPopup);
  disableSubmitButton(addCardPopupSubmitButton);
}


renderInitialCards(initialCards);
setCloseEventPopup();

// edit popup 
editPopupOpenButton.addEventListener('click', () => {
  fillEditPopupInputValues();
  openPopup(editPopup);
});
editPopupForm.addEventListener('submit', editFormSubmitHandler);

// add new picture popup 
addCardPopupOpenButton.addEventListener('click', () => {openPopup(addCardPopup)});
addCardPopupForm.addEventListener('submit', addCardFormSubmitHandler);