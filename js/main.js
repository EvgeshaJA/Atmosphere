'use strict'

window.onscroll = function() {myFunction();};

const header = document.querySelector(".header");
const sticky = header.offsetTop;
const forms = document.querySelectorAll('.form-body');

const modalButton = document.querySelectorAll('.modal-button');
const modal = document.querySelector('.modal');
const overlay = modal.querySelector('.overlay');
const closeButton = document.querySelector('.modal__close');


function myFunction() {
  if (window.pageYOffset >= sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}



$(".slider").slick({
  arrows: false,
  dots: false,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: 1000,
  speed: 500,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        arrows: false,
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 576,
      settings: {
        arrows: true,
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 2
 
      },
    },
    {
      breakpoint: 500,
      settings: {
        arrows: true,
        centerMode: true,
        centerPadding: '30px',
        slidesToShow: 2
      },
    },
    {
      breakpoint: 450,
      settings: {
        arrows: true,
        centerMode: true,
        centerPadding: '10px',
        slidesToShow: 2
      },
      
    },

    {
      breakpoint: 400,
      settings: {
        arrows: true,
        centerMode: true,
        centerPadding: '50px',
        slidesToShow: 1
      },
      
    },
  ],
});



$(function () {
  $(".minimized").click(function (event) {
    var i_path = $(this).attr("src");
    $("body").append(
      '<div id="overlay"></div><div id="magnify"><img src="' +
      i_path +
      '"><div id="close-popup"><i></i></div></div>'
    );
    $("#magnify").css({
      left: ($(document).width() - $("#magnify").outerWidth()) / 2,
      // top: ($(document).height() - $('#magnify').outerHeight())/2 upd: 24.10.2016
      top: ($(window).height() - $("#magnify").outerHeight()) / 2,
    });
    $("#overlay, #magnify").fadeIn("fast");
  });

  $("body").on("click", "#close-popup, #overlay", function (event) {
    event.preventDefault();

    $("#overlay, #magnify").fadeOut("fast", function () {
      $("#close-popup, #magnify, #overlay").remove();
    });
  });
});


forms.forEach((form) => {
  form.addEventListener('submit', function (e){
    e.preventDefault();
    const formData = new FormData(e.target); 
    const formProps = Object.fromEntries(formData); 
    fetch('php/send.php',{
      method: 'POST',
      body: JSON.stringify(formProps),
      headers: {
        'Content-type': 'application/json'
      }
    });

    window.location.href = "thanks.html";

  });
});



modalButton.forEach((i) => { 
    i.addEventListener('click', (event) => { 
        modal.classList.remove('modal__hidden');
    });
});

overlay.addEventListener('click', () => {
    modal.classList.add('modal__hidden');
});

closeButton.addEventListener('click', () => {
    modal.classList.add('modal__hidden');
});


window.addEventListener("DOMContentLoaded", function() {
  [].forEach.call( document.querySelectorAll('.tel'), function(input) {
  var keyCode;
  function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function(a) {
              return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
          });
      i = new_value.indexOf("_");
      if (i != -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i);
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function(a) {
              return "\\d{1," + a.length + "}";
          }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5)  this.value = "";
  }

  input.addEventListener("input", mask, false);
  input.addEventListener("focus", mask, false);
  input.addEventListener("blur", mask, false);
  input.addEventListener("keydown", mask, false);

});

});
