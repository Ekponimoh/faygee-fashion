"use strict";
// OPEN & CLOSE
const mobileNav = document.getElementById("mobileNav");
const openBtn = document.getElementById("openMobileNav");
const closeBtn = document.getElementById("closeMobileNav");

openBtn.addEventListener("click", () => {
  mobileNav.classList.add("open");
});

closeBtn.addEventListener("click", () => {
  mobileNav.classList.remove("open");
});

// CLOSE ON OUTSIDE CLICK
mobileNav.addEventListener("click", (e) => {
  if (e.target === mobileNav) {
    mobileNav.classList.remove("open");
  }
});

// ACCORDION LOGIC
document.querySelectorAll(".mobile-nav__accordion").forEach((acc) => {
  const btn = acc.querySelector(".mobile-nav__accordion-btn");

  btn.addEventListener("click", () => {
    acc.classList.toggle("open");
  });
});


document.addEventListener("DOMContentLoaded", () => {
    const slides = [
        {
            image: "image/model.jpg",
            title: "Premium Fashion That Defines Your Style.",
            subtitle: "Shop luxury-ready clothing crafted for elegance, comfort, and everyday confidence.",
            btn1: "Shop Latest Arrivals",
            btn2: "Explore Collections →"
        },
        {
            image: "image/man-suit.jpg",
            title: "Tailored Menswear for the Modern Gentleman.",
            subtitle: "Discover premium suits, shirts, and apparel designed with precision and timeless appeal.",
            btn1: "Browse Men's Wear",
            btn2: "See Full Catalog →"
        },
        {
            image: "image/model-3.jpg",
            title: "Elevate Your Wardrobe With Timeless Women’s Fashion.",
            subtitle: "Explore elegant dresses, chic essentials, and premium pieces made to flatter every silhouette.",
            btn1: "Shop Women's Collection",
            btn2: "Discover More →"
        },
        {
            image: "image/bag.jpg",
            title: "Luxury Bags Crafted for Style and Durability.",
            subtitle: "Find premium handbags and accessories designed to complement every outfit effortlessly.",
            btn1: "Shop Bags",
            btn2: "View More →"
        },
        {
            image: "image/wig.jpg",
            title: "Premium Wigs for Effortless Beauty and Confidence.",
            subtitle: "Shop natural, high-quality wigs that elevate your look with comfort and style.",
            btn1: "Shop Wigs",
            btn2: "See More →"
        }
    ];

    let index = 0;

    const hero = document.querySelector(".hero");
    const heroContent = document.getElementById("heroContent");
    const heroTitle = document.getElementById("heroTitle");
    const heroSubtitle = document.getElementById("heroSubtitle");
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");


   function initHero() {
    hero.style.backgroundImage = `url(${slides[0].image})`;
    document.getElementById("heroTitle").textContent = slides[0].title;
    document.getElementById("heroSubtitle").textContent = slides[0].subtitle;
    document.getElementById("btn1").textContent = slides[0].btn1;
    document.getElementById("btn2").textContent = slides[0].btn2;

    // Fade content in only AFTER everything is ready
    heroContent.classList.add("loaded");
}

initHero(); 
index = 1; // Start slideshow from the second slide

// -----------------------
// SLIDE ROTATION
// -----------------------

    function updateHero() {   
        heroContent.classList.add("fade-out");

        setTimeout(() => {
            hero.style.backgroundImage = `url(${slides[index].image})`;

            heroTitle.textContent = slides[index].title;
            heroSubtitle.textContent = slides[index].subtitle;
            btn1.textContent = slides[index].btn1;
            btn2.textContent = slides[index].btn2;

            heroContent.classList.remove("fade-out");
            heroContent.classList.add("fade-in");
        }, 700);

        index = (index + 1) % slides.length;
    }

    updateHero();
    setInterval(updateHero, 6000);
});


// Basic Dynamic Rendering
const hompageProducts = [
  {
    image: "image/model.jpg",
    name: "Men’s Slim-Fit Casual Shirt",
    description: "Breathable cotton | Perfect for everyday wear",
    price: "₦12,500",
    link: "#"
  },
  {
    image: "image/model-2.jpg",
    name: "Elegant Women’s Floral Dress",
    description: "Lightweight fabric | Designed for comfort",
    price: "₦18,000",
    link: "#"
  },
  {
    image: "image/bag.jpg",
    name: "Premium Leather Handbag",
    description: "Durable | Stylish | Everyday essential",
    price: "₦22,900",
    link: "#"
  },
  {
    image: "image/wig.jpg",
    name: "Natural Wave Human Hair Wig",
    description: "Heat-resistant | Long-lasting curls",
    price: "₦45,000",
    link: "#"
  }
];

function loadFeaturedProducts() {
  const container = document.getElementById("featuredContainer");

  container.innerHTML = hompageProducts
    .map(item => {
      return `
        <div class="product-card">
          <img loading="lazy" src="${item.image}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <div class="price">${item.price}</div>
          <a href="${item.link}" class="btn-view">View Product →</a>
        </div>`;
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", loadFeaturedProducts);



// Testimonials slider
const testimonials = document.querySelectorAll(".testimonial");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let indexT = 0;

// Show initial
testimonials[indexT].classList.add("active");

function showTestimonial(i) {
  testimonials.forEach(t => t.classList.remove("active"));
  testimonials[i].classList.add("active");
}

// Next slide
function nextTestimonial() {
  indexT = (indexT + 1) % testimonials.length;
  showTestimonial(indexT);
}

// Prev slide
function prevTestimonial() {
  indexT = (indexT - 1 + testimonials.length) % testimonials.length;
  showTestimonial(indexT);
}

// Buttons
nextBtn.addEventListener("click", nextTestimonial);
prevBtn.addEventListener("click", prevTestimonial);

// Auto-slide every 6 seconds
setInterval(nextTestimonial, 6000);

// setting the current year
 const yearEl = "year";
 const currentYear = new Date().getFullYear();
 console.log(currentYear);


