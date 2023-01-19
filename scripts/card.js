const viewPicturePopup = document.querySelector('.popup_type_view-picture');
const viewPicturePopupImage = document.querySelector('.popup__image');
const viewPicturePopupSign = document.querySelector('.popup__sign');

export default class Card {
  constructor(data, templateSelector) {
    this._title = data.title;
    this._imageLink = data.image;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content.
    querySelector('.card__item')
    .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    // like
    this._element
      .querySelector('.card__like-btn')
      .addEventListener('click', () => {
      this._like();
    });
    
    // delete
    this._element
      .querySelector('.card__delete-btn')
      .addEventListener('click', () => {
      this._element.remove();
    })

    // open image popup
    this._element.querySelector('.card__image')
      .addEventListener('click', () => {
        
        viewPicturePopupImage.src = this._imageLink;
        viewPicturePopupImage.alt = this._title;
        viewPicturePopupSign.textContent = this._title;

        viewPicturePopup.classList.add('popup_opened');
    }) 
    // пока фунции попапов в index.js их нельзя экспортировать 
    // проблема решится после вынесения попапов в др файл
  }

  _like() {
    this._element
    .querySelector('.card__like-btn')
    .classList.toggle('card__like-btn_focus');
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._imageLink;
    this._element.querySelector('.card__image').alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;

    return this._element;
    }
}

