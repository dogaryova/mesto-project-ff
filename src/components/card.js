import { addLikeCard, deleteLikeCard, deleteCardApi } from "./api";
function cardCreate(item, showImagePopup, id, likeCard, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const countLikes = cardElement.querySelector(".like-count");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  cardElement.addEventListener("click", (e) => {
    if(e.target.classList.contains('card__image')){
      const card = {
        name: e.target.alt,
        link: e.target.src,
      };
      showImagePopup(card);
    }
  
  });

  countLikes.textContent = item.likes.length;
  if (hasBeenLiked(item, id)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", (evt) =>
    likeCard(evt, item._id, likeButton, countLikes)
  );

  cardImage.addEventListener("click", () => {
    showImagePopup(item);
  });

  if (item.owner._id === id) {
    deleteButton.addEventListener("click", () =>
      deleteCard(item._id, cardElement)
    );
  } else {
    deleteButton.style.display = "none";
  }
  return cardElement;
}

function hasBeenLiked(item, id) {
  return item.likes.some((el) => el._id === id);
}

function likeCard(evt, id, likeButton, countLikes) {
  const likeMethod = evt.target.classList.contains(
    "card__like-button_is-active"
  )
    ? deleteLikeCard
    : addLikeCard;
  likeMethod(id)
    .then((upDateCard) => {
      likeButton.classList.toggle("card__like-button_is-active");
      countLikes.textContent = upDateCard.likes.length;
    })
    .catch((err) => console.log(err));
}

function deleteCard(id, cardElement) {
  deleteCardApi(id)
    .then(() => {
      cardElement.remove();
    })
    .catch((e) => {
      console.error("ошибка удаление карточки: " + e);
    });
}

export { cardCreate, likeCard, deleteCard };
