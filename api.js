// Замени на свой, чтобы получить независимый от других набор данных.
// "боевая" версия инстапро лежит в ключе prod

import { renderAddPostPageComponent } from "./components/add-post-page-component.js";
import { getToken } from "./index.js";

 const personalKey = "prod";
// const personalKey = "helen-bersh";
// const baseHost = "https://webdev-hw-api.vercel.app";
const baseHost = "https://wedev-api.sky.pro";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;
const userHost = `${baseHost}/api/v1/${personalKey}/instapro/user-posts`;
// const uploadImage = "https://wedev-api.sky.pro/api/upload/image";


export async function getPosts({ token }) {
  const response = await fetch(postsHost, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
  if (response.status === 401) {
    throw new Error("Нет авторизации");
  }
  const data = await response.json();
  return data.posts; 
}

export async function getUserPosts({ id}) {
  console.log(id)
  const response = await fetch(`${userHost}/${id}`, {
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
  });
  if (response.status === 401) {
    throw new Error("Нет авторизации");
  }
  const data_1 = await response.json();
  return data_1.posts;
}

export async function postPost({description, imageUrl}) {
  const response = await fetch(postsHost, {
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    body: JSON.stringify({
      description: sanitizeHtml(textAreaElement.value),
      imageUrl: inputElement.value,
    })   
  })
  .then((response) => {
    if (response.status === 201) {
      return response.json()
  }  else if (response.status === 400) {
    alert("Введите описание картинки и/или добавьте ссылку на фото");
      throw new Error("Введите описание картинки и/или добавьте ссылку на фото");
  }
}) 
    .then((data) => {
      return response.data;
    });
    renderAddPostPageComponent();

}

export async function deletePost({ id }) {
  const response = await fetch(`${postsHost}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: getToken(),
    },
  });
  return await response.json();
}

export async function like({ id }) {
  console.log(id);
  const response = await fetch(`${postsHost}/${id}/like`, {
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
  });
  const data_1 = await response.json();
  return data_1.post;
}

export async function disLike({ id}) {
  const response = await fetch(`${postsHost}/${id}/dislike`, {
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
  });
  return await response.json();
}

// https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/user/README.md#%D0%B0%D0%B2%D1%82%D0%BE%D1%80%D0%B8%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%D1%81%D1%8F
export async function registerUser({ login, password, name, imageUrl }) {
  const response = await fetch(baseHost + "/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  });
  if (response.status === 400) {
    throw new Error("Такой пользователь уже существует");
  }
  return await response.json();
}

export async function loginUser({ login, password }) {
  const response = await fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  });
  if (response.status === 400) {
    throw new Error("Неверный логин или пароль");
  }
  return await response.json();
}

// Загружает картинку в облако, возвращает url загруженной картинки
export async function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  const response = await fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  });
  return await response.json();
}
