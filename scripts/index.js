///////////////////Выборка DOM-элементов для попапа редактирования профиля////////////////////////////

// Сам попап
const popupElement = document.querySelector('.popup_edit');

// Окно закрывающее попап
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');

// Кнопка открывающая попап
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

const formElement = popupElement.querySelector('.popup__content');
const nameInput = popupElement.querySelector('.popup__input_type_name');
const infoInput = popupElement.querySelector('.popup__input_type_info');
const profileName = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');

// Для передачи инфы из попапа добавления в темплейт
const cardsContainer = document.querySelector('.cards');
const cardsInputTitle = document.querySelector('.popup__input_add_name');
const cardsInputImage = document.querySelector('.popup__input_add_link');

///////////////////Выборка DOM-элементов для попапа добавления карточек////////////////////////////

// Сам попап
const popupElementAdd = document.querySelector('.popup_add');
// Окно закрывающее попап
const popupCloseButtonElementAdd = popupElementAdd.querySelector('.popup__close-button');

// Кнопка открывающее попап
const popupOpenButtonElementAdd = document.querySelector('.profile__add-button');

const formElementAdd = popupElementAdd.querySelector('.popup__content_add');
const nameInputAdd = popupElementAdd.querySelector('.popup__input_add_name');
const linkInputAdd = popupElementAdd.querySelector('.popup__input_add_link');

const openImage = document.querySelector('.popup__image');
const openImageText = document.querySelector('.popup__image-text');


// Подключаю template

const cardsElements = document.querySelector('.elements');
const cardsTemplate = document.querySelector('#cards-template').content.querySelector('.elements__card');
// const cardsTitle = cards.querySelector('.cards__title');
// const cardsImage = cards.querySelector('.cards__image');
// const cardsDeleteButton = cards.querySelector('.cards__delete-button');
// const cardsLikeButton = cards.querySelector('.cards__like');


// Открыть попап  
const openPopup = function () {
    popupElement.classList.add('popup_opened');
      nameInput.value = profileName.textContent;
      infoInput.value = profileInfo.textContent;
}

// Закрыть попап
const closePopup = function () {
    popupElement.classList.remove('popup_opened');
}

// // Закрыть при клике за пределами попапа
// const closePopupByClickOnOverlay = function (event) {
//     if (event.target === event.currentTarget) {
//         closePopup();
//     }
// }

//Обработка отправки введенных в попап данных
function formSubmitHandler(evt) {
    evt.preventDefault(); // строчка отменяет стандартную отправку формы
    // const addValue = {
    //   name: cardsInputTitle.value,
    //   link: cardsInputImage.value
    // }
    // cardsContainer.prepend(createElement(addValue))
    profileName.textContent = nameInput.value;
    profileInfo.textContent = infoInput.value;
    closePopup();
}

//Регистрируем обработчики событий по клику
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
// popupElement.addEventListener('click', closePopupByClickOnOverlay);
formElement.addEventListener('submit', formSubmitHandler);



// Открыть попап
const openPopupAdd = function () {
    popupElementAdd.classList.add('popup_opened');
}

// Закрыть попап
const closePopupAdd = function () {
    popupElementAdd.classList.remove('popup_opened');
}

// // Закрыть при клике за пределами попапа
// const closePopupAddByClickOnOverlay = function (event) {
//     if (event.target === event.currentTarget) {
//         closePopup(closePopupAdd);
//     }
// }

//Обработка отправки введенных в попап данных
function addFormSubmitHandler(event) {
    event.preventDefault(); // строчка отменяет стандартную отправку формы
    const addValue = {
      name: cardsInputTitle.value,
      link: cardsInputImage.value
    }
    cardsContainer.prepend(createElement(addValue))
    closePopupAdd();
}

//Регистрируем обработчики событий по клику

// popupOpenButtonElementAdd.addEventListener('click', openPopupAdd);
popupCloseButtonElementAdd.addEventListener('click', closePopupAdd);
// popupElementAdd.addEventListener('click', closePopupAddByClickOnOverlay);
formElementAdd.addEventListener('submit', addFormSubmitHandler);

popupOpenButtonElementAdd.addEventListener('click', () => {
  cardsInputTitle.value = "";
  cardsInputImage.value = "";
  openPopupAdd();
})

// Массив карточек
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

function createElement(cardsTitleValue, cardsImageValue) {
// клонируем содержимое тега template
const cards = cardsTemplate.querySelector().cloneNode(true).content;

// наполняем содержимым
cards.querySelector('.cards__title').textContent = cardsTitleValue;
cards.querySelector('.cards__image').src = cardsImageValue;
cards.querySelector('.cards__image').alt = cardsTitleValue;

// Обработчик событий для кнопки удаления
cards.querySelector('.cards__delete-button').addEventListener('click', function () {
  cards.remove();
});

// Обработчик событий для кнопки лайка
cards.querySelector('.cards__like').addEventListener('click', function (event) {
  event.target.classList.toggle('cards__like_active');
});

cards.querySelector('.cards__image').addEventListener('click', function () {
  openPopup();
  openImageText.textContent= cardsTitleValue;
  openImageText = cardsTitleValue;
  openImage.src = cardsImageValue;
});


return cards;
}

function handleCardsFormSubmit(event) {
  event.preventDefault(); // строчка отменяет стандартную отправку формы
  cardsElements.prepend(createElement(cardsInputTitle.value, cardsInputImage.value));
  cardsInputTitle.value = ' '; // Очищаем форму
  cardsInputImage.value = ' ';
  closePopup();
}

form.addEventListener('submit', handleCardsFormSubmit);

initialCards.forEach(function(item) {
  cardsElements.append(createElement(item.name, item.link));
});