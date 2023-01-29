export class UserInfo {
    constructor({ nameSelector, infoSelector }) {
      this._name = document.querySelector(nameSelector);
      this._info = document.querySelector(infoSelector);
    };
  
    getUserInfo() {
      const userData = {
        name: this._name.textContent,
        info: this._info.textContent
      }
      return userData;
    };
  
    setUserInfo(userData) {
      this._name.textContent = userData.name;
      this._info.textContent = userData.info;
    };
  };