// извиняюсь, что на первое ревью отправила пустую работу, я случайно. Не получилось реализовать все до конца, я запуталась. эта тема дается нелегко((

///////////////////Выборка DOM-элементов////////////////////////////

// Все попапы
const popup = document.querySelector('.popup');

// Окно закрывающее попап редактирования
const popupCloseButtonElement = popup.querySelector('.popup__close-button');

// Попап редактирования
const popupElementEdit = document.querySelector('.popup_edit');

// Форма попапа редактирования
// form общее
const formElement = popupElementEdit.querySelector('.popup__content');
// Имя, о себе
const nameInput = popupElementEdit.querySelector('.popup__input_type_name');
const infoInput = popupElementEdit.querySelector('.popup__input_type_info');

// Кнопка открывающая попап редактирования
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

// Профиль на странице, куда передаваться будет информация из попапа
const profileName = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');

// Темплейт
const cardsContainer = document.querySelector('.cards');

// Сам попап добавления карточек
const popupElementAdd = document.querySelector('.popup_add');

// Форма попапа добавления карточек
const cardsInputTitle = document.querySelector('.popup__input_add_name');
const cardsInputImage = document.querySelector('.popup__input_add_link');

// div попапа добавления карточек
const formElementAdd = popupElementAdd.querySelector('.popup__content_add');

// Окно закрывающее опап добавления
const popupCloseButtonElementAdd = popupElementAdd.querySelector('.popup__close-button');

// Кнопка открывающее попап редактирования
const popupOpenButtonElementAdd = document.querySelector('.profile__add-button');


// div открытия фото img и text
const openImage = document.querySelector('.popup__image');
const openImageText = document.querySelector('.popup__image-text');

// Попап открытия фото
const popupContainerPhoto = document.querySelector('.popup_photo')

// попап закрытия фото
const popupCloseButtonElementPhoto = popupContainerPhoto.querySelector('.popup__close-button');

// Подключаю template
const cardsElements = document.querySelector('.elements');
const cardsTemplate = document.querySelector('#cards-template').content;

// Открыть попап редактирования инф, пыталась реализовать через общую функцию, но попап не открывается
const openPopupEdit = function () { 
  popupElementEdit.classList.add('popup_opened');
   // Из страницы в профиле подставить значение в форму попапа редактирования
  nameInput.value = profileName.textContent; 
  infoInput.value = profileInfo.textContent; 
}

// Закрыть попап редактирования инф, пыталась реализовать через общую функцию, но попап не открывается
const closePopupEdit = function () { 
  popupElementEdit.classList.remove('popup_opened');
} 

// Общая функция - открыть попап . не работает
// function openPopup(popup) {
//   popup.classList.add('popup_opened');
// }

// Общая функция - закрыть попап . не работает
// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
// }

// // Закрыть при клике за пределами попапа
// const closePopupByClickOnOverlay = function (event) {
//     if (event.target === event.currentTarget) {
//         closePopup();
//     }
// }

//Обработка отправки введенных в попап данных
function formSubmitHandler(event) {
  // эта строчка отменяет стандартную отправку формы
  event.preventDefault();
  // Из попапа редактирования подставить значения в профиль
  profileName.textContent = nameInput.value;
  profileInfo.textContent = infoInput.value;
  closePopupEdit();
}

//Регистрируем обработчики событий по клику
// popupElementEdit.addEventListener('click', closePopupByClickOnOverlay);
popupOpenButtonElement.addEventListener('click', openPopupEdit); 
popupCloseButtonElement.addEventListener('click', closePopupEdit); 
formElement.addEventListener('submit', formSubmitHandler);

/////////////////////////////////////////////////////////////////////////////////

// Открыть попап добавления, пыталась реализовать через общую функцию, но попап не открывается
const openPopupAdd = function () { 
  popupElementAdd.classList.add('popup_opened');
}

// Закрыть попап добавления, пыталась реализовать через общую функцию, но попап не открывается
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
  // эта строчка отменяет стандартную отправку формы
  event.preventDefault(); 
  // cardsContainer.prepend(createElement(nameInput.value, infoInput.value));
  createElement(nameInput.value, infoInput.value);
  // Очистить форму
  nameInput.value = ' ';
  infoInput.value = ' ';
  closePopupAdd();
}

//Регистрируем обработчики событий по клику
// popupElementAdd.addEventListener('click', closePopupAddByClickOnOverlay);
popupOpenButtonElementAdd.addEventListener('click', openPopupAdd);
popupCloseButtonElementAdd.addEventListener('click', closePopupAdd);
formElementAdd.addEventListener('submit', addFormSubmitHandler);

// // Открыть попап
// popupOpenButtonElementAdd.addEventListener('click', () => {
//   // Очистить форму
//   // cardsInputImage.value = ' ';
//   // cardsInputTitle.value = ' ';
//   openPopupAdd();
// })

// Открыть попап открытия фото, пыталась реализовать через общую функцию, но попап не открывается
const openPopupPhoto = function (popup) {
  popupContainerPhoto.classList.add('popup_opened');
}

// Закрыть попап закрытия фото, пыталась реализовать через общую функцию, но попап не открывается
const closePopupPhoto = function (popup) {
  popupContainerPhoto.classList.remove('popup_opened');

}

popupContainerPhoto.addEventListener('click', closePopupPhoto);

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
  // клонируем содержимое тега template, true = со всем его содержимым
  const cards = cardsTemplate.querySelector('.cards').cloneNode(true);

  // наполняем содержимым
  cards.querySelector('.cards__image').src = cardsImageValue;
  cards.querySelector('.cards__image').alt = cardsTitleValue;
  cards.querySelector('.cards__title').textContent = cardsTitleValue;

  // Обработчик событий с функцией кнопки удаления
  cards.querySelector('.cards__delete-button').addEventListener('click', function () {
  cards.remove();
  });

  // Обработчик событий с функцией кнопки лайка
  cards.querySelector('.cards__like').addEventListener('click', function (event) {
    event.target.classList.toggle('cards__like_active');
  });

  //  Обработчик событий с функцией открытия фото
  cards.querySelector('.cards__image').addEventListener('click', function () {
    openPopupPhoto();
    openImage.src = cardsImageValue;
    openImageText.textContent = cardsTitleValue;
  });

  return cards;
}

function handleCardsFormSubmit(event) {
  event.preventDefault(); // строчка отменяет стандартную отправку формы
  cardsElements.prepend(createElement(cardsInputTitle.value, cardsInputImage.value));
  // Очищаем форму
  cardsInputImage.value = ' ';
  cardsInputTitle.value = ' ';
  closePopupAdd();
}

//Регистрируем обработчик событий
formElementAdd.addEventListener('submit', handleCardsFormSubmit);

// Подключаем массив
initialCards.forEach(function(item) {
  // Добавляем функцию с переданным значением в секцию с темплейтом, отображаем на странице
  cardsElements.append(createElement(item.name, item.link));
});