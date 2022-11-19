let popupOpenButton = document.querySelector('.profile__edit-btn');
let popupCloseButton = document.querySelector('.popup__close-btn');

let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let descriptionInput = document.querySelector('.popup__input_type_description');

let nameProfile = document.querySelector('.profile__name');
let descriptionProfile = document.querySelector('.profile__description');


// вставляет в поля формы значения из профиля

function FillInputValues() {    
  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;
}

// открывает и закрывает попап

function OpenClosePopup() {   
  popup.classList.toggle('popup_opened');

  if (!popup.classList.contains('.popup_opened')) {
    FillInputValues();
  }
}

// отправка формы и заполнение полей порофиля новыми значениями

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    nameProfile.textContent = nameInput.value;
    descriptionProfile.textContent = descriptionInput.value;

    OpenClosePopup();
}

popupOpenButton.addEventListener('click', OpenClosePopup);
popupCloseButton.addEventListener('click', OpenClosePopup);

popupForm.addEventListener('submit', formSubmitHandler);

