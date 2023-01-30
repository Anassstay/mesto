import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { selection, initialCards } from '../utils/constants.js';
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

// const formValidators = {};
// // Включение валидации
// const enableValidation = (input) => {
//   const formList = Array.from(document.querySelectorAll(input.formSelector));
//   formList.forEach((formElement) => {
//     const validator = new FormValidator(formElement, input);
//    // получаем данные из атрибута `name` у формы
//     const formName = formElement.getAttribute('name');
//     // в объект записываем под именем формы
//     formValidators[formName] = validator;
//     validator.enableValidation();
//   });
// };
// enableValidation(input);

// formValidators[ profileForm.getAttribute('name') ].resetValidation()   
//====> не совсем поняла, откуда берется profileForm, поэтому пока оставила старый код. И нужно ли что-то добавлять в formValidators
 

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
  validationPopupAddCard.toggleButtonState();
  validationPopupAddCard.resetValidation();
});

buttonOpenEditProfile.addEventListener('click', function () {
  popupWithFormEditProfile.open();
  const {name, info} = classUserInfo.getUserInfo();
  nameInput.value = name; 
  infoInput.value = info;
});