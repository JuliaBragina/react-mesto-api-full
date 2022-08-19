export const BASE_URL = 'https://api.prk.mesto.nomoredomains.sbs';

const checkResponse = (res) => {
  if(res.ok){
    return res.json();
  }
  return Promise.reject('Произошла ошибка');
};

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  }).then((res) => checkResponse(res));
};

export function checkJTW(jwt) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then((res) => checkResponse(res));
};

export function login(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  }).then((res) => checkResponse(res));
};

export function signout() {
  return fetch(`${BASE_URL}/signout`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => checkResponse(res));
};
