import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor ( { formSubmit }, popupSelector ) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._buttonSave = this._popup.querySelector('.popup__save-button');
    this._buttonSaveText = this._buttonSave.textContent;
  };

    // Собрать данные всех полей формы
  _getInputValues() {
    // Создать пустой объект
    this._formValues = {}; 
    // Собирать значения всех полей из формы
    this._inputs.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  };

  // Сбросить форму при закрытии
  close() {
    this._popupForm.reset();
    super.close();
  };

  setFormValues(data) {
    this._inputs.forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
  };


  // Поменять текст кнопки, пока данные грузятся
  setButtonText(loading) {
    if (loading) {
      this._buttonSave.textContent = 'Сохранение...'
    } else {
      this._buttonSave.textContent = this._buttonSaveText;
    };
  };

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
    });
  };

};