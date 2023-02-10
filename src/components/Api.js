export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  
  _handleResponse(res) {
    res.ok ? res.json() : Promise.reject('пардон не работает');
  } // а надо ли ее вообще

  getUserInfo() {
    return fetch(
      this._baseUrl + '/users/me', {
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject('пардон не работает')) 
    .catch(err => console.log(err))
  }

  getInitialCards() {
    return fetch(
      this._baseUrl + '/cards', {
        headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject('пардон не работает'))
    .catch(err => console.log(err))
  }

  setUserInfo(name, about) {
    return fetch(
      this._baseUrl + '/users/me', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
      }
    )
    .then(res => res.ok ? res.json() : Promise.reject('пардон не работает')) 
    .catch(err => console.log(err))
  }

  postNewCard(name, link) {
    return fetch(
      this._baseUrl + '/cards', {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
      .then(res => res.ok ? res.json() : Promise.reject('пардон карточка не хочет'))
      .catch(err => console.log(err))
  }

  // deleteCard() {
  //   return fetch(
  //   this._baseUrl + '/cards/' + id, {
  //     method: 'POST',
  //     headers: this._headers,
  //     body: JSON.stringify({
  //       name: name,
  //       link: link
  //     })
  //   })
  //   .then(res => res.ok ? res.json() : Promise.reject('пардон карточка не хочет'))
  //   .catch(err => console.log(err))
  // }

}