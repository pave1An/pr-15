class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _handleFirstResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(endpoint, options) {
    const { method, headers, body } = options;
    return fetch(`${this._baseUrl + endpoint}`, { credentials: 'include', method, headers, body }).then(this._handleFirstResponse);
  }

  getUserInfo() {
    return this._request('/users/me', { headers: this._headers });
  }

  patchUserInfo(data) {
    return this._request('/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });
  }

  patchAvatar({ avatar }) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    });
  }

  getInitialCards() {
    return this._request('/cards', {headers: this._headers});
  }

  postCard(cardData) {
    return this._request('/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }
  
  clickLike(cardId, isLiked) {
    return this._request(`/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers,
    });
  }
}

const api = new Api({
  baseUrl: 'https://api.messto.nomoreparties.sbs',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
