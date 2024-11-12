

const showInputError = (formPopup, inputPopup, errorMessage, selectors) => {
  console.log(inputPopup + " showInputError");
  const errorElement = formPopup.querySelector(`.${inputPopup.id}-error`);
  inputPopup.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.errorClass);
};
const hideInputError = (formPopup, inputPopup, selectors) => {
  console.log(inputPopup);
  const errorElement = formPopup.querySelector(`.${inputPopup.id}-error`);
  inputPopup.classList.remove(selectors.inputErrorClass);
  errorElement.classList.remove(selectors.errorClass);
  errorElement.textContent = "";
};

function validateInput(form, input, selectors) {
  input.addEventListener("input", () => {
  
    if (input.validity.valid) {
      showErrorMessage(input, form, selectors);
    } else {
      clearValidation(form, selectors);
    }
  });
}

function showErrorMessage(input, form, selectors) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }

  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, selectors);
  } else {
    hideInputError(form, input, selectors);
  }
}
export const clearValidation = (formPopup, selectors) => {
  const inputList = Array.from(
    formPopup.querySelectorAll(selectors.inputSelector)
  );
  const buttonElement = formPopup.querySelector(selectors.submitButtonSelector);
  inputList.forEach((inputPopup) => {
    hideInputError(formPopup, inputPopup, selectors);
  });
  buttonElement.disabled = true;
  buttonElement.classList.add(selectors.inactiveButtonClass);
};

export function enableValidation(selectors) {
  const formList = document.querySelectorAll(selectors.formSelector);
  formList.forEach((form) => {
    const inputList = form.querySelectorAll(selectors.inputSelector);
  
    inputList.forEach((input) =>
      validateInput(form, input, selectors)
    );
  });
}
