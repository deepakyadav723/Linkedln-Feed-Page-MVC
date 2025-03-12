import { Scroll } from "./scroll.js";

export class Search {
  constructor() {
    this.searchInput = document.getElementById("searchInput");
    this.dropDownList = document.getElementsByClassName("dropDownList")[0];
    this.crossIcon = document.getElementById("crossIcon");
    this.scroll = new Scroll();
  }

  debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }

  handleSearch(model, view) {
    this.searchInput.addEventListener(
      "input",
      this.debounce(() => {
        this.dropDownList.innerHTML = "";

        const matchedUsers = model.getMatchedUsers(this.searchInput.value);
        if (
          this.searchInput.value.trim().length > 0 &&
          matchedUsers.length > 0
        ) {
          matchedUsers.forEach((user) => {
            const li = document.createElement("li");

            const searchedUserImg = document.createElement("img");
            Object.assign(searchedUserImg, {
              src: user[1] === "" ? "./images/Default_pfp.jpg" : user[1],
              alt: "Profile Picture",
              className: "searchedUserImg",
            });

            const searchedUserName = document.createElement("span");
            searchedUserName.innerText = user[0];
            searchedUserName.setAttribute("id", "userFound");

            li.appendChild(searchedUserImg);
            li.appendChild(searchedUserName);
            this.dropDownList.appendChild(li);

            li.addEventListener("click", () => {
              this.searchInput.value = user[0];
              model.searchedPosts(user[0]);
              view.renderPosts(model.getcurrentPosts());
              this.dropDownList.innerHTML = "";
              this.crossIcon.style.display = "block";
            });

            this.crossIcon.addEventListener("click", () => {
              this.searchInput.value = "";
              this.crossIcon.style.display = "none";
              model.setPosts(model.getallPosts());
              view.renderPosts(model.getcurrentPosts());
              this.scroll.setupInfiniteScroll(model, view);
            });
          });
        }
      }, 400)
    );
  }
}
