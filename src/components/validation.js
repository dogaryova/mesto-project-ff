const showInputError = (formPopup, inputPopup, errorMessage, selectors) => {
  const errorElement = formPopup.querySelector(`.${inputPopup.id}-error`);
  inputPopup.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.errorClass);
};

const hideInputError = (formPopup, inputPopup, selectors) => {
  const errorElement = formPopup.querySelector(`.${inputPopup.id}-error`);
  inputPopup.classList.remove(selectors.inputErrorClass);
  errorElement.classList.remove(selectors.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formPopup, inputPopup, selectors) => {
  if (inputPopup.validity.patternMismatch) {
    inputPopup.setCustomValidity(
      inputPopup.dataset.errorMessage || "Некорректное значение"
    );
  } else {
    inputPopup.setCustomValidity("");
  }

  if (!inputPopup.validity.valid) {
    showInputError(
      formPopup,
      inputPopup,
      inputPopup.validationMessage,
      selectors
    );
  } else {
    hideInputError(formPopup, inputPopup, selectors);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

const disableSubmitButton = (buttonElement, selectors) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(selectors.inactiveButtonClass);
};

const enableSubmitButton = (buttonElement, selectors) => {
  buttonElement.disabled = false;
  buttonElement.classList.remove(selectors.inactiveButtonClass);
};

const toggleButtonState = (inputList, buttonElement, selectors) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, selectors);
  } else {
    enableSubmitButton(buttonElement, selectors);
  }
};

const setEventListeners = (formPopup, selectors) => {
  const inputList = Array.from(
    formPopup.querySelectorAll(selectors.inputSelector)
  );
  const buttonElement = formPopup.querySelector(selectors.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, selectors);

  inputList.forEach((inputPopup) => {
    inputPopup.addEventListener("input", () => {
      checkInputValidity(formPopup, inputPopup, selectors);
      toggleButtonState(inputList, buttonElement, selectors);
    });
  });
};

export const enableValidation = (selectors) => {
  const formList = Array.from(
    document.querySelectorAll(selectors.formSelector)
  );
  formList.forEach((formPopup) => {
    formPopup.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formPopup, selectors);
  });
};

export const clearValidation = (formPopup, selectors) => {
  const inputList = Array.from(
    formPopup.querySelectorAll(selectors.inputSelector)
  );
  const buttonElement = formPopup.querySelector(selectors.submitButtonSelector);

  inputList.forEach((inputPopup) => {
    hideInputError(formPopup, inputPopup, selectors);
  });

  disableSubmitButton(buttonElement, selectors);
};
