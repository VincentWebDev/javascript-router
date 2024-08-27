//save the circle and square elements
const circles = document.getElementsByClassName("circle");
const squares = document.getElementsByClassName("square");

//since circles and squares are objects with the same keys (0, 1, 2),
//I save them in the shapes array, instead of combing them in another object, using the spread operator to avoid overwriting the first 3 keys
const shapes = [...circles, ...squares];

//save the replace-state element
const replaceState = document.getElementById("replace-state");

//save the URL in the window upon first loading the page
let path = window.location.href;

//add an click event listener to each square and cirle
//pushState updates the current URL and browser URL history
//pushState syntax: pushState(state, unused, url)
//instead of passing an empty object state to pushState, I could have passed the shape id and refactor the code using event.state
shapes.forEach((shape) => {
  shape.addEventListener("click", () => {
    window.history.pushState({}, "", path + "/" + shape.id);
    document.title = shape.id;

    //function to change the size of the shape when clicked
    handleShapeUrl(shape);
  });
});

//replaceState will update the URL but not the browser URL history
//also changes the replaceState button size for 1.5 seconds
replaceState.addEventListener("click", () => {
  window.history.replaceState({}, "", path + "/replace-state");
  document.title = "replaceState()";
  replaceState.style.width = "280px";
  replaceState.style.height = "140px";
  setTimeout(() => {
    replaceState.style.width = "240px";
    replaceState.style.height = "120px";
  }, "1500");
});

//changes the size of the circle or square shapes when clicked
function handleShapeUrl(shape) {
  Object.keys(shapes).forEach((key) => {
    if (shapes[key] == shape) {
      shape.classList.add("clicked");
    } else {
      shapes[key].classList.remove("clicked");
    }
  });
}

//popstate listens for changes to the browser back and forward buttons
window.onpopstate = () => {
  //triggers an alert when the popstate event is fired
  document.getElementById("popstate-alert").style.visibility = "visible";
  setTimeout(() => {
    document.getElementById("popstate-alert").style.visibility = "hidden";
  }, "1500");

  //get the current URL path
  const updatedPath = window.location.href;

  //get the suffix/ending of the URL
  const updatedPathEnding = updatedPath.substring(
    updatedPath.lastIndexOf("/") + 1
  );

  //checks if the URL is updated to one of the circles and to update its size
  //notice none of the squares are listening for the popstate event
  Object.keys(circles).forEach((key) => {
    if (updatedPathEnding == circles[key].id) {
      circles[key].classList.add("clicked");
    } else {
      circles[key].classList.remove("clicked");
    }
  });
};
