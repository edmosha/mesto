import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
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

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '18326de1-ceb2-44e2-90f2-11d350735e1c',
    'Content-Type': 'application/json'
  }
})

api.getUserInfo();

// card

// api.getInitialCards().then(initialCards => {
//   const cardList = createCardList(initialCards, '.post-feed__list');
//   cardList.renderItems();
// })

const cardList =  new Section({
  renderer: (cardItem) => {
    const cardElement = createCard(cardItem);
    cardList.addItem(cardElement);
  }
}, '.post-feed__list');

api.getInitialCards()
  .then(res => {
    console.log('res =>', res)
    cardList.renderItems(res);
  })


// popup

const profile = new UserInfo({ 
  userNameSelector: '.profile__name', 
  userInfoSelector: '.profile__description'
});

const profilePopup = new PopupWithForm({
  handleFormSubmit: (inputValues) => { // возвращает объект с значениями формы
    console.log(inputValues)
    const { name: nameValue, description: aboutValue } = inputValues;
    console.log('index.js: ' + nameValue, aboutValue)
    api.setUserInfo(nameValue, aboutValue).then(userData => {
      const { name, about } = userData; 
      console.log('index: ' + name, about);

      profile.setUserInfo({ name: name, description: about });

      profilePopup.close(); 
      profileFormValidator.resetValidation();
    })
  },
  isInitialValues: true
}, '.popup_type_edit-profile');


profilePopup.setEventListeners();

// ------------------------------------


const cardPopup = new PopupWithForm({
  handleFormSubmit: (cardData) => {
    api.postNewCard(cardData.title, cardData.image)
      .then(data => {
        const cardElement = createCard(data);
        cardList.addItem(cardElement);

        cardPopup.close();
        cardFormValidator.resetValidation();
      })
  },
  isInitialValues: false
}, '.popup_type_new-picture');


// ------------------------------------


api.getUserInfo().then(data => {
  const { name, about } = data;
  profile.setUserInfo({ name: name, description: about });
})

cardPopup.setEventListeners();


profilePopupOpenButton.addEventListener('click', () => { 
  profileFormValidator.resetValidation();
  api.getUserInfo().then(userData => {
    profilePopup.setInputValues(userData);
    profilePopup.open();
  })
});


cardPopupOpenButton.addEventListener('click', () => { 
  cardFormValidator.resetValidation();
  cardPopup.open();
});

// my token 18326de1-ceb2-44e2-90f2-11d350735e1c


