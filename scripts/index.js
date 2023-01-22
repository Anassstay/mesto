import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { selection, initialCards } from './constants.js';

// Задаем const

const cardsContainer = document.querySelector('.elements');
const popupEditProfile = document.querySelector('.popup_edit');
const buttonOpenEditProfile = document.querySelector('.profile__edit-button');
const formEditProfile = popupEditProfile.querySelector('.popup__content');
const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const infoInput = popupEditProfile.querySelector('.popup__input_type_info');
const profileName = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');

const popupAddCard = document.querySelector('.popup_add');
const buttonOpenAddCard = document.querySelector('.profile__add-button');
const cardsInputTitle = document.querySelector('.popup__input_add_name');
const cardsInputImage = document.querySelector('.popup__input_add_link');

const popupPhoto = document.querySelector('.popup_photo');
const imagePhotoPopup = document.querySelector('.popup__image');
const textPhotoPopup = document.querySelector('.popup__image-text');

const buttonCloseList = document.querySelectorAll('.popup__close-button');

const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', handleKeyEscape);
};

// buttonCloseList.forEach(btn => {
//   const popup = btn.closest('.popup');
//   btn.addEventListener('click', () => closePopup(popup)); 
// });

const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleKeyEscape);
};

document.querySelectorAll('.popup').forEach( popup => {
  popup.addEventListener('mousedown', (evt) => { 
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) { 
      closePopup(popup);
    }; 
  });
});

// Функции
// Закрыть попап кликом на Escape
function handleKeyEscape (evt) {
  if (evt.key === 'Escape') {
    const popupToClose = document.querySelector('.popup_opened');
    closePopup(popupToClose);
  };
};

function formEditProfileHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = infoInput.value;
  closePopup(popupEditProfile);
};

function handleOpenPopup(name, link) {
  openPopup(popupPhoto);
  imagePhotoPopup.src = link;
  imagePhotoPopup.alt = name;
  textPhotoPopup.textContent = name;
};

const formAddCard = popupAddCard.querySelector('.popup__content_add');

// render
const renderNewCard = (item) => {
  const card = new Card (item, '#cards-template', handleOpenPopup);
  const cardElement = card.generateCard();
  return cardElement;
}

initialCards.forEach((item) => {
  cardsContainer.prepend(renderNewCard(item));
});

// Добавить новую карточку
const newCard = (evt) => {
  evt.preventDefault();
  const renderNewCardData = 
    {
     name: cardsInputTitle.value,
      link: cardsInputImage.value
    };
  cardsContainer.prepend(renderNewCard(renderNewCardData));
  closePopup(popupAddCard);
  formAddCard.reset();
 };

// валидация карточек через класс
const validationPopupEditProfile = new FormValidator(selection, popupEditProfile);
const validationPopupAddCard = new FormValidator(selection, popupAddCard);
validationPopupEditProfile.enableValidation();
validationPopupAddCard.enableValidation();

validationPopupAddCard.toggleButtonState();

buttonOpenEditProfile.addEventListener('click', function () {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent; 
  infoInput.value = profileInfo.textContent;
});

formEditProfile.addEventListener('submit', formEditProfileHandler);

buttonOpenAddCard.addEventListener('click', function () {
  openPopup(popupAddCard);
});
                                
popupAddCard.addEventListener('submit', newCard);