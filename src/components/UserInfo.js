export class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
    this._avatar = document.querySelector(avatarSelector);
  };
  
  // Вернуть объект с данными пользователя
  getUserInfo() {
    const userData = {
      name: this._name.textContent,
      info: this._info.textContent,
      avatar: this._avatar.src
    }
    return userData;
  };

  // Вернуть ID пользователя
  getUserId() {
    return this._userId;
  };

  // Принять новые данные пользователя и добавить на страницу
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._info.textContent = data.about;
    this._avatar.src = data.avatar;
    this._userId = data._id;
    };
};