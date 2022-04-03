class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl
      this._headers = headers
    }
    
    getProfileInfo () {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then (res =>  res.ok ? res.json() : Promise.reject(res.status))
        .catch (console.log)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then (res =>  res.ok ? res.json() : Promise.reject(res.status))
        .catch (console.log)
    }
  
    patchProfileInfo (name, career) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: career,
            })
        })
        .then (res =>  res.ok ? res.json() : Promise.reject(res.status))
        .catch (console.log)
    }

    addNewCard (name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link,
            })
        })
        .then (res =>  res.ok ? res.json() : Promise.reject(res.status))
        .catch (console.log)
    }
  }
  
  export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
    headers: {
      authorization: '5deec273-9ce8-4407-9639-a0ce98e93b96',
      'Content-Type': 'application/json'
    }
  })