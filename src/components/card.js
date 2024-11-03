import { addLikeCard, deleteLikeCard, deleteCardApi } from "./api";
function cardCreate(item, showImagePopup, id) {
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

  countLikes.textContent = item.likes.length;
  if (hasBeenLiked(item, id)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("card__like-button_is-active")) {
      deleteLikeCard(item._id)
        .then((upDateCard) => {
          likeButton.classList.remove("card__like-button_is-active");
          countLikes.textContent = upDateCard.likes.length;
        })
        .catch(console.error);
    } else {
      addLikeCard(item._id)
        .then((upDateCard) => {
          likeButton.classList.add("card__like-button_is-active");
          countLikes.textContent = upDateCard.likes.length;
        })
        .catch(console.error);
    }
  });

  cardImage.addEventListener("click", () => {
    showImagePopup(item);
  });

  if (item.owner._id === id) {
    deleteButton.addEventListener("click", () => {
      deleteCardApi(item._id)
        .then(() => {
          cardElement.remove();
        })
        .catch((e) => {
          console.error(e);
        });
    });
  } else {
    deleteButton.style.display = "none";
  }
  return cardElement;
}

function hasBeenLiked(item, id) {
  return item.likes.some((el) => el._id === id);
}

function likeCard(e) {
  e.target.classList.toggle("card__like-button_is-active");
  console.log("like");
}

function deleteCard(e) {
  e.target.closest(".places__item").remove();
  deleteCardApi(id);
}

export { cardCreate, likeCard, deleteCard };
