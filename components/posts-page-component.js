//Модуль отрисовывает уже написанные посты
import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";

export function renderPostsPageComponent() {
  // TODO: реализовать рендер постов из api
  //console.log("Актуальный список постов:", posts);
  //  * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
  //  * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow

const appElement = document.getElementById("app");
  const appEl = posts
    .map((post, index) => {
      return `
     
             <li class="post">
                    <div class="post-header" data-user-id="${post.user.id}">
                        <img src="${post.user.imageUrl}" class="post-header__user-image">
                        <p class="post-header__user-name">${post.user.name}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src="${post.imageUrl}">
                    </div>
                    <div class="post-likes">
                      <button data-post-id="${post.id}" class="like-button
                      ${
                        post[index].isliked
                          ? "like-active"
                          : ""
                      }">
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>2</strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${post.user.name}</span>:
                      ${post.description}
                    </p>
                    <p class="post-date">
                      ${post.createdAt}
                    </p>
                  </li>
           `;
    })
    .join("");
    const appHtml = `
    <div class="page-container">
    <div class="header-container"></div>
      <ul class="posts" id="posts">${appEl}</ul>
      </div>
    `;

  appElement.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}
