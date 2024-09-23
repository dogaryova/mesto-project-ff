
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const listCard = document.querySelector('.places__list');
const buttonAddCard = document.querySelector('.profile__add-button');

// @todo: Функция создания карточки
function cardAdd(name, link, cardDelete) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  cardTitle.textContent = name;
  cardImage.setAttribute('src', link);
  cardImage.setAttribute('alt', name);
  cardElement.querySelector('.card__delete-button').addEventListener('click' , () => {
    cardDelete(cardElement)
  });
  return cardElement ;
};

// @todo: Функция удаления карточки
function cardDelete(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
function cardRender(container, cardData) {
  container.append(cardData);
}
initialCards.forEach((obj) => {
  cardRender(listCard, cardAdd(obj.name, obj.link, cardDelete));
})
