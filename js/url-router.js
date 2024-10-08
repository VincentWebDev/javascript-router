//listens for clicks to the URL router links using a CSS selector
document.addEventListener("click", (event) => {
  //stops the function if the click is outside the nav links
  if (!event.target.matches("nav:first-of-type a")) return;

  //prevents the default action clicking on a link takes
  event.preventDefault();

  //updates the URL in the address bar
  window.history.pushState({}, "", event.target.href);

  //manages which html page to display after the URL is updated
  urlRouteLocation();
});

//object list of available pages
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

//function that checks the current URL in the address bar and displays the correct html content
const urlRouteLocation = async () => {
  try {
    //gets the path of the URL, this is the suffix part of the URL after the TLD index
    const path = window.location.pathname;

    //with the above path, the "urlRoutes[path]" identifies which Object key-value pair to get the html URL from
    //if the "urlRoutes[path]" doesn't exist, it defaults to the 404
    const route = urlRoutes[path] || urlRoutes[404];

    //now we know which key-value pair we need with "route", we can now fetch the child Object url using "route.url"
    //store the html page in a const
    const html = await fetch(route.url)
      .then((data) => data.text())
      .catch((error) => console.error(error));

    //render the html to the SPA
    document.getElementById("main-page").innerHTML = html;

    //update the page title in the html head
    document.title = route.title;

    //update the page meta description
    document
      .querySelector('meta[name="description"]')
      .setAttribute("content", route.description);
  } catch (error) {
    console.error(error);
  }
};

window.onpopstate = urlRouteLocation;

urlRouteLocation();
