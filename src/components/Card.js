export class Card {
  constructor ( data, userId, cardTemplateSelector, handleOpenPopup, {handleDeleteCard, handleAddLike, handleDeleteLike} ) {
  this._name = data.name;
  this._link = data.link;
  this._likesNumber = data.likesNumber;
  this._userId = userId;
  this._id = data._id;
  this._cardTemplateSelector = cardTemplateSelector;
  this._handleOpenPopup = handleOpenPopup;
  this._handleDeleteCard = handleDeleteCard;
  this._handleAddLike = handleAddLike;
  this._handleDeleteLike = handleDeleteLike;
  };

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardTemplateSelector)
    .content
    .querySelector('.cards')
    .cloneNode(true);
    
    return cardElement;
  };

  // метод generateCard подготовит карточку к публикации. Он добавит данные в разметку, будет управлять поведением карточек
  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector('.cards__image');
    this._cardsTitle = this._element.querySelector('.cards__title');
    this._deleteButton =  this._element.querySelector('.cards__delete-button');
    this._like = this._element.querySelector('.cards__like');
    this._likeNumber = this._element.querySelector('.cards__like-number');
    
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardsTitle.textContent = this._name;
    this._setEventListeners();

    return this._element;
  };

  deleteCard() {
    this._element.remove();
    this._element = null;
  };

  // Лайк на карточке если есть, то
  _isLiked() {
    if (this._likesNumber.some((user) => {
      return this._userId === user._id;
    })) {
      this._like.classList.add('cards__like_active');
    }
  };

  _removeButton() {
    if (this._ownerId !== this._userId) this._deleteButton.remove();
  };

  // Отображение количество лайков
  updateNumberLikes(data) {
    this._likesNumber = data.likesNumber;
    this._likeNumber.textContent = this._likesNumber.length;
    this._like.classList.toggle('cards__like_active');
  };
  
  // Добавить слушателя событий
  _setEventListeners () {
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteCard(this._id)
    });

    this._like.addEventListener('click', () => {
      if (!this._like.classList.contains('card__like_active')) {
        this._handleAddLike(this._id);
      } else {
        this._handleDeleteLike(this._id);
      }
    });

    this._cardImage.addEventListener('click', () => {
      this._handleOpenPopup(this._name, this._link);
    });

  };
};
