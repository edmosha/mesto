export default class Card {
  constructor({ data, handleCardClick, handleCardDelete }, templateSelector) {
    this._title = data.name;
    this._image = data.link;
    this._id = data._id;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
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

  _like() {
    this._likeButton.classList.toggle('card__like-btn_focus');
  }

  _delete() {
    this._element.remove();
    this._element = null;
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
        // this._handleCardClick(this._image, this._title);
        this._handleCardClick(this._image, this._title);
    }) 
  }

  createCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.card__like-btn');
    this._deleteButton = this._element.querySelector('.card__delete-btn');
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._image;
    this._element.querySelector('.card__image').alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;

    return this._element;
    }
}

