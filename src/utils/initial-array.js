const pushkinImage = new URL('../images/pushkin.jpg', import.meta.url);
const baikalImage = new URL('../images/baikal.jpg', import.meta.url);
const kaliningradImage = new URL('../images/kaliningrag.jpg', import.meta.url);
const ekaterinburgImage = new URL('../images/ekaterinburg.jpg', import.meta.url);
const svetlpgorskImage = new URL('../images/svetlpgorsk.jpg', import.meta.url);
const saintPetersburgImage = new URL('../images/saint-petersburg.jpg', import.meta.url);
 
export const initialCards = [
  { title: 'Пушкин', image: pushkinImage },
  { title: 'Байкал', image: baikalImage },
  { title: 'Калининград', image: kaliningradImage },
  { title: 'Екатеринбург', image: ekaterinburgImage },
  { title: 'Светлогорск', image: svetlpgorskImage },
  { title: 'Санкт-Перербург', image: saintPetersburgImage },
]; 