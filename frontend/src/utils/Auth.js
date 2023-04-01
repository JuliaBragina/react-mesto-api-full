//export const BASE_URL = 'http://localhost:5000';
export const BASE_URL = 'https://api.prkmesto.space';
const checkResponse = (res) => {
  if(res.ok){
    return res.json();
  }
  return Promise.reject('Произошла ошибка');
};

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  }).then((res) => checkResponse(res));
};

export function checkJTW(jwt) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${jwt}`
    }
  }).then((res) => checkResponse(res));
};

export function login(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  }).then((res) => checkResponse(res));
};

export function signout() {
  return fetch(`${BASE_URL}/signout`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => checkResponse(res));
};
