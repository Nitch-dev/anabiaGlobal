const slides = Array.from(document.querySelectorAll('.slide'));
const dotsWrap = document.getElementById('dots');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');
const heroSlider = document.querySelector('.hero-slider');
const menuBtn = document.getElementById('menu-btn');
const mainNav = document.getElementById('main-nav');
const applyForm = document.getElementById('apply-form');
const formNote = document.getElementById('form-note');

let activeIndex = 0;
let autoSlideTimer;

function buildDots() {
  if (!dotsWrap) {
    return;
  }

  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => {
      setSlide(index);
      restartAutoSlide();
    });
    dotsWrap.appendChild(dot);
  });
}

function updateDots() {
  if (!dotsWrap) {
    return;
  }

  const dots = dotsWrap.querySelectorAll('button');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === activeIndex);
  });
}

function setSlide(index) {
  if (!slides.length) {
    return;
  }

  slides[activeIndex].classList.remove('active');
  activeIndex = (index + slides.length) % slides.length;
  slides[activeIndex].classList.add('active');
  updateDots();
}

function nextSlide() {
  setSlide(activeIndex + 1);
}

function prevSlide() {
  setSlide(activeIndex - 1);
}

function startAutoSlide() {
  if (!slides.length || slides.length < 2) {
    return;
  }

  autoSlideTimer = setInterval(nextSlide, 4500);
}

function restartAutoSlide() {
  clearInterval(autoSlideTimer);
  startAutoSlide();
}

if (prevBtn && nextBtn && slides.length) {
  prevBtn.addEventListener('click', () => {
    prevSlide();
    restartAutoSlide();
  });

  nextBtn.addEventListener('click', () => {
    nextSlide();
    restartAutoSlide();
  });
}

if (heroSlider) {
  heroSlider.addEventListener('mouseenter', () => {
    clearInterval(autoSlideTimer);
  });

  heroSlider.addEventListener('mouseleave', () => {
    restartAutoSlide();
  });
}

if (menuBtn && mainNav) {
  menuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
    });
  });
}

if (applyForm && formNote) {
  applyForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(applyForm);
    const applicantName = data.get('name')?.toString().trim() || 'Applicant';

    formNote.textContent = `Thank you, ${applicantName}. Your application has been recorded. Our team will contact you soon.`;
    applyForm.reset();
  });
}

if (slides.length) {
  buildDots();
  updateDots();
  startAutoSlide();
}
