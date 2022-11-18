let popupOpenButton = document.querySelector('.profile__edit-btn');
let popupCloseButton = document.querySelector('.popup__close-btn');
let popup = document.querySelector('.popup');
let popupInput = document.querySelectorAll('.popup__input');

function InputFilling() {
  for (let i = 0; i < popupInput.length; i++) {
    if (popupInput[i].name === 'name') {
      let profileName = document.querySelector('.profile__name').textContent;
      popupInput[i].value = profileName;
    } else 
    
    if (popupInput[i].name === 'description') {
      let profileDescription = document.querySelector('.profile__description').textContent;
      popupInput[i].value = profileDescription;
    }
  }
}

function OpenClosePopup() {
  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened');
  } else {
    InputFilling();
    popup.classList.add('popup_opened');
  }
}



popupOpenButton.addEventListener('click', OpenClosePopup);
popupCloseButton.addEventListener('click', OpenClosePopup);


// Находим форму в DOM
let popupForm = document.querySelector('popup__form');
// Находим поля формы в DOM
let nameInput = // Воспользуйтесь инструментом .querySelector()
let jobInput = // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);