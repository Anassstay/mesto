// Проверяем подключение скрипта
console.log('Привет, мир!')

// Выборка DOM-элементов
// Сам попап
const popupElement = document.querySelector('.popup');
// Окно закрывающее попап
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
// Кнопка открывающая попап
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

const formElement = popupElement.querySelector('.popup__content');
const nameInput = popupElement.querySelector('.popup__name');
const infoInput = popupElement.querySelector('.popup__info');
const profileName = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');

// Открыть попап
const openPopup = function () {
    popupElement.classList.add('popup__is-opened');
    nameInput.value = profileName.textContent;
    infoInput.value = profileInfo.textContent;
}

// Закрыть попап
const closePopup = function () {
    popupElement.classList.remove('popup__is-opened');
}

// Закрыть при клике за пределами попапа
const closePopupByClickOnOverlay = function (event) {
    if (event.target === event.currentTarget) {
        closePopup();
    }
}

//Обработка отправки введенных в попап данных
function formSubmitHandler(evt) {
    evt.preventDefault(); // строчка отменяет стандартную отправку формы
    profileName.textContent = nameInput.value;
    profileInfo.textContent = infoInput.value;
    closePopup();
}

//Регистрируем обработчики событий по клику
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);
formElement.addEventListener('submit', formSubmitHandler);