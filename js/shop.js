"use strict";

//  SHOP LOGICS
const slides = document.querySelectorAll('.shop-hero__slide');
const dots = document.querySelectorAll('.dot');
let index = 0;

function showSlide(i) {
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  slides[i].classList.add('active');
  dots[i].classList.add('active');
}

function nextSlide() {
  index++;
  if (index >= slides.length) index = 0;
  showSlide(index);
}

let interval = setInterval(nextSlide, 5000);

// manual controls
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    clearInterval(interval);
    index = i;
    showSlide(index);
    interval = setInterval(nextSlide, 5000);
  });
});


