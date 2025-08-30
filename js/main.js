const itemImageArray = ["./images/image-product-1", 
                        "./images/image-product-2", 
                        "./images/image-product-3", 
                        "./images/image-product-4"];

let itemImgContainer = document.querySelector(".itemImgContainer");
let currentItemImg = document.querySelector(".currentItemImg");
let itemThumbnailImgWrapper = document.querySelector(".itemThumbnailImgWrapper");
let allThumbnailImgContainers = document.querySelectorAll(".itemThumbnailImgContainer");

let currentImgPath = "";
let currentImgNumber = -1;
let arrowClicked;

function handleThumbnailImgActiveState(currentImgNumber){
  allThumbnailImgContainers.forEach((itemThumbnailImgContainer) => {
    if(itemThumbnailImgContainer.classList.contains("active")){
      itemThumbnailImgContainer.classList.remove("active");
    }
  });

  let currentThumbnailImgActive = document.querySelector(".itemThumbnailImg" + currentImgNumber);
  let currentThumbnailImgContainer = currentThumbnailImgActive.parentNode;
  currentThumbnailImgContainer.classList.add("active");
}
function handleCurrentMainImg(currentImgNumber){
  currentImgPath = itemImageArray[currentImgNumber - 1] + ".jpg";
  currentItemImg.setAttribute("src", currentImgPath);
  currentItemImg.setAttribute("alt", "Fall Limited Edition Sneaker by Sneaker Company");

  if(window.innerWidth >= 1025){
    handleThumbnailImgActiveState(currentImgNumber);
  }
}
function handleWindowSize(){
  currentImgNumber = 1;
  handleCurrentMainImg(currentImgNumber);

  if(window.innerWidth >= 1025){
    let itemThumbnailImg;
    let count = 1;
    itemImageArray.forEach(() => {
      itemThumbnailImg = document.querySelector(".itemThumbnailImg" + count);
      itemThumbnailImg.setAttribute("src", itemImageArray[count - 1] + "-thumbnail.jpg");
      count++;
    });
  }
}
// Load eventListener to setup all images upon load/reload?
window.addEventListener("load", () => {
  handleWindowSize();
});
window.addEventListener("resize", () => {
  handleWindowSize();
});

// eventListener to detect click and keydown for itemThumbnailImgContainer
itemThumbnailImgWrapper.addEventListener("click", (e) => {
  if(e.target.classList[1] === "itemThumbnailImg"){
    currentImgNumber = e.target.classList[0].slice(-1);
    handleCurrentMainImg(currentImgNumber);
  }
});
itemThumbnailImgWrapper.addEventListener("keydown", (e) => {
  if(e.key === "Enter" || e.key === " "){
    if(e.target.classList.contains("itemThumbnailImgContainer")){
      currentImgNumber = e.target.childNodes[3].classList[0].slice(-1);
      handleCurrentMainImg(currentImgNumber);
    }
    // Prevent default behavior for space key (scrolling)
    if(e.key === " ") {
        e.preventDefault();
    }
  }
});

// Handle image cycling
function handleMainImgCycle(currentImgNumber, arrowClicked){
  if(currentImgNumber === "1" && arrowClicked === "imgArrowContainerBack"){
    currentImgNumber = 4;
  }
  else if(currentImgNumber === "4" && arrowClicked === "imgArrowContainerNext"){
    currentImgNumber = 1;
  }
  else if(arrowClicked === "imgArrowContainerBack"){
    currentImgNumber = parseInt(currentItemImg.getAttribute("src").slice(0, -4).slice(-1)) - 1;
  }
  else if(arrowClicked === "imgArrowContainerNext"){
    currentImgNumber = parseInt(currentItemImg.getAttribute("src").slice(0, -4).slice(-1)) + 1;
  }
  else{
    console.log("Error: Unable to change currentItemImg");
  }
  
  handleCurrentMainImg(currentImgNumber);
}

// Handle arrow click for main image
itemImgContainer.addEventListener("click", (e) => {
  if(e.target.classList.contains("imgArrowContainer")){
    arrowClicked = e.target.classList[1];
  }
  if(e.target.classList.contains("arrowSVG")){
    arrowClicked = e.target.parentNode.classList[1];
  }
  currentImgNumber = currentItemImg.getAttribute("src").slice(0, -4).slice(-1);
  handleMainImgCycle(currentImgNumber, arrowClicked);
});