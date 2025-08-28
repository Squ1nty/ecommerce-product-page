let cartIcon = document.querySelector(".cartIconContainer");
let cartPopUp = document.querySelector(".cartPopUp");
let cartBinIcon = document.querySelector

let profileIconContainer = document.querySelector(".profileIconContainer");

// Functions to set the cart's active/inactive state
function setCartInactive(){
    cartPopUp.setAttribute("inert", true);
    cartPopUp.style.opacity = "0";
}
function setCartActive(){
    cartPopUp.removeAttribute("inert");
    cartPopUp.style.opacity = "100%";
}

// Handles where the "Tab" key should direct a user based off cartPopUp being active or not
function handleCartTabbing(){
    if(cartPopUp.style.opacity === "0"){
        profileIconContainer.focus();
    }
    else{
        // In future, set this to the bin icon, if empty, focus stays on Cart Icon?
        // Additional note: check for the state of the cart not being empty as well?
        //                  this would ... just said the same thing above lol
    }
}

// Handles which state cart should be set to and calls relevant method
function handleCartState(){
    if(cartPopUp.style.opacity === "0"){
        setCartActive();
    }
    else{
        setCartInactive();
    }
}

// Upon loading/refresh of the page, cart will be set to a default inactive state
window.onload = () => {
    setCartInactive();
}

// Click event listener for cartIcon to set cartPopUp as either active or inactive
cartIcon.addEventListener("click", (e) => {
    handleCartState();
});
// On top of the above ^
// Tab event listener for CartIcon conditioned for whether or not the cartPopUp is active
cartIcon.addEventListener("keydown", (e) => {
    e.preventDefault();
    if(e.key === "Enter" || e.key === " "){
        handleCartState();
    }
    else if(e.key === "Tab"){
        handleCartTabbing();
    }
});

