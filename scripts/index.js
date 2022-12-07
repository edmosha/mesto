// редактирование профиля

const editPopup = document.querySelector('.popup_type_edit-profile');
const editPopupOpenButton = document.querySelector('.profile__edit-btn');
const editPopupCloseButton = editPopup.querySelector('.popup__close-btn_type_edit-profile');
const editPopupForm = editPopup.querySelector('.popup__form_type_edit-profile');

const nameInput = editPopup.querySelector('.popup__input_type_name');
const descriptionInput = editPopup.querySelector('.popup__input_type_description');
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');


// добавление фото
const addCardPopup = document.querySelector('.popup_type_new-picture');
const addCardPopupOpenButton = document.querySelector('.profile__add-new-post-btn');
const addCardPopupCloseButton = addCardPopup.querySelector('.popup__close-btn_type_new-picture');
const addCardPopupForm = addCardPopup.querySelector('.popup__form_type_new-picture');

const cardNameInput = addCardPopup.querySelector('.popup__input_type_card-name');
const linkInput = addCardPopup.querySelector('.popup__input_type_link');

const templateCard = document.querySelector('#card').content.querySelector('.card__item');
const cardList = document.querySelector('.post-feed__list');

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
function addCard(cardName, imageLink) {
  const card = createCard(cardName, imageLink);
  cardList.prepend(card);
}

//создание карточки
function createCard(cardName, imageLink) {
  const cardItem = templateCard.cloneNode(true);
  const likeButton = cardItem.querySelector('.card__like-btn');
  const deleteButton = cardItem.querySelector('.card__delete-btn');

  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');

  cardTitle.textContent = cardName;
  cardImage.alt = cardName;
  cardImage.src = imageLink;

  // лайк
  likeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-btn_focus');
  });

  // удаление
  deleteButton.addEventListener('click', () => {
    cardItem.remove();
  });

  // открытие попапа картинки
  cardImage.addEventListener('click', () => {
    openViewPicPopup(cardName, imageLink);
  });

  return cardItem;
}

// рендер карточек
function renderInitialCards(array) {
  array.forEach(elem => {addCard(elem.name, elem.link)});
}

// вставляет в поля формы значения из профиля
function fillInputValuesToEditPopup() {    
  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// открытие картинки
function openViewPicPopup(cardName, imageLink) {
  fillValuesViewPicturePopup(imageLink, cardName);
  openPopup(viewPicturePopup);
}

// вставляет в попап картинку и подпись
function fillValuesViewPicturePopup(imageLink, signText) {
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
}

function addCardFormSubmitHandler(evt) {
  evt.preventDefault(); 
  
  addCard(cardNameInput.value, linkInput.value);
  addCardPopupForm.reset();
  closePopup(addCardPopup);
}

renderInitialCards(initialCards);

// edit popup 
editPopupOpenButton.addEventListener('click', () => {
  fillInputValuesToEditPopup();
  openPopup(editPopup);
});
editPopupCloseButton.addEventListener('click', () => {closePopup(editPopup)});
editPopupForm.addEventListener('submit', editFormSubmitHandler);

// add new picture popup 
addCardPopupOpenButton.addEventListener('click', () => {openPopup(addCardPopup)});
addCardPopupCloseButton.addEventListener('click', () => {closePopup(addCardPopup)});
addCardPopupForm.addEventListener('submit', addCardFormSubmitHandler);

viewPicturePopupCloseButton.addEventListener('click', () => {closePopup(viewPicturePopup)});
