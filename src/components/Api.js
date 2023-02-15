export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(
      this._baseUrl + '/users/me', {
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject('Ошибка ' + res.status + ': ' + res.statusText))
    .catch(err => console.log(err))
  }

  getInitialCards() {
    return fetch(
      this._baseUrl + '/cards', {
        headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject('Ошибка ' + res.status + ': ' + res.statusText))
    .catch(err => console.log(err))
  }

  setUserInfo(name, about) {
    return fetch(
      this._baseUrl + '/users/me', {
        method: 'PATCH',
        headers: {...this._headers, 'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
    .then(res => res.ok ? res.json() : Promise.reject('Ошибка ' + res.status + ': ' + res.statusText))
    .catch(err => console.log(err))
  }

  postNewCard(name, link) {
    return fetch(
      this._baseUrl + '/cards', {
        method: 'POST',
        headers: {...this._headers, 'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
      .then(res => res.ok ? res.json() : Promise.reject('Ошибка ' + res.status + ': ' + res.statusText))
      .catch(err => console.log(err))
  }

  deleteCard(id) {
    return fetch(
    this._baseUrl + '/cards/' + id, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => res.ok ? res.json() : Promise.reject('Ошибка ' + res.status + ': ' + res.statusText))
    .catch(err => console.log(err))
  }

  setLike(cardId) {
    return fetch(
      this._baseUrl + '/cards/' + cardId + '/likes', {
        method: 'PUT',
        headers: this._headers,
      })
      .then(res => res.ok ? res.json() : Promise.reject('Ошибка ' + res.status + ': ' + res.statusText))
      .catch(err => console.log(err))
  }

  removeLike(cardId) {
    return fetch(
      this._baseUrl + '/cards/' + cardId + '/likes', {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(res => res.ok ? res.json() : Promise.reject('Ошибка ' + res.status + ': ' + res.statusText))
      .catch(err => console.log(err))
  }

  updateAvatar(link) {
    return fetch(
      this._baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        headers: {...this._headers, 'Content-Type': 'application/json'},
        body: JSON.stringify({
          avatar: link
        })
      })
      .then(res => res.ok ? res.json() : Promise.reject('Ошибка ' + res.status + ': ' + res.statusText))
      .catch(err => console.log(err))
  }
}