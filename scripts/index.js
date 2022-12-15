const cardsContainer = document.querySelector('.cards');
const cardsElements = document.querySelector('.elements');
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

const popupPhoto = document.querySelector('.popup_photo');
const buttonClosePhoto = popupPhoto.querySelector('.popup__close-button');
const imagePhotoPopup = document.querySelector('.popup__image');
const textPhotoPopup = document.querySelector('.popup__image-text');

const openPopup = function (popup) {
  popup.classList.add('popup_opened');
}

const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
}

function formEditProfileHandler (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = infoInput.value;
  closePopup(popupEditProfile)
}

function formAddCardHandler (event) {
  event.preventDefault();
  cardsElements.prepend(createCard(cardsInputTitle.value, cardsInputImage.value));
  formAddCard.reset();
  closePopup(popupAddCard);
}

function createCard(cardsTitleValue, cardsImageValue) {
  const card = cardsTemplate.querySelector('.cards').cloneNode(true);
  const cardsImage = card.querySelector('.cards__image');
  cardsImage.src = cardsImageValue;
  cardsImage.alt = cardsTitleValue;
  card.querySelector('.cards__title').textContent = cardsTitleValue;
  card.querySelector('.cards__delete-button').addEventListener('click', function () {
    card.remove();
  });

buttonOpenEditProfile.addEventListener('click', function () {
  openPopup(popupEditProfile)
  nameInput.value = profileName.textContent; 
  infoInput.value = profileInfo.textContent;
});

buttonCloseEditProfile.addEventListener('click', function () {
  closePopup(popupEditProfile)
})

formEditProfile.addEventListener('submit', formEditProfileHandler);

buttonOpenAddCard.addEventListener('click', function () {
  openPopup(popupAddCard)
})
buttonCloseAddCard.addEventListener('click', function () {
  closePopup(popupAddCard)
})

formAddCard.addEventListener('submit', formAddCardHandler);

buttonClosePhoto.addEventListener('click', function () {
  closePopup(popupPhoto)
})

card.querySelector('.cards__like').addEventListener('click', function (event) {
    event.target.classList.toggle('cards__like_active');
  });

cardsImage.addEventListener('click', function () {
  openPopup(popupPhoto);
  imagePhotoPopup.src = cardsImageValue;
  imagePhotoPopup.alt = cardsTitleValue; 
  textPhotoPopup.textContent = cardsTitleValue;
});

  return card;
}