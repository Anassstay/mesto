import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor( popupSelector ) {
    super(popupSelector);
    this._imagePhotoPopup = this._popup.querySelector('.popup__image');
    this._textPhotoPopup = this._popup.querySelector('.popup__image-text');
  };

  open (textPhoto, imagePhoto) {
    this._imagePhotoPopup.src = imagePhoto;
    this._imagePhotoPopup.alt = textPhoto;
    this._textPhotoPopup.textContent = textPhoto;
    super.open();
  };
};