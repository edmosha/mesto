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
function fillEditPopupInputValues() {    
  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;
}

// открытие закрытие попапов

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
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
  
  addCard(cardNameInput.value, linkInput.value);
  addCardPopupForm.reset();
  closePopup(addCardPopup);
}

// обработчик ввода инпутов и проверка ошибок для них

function showInputError(formElem, inputElem, errorMessage) {
  const errorElem = formElem.querySelector(`.popup__input-error_field_${inputElem.id}`);

  inputElem.classList.add('popup__input_type_error');
  errorElem.textContent = errorMessage;
  errorElem.classList.add('popup__input-error_active');
}

function hideInputError(formElem, inputElem) {
  const errorElem = formElem.querySelector(`.popup__input-error_field_${inputElem.id}`);

  inputElem.classList.remove('popup__input_type_error');
  errorElem.classList.remove('popup__input-error_active');
  errorElem.textContent = '';
}

function isValid(formElem, inputElem) {
  if (!inputElem.validity.valid) {
    showInputError(formElem, inputElem, inputElem.validationMessage);
  } else {
    hideInputError(formElem, inputElem);
  }
}

// смена состояния кнопки

function hasInvalidInput(inputList) {
  return inputList.some(inputElem => {
    return !inputElem.validity.valid;
  })

}

function toggleButtonState(inputList, buttonElem) {
  if (hasInvalidInput(inputList)) {
    buttonElem.classList.add('popup__save-btn_inactive');
    buttonElem.setAttribute('disabled', 'true');
  } else {
    buttonElem.classList.remove('popup__save-btn_inactive');
    buttonElem.setAttribute('disabled', 'false');
  }
}

// поиск и валидация форм

function setEventListener(formElem) {
  const inputList = Array.from(formElem.querySelectorAll('.popup__input'));
  const buttonElem = formElem.querySelector('.popup__save-btn');

  toggleButtonState(inputList, buttonElem);

  inputList.forEach(inputElem => {
    inputElem.addEventListener('input', () => {

      isValid(formElem, inputElem);
      toggleButtonState(inputList, buttonElem);
    })
  })
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach(formElem => {
    setEventListener(formElem);
  })
}

renderInitialCards(initialCards);

enableValidation();

// edit popup 
editPopupOpenButton.addEventListener('click', () => {
  fillEditPopupInputValues();
  openPopup(editPopup);
});
editPopupCloseButton.addEventListener('click', () => {closePopup(editPopup)});
editPopupForm.addEventListener('submit', editFormSubmitHandler);

// add new picture popup 
addCardPopupOpenButton.addEventListener('click', () => {openPopup(addCardPopup)});
addCardPopupCloseButton.addEventListener('click', () => {closePopup(addCardPopup)});
addCardPopupForm.addEventListener('submit', addCardFormSubmitHandler);


viewPicturePopupCloseButton.addEventListener('click', () => {closePopup(viewPicturePopup)});

