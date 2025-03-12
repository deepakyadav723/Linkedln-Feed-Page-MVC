export class Model {
  constructor() {
    this.allPosts = [];
    this.filteredPosts = [];
    this.currentPosts = [];
  }

  setPosts(data) {
    this.allPosts = [...data];
    this.filteredPosts = [...data];
    this.currentPosts = [...data];
  }

  addnewPosts(posts) {
    this.allPosts = [...this.allPosts, ...posts];
    this.filteredPosts = [...this.filteredPosts, ...posts];
    this.currentPosts = [...this.currentPosts, ...posts];
  }

  addPost(post) {
    this.allPosts = [post, ...this.allPosts];
    this.filteredPosts = [post, ...this.filteredPosts];
    this.currentPosts = [post, ...this.currentPosts];
  }

  getallPosts() {
    return this.allPosts;
  }

  getfilteredPosts() {
    return this.filteredPosts;
  }

  getcurrentPosts() {
    return this.currentPosts;
  }

  getMatchedUsers(searchedName) {
    return [
      ...new Map(
        this.allPosts
          .filter((user) => {
            return user.name.toLowerCase().includes(searchedName);
          })
          .map((user) => [user.name, user.profilePic])
      ),
    ];
  }

  searchedPosts(query) {
    this.filteredPosts = this.allPosts.filter((post) => post.name === query);
    this.currentPosts = this.filteredPosts;
  }

  filterPosts(startDate, endDate) {
    this.currentPosts = this.filteredPosts.filter((post) => {
      const [day, month, year] = post.date.split("/").map(Number);
      const postDate = new Date(year, month - 1, day);
      return postDate >= startDate && postDate <= endDate;
    });
  }

  sortPosts(order) {
    this.currentPosts.sort((a, b) => {
      const [dayA, monthA, yearA] = a.date.split("/").map(Number);
      const [dayB, monthB, yearB] = b.date.split("/").map(Number);
      const dateA = new Date(yearA, monthA - 1, dayA);
      const dateB = new Date(yearB, monthB - 1, dayB);
      return order === "ASC" ? dateA - dateB : dateB - dateA;
    });
  }
}
