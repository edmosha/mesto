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

// просмотр картинки
const viewPicturePopup = document.querySelector('.popup_type_view-picture');
const viewPicturePopupImage = document.querySelector('.popup__image');
const viewPicturePopupSign = document.querySelector('.popup__sign');
const viewPicturePopupCloseButton = document.querySelector('.popup__close-btn_type_view-picture');


const initialCards = [
  {
    name: 'Пушкин',
    link: './images/pushkin.jpg'
  },
  {
    name: 'Байкал',
    link: './images/baikal.jpg'
  },
  {
    name: 'Калининград',
    link: './images/kaliningrag.jpg'
  },
  {
    name: 'Екатеринбург',
    link: './images/ekaterinburg.jpg'
  },
  {
    name: 'Светлогорск',
    link: './images/svetlpgorsk.jpg'
  },
  {
    name: 'Санкт-Перербург',
    link: './images/saint-petersburg.jpg'
  }
];


// добавление карточки
function addCard(cardName, link) {
  const cardItem = templateCard.querySelector('.card__item').cloneNode(true);
  const likeButton = cardItem.querySelector('.card__like-btn');
  const deleteButton = cardItem.querySelector('.card__delete-btn');

  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');

  cardTitle.textContent = cardName;
  cardImage.src = link;

  // лайк
  likeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-btn_focus');
  });

  // удаление
  deleteButton.addEventListener('click', (evt) => {
    const cardItemForDelete = evt.target.closest('.card__item');
    cardItemForDelete.remove();
  });

  // открытие попапа картинки
  cardImage.addEventListener('click', () => {
    console.log(cardItem);
    openViewPicPopup(cardItem);
  });

  cardList.prepend(cardItem);
}

// рендер карточек
function renderInitialCards(list) {
  for(let i = 0; i < list.length; i++) {
    addCard(list[i].name, list[i].link);
  }
}

// вставляет в поля формы значения из профиля
function fillInputValues() {    
  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;
}

// открывает и закрывает попап
function openClosePopup(popup) {   
  popup.classList.toggle('popup_opened');

  if (!popup.classList.contains('.popup_opened') && popup === editPopup) {
    fillInputValues();
  }
}

// открытие картинки
function openViewPicPopup(cardElem) {

  const elemSign = cardElem.querySelector('.card__title').textContent;
  const elemImage = cardElem.querySelector('.card__image').src;
  fillValuesViewPicturePopup(elemImage, elemSign);

  openClosePopup(viewPicturePopup);
}

// вставляет в попап картинку и подпись
function fillValuesViewPicturePopup(imageLink, signText) {
  viewPicturePopupImage.src = imageLink;
  viewPicturePopupSign.textContent = signText;
}

// отправка форм
function editFormSubmitHandler (evt) {
    evt.preventDefault(); 

    nameProfile.textContent = nameInput.value;
    descriptionProfile.textContent = descriptionInput.value;

    openClosePopup(editPopup);
}

function addCardFormSubmitHandler(evt) {
  evt.preventDefault(); 
  
  addCard(cardNameInput.value, linkInput.value);
  cardNameInput.value = '';
  linkInput.value = '';

  openClosePopup(addCardPopup);
}

renderInitialCards(initialCards);

// edit popup 
editPopupOpenButton.addEventListener('click', () => {openClosePopup(editPopup)});
editPopupCloseButton.addEventListener('click', () => {openClosePopup(editPopup)});
editPopupForm.addEventListener('submit', editFormSubmitHandler);

// add new picture popup 
addCardPopupOpenButton.addEventListener('click', () => {openClosePopup(addCardPopup)});
addCardPopupCloseButton.addEventListener('click', () => {openClosePopup(addCardPopup)});
addCardPopupForm.addEventListener('submit', addCardFormSubmitHandler);

viewPicturePopupCloseButton.addEventListener('click', () => {openClosePopup(viewPicturePopup)});
