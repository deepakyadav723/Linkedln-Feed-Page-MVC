import { Model } from "./model.js";
import { View } from "./view.js";
import { Search } from "../module/search.js";
import { Filter } from "../module/filter.js";
import { Scroll } from "../module/scroll.js";
import { NewPost } from "../module/newPost.js";
import { Router } from "../module/router.js";

export class Controller {
  constructor() {
    this.model = new Model();
    this.view = new View();
    this.search = new Search();
    this.filter = new Filter();
    this.scroll = new Scroll();
    this.newPost = new NewPost();
    this.router = new Router();
  }

  init(data) {
    this.model.setPosts(data);
    this.view.renderPosts(this.model.getcurrentPosts());
    this.router.setupRouter(this.model, this.view);
    this.newPost.createNewPost(this.model, this.view);
    this.search.handleSearch(this.model, this.view);
    this.filter.handleFilters(this.model, this.view);
    this.scroll.setupInfiniteScroll(this.model, this.view);
  }
}
