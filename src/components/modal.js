//функция открытия модального окна
function openPopup(popupElement) {
  popupElement.classList.add("popup_is-opened");
  popupElement.classList.add("popup_is-animated");
  document.addEventListener("keydown", closePopupByEsc);
}

//функция закрытия модального окна
function closePopup(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

//функция закрытия по Esc
function closePopupByEsc(e) {
  if (e.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}

function handelOwerlayClose(e) {
  if (e.target.classList.contains('popup') || (e.target.classList.contains('popup__close'))){
    closePopup(e.target)
  }
}

export { openPopup, closePopup, handelOwerlayClose };