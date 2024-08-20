// const route = (event) => {
//   event = event || window.event;
//   event.preventDefault();
//   window.history.pushState({}, "", event.target.href);
//   handleLocation(event);
// };

document.addEventListener("click", (event) => {
  if (!event.target.matches("a")) return;
  else {
    console.log("link clicked");
  }
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  console.log("handle locationed ran");
  handleLocation();
});

const routes = {
  404: {
    url: "/pages/404.html",
    title: "404 page not found",
    description: "404 page not found",
  },
  "/": {
    url: "/pages/home.html",
    title: "Homepage",
    description: "Homepage of the JavaScript Router tutorial for SPA",
  },
  "/about": {
    url: "/pages/about.html",
    title: "About the JS Router SPA",
    description:
      "This single page application is dedicated to teaching how the JavaScript Router works",
  },

  "/languages": {
    url: "/pages/languages.html",
    title: "Alorem ipsum",
    description: "lorem ipsum text filler",
  },
};

const handleLocation = async () => {
  const path = window.location.pathname;
  const route = routes[path] || routes[404];
  console.log(`the path is ${path}
    the route is ${route}`);
  const html = await fetch(route.url).then((data) => data.text());
  // .catch((error) => console.error(error));
  document.getElementById("main-page").innerHTML = html;
};

window.onpopstate = handleLocation;
// window.route = route;

handleLocation();
