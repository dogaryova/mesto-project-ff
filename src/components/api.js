const config = {
  baseUrl: "https://nomoreparties.co/v1/pwff-cohort-1",
  headers: {
    authorization: "c533c392-ad06-48b1-b082-a69fc8aebd90",
    "Content-Type": "aplication/json",
  },
};

export function getProfileData() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: {
      authorization: "c533c392-ad06-48b1-b082-a69fc8aebd90",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    })
    .catch((e) => {
      console.error("ошибка загрузки профиля: " + e);
    });
}
export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: "c533c392-ad06-48b1-b082-a69fc8aebd90",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    })
    .catch((e) => {
      console.error("ошибка получения карточек: " + e);
    });
}
export function editProfileData(editName, editAbout) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: "c533c392-ad06-48b1-b082-a69fc8aebd90",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: editName,
      about: editAbout,
    }),
  }).catch((e) => {
    console.error("ошибка редактирования профиля: " + e);
  });
}
export function newCardApi(cardName, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: "c533c392-ad06-48b1-b082-a69fc8aebd90",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: cardName,
      link: link,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    })
    .catch((e) => {
      console.error("ошибка добавления карточки: " + e);
    });
}

export function deleteCardApi(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: {
      authorization: "c533c392-ad06-48b1-b082-a69fc8aebd90",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    })
    .catch((e) => {
      console.error("ошибка удаление карточки: " + e);
    });
}

export function addLikeCard(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: {
      authorization: "c533c392-ad06-48b1-b082-a69fc8aebd90",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    })
    .catch((e) => {
      console.error("ошибка добавления лайка: " + e);
    });
}
export function deleteLikeCard(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: {
      authorization: "c533c392-ad06-48b1-b082-a69fc8aebd90",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    })
    .catch((e) => {
      console.error("ошибка удаления лайка: " + e);
    });
}
export function editAvatarApi(ava) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: "c533c392-ad06-48b1-b082-a69fc8aebd90",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ avatar: ava }),
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    })
    .catch((e) => {
      console.error("ошибка установки аватара: " + e);
    });
}
