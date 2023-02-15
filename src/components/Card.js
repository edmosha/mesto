export default class Card {
  constructor({ data, handleCardClick, handleCardDelete, handleCardLike }, templateSelector) {
    this._title = data.name;
    this._image = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._userId = data.userId;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
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
  toggleLike() {
    this._likeButton.classList.toggle('card__like-btn_focus');
  }

  isLiked() {
    return Boolean(this._likes.find((user) => {
      if(user._id === this._userId) {
        return user
      }
    }))
  }

  updateLikeCounter(likes) {
    this._likeCounter.textContent = likes.length;
    this._likes = likes;
  }

  delete() {
    this._element.remove();
    this._element = null;
  }

  _setDeleteButton() {
    this._element
      .querySelector('.card')
      .insertAdjacentHTML(
        'beforeend',
        '<button class="card__delete-btn" type="button" aria-label="удалить"></button>'
      )
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleCardLike(this._id);
    });

    if(this._ownerId === this._userId){
      this._element.querySelector('.card__delete-btn').addEventListener('click', () => {
        this._handleCardDelete(this._id);
      })
    }

    this._element.querySelector('.card__image')
      .addEventListener('click', () => {
        this._handleCardClick(this._image, this._title);
    }) 
  }

  createCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.card__like-btn');
    this._likeCounter = this._element.querySelector('.card__like-counter')
    
    if (this._userId === this._ownerId) {
      this._setDeleteButton();
    }

    if (this.isLiked()) {
      this.toggleLike();
    }
    
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._image;
    this._element.querySelector('.card__image').alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;
    this._element.querySelector('.card__like-counter').textContent = this._likes.length;
    
    return this._element;
  }
}

