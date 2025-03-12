import { newPosts } from "../data.js";

export class Scroll {
  setupInfiniteScroll(model, view) {
    const Observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          model.addnewPosts(newPosts);
          view.renderPosts(model.getcurrentPosts());
          Observer.unobserve(entry.target);
          const newPostNotification = document.querySelector(
            ".newPostNotification"
          );
          newPostNotification.style.display = "block";
          setTimeout(() => {
            newPostNotification.style.display = "none";
          }, 2000);
          const newLastPost = document.querySelector(".posts").lastChild;
          Observer.observe(newLastPost);
        }
      },
      { threshold: 0.4 }
    );
    Observer.observe(document.querySelector(".posts").lastChild);
  }
}
