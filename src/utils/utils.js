import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';

const imagePopup = new PopupWithImage('.popup_type_view-picture');
imagePopup.setEventListeners();

export function createCard(cardData) {
  // const { name, link } = cardData;
  const card = new Card({
    data: cardData, 
    handleCardClick: (image, title) => imagePopup.open(image, title),
    handleCardDelete: () => {

    }
  }, '#card')

  return card.createCard();
}