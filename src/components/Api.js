export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getUserInfo() {
    return this._request(
      this._baseUrl + '/users/me', {
        headers: this._headers
      })
  }

  getInitialCards() {
    return this._request(
      this._baseUrl + '/cards', {
        headers: this._headers
      })
  }

  setUserInfo(name, about) {
    return this._request(
      this._baseUrl + '/users/me', {
        method: 'PATCH',
        headers: {...this._headers, 'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
  }

  postNewCard({ title, image }) {
    return this._request(
      this._baseUrl + '/cards', {
        method: 'POST',
        headers: {...this._headers, 'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: title,
          link: image
        })
      })
  }

  deleteCard(id) {
    return this._request(
      this._baseUrl + '/cards/' + id, {
        method: 'DELETE',
        headers: this._headers
      })
  }

  setLike(cardId) {
    return this._request(
      this._baseUrl + '/cards/' + cardId + '/likes', {
        method: 'PUT',
        headers: this._headers
      })
  }

  removeLike(cardId) {
    return this._request(
      this._baseUrl + '/cards/' + cardId + '/likes', {
        method: 'DELETE',
        headers: this._headers
      })
  }

  updateAvatar({ avatar }) {
    return this._request(
      this._baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        headers: {...this._headers, 'Content-Type': 'application/json'},
        body: JSON.stringify({
          avatar: avatar
        })
      })
  }
}