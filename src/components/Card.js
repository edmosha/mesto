export default class Card {
  constructor(data, templateSelector, { handleCardClick }) {
    this._title = data.title;
    this._imageLink = data.image;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._likeButton.addEventListener('click', () => {
      this._like();
    });
    
    // delete
    this._deleteButton.addEventListener('click', () => {
      this._delete();
    })

    // open image popup
    this._element.querySelector('.card__image')
      .addEventListener('click', () => {
        this._handleCardClick(this._imageLink, this._title);
    }) 
  }

  _like() {
    this._likeButton.classList.toggle('card__like-btn_focus');
  }

  _delete() {
    this._element.remove();
    this._element = null;
  }

  createCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.card__like-btn');
    this._deleteButton = this._element.querySelector('.card__delete-btn');
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._imageLink;
    this._element.querySelector('.card__image').alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;

    return this._element;
    }
}

