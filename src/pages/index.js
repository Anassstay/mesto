import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { selection, initialCards } from '../utils/constants.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import './index.css';


// Задаем const

const cardsContainer = document.querySelector('.elements');
const popupEditProfile = document.querySelector('.popup_edit');
const buttonOpenEditProfile = document.querySelector('.profile__edit-button');
const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const infoInput = popupEditProfile.querySelector('.popup__input_type_info');
const popupAddCard = document.querySelector('.popup_add');
const buttonOpenAddCard = document.querySelector('.profile__add-button');
const buttonOpenEditAvatar = document.querySelector('.profile__avatar-button');
const formAvatar = document.querySelector('.popup__content_avatar')

// Подключаем Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: 'ac4d09bd-0b03-4641-a811-ed68f81bc835',
    'Content-Type': 'application/json'
  }
});

// Загрузка информации с сервера
Promise.all([api. getUserInfo(), api.getInitialCards()])
  .then(([initialCards, userData]) => {
    // userId = userData._id;
    userInfo.setUserInfo(userData);
    classSection.renderCards(initialCards);
  })
  .catch(err => console.log(err))

// Открыть попап с фото при клике
const handleOpenPopupPhoto = (textPhoto, imagePhoto) => {
  classPopupWithImage.open(textPhoto, imagePhoto);
};

// Создать экземпляр класса с фото
const classPopupWithImage = new PopupWithImage('.popup_photo')
classPopupWithImage.setEventListeners();

// // для создания карточки
const createCard = (data) => {
  const card = new Card(data, userInfo.getUserId(), '#cards-template', handleOpenPopupPhoto,
  {
    handleDeleteCard: (_id) => {
      popupWithConfirmationDeleteCard.open();
      popupWithConfirmationDeleteCard.handleFormSubmit(() => {
      popupWithConfirmationDeleteCard.setTextButton('Удаление...')
        api.deleteCard(_id)
          .then(() => {
            card.deleteCard()
            popupWithConfirmationDeleteCard.close();
          })
          .catch(err => console.log(err))
          .finally(() => {
            popupWithConfirmationDeleteCard.setTextButton('Да')
          })
      })
    },

    handleLikeClick: (_id) => {
      if (card.isLiked() !== true) {
        api.addLike(_id)
        .then((data) => {
          card.updateLikesCounter(data);
        })
        .catch(err => console.log(err))
      }
      else {
        api.deleteLike(_id)
        .then((data) => {
          card.updateLikesCounter(data);
        })
          .catch(err => console.log(err))
      }
    }
  })
  return card.generateCard()
}

// Отрисовка каждого отдельного элемента
function renderNewCard(item) {
  classSection.addCard(createCard(item));
}




// Функция создания карточки
// const renderNewCard = (item) => {

//   const handleDeleteCard = (_id) => {
//     popupWithConfirmationDeleteCard.open();
//     popupWithConfirmationDeleteCard.handleFormSubmit(() => {
//     popupWithConfirmationDeleteCard.setTextButton('Удаление...')
//       api.deleteCard(_id)
//         .then(() => {
//           card.deleteCard()
//           popupWithConfirmationDeleteCard.close();
//         })
//         .catch(err => console.log(err))
//         .finally(() => {
//           popupWithConfirmationDeleteCard.setTextButton('Да')
//         })
//     })
//   };

//   const handleAddLike = (_id) => {
//     api.addLike(_id)
//       .then((data) => {
//         card.updateNumberLikes(data);
//       })
//       .catch(err => console.log(err))
//     }

//   const handleDeleteLike = (_id) => {
//     api.deleteLike(_id)
//       .then((data) => {
//         card.updateNumberLikes(data);
//       })
//       .catch(err => console.log(err))
//   };
  
//   const card = new Card (item, userInfo.getUserId(), '#cards-template', handleOpenPopupPhoto, handleDeleteCard, handleAddLike, handleDeleteLike);
//   const cardElement = card.generateCard();
//   return cardElement;
// };

// Создать экземпляр класса с информацией о юзере
const userInfo = new UserInfo ({
  nameSelector: '.profile__title',
  infoSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar'
});

// Создать экземпляр класса отрисовки карточек
const classSection = new Section ({
  items: initialCards,
  renderer: (item) => {
    classSection.addCard(renderNewCard(item));
  }
}, 
cardsContainer
);
classSection.renderCards();

// валидация карточек через класс
const validationPopupEditProfile = new FormValidator(selection, popupEditProfile);
const validationPopupAddCard = new FormValidator(selection, popupAddCard);
const validationEditAvatar = new FormValidator(selection, formAvatar);
validationPopupEditProfile.enableValidation();
validationPopupAddCard.enableValidation();
validationEditAvatar.enableValidation();


const popupWithFormEditProfile = new PopupWithForm ({
  formSubmit: (userData) => {
    popupWithFormEditProfile.setButtonText(true);
    api.editProfile(userData)

    .then((userData) => {
      userInfo.setUserInfo(userData);
      popupWithFormEditProfile.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupWithFormEditProfile.setButtonText(false);
    })
  }
},
'.popup_edit'
);
popupWithFormEditProfile.setEventListeners();

const popupWithFormAddCard = new PopupWithForm ({
  formSubmit: (userData) => {
    popupWithFormAddCard.setButtonText(true);
    api.addNewCard(userData)
    .then((userData) => {
      const createNewCard = renderNewCard(userData);
      classSection.addItem(createNewCard);
      popupWithFormAddCard.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupWithFormAddCard.setButtonText(false);
    });

  }
},
'.popup_add'
);
popupWithFormAddCard.setEventListeners();

const popupWithFormEditAvatar = new PopupWithForm({
  formSubmit: (evt, userData) => {
    evt.preventDefault();
    popupWithFormEditAvatar.setButtonText(true);
    api.editAvatar(userData)
      .then((userData) => {
        userInfo.setUserInfo(userData);
        popupWithFormEditAvatar.close();
      })
      .catch(err => console.log(err))
      .finally(() => {
        popupWithFormEditAvatar.setButtonText(false);
      })
  }
},'.popup_avatar');
popupWithFormEditAvatar.setEventListeners();

const popupWithConfirmationDeleteCard = new PopupWithConfirmation('.popup_delete')
popupWithConfirmationDeleteCard.setEventListeners();

buttonOpenAddCard.addEventListener('click', function () {
  popupWithFormAddCard.open();
  validationPopupAddCard.toggleButtonState();
  validationPopupAddCard.resetValidation();
});

buttonOpenEditProfile.addEventListener('click', function () {
  popupWithFormEditProfile.open();
  const {name, info} = userInfo.getUserInfo();
  nameInput.value = name; 
  infoInput.value = info;
});

buttonOpenEditAvatar.addEventListener('click', () => {
  validationEditAvatar.toggleButtonState();
  popupWithFormEditAvatar.open();
});