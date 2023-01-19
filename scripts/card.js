export default class Card {
  constructor(data, templateSelector) {
    this._title = data.title;
    this._image = data.image;
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
      openViewPicPopup(this._title, this._image);
    })
  }

  _like() {
    this._element
    .querySelector('.card__like-btn')
    .classList.toggle('card__like-btn_focus');
  }

  _debug() {
    console.log(this._image);
    console.log(this._title);
    console.log(this._templateSelector);
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._image;
    this._element.querySelector('.card__image').alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;

    return this._element;
    }
}

