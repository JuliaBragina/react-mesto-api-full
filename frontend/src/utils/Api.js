class Api { 
  constructor (config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse = (res) => {
    if(res.ok){
      return res.json();
    }
    return Promise.reject('Произошла ошибка');
  }

  getAllCards() {
    return fetch (this._url + 'cards', {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    }).then(this._checkResponse);
  }

  addCards(data) { 
    return fetch (this._url + 'cards', {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
          name: data.name,
          link: data.link
      })
    }).then(this._checkResponse);
  }

  getUser() { 
    return fetch (this._url + 'users/me', {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    }).then(this._checkResponse);
  }

  setUserInfo(data) { 
    return fetch (this._url + 'users/me', {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
          name: data.name,
          about: data.about
      })
    }).then(this._checkResponse);
  }

  setUserAvatar(data) { 
    return fetch (this._url + 'users/me/avatar', {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch (this._url + `cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      credentials: 'include',
      headers: this._headers
    }).then(this._checkResponse);
  }

  deletCard(cardId) { 
    return fetch (this._url + `cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    }).then(this._checkResponse);
  }
}

//authorization: '5907e0a2-56a3-4cfa-b788-58e2a6027744',
//url: 'https://api.prkmesto.space/' https://localhost:5000/,
const api = new Api({
  url: 'https://api.prkmesto.space/',
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;