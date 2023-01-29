export class Card {
  constructor (data, cardTemplateSelector, handleOpenPopup) {
  this._name = data.name;
  this._link = data.link;                                                                                                                                                                                                  
  this._cardTemplateSelector = cardTemplateSelector;
  this._handleOpenPopup = handleOpenPopup;
  };

  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
    .querySelector(this._cardTemplateSelector)
    .content
    .querySelector('.cards')
    .cloneNode(true);
    
    // вернём DOM-элемент карточки
    return cardElement;
  };

  // метод generateCard подготовит карточку к публикации. Он добавит данные в разметку, будет управлять 
  // поведением карточек. Метод публичный, чтобы возвращать готовые карточки внешним функциям:
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.cards__image');
    this._cardsTitle = this._element.querySelector('.cards__title');
    this._deleteButton =  this._element.querySelector('.cards__delete-button');
    this._like = this._element.querySelector('.cards__like');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardsTitle.textContent = this._name;
    this._setEventListeners();

    // Вернём элемент наружу
    return this._element;
  };
  
  _deleteCard() {
    this._deleteButton.closest('.cards').remove();
  };
  
  _likeCard() {
    this._like.classList.toggle('cards__like_active');
  };
  
  // Добавить слушателя событий
  _setEventListeners () {
    this._deleteButton.addEventListener('click', () => {
      this._deleteCard();
    });
    this._like.addEventListener('click', () => {
      this._likeCard();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleOpenPopup(this._name, this._link);
    });
  };
};