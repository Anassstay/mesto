// Доброго времени суток!) Очень тяжелая пр была для меня, но вроде что-то получилось.
// Закомментированный код старый, потом удалю. Пока "черновой" вариант

import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { selection, initialCards } from './constants.js';

// Задаем const

const cardsContainer = document.querySelector('.elements');
const cardsTemplate = document.querySelector('#cards-template').content;

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
}

buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup)); 
})

const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleKeyEscape);
}

document.querySelectorAll('.popup').forEach( popup => {
  popup.addEventListener('mousedown', (evt) => { 
    if (evt.target === evt.currentTarget) { 
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
  }
}

function formEditProfileHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = infoInput.value;
  closePopup(popupEditProfile)
}

function handleOpenPopup(name, link) {
  openPopup(popupPhoto);
  imagePhotoPopup.src = link;
  imagePhotoPopup.alt = name;
  textPhotoPopup.textContent = name;
}

const formAddCard = popupAddCard.querySelector('.popup__content_add');

// render
const renderNewCard = (item) => {
  const card = new Card (item, '#cards-template', handleOpenPopup);
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
}
// Не поняла, куда выносить вставку в контейнер. Ведь если выношу просто за пределы функции - CardElement недоступен.Ы


// Создать карточку через класс Card
initialCards.forEach((item) => {
  renderNewCard(item)
  });

// Добавить новую карточку
const addNewCard = (evt) => {
  evt.preventDefault();
  const renderNewCardData = 
    {
     name: cardsInputTitle.value,
      link: cardsInputImage.value
    }
  renderNewCard(renderNewCardData)
  closePopup(popupAddCard);
  formAddCard.reset();
  evt.submitter.classList.add('popup__save-button_disabled')
  evt.submitter.disabled = true
 }

  // валидация карточек через класс
const validationPopupEditProfile = new FormValidator(selection, popupEditProfile);
const validationPopupAddCard = new FormValidator(selection, popupAddCard);
validationPopupEditProfile.enableValidation();
validationPopupAddCard.enableValidation();



//////////
// formAddCard.addEventListener('submit', formAddCardHandler);    

buttonOpenEditProfile.addEventListener('click', function () {
  openPopup(popupEditProfile)
  nameInput.value = profileName.textContent; 
  infoInput.value = profileInfo.textContent;
});

formEditProfile.addEventListener('submit', formEditProfileHandler);

buttonOpenAddCard.addEventListener('click', function () {
  openPopup(popupAddCard)
});
                                
popupAddCard.addEventListener('submit', addNewCard);

imagePhotoPopup.addEventListener('click', handleOpenPopup);


/// лишнее и не использованное

// initialCards.forEach(function(item) {
//   cardsContainer.append(createCard(item.name, item.link));
//   });


// function formAddCardHandler (evt, popup) {
//   evt.preventDefault();
//   cardsContainer.prepend(createCard(cardsInputTitle.value, cardsInputImage.value));
//   formAddCard.reset();
//   evt.submitter.classList.add('popup__save-button_disabled')
//   evt.submitter.disabled = true
//   closePopup(popupAddCard);
// }

// function formAddCardHandler (evt, popup, name, link) {
//   evt.preventDefault();
//   cardsContainer.prepend(new Card(renderNewCardData.name, renderNewCardData.link, '#cards-template'));
//   formAddCard.reset();
//   evt.submitter.classList.add('popup__save-button_disabled')
//   evt.submitter.disabled = true
//   closePopup(popupAddCard);
// }



// function createCard(cardsTitleValue, cardsImageValue) {
//   const cards = cardsTemplate.querySelector('.cards').cloneNode(true);
//   const cardsImage = cards.querySelector('.cards__image');
//   cardsImage.src = cardsImageValue;
//   cardsImage.alt = cardsTitleValue;
//   cards.querySelector('.cards__title').textContent = cardsTitleValue;
//   cards.querySelector('.cards__delete-button').addEventListener('click', function () {
//     cards.remove();
//   });
//   cards.querySelector('.cards__like').addEventListener('click', function (event) {
//     event.target.classList.toggle('cards__like_active');
//   });
//   cardsImage.addEventListener('click', function () {
//     openPopup(popupPhoto);
//     imagePhotoPopup.src = cardsImageValue;
//     imagePhotoPopup.alt = cardsTitleValue; 
//     textPhotoPopup.textContent = cardsTitleValue;
//   });
//   return cards;
// }




// const renderNewCard = (data, ) => {
//   evt.preventDefault();
//   const renderNewCardData = 
//     {
//       name: cardsInputTitle.value,
//       link: cardsInputImage.value
//     };
//   const card = new Card (renderNewCardData.name, renderNewCardData.link, '#cards-template');
//   const cardElement = card.generateCard();
//   document.querySelector('.elements').prepend(cardElement);
//   closePopup(popupAddCard);
// }

// initialCards.forEach((data) => {
//   renderNewCard(data)
// })

// const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close-button');
// const buttonClosePhoto = popupPhoto.querySelector('.popup__close-button');
// const buttonCloseAddCard = popupAddCard.querySelector('.popup__close-button');
  