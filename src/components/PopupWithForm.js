import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor ( { formSubmit }, popupSelector ) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputs = this._popup.querySelectorAll('.popup__input');
  };

  _getInputValues() {
    this._formValues = {};
    this._inputs.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  };

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
      this.close();
    });
  };

  close() {
    this._popupForm.reset();
    super.close();
  };
}