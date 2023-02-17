export class FormValidator {
  constructor(selection, formElement) {
    this._formSelector = selection.formSelector;
    this._inputSelector = selection.inputSelector;
    this._submitButtonSelector = selection.submitButtonSelector;
    this._inactiveButtonClass = selection.inactiveButtonClass;
    this._inputErrorClass = selection.inputErrorClass;
    this._errorClass = selection.errorClass;
    this._formElement = formElement;
  };
  
  // 1. Добавить ошибку
  _showInputError = (input) => {
    const error = this._formElement.querySelector(`#${input.id}-error`); 
    input.classList.add(this._inputErrorClass);
    error.textContent = input.validationMessage;
    error.classList.add(this._errorClass);
    };
  
  // 2. Удалить ошибку
  _hideInputError = (input) => {
    const error = this._formElement.querySelector(`#${input.id}-error`); 
    input.classList.remove(this._inputErrorClass);
    error.classList.remove(this._errorClass);
    error.textContent = '';
    };

  // 3. Проверка валидности
  _checkInputValidity = (input) => {
    if (input.validity.valid) {
    // скрыть ошибку
    this._hideInputError(input, input.validationMessage);
    } else {
    // показать ошибку
    this._showInputError(input);
    };
  };

  // Метод для очистки ошибок и управления кнопкой
  resetValidation() {
    //управляем кнопкой
    this.toggleButtonState();
    this._inputs.forEach((input) => {
      //очищаем ошибки
      this._hideInputError(input) 
    });

  }

  // 4. Сделать кнопку сохранить активной и неактивной
  toggleButtonState = () => {
    const isFormValid = this._inputs.every(input => input.validity.valid)
      if (isFormValid) {
      // Раздизейблить
      this._button.classList.remove(this._inactiveButtonClass);
      this._button.disabled = false;
      } else {
      // Задизейблить
      this._button.classList.add(this._inactiveButtonClass);
      this._button.disabled = true;
    }
  };

  // 5. Работа с массивами forms и inputs
  enableValidation = () => {

    this._inputs = [...this._formElement.querySelectorAll(this._inputSelector)];
    this._button = this._formElement.querySelector(this._submitButtonSelector);
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    this.toggleButtonState();
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this.toggleButtonState();
      });
    });
  };
};