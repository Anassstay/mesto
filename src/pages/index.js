import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { selection, initialCards } from '../components/constants.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import './index.css';

// Задаем const

const cardsContainer = document.querySelector('.elements');
const popupEditProfile = document.querySelector('.popup_edit');
const buttonOpenEditProfile = document.querySelector('.profile__edit-button');
const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const infoInput = popupEditProfile.querySelector('.popup__input_type_info');
const popupAddCard = document.querySelector('.popup_add');
const buttonOpenAddCard = document.querySelector('.profile__add-button');

const openPopupPhoto = (textPhoto, imagePhoto) => {
  classPopupWithImage.open(textPhoto, imagePhoto);
};

const classPopupWithImage = new PopupWithImage('.popup_photo')
classPopupWithImage.setEventListeners();

// render
const renderNewCard = (item) => {
  const card = new Card (item, '#cards-template', openPopupPhoto);
  const cardElement = card.generateCard();
  return cardElement;
};

const classUserInfo = new UserInfo ({
  nameSelector: '.profile__title',
  infoSelector: '.profile__subtitle'
});

const classSection = new Section ({
  items: initialCards,
  renderer: (item) => {
    classSection.addItem(renderNewCard(item));
  }
}, 
cardsContainer
);

classSection.renderCards();

// валидация карточек через класс
const validationPopupEditProfile = new FormValidator(selection, popupEditProfile);
const validationPopupAddCard = new FormValidator(selection, popupAddCard);
validationPopupEditProfile.enableValidation();
validationPopupAddCard.enableValidation();

const popupWithFormEditProfile = new PopupWithForm ({
  formSubmit: (userData) => {
    classUserInfo.setUserInfo(userData);
  }
},
'.popup_edit'
);

popupWithFormEditProfile.setEventListeners();


const popupWithFormAddCard = new PopupWithForm ({
  formSubmit: (item) => {
    const createNewCard = renderNewCard(item);
    classSection.addItem(createNewCard);
  }
},
'.popup_add'
);

popupWithFormAddCard.setEventListeners();

buttonOpenAddCard.addEventListener('click', function () {
  popupWithFormAddCard.open();
});

buttonOpenEditProfile.addEventListener('click', function () {
  popupWithFormEditProfile.open();
  const {name, info} = classUserInfo.getUserInfo();
  nameInput.value = name; 
  infoInput.value = info;
});

// const formEditProfile = popupEditProfile.querySelector('.popup__content');
// const profileName = document.querySelector('.profile__title');
// const profileInfo = document.querySelector('.profile__subtitle');
// const cardsInputTitle = document.querySelector('.popup__input_add_name');
// const cardsInputImage = document.querySelector('.popup__input_add_link');

// const formPopupAddCard = popupAddCard.querySelector('.popup__content_add');
// const formPopupEditProfile = popupEditProfile.querySelector('.popup__content_edit');

// const renderNewCardData = 
//     {
//      name: cardsInputTitle.value,
//      link: cardsInputImage.value
//     };

// const popupPhoto = document.querySelector('.popup_photo');
// const imagePhoto = document.querySelector('.popup__image');
// const textPhoto = document.querySelector('.popup__image-text');

// const buttonCloseList = document.querySelectorAll('.popup__close-button');

// const openPopup = function (popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keyup', handleKeyEscape);
// };

// buttonCloseList.forEach(btn => {
//   const popup = btn.closest('.popup');
//   btn.addEventListener('click', () => closePopup(popup)); 
// });

// const closePopup = function (popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keyup', handleKeyEscape);
// };

// document.querySelectorAll('.popup').forEach( popup => {
//   popup.addEventListener('mousedown', (evt) => { 
//     if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) { 
//       closePopup(popup);
//     }; 
//   });
// });

// Функции
// Закрыть попап кликом на Escape
// function handleKeyEscape (evt) {
//   if (evt.key === 'Escape') {
//     const popupToClose = document.querySelector('.popup_opened');
//     closePopup(popupToClose);
//   };
// };

// function formEditProfileHandler (evt) {
//   evt.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileInfo.textContent = infoInput.value;
//   popupEditProfile.close();
// };

// function handleOpenPopup(name, link) {
//   popupPhoto.open();
//   imagePhotoPopup.src = link;
//   imagePhotoPopup.alt = name;
//   textPhotoPopup.textContent = name;
// };

// initialCards.forEach((item) => {
//   cardsContainer.prepend(renderNewCard(item));
// });

// Добавить новую карточку
// const createNewCard = (evt) => {
//   evt.preventDefault();
//   const renderNewCardData = 
//     {
//      name: cardsInputTitle.value,
//      link: cardsInputImage.value
//     };
//   cardsContainer.prepend(renderNewCard(renderNewCardData));
//   popupWithFormAddCard.close();
//   // formAddCard.reset();
//   validationPopupAddCard.toggleButtonState();
//   // вызыв функции вместо disabled. управляем кнопкой сабмита и очищаем поля формы от ошибок
//   // (после добавления карточки, кодом очищаем поля и не происходит события input, поэтому кнопка не валидируется и нужно вызвать это событие руками)
//  };

//  const profileSelectors = {
//   nameSelector: '.profile__title',
//   infoSelector: '.profile__subtitle'
// };



// formEditProfile.addEventListener('submit', formEditProfileHandler);


                                
// popupAddCard.addEventListener('submit', createNewCard);
// AddCard.addEventListener('submit', createNewCard);


// function renderCard() {
//   const renderNewCardData = 
//     {
//      name: cardsInputTitle.value,
//      link: cardsInputImage.value
//     };
//   const card = createCard(renderNewCardData);
//   const cardElement = card.createCard();
//   cardsContainer.addCard(cardElement);
// }

// const createNewCard = (evt) => {
//   evt.preventDefault();
//   const renderNewCardData = 
//     {
//      name: cardsInputTitle.value,
//      link: cardsInputImage.value
//     };
//   cardsContainer.prepend(renderNewCard(renderNewCardData));
//   popupWithFormAddCard.close();
//   // formAddCard.reset();
//   validationPopupAddCard.toggleButtonState();
//  };

// const classSection = new Section ({ items: initialCards, renderer: renderCard}, cardsContainer);

