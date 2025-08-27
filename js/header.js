let main = document.querySelector("main");

let navbar = document.querySelector("nav");
let hamburgerMenuIcon = document.querySelector(".hamburgerMenuIconContainer");
let closingMenuIcon = document.querySelector(".closingMenuIconContainer");

let navAnchorTags = navbar.querySelectorAll("a");
let lastNavAnchorTag = navAnchorTags[navAnchorTags.length - 1];

let backdropFilter = document.querySelector(".navbarBackdropFilter");
let isNavbarOpen = false;

// Handles how navbar is displayed upon loading or resizing the window
function handleNavbarWindowSize(){
  if(window.innerWidth <= 1024){
    navbar.setAttribute("inert", true);
  }
  else{
    navbar.removeAttribute("inert");
  }
}
window.onload = () => {
  handleNavbarWindowSize();
}
window.addEventListener("resize", () =>{
  handleNavbarWindowSize();
});

//Handles navbar focus-trap
lastNavAnchorTag.addEventListener("keydown", (e) => {
  e.preventDefault();
  if(e.key === "Tab" && window.innerWidth <= 1024){
    closingMenuIcon.focus();
  }
});

// Handles the opening of mobile-menu
function handleNavbarOpen(){
  isNavbarOpen = true;
  backdropFilter.classList.add("active");
  main.setAttribute("inert", true);
  navbar.removeAttribute("inert");
  navbar.style.right = "33%";
  closingMenuIcon.focus();
}
hamburgerMenuIcon.addEventListener("click", () => {
  handleNavbarOpen();
});
hamburgerMenuIcon.addEventListener("keydown", (e) => {
  if(e.key === "Enter" || e.key === " "){
    handleNavbarOpen();
  }
});

// Handles the closing of mobile-menu
function handleNavbarClose(){
  isNavbarOpen = false;
  backdropFilter.classList.remove("active");
  main.removeAttribute("inert");
  navbar.setAttribute("inert", true);
  navbar.style.right = "100%";
  hamburgerMenuIcon.focus();
}
closingMenuIcon.addEventListener("click", () => {
  handleNavbarClose();
});
closingMenuIcon.addEventListener("keydown", (e) => {
  if(e.key === "Enter" || e.key === " "){
    handleNavbarClose();
  }
});

// Handles "click" of navbarBackdropFilter
backdropFilter.addEventListener("click", (e) => {
  if(isNavbarOpen === true){
    handleNavbarClose();
  }
});