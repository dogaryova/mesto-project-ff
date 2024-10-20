import './pages/index.css'; 
import { initialCards } from './components/cards';
import { openPopup, closePopup } from './components/modal';
import { cardCreate, likeCard, deleteCard } from './components/card';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const listCard = document.querySelector('.places__list');
const buttonAddCard = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const editProfilPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardPopupForm = newCardPopup.querySelector('.popup__form');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = editProfilPopup.querySelector('.popup__input_type_name');
const popupTypeImg = document.querySelector('.popup_type_image');
const inputJob = editProfilPopup.querySelector('.popup__input_type_description');
const captionPopup = popupTypeImg.querySelector('.popup__caption');
const imgPopup = popupTypeImg.querySelector('.popup__image');
const profileFormEdit = editProfilPopup.querySelector('.popup__form');
const nameOfCardInput = document.querySelector('.popup__input_type_card-name');
const urlOfCardInput = document.querySelector('.popup__input_type_url');

//обработчик события открытия модального окна для редактирования 
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  inputJob.value = profileDescription.textContent;
  openPopup(editProfilPopup)
})

//обработчик события submit редактирование профиля 
profileFormEdit.addEventListener('submit', (e) => {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = inputJob.value;
  closePopup(editProfilPopup);
})

//обработчик события открытия модального окна с картинкой
listCard.addEventListener('click', (e) => {
  if (e.target.classList.contains('card__image')){
    const card = {
      name: e.target.alt,
      link: e.target.src
    }
    showImagePopup(card)
  }
})

//обработчик события  открытия попапа добовления новой карточки 
buttonAddCard.addEventListener('click', () => {
  openPopup(newCardPopup)
})

//обработчик события добовления новой карточки
newCardPopupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newCard = {
    name: nameOfCardInput.value,
    link: urlOfCardInput.value
  }
  const elCard = cardCreate(newCard, deleteCard, likeCard, showImagePopup);
  listCard.prepend(elCard)

  nameOfCardInput.value = '';
  urlOfCardInput.value = '';
  closePopup(newCardPopup)
})

function showImagePopup(card) {
  imgPopup.src = card.link;
  imgPopup.alt = card.name;
  captionPopup.textContent = card.name;
  console.log(popupTypeImg)
  openPopup(popupTypeImg)
}

renderCards();

//функция отображения карточек
function renderCards() {
  initialCards.forEach((card) => {
    const cardEl = cardCreate(card, deleteCard, likeCard, showImagePopup);
    listCard.append(cardEl);
  })
}

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