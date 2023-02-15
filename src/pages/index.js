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
  editForm,
  addCardForm,
  avatarForm
 } from '../utils/constants.js';

import './index.css'


const profileFormValidator = new FormValidator(validationConfig, editForm);
const cardFormValidator = new FormValidator(validationConfig, addCardForm);
const avatarFormValidator = new FormValidator(validationConfig, avatarForm);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

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
    
    userInfo.setUserInfo({ 
      name: user.name, 
      about: user.about,
      id: user._id
    });
    userInfo.setUserAvatar(user.avatar);
    cardList.renderItems(cards);
  })


const profilePopup = new PopupWithForm({
  handleFormSubmit: (inputValues) => {
    const { name: name, description: about } = inputValues;
    profilePopup.setSubmitButtonText('Сохранение...');

    api.setUserInfo(name, about)
      .then(userData => {
        userInfo.setUserInfo(userData);
      })
      .finally(() => {
        profilePopup.close(); 
        profileFormValidator.resetValidation();
        profilePopup.setSubmitButtonText('Сохранить');
      })
  },
  isInitialValues: true
}, '.popup_type_edit-profile');

const cardPopup = new PopupWithForm({
  handleFormSubmit: (cardData) => {
    cardPopup.setSubmitButtonText('Создание...');

    api.postNewCard(cardData.title, cardData.image)
      .then(data => {
        cardList.addItem(createCard(data));
      })
      .finally(() => {
        cardPopup.close();
        cardFormValidator.resetValidation();
        cardPopup.setSubmitButtonText('Создать');
      })
  },
  isInitialValues: false
}, '.popup_type_new-picture');

const avatarPopup = new PopupWithForm({
  handleFormSubmit: (imageData) => {
    avatarPopup.setSubmitButtonText('Сохранение...');

    api.updateAvatar(imageData.avatar)
      .then(res => {
        userInfo.setUserAvatar(res.avatar);
      })
      .finally(() => {
        avatarPopup.close();
        avatarFormValidator.resetValidation();
        avatarPopup.setSubmitButtonText('Сохранить');
      })
  },
  isInitialValues: false
}, '.popup_type_avatar');

const imagePopup = new PopupWithImage('.popup_type_view-picture');
const confirmPopup = new PopupWithConfirm('.popup_type_confirm');


const createCard = (cardData) => {
  const card = new Card({
    data: {...cardData, userId: userInfo.getUserId() },
    handleCardClick: (image, title) => imagePopup.open(image, title),
    handleCardDelete: (cardId) => {
      confirmPopup.open({
        handleFormSubmit: () => {
          card.delete();
          confirmPopup.close();
          api.deleteCard(cardId);
        }
      })
    },
    handleCardLike: (cardId) => {
      if (card.isLiked()) {
        api.removeLike(cardId).then(res => {
          card.toggleLike();
          card.updateLikeCounter(res.likes);
        })
      } else {
        api.setLike(cardId).then(res => {
          card.toggleLike();
          card.updateLikeCounter(res.likes);
        })
      }
    }
  }, '#card')
  return card.createCard();
}


profilePopup.setEventListeners();
cardPopup.setEventListeners();
avatarPopup.setEventListeners();
imagePopup.setEventListeners();
confirmPopup.setEventListeners();

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

avatarPopupOpenButton.addEventListener('click', () => {
  avatarFormValidator.resetValidation();
  avatarPopup.open();
})

// setTimeout(() => {
//   const popups = document.querySelectorAll('.popup');
//   popups.forEach(popup => {
//     popup.style = 'animation: fadeOut 0.2s ease-in;';
//   })
// }, 2000)


// const popups = document.querySelectorAll('.popup');
//   popups.forEach(popup => {
//     popup.style = 'content-visibility: visible;'
//   })


