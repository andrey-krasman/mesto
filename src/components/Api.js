class Api {
    constructor(options) {
      // тело конструктора
    }
  
    getInitialCards() {
      // ...
    }
  
    // другие методы работы с API
  }
  
  const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
    headers: {
      authorization: '5deec273-9ce8-4407-9639-a0ce98e93b96',
      'Content-Type': 'application/json'
    }
  }); 