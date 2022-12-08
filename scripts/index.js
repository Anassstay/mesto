const popupEditProfile = document.querySelector('.popup_edit');
const popupOpenEditProfile = document.querySelector('.profile__edit-button');
const popupCloseEditProfile = popupEditProfile.querySelector('.popup__close-button');
const submitEditProfileForm = popupEditProfile.querySelector('.popup__content');
const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const infoInput = popupEditProfile.querySelector('.popup__input_type_info');
const profileName = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');

const popupAddCard = document.querySelector('.popup_add');
const popupOpenAddCard = document.querySelector('.profile__add-button');
const popupCloseAddCard = popupAddCard.querySelector('.popup__close-button');
const submitAddCardForm = popupAddCard.querySelector('.popup__content_add');
const cardsInputTitle = document.querySelector('.popup__input_add_name');
const cardsInputImage = document.querySelector('.popup__input_add_link');

const popupPhoto = document.querySelector('.popup_photo');
const popupClosePhoto = popupPhoto.querySelector('.popup__close-button');
const openImage = document.querySelector('.popup__image');
const openImageText = document.querySelector('.popup__image-text');

const cardsContainer = document.querySelector('.cards');
const cardsElements = document.querySelector('.elements');
const cardsTemplate = document.querySelector('#cards-template').content;

const openPopup = function (popup) {
  popup.classList.add('popup_opened');
}

const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
}

const openPopupEdit = function () { 
  popupOpenEditProfile.addEventListener('click', function () {
    openPopup(popupEditProfile)
  });
  nameInput.value = profileName.textContent; 
  infoInput.value = profileInfo.textContent;
}

popupCloseEditProfile.addEventListener('click', function () {
  closePopup(popupEditProfile)
})

function submitEditProfileFormHandler (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = infoInput.value;
  closePopup(popupEditProfile)
}

popupOpenEditProfile.addEventListener('click', openPopupEdit);
submitEditProfileForm.addEventListener('submit', submitEditProfileFormHandler);

popupOpenAddCard.addEventListener('click', function () {
  openPopup(popupAddCard)
})
popupCloseAddCard.addEventListener('click', function () {
  closePopup(popupAddCard)
})

function submitAddCardFormHandler (event) {
  event.preventDefault();
  cardsElements.prepend(createCard(cardsInputTitle.value, cardsInputImage.value));
  submitAddCardForm.reset();
  closePopup(popupAddCard);
}

submitAddCardForm.addEventListener('submit', submitAddCardFormHandler);

popupPhoto.addEventListener('click', function () {
  openPopup(popupPhoto)
})
popupClosePhoto.addEventListener('click', function () {
  closePopup(popupPhoto)
})
// строчкой выше прописала закрытие по крестику, но почему-то это не работает, хотя писала по аналогии с другими попапами. Поэтому ниже код для закрытия в любом месте на фото
popupPhoto.addEventListener('click', function () {
  closePopup(popupPhoto)
})

function createCard(cardsTitleValue, cardsImageValue) {
  const cards = cardsTemplate.querySelector('.cards').cloneNode(true);
  const cardsImage = cards.querySelector('.cards__image');
  cardsImage.src = cardsImageValue;
  cardsImage.alt = cardsTitleValue;
  cards.querySelector('.cards__title').textContent = cardsTitleValue;
  cards.querySelector('.cards__delete-button').addEventListener('click', function () {
    cards.remove();
  });

  cards.querySelector('.cards__like').addEventListener('click', function (event) {
    event.target.classList.toggle('cards__like_active');
  });

  cardsImage.addEventListener('click', function () {
    openPopup(popupPhoto);
    openImage.src = cardsImageValue;
    openImage.alt = cardsTitleValue; 
    openImageText.textContent = cardsTitleValue;
  });

  return cards;
}