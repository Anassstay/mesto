//Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:
//принимает в конструктор её данные и селектор её template-элемента;
//содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
//содержит приватные методы для каждого обработчика;
//содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.

import { imagePhotoPopup, textPhotoPopup, openPopup, popupPhoto } from './index.js';

export class Card {
  constructor (data, templateSelector) {
  this._name = data.name;
  this._link = data.link;
  this._templateSelector = templateSelector;
  }
  // научить класс Card возвращать разметку
  // Метод _getTemplate — приватный. Мы вызовем его внутри класса, чтобы получить готовую разметку перед размещением на страницу. 
  // Так мы отделим логику обработки разметки от логики публикации элемента. Чем более явно разделены функции, тем проще управлять кодом.
  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.cards')
    .cloneNode(true);
    
    // вернём DOM-элемент карточки
    return cardElement;
  }

  // Новый метод generateCard подготовит карточку к публикации. Он добавит данные в разметку, а в следующих уроках научится управлять 
  // поведением карточек. Метод публичный, чтобы возвращать готовые карточки внешним функциям:
  generateCard() {
    // Запишем разметку в приватное поле _element. 
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    // Добавим данные
    this._element.querySelector('.cards__image').src = this._link;
    this._element.querySelector('.cards__image').alt = this._name;
    this._element.querySelector('.cards__title').textContent = this._name;
    this._setEventListeners();
    // Вернём элемент наружу
    return this._element;
  }
  
  _deleteCard() {
    this._element.querySelector('.cards__delete-button').closest('.card').remove();
  }
  
  _likeCard() {
    this._element.querySelector('.cards__like').classList.toggle('cards__like_active');
  }

  _handleOpenPopup() {
    openPopup(popupPhoto);
    imagePhotoPopup.src = this._link;
    imagePhotoPopup.alt = this._name; 
    textPhotoPopup.textContent = this._name;
  }

    // Добавить слушателя событий
    // Лучше сразу создать отдельный метод _setEventListeners, чтобы не засорять код в generateCard:
    _setEventListeners () {
      this._element.addEventListener('click', () => {
        this._deleteCard();
      })
      this._element.addEventListener('click', () => {
        this._likeCard();
      })
      this._element.addEventListener('click', () => {
        this._handleOpenPopup();
      })
    };
  }

  
  