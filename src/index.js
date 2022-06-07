const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
let offset = 0;
let limit = 5;
let API;
let output;
const getData = (api) => {
  fetch(api)
    .then((response) => response.json())
    .then((response) => {
      let products = response;
      output = products.map((product) => {
        return `
          <article class="Card">
            <img src="${product.images[0]}"  alt="${product.description}" width="100%" height="auto" />
            <h2>
              ${product.title}
              <small>$ ${product.price}</small>
            </h2>
          </article>
        `;
      });
      let newItem = document.createElement("section");
      newItem.classList.add("Items");
      newItem.innerHTML += output.join(" ");
      $app.appendChild(newItem);
    })
    .catch((error) => console.log(error));
};

const loadData = () => {
  API = `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`;
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
