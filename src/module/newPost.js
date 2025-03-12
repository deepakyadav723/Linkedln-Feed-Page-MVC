import { Scroll } from "./scroll.js";

export class NewPost {
  constructor() {
    this.newPostSection = document.querySelector(".newPostSection");
    this.createPostButton = document.querySelector(".createPostButton");
    this.newPostForm = document.querySelector(".newPost");
    this.createNewPostCrossIcon = document.querySelector(
      ".createNewPostCrossIcon"
    );
    this.scroll = new Scroll();
  }

  createNewPost(model, view) {
    this.createPostButton.addEventListener("click", () => {
      this.newPostSection.style.display = "flex";
    });

    this.createNewPostCrossIcon.addEventListener("click", () => {
      this.newPostSection.style.display = "none";
    });

    this.newPostForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const description = new FormData(this.newPostForm).get("description");

      const post = {
        name: "Deepak Yadav",
        profilePic: "../../images/profile-pic.png",
        highlights:
          "ASE Intern @Tekion || NITRR CSE'25 || Guardian (Leetcode: 2148)",
        date: new Date().toLocaleDateString(),
        description: description,
        images: [
          "https://images.unsplash.com/photo-1518770660439-4636190af475",
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        ],
        likes: 0,
        comments: 0,
      };
      model.addPost(post);
      view.renderPosts(model.getcurrentPosts());
      this.newPostSection.style.display = "none";
      this.newPostForm.reset();
      this.scroll.setupInfiniteScroll(model, view);
    });
  }
}
