/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

// Initialize slides
let slideContainers = document.getElementsByClassName("slideshow-container");
let dotContainers = document.getElementsByClassName("dots");
let slideIndex = Array(slideContainers.length).fill(1)

for (i = 0; i < slideContainers.length; i++) {
  showSlides(1, i)
}

// Next/previous controls
function plusSlides(n, idx) {
  showSlides(slideIndex[idx] + n, idx);
}

// Thumbnail image controls
function currentSlide(n, idx) {
  showSlides(n, idx);
}

function showSlides(n, idx) {
  let i;
  let slides = slideContainers[idx].getElementsByClassName("mySlides");
  let dots = dotContainers[idx].getElementsByClassName("dot");
  let currentSlide = n
  if (n > slides.length) {currentSlide = 1}
  if (n < 1) {currentSlide = slides.length}
  slideIndex[idx] = currentSlide;
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  console.log("current slide: " + currentSlide)
  slides[currentSlide-1].style.display = "block";
  dots[currentSlide-1].className += " active";
}
