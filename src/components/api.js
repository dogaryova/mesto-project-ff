const config = {
  baseUrl: "https://nomoreparties.co/v1/pwff-cohort-1",
  headers: {
    authorization: "c533c392-ad06-48b1-b082-a69fc8aebd90",
    "Content-Type": "application/json",
  },
};

export function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
}

function sendRequestApi(path, method = "GET", body = null) {
  const params = {
    method: method,
    headers: config.headers,
  };
  if (body) {
    params.body = JSON.stringify(body);
  }
  console.log(params);

  return fetch(`${config.baseUrl}/${path}`, params).then(handleResponse);
}

export function getProfileData() {
  return sendRequestApi("users/me");
}
export function getInitialCards() {
  return sendRequestApi("cards");
}
export function editProfileData(editName, editAbout) {
  return sendRequestApi("users/me", "PATCH", {
    name: editName,
    about: editAbout,
  });
}
export function newCardApi(cardName, cardLink) {
  return sendRequestApi("cards", "POST", { name: cardName, link: cardLink });
}

export function deleteCardApi(id) {
  return sendRequestApi(`cards/${id}`, "DELETE");
}

export function addLikeCard(id) {
  return sendRequestApi(`cards/likes/${id}`, "PUT");
}
export function deleteLikeCard(id) {
  return sendRequestApi(`cards/likes/${id}`, "DELETE");
}
export function editAvatarApi(ava) {
  return sendRequestApi(`users/me/avatar`, "PATCH", { avatar: ava });
}
