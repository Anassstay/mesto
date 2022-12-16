// Сделано по вебинару

  // 1. Показать и убрать ошибку
const checkInputValidity = (input, config) => {
  const error = document.querySelector(`#${input.id}-error`); 

  if (input.validity.valid) {
  // убрать ошибку
  error.textContent = ''
  error.classList.remove(config.ErrorClass)
  input.classList.remove(config.inputErrorClass)

  } else {
   // показать ошибку
   error.textContent = input.validationMessage
   error.classList.add(config.ErrorClass)
   input.classList.add(config.inputErrorClass)
  }
};

// 2. Сделать кнопку сохранить активной и неактивной
const toggleButtonState = (inputs, button, config) => {
  const isFormValid = inputs.every(input => input.validity.valid)

  if (isFormValid) {
    // Раздизейблить
    button.classList.remove(config.inactiveButtonClass)
    button.disabled = ''

  } else {
    // Задизейблить
    button.classList.add(config.inactiveButtonClass)
    button.disabled = 'disabled'
  }
};

// 3. Работа с массивами forms и inputs
const enableValidation = (config) => {
  const forms = [...document.querySelectorAll(config.formSelector)]
  forms.forEach(form => {
    const inputs = [...form.querySelectorAll(config.inputSelector)]
    const button = form.querySelector(config.submitButtonSelector)
  
    form.addEventListener('submit', (event) => {
      event.preventDefault()
    })
  
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