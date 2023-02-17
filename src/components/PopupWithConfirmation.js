import { Popup } from "./Popup";

export class PopupWithConfirmation extends Popup {
  constructor( popupSelector ) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupSaveButton = this._popup.querySelector('.popup__save-button');
  };

  handleFormSubmit(submit) {
    this._handleFormSubmit = submit;
  }

  setTextButton(text) {
    this._popupSaveButton.textContent = text;
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
    super.setEventListeners();
  };
}
