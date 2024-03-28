// Модуль добавляет новые посты
import { postPost } from "../api.js";
import { sanitizeHtml } from "../helpers.js";
import { user } from "../index.js";
import { renderHeaderComponent } from "./header-component.js";

export function renderAddPostPageComponent({ appEl }) {
  // let imageUrl = "";
     const render = () => {
    // TODO: Реализовать страницу добавления поста

    const appHtml = `
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
        description: sanitizeHtml(textAreaElement.value),
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
  renderHeaderComponent({ element: document.querySelector(".header-container") });
  
  const uploadImageContainer = appEl.querySelector(".upload-image-container");
  if (uploadImageContainer) {
    renderUploadImageComponent({
      element: appEl.querySelector(".upload-image-container"),
      onImageUrlChange(newImageUrl) {
        imageUrl = newImageUrl;
      },
    });
  }
  uploadImageContainer();
}
