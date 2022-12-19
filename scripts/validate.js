const showInputError = (input, config) => {
const error = document.querySelector(`#${input.id}-error`); 
input.classList.add(config.inputErrorClass)
error.textContent = input.validationMessage
error.classList.add(config.ErrorClass)
}

const hideInputError = (input, config) => {
const error = document.querySelector(`#${input.id}-error`); 

input.classList.remove(config.inputErrorClass)
error.classList.remove(config.ErrorClass)
error.textContent = ''
}

const checkInputValidity = (input, config) => {
  if (input.validity.valid) {
    // скрыть ошибку
hideInputError(input, config)
  } else {
   // показать ошибку
showInputError(input, config)
  }
};

// 2. Сделать кнопку сохранить активной и неактивной
const toggleButtonState = (inputs, button, config) => {
  const isFormValid = inputs.every(input => input.validity.valid)

  if (isFormValid) {
    // Раздизейблить
    button.classList.remove(config.inactiveButtonClass)
    button.disabled = false

  } else {
    // Задизейблить
    button.classList.add(config.inactiveButtonClass)
    button.disabled = true
  }
};

// 3. Работа с массивами forms и inputs
const enableValidation = (config) => {
  const forms = [...document.querySelectorAll(config.formSelector)]
  forms.forEach(form => {
    const inputs = [...form.querySelectorAll(config.inputSelector)]
    const button = form.querySelector(config.submitButtonSelector)
    // для установки кнопок на формах при загрузке сайта в корректное положение
    toggleButtonState(inputs, button, config)

    inputs.forEach(input => {
      input.addEventListener('input', () => {
        checkInputValidity(input, config)
        toggleButtonState(inputs, button, config)
      })
    })
  })
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});