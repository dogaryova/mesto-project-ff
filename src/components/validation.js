// включение валидации вызовом enableValidation
// все настройки передаются при вызове

export const selectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function validateInput(input, formBtn) {
  input.addEventListener("input", () => {
    formBtn.removeAttribute("disabled");
    if (!input.validity.valid) {
      showErrorMessage(input, formBtn);
    } else {
      clearValidation(input);
    }
  });
}

function showErrorMessage(input, formBtn) {
  const errorMessage = input.validationMessage;
  const errorElement = input.nextElementSibling;
  input.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  formBtn.setAttribute("disabled", "disabled");
}

function clearValidation(input) {
  const errorElement = input.nextElementSibling;
  input.classList.remove(selectors.inputErrorClass);
  errorElement.textContent = "";
}

export function enableValidation(selectors) {
  const formList = document.querySelectorAll(selectors.formSelector);
  formList.forEach((form) => {
    const inputList = form.querySelectorAll(selectors.inputSelector);
    const formBtn = form.querySelector(selectors.submitButtonSelector);
    inputList.forEach((input) => validateInput(input, formBtn));
  });
}
