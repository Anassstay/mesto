// FormValidator
// Создайте класс FormValidator, который настраивает валидацию полей формы:
// принимает в конструктор объект настроек с селекторами и классами формы;
// принимает вторым параметром элемент той формы, которая валидируется;
// имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
// имеет публичный метод enableValidation, который включает валидацию формы.
// Для каждой проверяемой формы создайте экземпляр класса FormValidator..


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
    const error = document.querySelector(`#${input.id}-error`); 
    input.classList.add(this._inputErrorClass);
    error.textContent = input.validationMessage;
    error.classList.add(this._ErrorClass);
    };
  
  // 2. Удалить ошибку
  _hideInputError = (input) => {
    const error = document.querySelector(`#${input.id}-error`); 
    input.classList.remove(this._inputErrorClass);
    error.classList.remove(this._ErrorClass);
    error.textContent = '';
    };

  // 3. Проверка валидности
  _checkInputValidity = (input) => {
    if (input.validity.valid) {
    // скрыть ошибку
    this._hideInputError(input, input.validationMessage)
    } else {
    // показать ошибку
    this._showInputError(input);
    };
  };

  // 4. Сделать кнопку сохранить активной и неактивной
  _toggleButtonState = () => {
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
    this._formElement.addEventListener('reset', () => {
      this._toggleButtonState();
    });
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  };
};