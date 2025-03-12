export class View {
  constructor() {
    this.postSection = document.querySelector(".posts");
  }

  renderPosts(posts) {
    this.postSection.innerHTML = "";
    posts?.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");
      postElement.innerHTML = `
        <div class='postHeader'>
            <img src='${
              post.profilePic || "../../images/Default_pfp.jpg"
            }' class='postOwnerPic' alt='Profile'>
            <div class='postInfo'>
                <span class='postOwnerName'>${post.name}</span>
                <span class='postOwnerHighlights'>${post.highlights}</span>
                <span class='postCreatedDate'>${post.date}</span>
            </div>
        </div>
        <div class='postDescription'>${post.description}</div>
        <div class='postImages'>
            ${post.images
              .map(
                (img, index) =>
                  `<img src='${img}' class='postImg' data-index='${index}' alt='Post Image'>`
              )
              .join("")}
            <button class='slideLeftButton'>&#10094;</button>
            <button class='slideRightButton'>&#10095;</button>
        </div>
        <div class='counts'>
            <span class='likeCount postCountSections'>${post.likes} likes</span>
            <span class='commentCount postCountSections'>${
              post.comments
            } comments</span>
        </div>
        <hr/>
        <div class='postFooter'>
            <span class='like postFooterSections'><img src='./images/like.png' class='postIcons' alt='Like'> Like</span>
            <span class='comment postFooterSections'><img src='./images/comment.png' class='postIcons' alt='Comment'> Comment</span>
            <span class='repost postFooterSections'><img src='./images/refresh.png' class='postIcons' alt='Repost'> Repost</span>
            <span class='send postFooterSections'><img src='./images/send.png' class='postIcons' alt='Send'> Send</span>
        </div>
    `;
      this.setupImageSlider(postElement);
      this.postSection.appendChild(postElement);
    });
  }

  setupImageSlider(postElement) {
    const images = postElement.querySelectorAll(".postImg");
    const leftButton = postElement.querySelector(".slideLeftButton");
    const rightButton = postElement.querySelector(".slideRightButton");
    let currentIndex = 0;

    function showImage(index) {
      images.forEach((img, i) => {
        img.style.display = i === index ? "block" : "none";
      });
      leftButton.style.display = index === 0 ? "none" : "block";
      rightButton.style.display =
        index === images.length - 1 ? "none" : "block";
    }

    if (images.length > 0) showImage(currentIndex);

    leftButton.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        showImage(currentIndex);
      }
    });

    rightButton.addEventListener("click", () => {
      if (currentIndex < images.length - 1) {
        currentIndex++;
        showImage(currentIndex);
      }
    });
  }
}
