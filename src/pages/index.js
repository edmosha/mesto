import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards } from '../utils/initial-array.js';
import { createCard } from '../utils/utils.js';
import { 
  validationConfig, 
  profilePopupOpenButton,
  cardPopupOpenButton,
  editForm,
  addCardForm
 } from '../utils/constants.js';

import './index.css'

// validation

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
    const cardElement = createCard(cardItem);
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
  },
  isInitialValues: true
}, '.popup_type_edit-profile');

profilePopup.setEventListeners();


const cardPopup = new PopupWithForm({
  handleFormSubmit: (cardData) => {
    console.log(cardData);

    const cardElement = createCard(cardData);
    cardList.addItem(cardElement);

    cardPopup.close();
    cardFormValidator.resetValidation();
  },
  isInitialValues: false
}, '.popup_type_new-picture');

cardPopup.setEventListeners();


profilePopupOpenButton.addEventListener('click', () => { 
  profileFormValidator.resetValidation();
  const userData = profile.getUserInfo();
  profilePopup.setInputValues(userData);
  profilePopup.open();
});


cardPopupOpenButton.addEventListener('click', () => { 
  cardFormValidator.resetValidation();
  cardPopup.open();
});