import { Scroll } from "./scroll.js";

export class Filter {
  constructor() {
    this.scroll = new Scroll();
    this.filterOption = document.querySelector(".filterOption");
    this.calenderIcon = document.querySelector(".calenderIcon");
    this.selectDates = document.querySelector(".selectDates");
    this.startDate = document.getElementById("startDate");
    this.endDate = document.getElementById("endDate");
    this.startDateError = document.getElementsByClassName("startDateError")[0];
    this.endDateError = document.getElementsByClassName("endDateError")[0];
    this.sortOption = document.querySelector(".sortOption");
    this.applyButton = document.getElementById("applyButton");
    this.resetButton = document.getElementById("resetButton");
  }

  handleFilters(model, view) {
    this.applyFilter(model, view);
    this.resetFilter(model, view);
    this.handleSort(model, view);
    this.setupEventListeners();
  }

  applyFilter(model, view) {
    this.applyButton.addEventListener("click", () => {
      if (this.startDate.value === "") {
        this.startDateError.style.display = "block";
      } else if (this.endDate.value === "") {
        this.endDateError.style.display = "block";
      } else {
        this.startDateError.style.display = "none";
        this.endDateError.style.display = "none";
        const [year2, month2, day2] = this.startDate.value
          .split("-")
          .map(Number);
        const StartDate = new Date(year2, month2 - 1, day2);

        const [year3, month3, day3] = this.endDate.value.split("-").map(Number);
        const EndDate = new Date(year3, month3 - 1, day3);

        model.filterPosts(StartDate, EndDate);
        view.renderPosts(model.getcurrentPosts());

        this.selectDates.style.display = "none";
        this.sortOption.value = "";
      }
    });
  }

  resetFilter(model, view) {
    this.resetButton.addEventListener("click", () => {
      this.startDate.value = "";
      this.endDate.value = "";
      this.sortOption.value = "";
      this.selectDates.style.display = "none";
      this.startDateError.style.display = "none";
      this.endDateError.style.display = "none";
      model.setPosts(model.getallPosts());
      view.renderPosts(model.getcurrentPosts());
      this.scroll.setupInfiniteScroll(model, view);
    });
  }

  handleSort(model, view) {
    this.sortOption.addEventListener("change", (event) => {
      model.sortPosts(event.target.value);
      view.renderPosts(model.getcurrentPosts());
    });
  }

  setupEventListeners() {
    this.filterOption.addEventListener("click", () => {
      const currentDisplay = this.selectDates.style.display;
      if (currentDisplay === "flex") {
        this.selectDates.style.display = "none";
      } else {
        this.selectDates.style.display = "flex";
      }
      this.startDateError.style.display = "none";
      this.endDateError.style.display = "none";
    });

    this.startDate.addEventListener("focus", () => {
      this.startDateError.style.display = "none";
    });

    this.endDate.addEventListener("focus", () => {
      this.endDateError.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (
        event.target != this.filterOption &&
        event.target != this.calenderIcon &&
        event.target != this.selectDates &&
        event.target != this.startDate &&
        event.target != this.endDate &&
        event.target != this.applyButton &&
        event.target != this.resetButton
      )
        this.selectDates.style.display = "none";
    });
  }
}
