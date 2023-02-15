export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector, userAvatarSelector }){
    this._name = document.querySelector(userNameSelector);
    this._about = document.querySelector(userInfoSelector);
    this._avatar = document.querySelector(userAvatarSelector);
  }

  setUserInfo({ name, about, id }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._id = id;
  }

  setUserAvatar(link) {
    this._avatar.src = link;
  }

  getUserId() {
    return this._id;
  }
}