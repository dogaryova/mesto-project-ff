function cardCreate(item, deleteCard, likeCard, showImagePopup) {
  const cardTemplate = document.querySelector('#card-template').content
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  likeButton.addEventListener('click', likeCard);
  deleteButton.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', () => {
    showImagePopup(item)
  });

  return cardElement ;
};

function likeCard(e) {
  e.target.classList.toggle('card__like-button_is-active');
  console.log('like')
}

function deleteCard(e) {
  e.target.closest('.places__item').remove();
  console.log('delete')
}

export { cardCreate, likeCard, deleteCard }