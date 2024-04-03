// Модуль добавляет новые посты
import { postPost } from "../api.js";
import { sanitizeHtml } from "../helpers.js";
import { goToPage, user } from "../index.js";
import { POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl}) {
     let imageUrl = "";
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
                  <label class="post-text">
                  Опишите фотографию:
                      <textarea  id="add-text" value="${user.description}" class="textarea"></textarea>
                      </label>
                    <div class="form-error"></div>
                  <button class="button" id="add-button">Добавить</button>
              </div>
          </div>
    </div>
  `;

    appEl.innerHTML = appHtml;
    const textAreaElement = document.getElementById("add-text");

  //   function addPost() {
   const choosePhotoButtonElement = document.getElementById("add-button");
   if (!choosePhotoButtonElement) {
    return;
}
choosePhotoButtonElement.addEventListener("click", () => {
  textAreaElement.classList.remove("form-error");

      if (textAreaElement.value === "") {
          textAreaElement.classList.add("form-error");
          return;
      }
     
  postPost({
    description: sanitizeHtml(textAreaElement.value),
    imageUrl,
  })
  .then(() => {
    goToPage(POSTS_PAGE);
})
  .then(() => {
   
    textAreaElement.value = "";
})
.catch((error) => {
    // В catch-обработчике включаем обратно кнопку, чтобы пользователю можно было работать дальше после ошибки.
    choosePhotoButtonElement.disabled = false;
    choosePhotoButtonElement.textContent = "Добавить";
    console.warn(error);
});
  // choosePhotoButtonElement.disabled = true;
  // choosePhotoButtonElement.textContent = "Файл добавляется...";
});
  const uploadImageContainer = appEl.querySelector(".upload-image-container");
  console.log(555);
  if (uploadImageContainer) {
    renderUploadImageComponent({
      element: appEl.querySelector(".upload-image-container"),
      onImageUrlChange(newImageUrl) {
        imageUrl = newImageUrl;
      },
    });
  };
    
    // });
  // };
  // addPost();
  };
  render();
  renderHeaderComponent({ element: document.querySelector(".header-container") });
  
  
};
// renderAddPostPageComponent();
