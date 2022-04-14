class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl
      this._headers = headers
    }
    
    getProfileInfo () {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(this._checkResponse)
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
        .then(this._checkResponse)
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
        .then(this._checkResponse)
    }

    deleteCard (id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this._checkResponse)
    }

    deleteLike (id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this._checkResponse)
    }

    setLike (id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
        .then(this._checkResponse)
    }

    changeAvatar (link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        })
        .then(this._checkResponse)
    }

    _checkResponse(res) {
        if (res.ok) {
        return res.json()
    }
        return Promise.reject(`Ошибка ${res.status}`)
    }
  }

  export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
    headers: {
      authorization: '5deec273-9ce8-4407-9639-a0ce98e93b96',
      'Content-Type': 'application/json'
    }
  })