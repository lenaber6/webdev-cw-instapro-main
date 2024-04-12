//Модуль отрисовывает уже написанные посты
import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { formatDistanceToNow } from "../node_modules/date-fns";
import { ru } from "../node_modules/date-fns/locale.js";
import { initLikeListener } from "./init-like-listener.js";
// import { ru } from "date-fns/locale.js";
// import { formatDistance } from "date-fns";

export function renderPostsPageComponent() {
  // TODO: реализовать рендер постов из api
  //console.log("Актуальный список постов:", posts);
  //  * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
  //  * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
  let likeImg;
  let likes;
  // console.log(posts);
const appElement = document.getElementById("app");
  const appEl = posts
    .map((post) => {
      if (post.likes.length === 1) {
        likes = post.likes[0].name;
      } else if (post.likes.length > 1) {
        likes = `${post.likes[0].name} и еще ${post.likes.length - 1}`;
      } else {
        likes = "";
      }
// console.log(post);
      if (post.isLiked) {
        likeImg = '<img src="./assets/images/like-active.svg"></img>';
      } else {
        likeImg = '<img src="./assets/images/like-not-active.svg"></img>';
      }
      return `
     
             <li class="post" id="post">
                    <div class="post-header" data-user-id="${post.user.id}">
                        <img src="${post.user.imageUrl}" class="post-header__user-image">
                        <p class="post-header__user-name">${post.user.name}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src="${post.imageUrl}">
                    </div>
                    <div class="post-likes">
                      <button data-post-id="${post.id}" data-is-liked="${post.isLiked}" class="like-button
                      ${
                        post.isLiked
                          ? "like-active"
                          : ""
                      }" "data-index="${post.user.id}">
                      ${likeImg}
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>${likes}</strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${post.user.name}</span>:
                      ${post.description}
                    </p>
                    <p class="post-date">
                    ${formatDistanceToNow( new Date(post.createdAt), { addSuffix: true, locale: ru })}
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
  initLikeListener();
}
