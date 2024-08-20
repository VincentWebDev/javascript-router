document.addEventListener("click", (event) => {
  if (!event.target.matches("nav:first-of-type a")) return;

  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  urlRouteLocation();
});

const urlRoutes = {
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
    title: "About Me",
    description: "About Vincent Croos",
  },

  "/languages": {
    url: "/pages/languages.html",
    title: "Best Programming Languages",
    description:
      "The top 5 programming languages you should learn to start your career as a junior developer: JavaScript, Python, SQL, Swift, and Go",
  },
};

const urlRouteLocation = async () => {
  const path = window.location.pathname;
  const route = urlRoutes[path] || urlRoutes[404];

  const html = await fetch(route.url)
    .then((data) => data.text())
    .catch((error) => console.error(error));
  document.getElementById("main-page").innerHTML = html;
  document.title = route.title;
  document
    .querySelector('meta[name="description"]')
    .setAttribute("content", route.description);
};

window.onpopstate = urlRouteLocation;
// window.route = route;

urlRouteLocation();
