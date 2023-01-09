import { Card } from './Card.js';
import { selection, initialCards } from './constants.js';

// Задаем const

const cardsContainer = document.querySelector('.elements');
const cardsTemplate = document.querySelector('#cards-template').content;

const popupEditProfile = document.querySelector('.popup_edit');
const buttonOpenEditProfile = document.querySelector('.profile__edit-button');
const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close-button');
const formEditProfile = popupEditProfile.querySelector('.popup__content');
const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const infoInput = popupEditProfile.querySelector('.popup__input_type_info');
const profileName = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');

const popupAddCard = document.querySelector('.popup_add');
const buttonOpenAddCard = document.querySelector('.profile__add-button');
const buttonCloseAddCard = popupAddCard.querySelector('.popup__close-button');
const formAddCard = popupAddCard.querySelector('.popup__content_add');
const cardsInputTitle = document.querySelector('.popup__input_add_name');
const cardsInputImage = document.querySelector('.popup__input_add_link');

export const popupPhoto = document.querySelector('.popup_photo');
const buttonClosePhoto = popupPhoto.querySelector('.popup__close-button');
export const imagePhotoPopup = document.querySelector('.popup__image');
export const textPhotoPopup = document.querySelector('.popup__image-text');

const buttonCloseList = document.querySelectorAll('.popup__close-button');

export const openPopup = function (popup) {
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

initialCards.forEach(function(item) {
  cardsContainer.append(createCard(item.name, item.link));
  });


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

function formEditProfileHandler (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = infoInput.value;
  closePopup(popupEditProfile)
}

function formAddCardHandler (event, popup) {
  event.preventDefault();
  cardsContainer.prepend(createCard(cardsInputTitle.value, cardsInputImage.value));
  formAddCard.reset();
  event.submitter.classList.add('popup__save-button_disabled')
  event.submitter.disabled = true
  closePopup(popupAddCard);
}

function createCard(cardsTitleValue, cardsImageValue) {
  const cards = cardsTemplate.querySelector('.cards').cloneNode(true);///
  const cardsImage = cards.querySelector('.cards__image');///
  cardsImage.src = cardsImageValue;///
  cardsImage.alt = cardsTitleValue;///
  cards.querySelector('.cards__title').textContent = cardsTitleValue;///
  cards.querySelector('.cards__delete-button').addEventListener('click', function () {
    cards.remove();
  });///
  cards.querySelector('.cards__like').addEventListener('click', function (event) {
    event.target.classList.toggle('cards__like_active');
  });///
  cardsImage.addEventListener('click', function () {
    openPopup(popupPhoto);
    imagePhotoPopup.src = cardsImageValue;
    imagePhotoPopup.alt = cardsTitleValue; 
    textPhotoPopup.textContent = cardsTitleValue;
  });///
  return cards;
}

// Добавить новую карточку
const addNewCard = (evt) => {
  evt.preventDefault(); 
  const newCardNameAndLink = 
    {
      name: cardsInputTitle.value,
      link: cardsInputImage.value
    };
  const card = new Card (newCardNameAndLink.name, newCardNameAndLink.link, '#card');
  const cardElement = card.generateCard();
  document.querySelector('.elements').prepend(cardElement);
  closePopup(popup);
}

// Создать карточку через класс Card
initialCards.forEach((item) => {
  const card = new Card(item.name, 'cards');
  const cardElement = card.generateCard();
  
  // Добавляем в DOM
  document.querySelector('.elements').append(cardElement);
  });


buttonOpenEditProfile.addEventListener('click', function () {
  openPopup(popupEditProfile)
  nameInput.value = profileName.textContent; 
  infoInput.value = profileInfo.textContent;
});

formEditProfile.addEventListener('submit', formEditProfileHandler);

buttonOpenAddCard.addEventListener('click', function () {
  openPopup(popupAddCard)
});

formAddCard.addEventListener('submit', formAddCardHandler);