import Card from '../components/Card.js';
import {initialCards} from '../components/initial-array.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

const profilePopupOpenButton = document.querySelector('.profile__edit-btn');
const cardPopupOpenButton = document.querySelector('.profile__add-new-post-btn');


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

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

const imagePopup = new PopupWithImage('.popup_type_view-picture');
imagePopup.setEventListeners();

// card

const cardList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card(
      cardItem, 
      '#card', { 
        handleCardClick: (image, title) => imagePopup.open(image, title) 
      })

    const cardElement = card.createCard();
    cardList.addItem(cardElement);
  }
}, '.post-feed__list');

cardList.renderItems();

// popup

const profile = new UserInfo({ 
  userNameSelector: '.profile__name', 
  userInfoSelector: '.profile__description'
});

const profilePopup = new PopupWithForm({
  handleFormSubmit: (userData) => {
    const { name, description } = userData;
    profile.setUserInfo( { name: name, description: description });

    profilePopup.close(); 
    profileFormValidator.resetValidation();
  }
}, '.popup_type_edit-profile');

profilePopup.setEventListeners();


const cardPopup = new PopupWithForm({
  handleFormSubmit: () => {
    const cardData = { 
      title: cardPopup._inputList[0].value, 
      image: cardPopup._inputList[1].value }
    
    const card = new Card(
      cardData, 
      '#card', { 
        handleCardClick: (image, title) => imagePopup.open(image, title) 
      })

    const cardElement = card.createCard();
    cardList.addItem(cardElement);

    cardPopup.close();
    cardFormValidator.resetValidation();
  }
}, '.popup_type_new-picture');

cardPopup.setEventListeners();


profilePopupOpenButton.addEventListener('click', () => { 
  profileFormValidator.resetValidation();
  const userData = profile.getUserInfo();

  profilePopup._inputList[0].value = userData.name;
  profilePopup._inputList[1].value = userData.description;

  profilePopup.open(userData);
});


cardPopupOpenButton.addEventListener('click', () => { 
  cardFormValidator.resetValidation();
  cardPopup.open();
});