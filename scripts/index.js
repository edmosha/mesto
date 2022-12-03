// редактирование профиля

const editPopup = document.querySelector('.popup_type_edit-profile');
const editPopupOpenButton = document.querySelector('.profile__edit-btn');
const editPopupCloseButton = document.querySelector('.popup__close-btn_type_edit-profile');
const editPopupForm = document.querySelector('.popup__form_type_edit-profile');

const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');


// добавление фото
const addCardPopup = document.querySelector('.popup_type_new-picture');
const addCardPopupOpenButton = document.querySelector('.profile__add-new-post-btn');
const addCardPopupCloseButton = document.querySelector('.popup__close-btn_type_new-picture');
const addCardPopupForm = document.querySelector('.popup__form_type_new-picture');

const templateCard = document.querySelector('#card').content;
const cardList = document.querySelector('.post-feed__list');

const cardNameInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_link');

const initialCards = [
  {
    name: 'Пушкин',
    link: '../images/pushkin.jpg'
  },
  {
    name: 'Байкал',
    link: '../images/baikal.jpg'
  },
  {
    name: 'Калининград',
    link: '../images/kaliningrag.jpg'
  },
  {
    name: 'Екатеринбург',
    link: '../images/ekaterinburg.jpg'
  },
  {
    name: 'Светлогорск',
    link: '../images/svetlpgorsk.jpg'
  },
  {
    name: 'Санкт-Перербург',
    link: '../images/saint-petersburg.jpg'
  }
];

// рендер карточек

function AddCard(cardName, link) {
  const cardItem = templateCard.querySelector('.card-item').cloneNode(true);
  cardItem.querySelector('.card__title').textContent = cardName;
  cardItem.querySelector('.card__image').src = link;

  const likeButton = cardItem.querySelector('.card__like-btn');

  likeButton.addEventListener('click', function(evt) {
    console.log(evt.target);
    evt.target.classList.toggle('card__like-btn_focus');
  });

  cardList.prepend(cardItem);
}

function RenderInitialCards(list) {
  for(let i = 0; i < list.length; i++) {

    AddCard(list[i].name, list[i].link);
  }
}

// вставляет в поля формы значения из профиля
function FillInputValues() {    
  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;
}

// открывает и закрывает попап
function OpenClosePopup(popup) {   
  return function() {
    popup.classList.toggle('popup_opened');

    if (!popup.classList.contains('.popup_opened')) {
      FillInputValues();
    }
  }
}

// отправка формы и заполнение полей порофиля новыми значениями
function EditFormSubmitHandler (evt) {
    evt.preventDefault(); 

    nameProfile.textContent = nameInput.value;
    descriptionProfile.textContent = descriptionInput.value;

    editPopup.classList.remove('popup_opened');
}

function addCardFormSubmitHandler (evt) {
  evt.preventDefault(); 
  
  AddCard(cardNameInput.value, linkInput.value);
  cardNameInput.value = '';
  linkInput.value = '';

  addCardPopup.classList.remove('popup_opened');
}

RenderInitialCards(initialCards);


// edit popup 
editPopupOpenButton.addEventListener('click', OpenClosePopup(editPopup));
editPopupCloseButton.addEventListener('click', OpenClosePopup(editPopup));
editPopupForm.addEventListener('submit', EditFormSubmitHandler);

// add new picture popup 
addCardPopupOpenButton.addEventListener('click', OpenClosePopup(addCardPopup));
addCardPopupCloseButton.addEventListener('click', OpenClosePopup(addCardPopup));
addCardPopupForm.addEventListener('submit', addCardFormSubmitHandler);

// лайк
// const likeButton = document.querySelector('.card__like-btn');

//   likeButton.addEventListener('click', function(evt) {
//     console.log(evt.target);
//     evt.target.classList.toggle('card__like-btn_focus');
//   });

