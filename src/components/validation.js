// включение валидации вызовом enableValidation
// все настройки передаются при вызове
function isDisableBtn(btn,isDisable) {
  btn.disable = isDisable;
}

function validateInput(input, formBtn, selectors) {
  input.addEventListener("input", () => {
    isDisableBtn(formBtn,false)
    if (!input.validity.valid) {
      showErrorMessage(input, formBtn, selectors);
    } else {
      clearValidation(input, selectors);
    }
  });
}

function showErrorMessage(input, formBtn, selectors) {
  const errorMessage = input.validationMessage;
  const errorElement = input.nextElementSibling;
  input.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  isDisableBtn(formBtn,true);
}

function clearValidation(input, selectors) {
  const errorElement = input.nextElementSibling;
  input.classList.remove(selectors.inputErrorClass);
  errorElement.textContent = "";
}

export function enableValidation(selectors) {
  const formList = document.querySelectorAll(selectors.formSelector);
  formList.forEach((form) => {
    const inputList = form.querySelectorAll(selectors.inputSelector);
    const formBtn = form.querySelector(selectors.submitButtonSelector);
    inputList.forEach((input) => validateInput(input, formBtn, selectors));
  });
}
