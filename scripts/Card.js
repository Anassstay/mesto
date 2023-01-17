//Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:
//принимает в конструктор её данные и селектор её template-элемента;
//содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
//содержит приватные методы для каждого обработчика;
//содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.

import { imagePhotoPopup, textPhotoPopup, openPopup, popupPhoto } from './index.js';

export class Card {
  constructor (data, templateSelector, handleOpenPopup) {
  this._name = data.name;
  this._link = data.link;                                                                                                                                                                                                  
  this._templateSelector = templateSelector;
  this._handleOpenPopup = handleOpenPopup
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
    this._image = this._element.querySelector('.cards__image');
    // Добавим данные
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector('.cards__title').textContent = this._name;
    this._setEventListeners();
    // Вернём элемент наружу
    return this._element;
  }
  
  _deleteCard() {
    this._element.querySelector('.cards__delete-button').closest('.cards').remove();
  }
  
  _likeCard() {
    this._element.querySelector('.cards__like').classList.toggle('cards__like_active');
  }
  
    // Добавить слушателя событий
    // Лучше сразу создать отдельный метод _setEventListeners, чтобы не засорять код в generateCard:
  _setEventListeners () {
    this._element.querySelector('.cards__delete-button').addEventListener('click', () => {
      this._deleteCard();
    })
    this._element.querySelector('.cards__like').addEventListener('click', () => {
      this._likeCard();
    })
    this._image.addEventListener('click', () => {
      this._handleOpenPopup();
    })
  };
}