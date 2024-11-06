import "./pages/index.css";
//import { initialCards } from './components/cards';
import { openPopup, closePopup } from "./components/modal";
import { cardCreate, likeCard, deleteCard } from "./components/card";
import { enableValidation } from "./components/validation";
import {
  getProfileData,
  getInitialCards,
  newCardApi,
  editAvatarApi,
  editProfileData,
} from "./components/api";

export const selectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const listCard = document.querySelector(".places__list");
const buttonAddCard = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const editProfilPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const newCardPopupForm = newCardPopup.querySelector(".popup__form");
const newCardPopupFormBtn = newCardPopupForm.querySelector(".button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = editProfilPopup.querySelector(".popup__input_type_name");
const popupTypeImg = document.querySelector(".popup_type_image");
const inputJob = editProfilPopup.querySelector(
  ".popup__input_type_description"
);
const captionPopup = popupTypeImg.querySelector(".popup__caption");
const imgPopup = popupTypeImg.querySelector(".popup__image");
const profileFormEdit = editProfilPopup.querySelector(".popup__form");
const profileFormEditBtn = editProfilPopup.querySelector(".button");
const nameOfCardInput = document.querySelector(".popup__input_type_card-name");
const urlOfCardInput = document.querySelector(".popup__input_type_url");
const profileAvatar = document.querySelector(".profile__image");
const avatarPopupEdit = document.querySelector(".popup__avatar-edit");
const avatarPopupEditBtn = avatarPopupEdit.querySelector(".button");
const avatarPopupInput = document.querySelector(".popup__input_avatar-edit");
const editAvatarBtn = document.querySelector(".profile__image__edit-button");

let currentUserId = null;

Promise.all([getProfileData(), getInitialCards()])
  .then(([userProfile, initialCards]) => {
    currentUserId = userProfile._id;
    setDataProfile(userProfile);
    renderCards(initialCards, currentUserId);
  })
  .catch((e) => {
    console.error("ошибка " + e);
  });

function setDataProfile(data) {
  profileName.textContent = data.name;
  profileDescription.textContent = data.about;
  profileAvatar.style.backgroundImage = `url(${data.avatar})`;
}

function renderCards(cards, id) {
  cards.forEach((card) => {
    const dataEl = cardCreate(card, showImagePopup, id, likeCard, deleteCard);
    listCard.append(dataEl);
  });
}

//обработчик события открытия модального окна для редактирования
editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  inputJob.value = profileDescription.textContent;
  openPopup(editProfilPopup);
});

//обработчик события submit редактирование профиля
profileFormEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  profileFormEditBtn.textContent = "Сохранение...";
  editProfileData(nameInput.value, inputJob.value)
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(editProfilPopup);
    })
    .catch((e) => {
      console.error("ошибка редактирования профиля: " + e);
    })
    .finally(() => {
      profileFormEditBtn.textContent = "Сохранить";
    });
});

//обработчик события открытия модального окна с картинкой

//обработчик события  открытия попапа добовления новой карточки
buttonAddCard.addEventListener("click", () => {
  openPopup(newCardPopup);
});

//обработчик события добовления новой карточки
newCardPopupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  newCardPopupFormBtn.textContent = "Сохранение...";

  newCardApi(nameOfCardInput.value, urlOfCardInput.value)
    .then((cardElement) => {
      const card = cardCreate(
        cardElement,
        showImagePopup,
        currentUserId,
        likeCard,
        deleteCard
      );
      listCard.prepend(card);
    })
    .catch((e) => {
      console.error("ошибка добавления карточки: " + e);
    })
    .finally(() => {
      newCardPopupFormBtn.textContent = "Сохранить";
    });

  nameOfCardInput.value = "";
  urlOfCardInput.value = "";
  closePopup(newCardPopup);
});

function showImagePopup(card) {
  imgPopup.src = card.link;
  imgPopup.alt = card.name;
  captionPopup.textContent = card.name;
  openPopup(popupTypeImg);
}

editAvatarBtn.addEventListener("click", () => {
  openPopup(avatarPopupEdit);
});

avatarPopupEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  avatarPopupEditBtn.textContent = "Сохранение...";
  editAvatarApi(avatarPopupInput.value)
    .then((data) => {
      profileAvatar.style.backgroundImage = `url(${data.avatar})`;
      closePopup(avatarPopupEdit);
    })
    .catch((e) => {
      console.error("ошибка установки аватара: " + e);
    })
    .finally(() => {
      avatarPopupEditBtn.textContent = "Сохранить";
    });
});
//функция отображения карточек

document.querySelectorAll(".popup").forEach((popup) =>
  popup.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close")
    ) {
      closePopup(popup);
    }
  })
);
enableValidation(selectors);
