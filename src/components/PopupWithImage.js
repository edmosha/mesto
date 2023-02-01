import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._element.querySelector('.popup__image');
    this._title = this._element.querySelector('.popup__sign');
  }

  open(image, title) {
    this._image.src = image;
    this._image.alt = title;
    this._title.textContent = title;

    super.open();
  }
}