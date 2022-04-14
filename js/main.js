'use strict'

window.onscroll = function() {myFunction();};

const header = document.querySelector(".header");
const sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}