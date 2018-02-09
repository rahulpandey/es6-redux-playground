import store from "./service/store";
import { ActionCreators } from "./service/actions/";
const errorImagePath =
  "https://cdn-images-1.medium.com/max/1600/1*bcrPG2LR1GAG5VjEHB6PiA.gif";

class App {
  constructor() {
    console.log("loaded");
    store.subscribe(this.onStoreUpdate.bind(this));
    this.button = document.querySelector("button");
    this.main = document.querySelector("main");
    store.dispatch(ActionCreators.fetchMovies());
  }
  onStoreUpdate() {
    const { app } = store.getState();
    console.log(app);
    const movies = app.movies;
    if (this.main.childElementCount > 0) {
      var node = document.getElementById("grid");
      this.main.removeChild(node);
    }
    const div = document.createElement("div");
    div.id = "grid";
    if (!app.isLoading) {
      div.className = "grid";
      for (let index = 0; index < movies.length; index++) {
        const element = movies[index];
        const path = `${ActionCreators.IMAGE_BASE_URL}${element.poster_path}`;
        const imagePath = element.poster_path !== null ? path : errorImagePath;
        const innerHtml = document.createElement("div");
        innerHtml.className = "row";
        innerHtml.key = index;
        innerHtml.innerHTML = this.getElement(imagePath, element);
        div.appendChild(innerHtml);
      }
    } else {
      div.className = "item-center-container";
      div.innerHTML = '<div class="loader" /></div>';
    }
    this.main.appendChild(div);
  }

  getElement(imagePath, element) {
    return `<a target="_blank" href=${imagePath}>
              <img src=${imagePath} width=260 height=376 />
          </a>
          <div class="desc">${element.title}</div>`;
  }
}
export default App;
