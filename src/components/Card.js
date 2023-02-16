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

  _removeDeleteButton() {
    this._deleteButton.remove();
  }

  toggleLike() {
    this._likeButton.classList.toggle('card__like-btn_focus');
  }

  isLiked() {
    return Boolean(this._likes.find((user) => {
      if(user._id === this._userId) { return user }
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

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleCardLike(this._id);
    });

    if(this._ownerId === this._userId){
      this._deleteButton.addEventListener('click', () => {
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
    this._deleteButton = this._element.querySelector('.card__delete-btn');
    this._likeCounter = this._element.querySelector('.card__like-counter');
    this._cardImage =  this._element.querySelector('.card__image');
    this._cardTitle =  this._element.querySelector('.card__title');

    this._cardImage.src = this._image;
    this._cardImage.alt = this._image;
    this._cardTitle.textContent = this._title;
    this._likeCounter.textContent = this._likes.length;
    
    if (this._userId !== this._ownerId) { this._removeDeleteButton() }
    if (this.isLiked()) { this.toggleLike() }
    
    this._setEventListeners();

    return this._element;
  }
}

