const BASE_URL = "https://backend.mesto.tinaevnk.nomoredomains.xyz";

const onError = res => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, email })
  })
  .then(onError)
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, email })
  })
  .then(onError)
};

export const checkToken = jwt => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${jwt}`
    }
  })
  .then(onError)
};
