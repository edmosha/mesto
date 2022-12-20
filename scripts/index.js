// редактирование профиля
const editPopup = document.querySelector('.popup_type_edit-profile');
const editPopupOpenButton = document.querySelector('.profile__edit-btn');
const editPopupForm = editPopup.querySelector('.popup__form_type_edit-profile');

const nameInput = editPopup.querySelector('.popup__input_type_name');
const descriptionInput = editPopup.querySelector('.popup__input_type_description');
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');

// добавление фото
const addCardPopup = document.querySelector('.popup_type_new-picture');
const addCardPopupOpenButton = document.querySelector('.profile__add-new-post-btn');
const addCardPopupForm = addCardPopup.querySelector('.popup__form_type_new-picture');

const templateCard = document.querySelector('#card').content.querySelector('.card__item');
const cardList = document.querySelector('.post-feed__list');

// просмотр картинки
const viewPicturePopup = document.querySelector('.popup_type_view-picture');
const viewPicturePopupImage = document.querySelector('.popup__image');
const viewPicturePopupSign = document.querySelector('.popup__sign');

const page = document.querySelector('.page');
const cardContainer = document.querySelector('.post-feed__list');


// работа с карточками 
function createCard(cardName, imageLink) {
  const cardItem = templateCard.cloneNode(true);

  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');

  cardTitle.textContent = cardName;
  cardImage.alt = cardName;
  cardImage.src = imageLink;

  // открытие попапа картинки
  cardImage.addEventListener('click', () => {
    openViewPicPopup(cardName, imageLink);
  });

  return cardItem;
}

function addCard(cardName, imageLink) {
  const card = createCard(cardName, imageLink);
  cardList.prepend(card);
}

function renderInitialCards(array) {
  array.forEach(elem => {addCard(elem.name, elem.link)});
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
  popupList = Array.from(document.querySelectorAll('.popup'));

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
}

function addCardFormSubmitHandler(evt) {
  evt.preventDefault(); 
  
  const cardName = addCardPopup.querySelector('.popup__input_type_card-name').value;
  const link = addCardPopup.querySelector('.popup__input_type_link').value;

  addCard(cardName, link);
  addCardPopupForm.reset();
  closePopup(addCardPopup);
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


cardContainer.addEventListener('click', evt => {

  if (evt.target.classList.contains('card__like-btn')) {
    evt.target.classList.toggle('card__like-btn_focus');
  } 
  else if (evt.target.classList.contains('card__delete-btn')) {
    evt.target.closest('.card__item').remove();
  } 
}) 



