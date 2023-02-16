export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector, userAvatarSelector }){
    this._name = document.querySelector(userNameSelector);
    this._about = document.querySelector(userInfoSelector);
    this._avatar = document.querySelector(userAvatarSelector);
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
    this._id = _id;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent
    }
  }

  getUserId() {
    return this._id;
  }
}