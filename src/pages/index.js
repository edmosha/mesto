import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import { 
  validationConfig, 
  profilePopupOpenButton,
  cardPopupOpenButton,
  avatarPopupOpenButton,
 } from '../utils/constants.js';

import './index.css'


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '18326de1-ceb2-44e2-90f2-11d350735e1c'
  }
})

const userInfo = new UserInfo({ 
  userNameSelector: '.profile__name', 
  userInfoSelector: '.profile__description',
  userAvatarSelector: '.profile__avatar'
});

const cardList = new Section({
  renderer: (cardItem) => {
    const cardElement = createCard(cardItem);
    cardList.addItem(cardElement);
  }
}, '.post-feed__list');


Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(res => {
    const [ user, cards ] = res;
    
    userInfo.setUserInfo(user);
    cardList.renderItems(cards);
  })
  .catch(err => console.log(err))

// validation 
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))

  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
  console.log('formValidators ', formValidators)
};

enableValidation(validationConfig);

// popups 
const profilePopup = new PopupWithForm({
  handleFormSubmit: (inputValues) => {
    const { name: name, description: about } = inputValues;
    profilePopup.setSubmitButtonText('Сохранение...');

    api.setUserInfo(name, about)
      .then(userData => {
        userInfo.setUserInfo(userData);
        profilePopup.close();
      })
      .catch(err => console.log(err))
      .finally(() => {
        profilePopup.setSubmitButtonText('Сохранить');
      })
  },
  isInitialValues: true
}, '.popup_type_edit-profile');

const cardPopup = new PopupWithForm({
  handleFormSubmit: (cardData) => {
    cardPopup.setSubmitButtonText('Создание...');

    api.postNewCard(cardData)
      .then(data => {
        cardList.addItem(createCard(data));
        cardPopup.close();
      })
      .catch(err => console.log(err))
      .finally(() => {
        cardPopup.setSubmitButtonText('Создать');
      })
  },
  isInitialValues: false
}, '.popup_type_add-card');

const avatarPopup = new PopupWithForm({
  handleFormSubmit: (imageData) => {
    avatarPopup.setSubmitButtonText('Сохранение...');

    api.updateAvatar(imageData)
      .then(res => {
        userInfo.setUserInfo(res);
        avatarPopup.close();
      })
      .catch(err => console.log(err))
      .finally(() => {
        avatarPopup.setSubmitButtonText('Сохранить');
      })
  },
  isInitialValues: false
}, '.popup_type_avatar');

const imagePopup = new PopupWithImage('.popup_type_view-picture');
const confirmPopup = new PopupWithConfirm('.popup_type_confirm');

// card 
const createCard = (cardData) => {
  const card = new Card({
    data: {...cardData, userId: userInfo.getUserId() },
    handleCardClick: (image, title) => imagePopup.open(image, title),
    handleCardDelete: (cardId) => {
      confirmPopup.open({
        handleFormSubmit: () => {
          card.delete();
          confirmPopup.close();
          api.deleteCard(cardId).catch(err => console.log(err))
        }
      })
    },
    handleCardLike: (cardId) => {
      if (card.isLiked()) {
        api.removeLike(cardId)
          .then(res => {
            card.toggleLike();
            card.updateLikeCounter(res.likes);
          })
          .catch(err => console.log(err))
      } else {
        api.setLike(cardId)
          .then(res => {
            card.toggleLike();
            card.updateLikeCounter(res.likes);
          })
          .catch(err => console.log(err))
      }
    }
  }, '#card')
  return card.createCard();
}

// listeners
profilePopup.setEventListeners();
cardPopup.setEventListeners();
avatarPopup.setEventListeners();
imagePopup.setEventListeners();
confirmPopup.setEventListeners();

profilePopupOpenButton.addEventListener('click', () => { 
  formValidators['profile-form'].resetValidation();
  profilePopup.setInputValues(userInfo.getUserInfo());
  profilePopup.open();
});

cardPopupOpenButton.addEventListener('click', () => { 
  formValidators['card-form'].resetValidation();
  cardPopup.open();
});

avatarPopupOpenButton.addEventListener('click', () => {
  formValidators['avatar-form'].resetValidation();
  avatarPopup.open();
})
