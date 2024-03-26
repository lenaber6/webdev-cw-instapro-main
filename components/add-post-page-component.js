// Модуль добавляет новые посты
import { postPost } from "../api.js";
import { user } from "../index.js";

export function renderAddPostPageComponent({ appEl }) {
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-header">
      <h1 class="logo">instapro</h1>
      <button class="header-button add-or-login-button">
      ${
        user
          ? `<div title="Добавить пост" class="add-post-sign"></div>`
          : "Войти"
      }
      </button>
      ${
        user
          ? `<button title="${user.name}" class="header-button logout-button">Выйти</button>`
          : ""
      }  
  </div>
    <div class="page-container">
      <div class="header-container"></div>
          <div class="form">
              <h3 class="form-title">
                Добавить пост
                </h3>
              <div class="form-inputs">
    
                      <div class="upload-image-container"></div>
                      <label class="file-upload-label secondary-button">
                      <input
                        value="${user?.imageUrl}"
                        id="choose-photo"
                        type="file"
                        class="file-upload-input"
                        style="display:none"
                      />
                      Выберите фото
                  </label>
                    <p class="post-text">Опишите фотографию:</p> 
                      <input type="text" id="add-text" value="${user.description}" class="textarea" />
                    <div class="form-error"></div>
                  <button class="button" id="add-button">Добавить</button>
              </div>
          </div>
    </div>
  `;

    appEl.innerHTML = appHtml;

    const inputElement = document.getElementById("choose-photo");
    const textAreaElement = document.getElementById("add-text");

    function addPost() {
   const choosePhotoButtonElement = document.getElementById("add-button");
   if (!choosePhotoButtonElement) {
    return;
}
choosePhotoButtonElement.addEventListener("click", () => {
  inputElement.remove("form-error");
  textAreaElement.remove("form-error");

  if (inputElement.value === "") {
      inputElement.add("form-error");
      if (textAreaElement.value === "") {
          textAreaElement.add("form-error");
          return;
      }
      return;
  }
  choosePhotoButtonElement.disabled = true;
  choosePhotoButtonElement.textContent = "Пост добавляется...";

     postPost({
        description: textAreaElement.value,
        imageUrl: inputElement.value,
      })
      .then(() => {
        getPosts();
    })
      .then(() => {
        choosePhotoButtonElement.disabled = false;
        choosePhotoButtonElement.textContent = "Добавить";
        inputElement.value = "";
        textAreaElement.value = "";
    })
    .catch((error) => {
        // В catch-обработчике включаем обратно кнопку, чтобы пользователю можно было работать дальше после ошибки.
        choosePhotoButtonElement.disabled = false;
        choosePhotoButtonElement.textContent = "Добавить";
        console.warn(error);
    });
    });
  };
  addPost();
  };
  render();
}
