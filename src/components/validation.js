const showInputError = (formPopup, inputPopup, errorMessage, selectors) => {
  console.log(inputPopup+' showInputError')
  const errorElement = formPopup.querySelector(`.${inputPopup.id}-error`);
  inputPopup.classList.add(selectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.errorClass);
};
const hideInputError = (formPopup, inputPopup, selectors) => {
  console.log(inputPopup)
  const errorElement = formPopup.querySelector(`.${inputPopup.id}-error`);
  inputPopup.classList.remove(selectors.inputErrorClass);
  errorElement.classList.remove(selectors.errorClass);
  errorElement.textContent = "";
};

function setBtnDisabledState(btn,isDisable) {
  btn.disabled = isDisable;
}


function validateInput(form, input, formBtn, selectors) {
  input.addEventListener("input", () => { 
    setBtnDisabledState(formBtn, !form.checkValidity()) 
      if (!input.validity.valid) { 
        showErrorMessage(input, form, selectors); 
      } else { 
        hideInputError(form,input, selectors); 
      } 
    });
  }


function showErrorMessage(input, form, selectors) {

  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  };

  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage,  selectors);
  } else {
    hideInputError(form, input,  selectors);
  };
}



export function enableValidation(selectors) {
  const formList = document.querySelectorAll(selectors.formSelector);
  formList.forEach((form) => {
    const inputList = form.querySelectorAll(selectors.inputSelector);
    const formBtn = form.querySelector(selectors.submitButtonSelector);
    inputList.forEach((input) => validateInput(form , input, formBtn, selectors));
  });
}
