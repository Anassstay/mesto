export class Card {
  constructor ( data, userId, cardTemplateSelector, handleOpenPopup, {handleDeleteCard, handleAddLike, handleDeleteLike} ) {
  this._name = data.name;
  this._link = data.link;
  this._likes = data.likes;
  this._userId = userId;
  this._id = data._id;
  this._ownerId = data.owner._id;
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
    this._removeButton();
    this._checkNumberLikes();

    return this._element;
  };

  _checkNumberLikes() {
    if (this._likes.some((user) => {
      return this._userId === user._id;
    })) {
      this._like.classList.add('cards__like_active');
    }
  };

  _toggleLike() {
    this._like.classList.toggle('cards__like_active');
  };

  setLikes(arr) {
    this._likes = arr.likes
    this._likeNumber.textContent = this._likes.length;
    this._toggleLike();
  };

  _removeButton() {  
    if (this._ownerId !== this._userId)this._deleteButton.remove();
  };

  deleteCard() {
    this._element.remove();
    this._element = null;
  };

  // Добавить слушателя событий
  _setEventListeners () {
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteCard(this._id)
    });

    this._like.addEventListener('click', () => {
      if (!this._like.classList.contains('cards__like_active')) {
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
