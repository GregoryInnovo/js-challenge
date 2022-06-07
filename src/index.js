const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
let offset = 0;
let limit = 5;
let API = `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`;

const getData = (api) => {
  fetch(api)
    .then((response) => response.json())
    .then((response) => {
      let products = response;
      let output = products.map((product) => {
        // template
        console.table(product);
      });
      let newItem = document.createElement("section");
      newItem.classList.add("Item");
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch((error) => console.log(error));
};

const loadData = () => {
  getData(API);
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // save the initial position of the element
      localStorage.setItem("pagination", offset);
      // In this condition, we are checking if the element is visible in the viewport
      // and if it is, we are going to load more data
      if (entry.isIntersecting) {
        // and resolve the bug of get to much data
        if (entry.intersectionRatio >= 0.75) {
          // set offset to next page
          offset = limit;
          // increse the limit
          limit += 10;
          // update the api
          loadData();
        }
      }
    });
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);

loadData();
