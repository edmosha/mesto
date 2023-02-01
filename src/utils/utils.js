import Card from '../components/Card.js';

export function createCard(cardData) {
  const card = new Card(
    cardData, 
    '#card', { 
      handleCardClick: (image, title) => imagePopup.open(image, title) 
    })
  return card.createCard();
}