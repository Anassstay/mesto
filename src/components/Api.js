export class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = this._options.baseUrl;
    this._headers = this._options.headers;
  }

  // Проверить ответ сервера и преобразовать из json
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json()
  }

  // Загрузить инфо о юзере с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then((res) => {
      return this._getResponseData(res);
    });
  }

  // Загрузить карточки с сервера
  getInitialData() {
    return fetch(`${this._baseUrl}/cards/`, {
        headers: this._headers
    })
    .then((res) => {
      return this._getResponseData(res)
    })
  }

  // Удалить карточки
  deleteCard(_id) {
    return fetch(`${this._baseUrl}/cards/`+ _id, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      return this._getResponseData(res)
    })
  }

  // Редактировать аватар
  editAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar/`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then((res) => {
      return this._getResponseData(res)
    })
  }

  // Редактирование профиля
  editProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.info
      })
    })
    .then((res) => {
      return this._getResponseData(res)
    })
  }

  // Добавить новую карточку
  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards/`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
    .then((res) => {
      return this._getResponseData(res)
    })
  }

  // Поставить лайк лайк
  addLike(_id) {
    return fetch(`${this._baseUrl}/cards/likes/`+ _id, {
      method: 'PUT',
      headers: this._headers
    })
    .then((res) => {
      return this._getResponseData(res)
    })
  }

  // Снять лайк
  deleteLike(_id) {
    return fetch(`${this._baseUrl}/cards/likes/`+ _id, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      return this._getResponseData(res)
    })
  }
}