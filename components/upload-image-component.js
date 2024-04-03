// Модуль для загрузки имиджей в облако
import { uploadImage } from "../api.js";

export function renderUploadImageComponent({ element, onImageUrlChange }) {
  let imageUrl = "";

  const render = () => {
    element.innerHTML = `
  <div class="upload=image">
      ${
        imageUrl
          ? `
          <div class="file-upload-image-conrainer">
            <img class="file-upload-image" src="${imageUrl}">
            <button class="file-upload-remove-button button">Заменить фото</button>
          </div>
          `
          : `
            <label class="file-upload-label secondary-button">
                <input
                  type="file"
                  id="image-input"
                  class="file-upload-input"
                  style="display:none"
                />
                Выберите фото
            </label>
          
      `
      }
  </div>
`;

    // const fileInputElement = element.querySelector(".file-upload-input");
     const fileInputElement = document.getElementById("image-input");

    fileInputElement?.addEventListener("change", () => {
      const file = fileInputElement.files[0];
      console.log(file);
      if (file) {
        const lableEl = document.querySelector(".file-upload-label");
        lableEl.setAttribute("disabled", true);
        lableEl.textContent = "Загружаю файл...";
        uploadImage({ file }).then(({ fileUrl }) => {
          imageUrl = fileUrl;
          onImageUrlChange(imageUrl);
          render();
        });
      }
    });


    // <input type="file" id="image-input" />
// const fileInputElement = document.getElementById("image-input");
// postImage({ file: fileInputElement.files[0] });

// function postImage({ file }) {
//   const data = new FormData();
//   data.append("file", file);

//   return fetch(baseHost + "/api/upload/image", {
//     method: "POST",
//     body: data,
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data.fileUrl);
//     });
// }

    element.querySelector(".file-upload-remove-button")
      ?.addEventListener("click", () => {
        imageUrl = "";
        onImageUrlChange(imageUrl);
        render();
      });
  };

  render();
}