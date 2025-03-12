export class Router {
  constructor() {
    this.navs = document.querySelectorAll(".rightDivs");
    this.routes = {
      "/": {
        content: "",
      },
      "/mynetwork": {
        content: "My Network page",
      },
      "/jobs": {
        content: `Jobs page`,
      },
      "/messages": {
        content: `Messaging page`,
      },
      "/notification": {
        content: `Notification page`,
      },
    };
  }

  renderContent(route) {
    this.navs.forEach((nav) => {
      nav.classList.remove("textDecorator");
    });
    const className = route.slice(1);
    document.querySelector(".routeContainer").innerHTML =
      this.routes[route].content;
    if (route !== "/") {
      document.querySelector(`.${className}`).classList.add("textDecorator");
      document.querySelector(".container").style.display = "none";
    } else {
      document.querySelector(".home").classList.add("textDecorator");
      document.querySelector(".container").style.display = "flex";
    }
  }

  registerNavLinks() {
    this.navs.forEach((nav) => {
      nav.addEventListener("click", (e) => {
        e.preventDefault();
        const targetEelement = e.target.tagName;
        let route;
        if (targetEelement === "IMG") {
          route = e.target.parentElement.parentElement.pathname;
        } else {
          route = e.target.parentElement.pathname;
        }
        window.history.pushState({}, "", route);
        this.renderContent(route);
      });
    });
  }

  registerBrowserBackAndForth() {
    window.onpopstate = function (e) {
      e.preventDefault();
      const route = window.location.pathname;
      // console.log(route);
      this.renderContent(route);
    };
  }

  setupRouter() {
    this.registerNavLinks();
    this.registerBrowserBackAndForth();
  }
}
