/**
 * Matcha & Muse — Interactive Client-Side JavaScript
 */

// 1. Pairing Engine Data Repository
const pairingDatabase = {
  mystery: {
    teaName: "Lapsang Souchong & Bergamot",
    category: "Smoked Black Tea",
    description: "Pine-smoked Chinese black tea infused with cold-pressed Italian bergamot peel. Deep, mysterious, and shadowy.",
    temp: "95°C",
    steep: "4 mins",
    origin: "Wuyi Mountains, Fujian",
    bookTitle: "The Hound of the Baskervilles",
    bookAuthor: "Arthur Conan Doyle",
    bookQuote: "“The world is full of obvious things which nobody by any chance ever observes.”"
  },
  classics: {
    teaName: "First Flush Darjeeling & Wild Rose",
    category: "Estate Black Blend",
    description: "Muscatel grape notes with a whisper of dried organic rose petals. Crisp, intellectual, and timeless.",
    temp: "90°C",
    steep: "3 mins",
    origin: "Makaibari Estate, India",
    bookTitle: "Pride and Prejudice",
    bookAuthor: "Jane Austen",
    bookQuote: "“I declare after all there is no enjoyment like reading! How much sooner one gets tired of any thing than of a book!”"
  },
  scifi: {
    teaName: "Silver Needle White Tea & Lemongrass",
    category: "Subtle Solar Infusion",
    description: "Sun-dried young tea buds with citrus lemongrass. Ethereal, crystal-clear, and mathematically pure.",
    temp: "80°C",
    steep: "5 mins",
    origin: "Fuding, China",
    bookTitle: "Dune",
    bookAuthor: "Frank Herbert",
    bookQuote: "“The mystery of life isn't a problem to solve, but a reality to experience.”"
  },
  poetry: {
    teaName: "Ceremonial Uji Matcha",
    category: "Single-Cultivar Stone-Ground",
    description: "Intense vibrant emerald liquor with savory umami sweetness and a long, meditative finish.",
    temp: "75°C",
    steep: "Whisk 30s",
    origin: "Uji, Kyoto, Japan",
    bookTitle: "The Book of Hours",
    bookAuthor: "Rainer Maria Rilke",
    bookQuote: "“Let everything happen to you: beauty and terror. Just keep going. No feeling is final.”"
  },
  fantasy: {
    teaName: "Spiced Cardamom Roasted Hojicha",
    category: "Toasted Green & Hearth Spice",
    description: "Charcoal-roasted green tea barks simmered with green cardamom and Ceylon cinnamon. Smells like a tavern hearth.",
    temp: "90°C",
    steep: "3 mins",
    origin: "Shizuoka, Japan",
    bookTitle: "The Hobbit",
    bookAuthor: "J.R.R. Tolkien",
    bookQuote: "“If more of us valued food and cheer and song above hoarded gold, it would be a merrier world.”"
  }
};

// 2. DOM Elements
const moodButtons = document.querySelectorAll(".mood-btn");
const pairingResultCard = document.getElementById("pairingResultCard");

const track = document.getElementById("carouselTrack");
const slides = Array.from(track.children);
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const dots = document.querySelectorAll(".indicator-dot");

const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");

// 3. Pairing Sommelier Generator
function renderPairing(genreKey) {
  const data = pairingDatabase[genreKey];
  if (!data) return;

  // Gentle fade transition
  pairingResultCard.style.opacity = "0";
  pairingResultCard.style.transform = "translateY(8px)";

  setTimeout(() => {
    pairingResultCard.innerHTML = `
      <div class="pairing-meta-side">
        <span class="result-badge">${data.category}</span>
        <h3 class="pairing-tea-name">${data.teaName}</h3>
        <p class="pairing-desc">${data.description}</p>
        
        <div class="pairing-specs">
          <div class="spec-item">
            <small>Water Temp</small>
            <strong>${data.temp}</strong>
          </div>
          <div class="spec-item">
            <small>Brew Time</small>
            <strong>${data.steep}</strong>
          </div>
          <div class="spec-item">
            <small>Origin</small>
            <strong>${data.origin}</strong>
          </div>
        </div>
      </div>

      <div class="pairing-book-side">
        <span class="book-tag">Recommended Reading</span>
        <h4 class="pairing-book-title">${data.bookTitle}</h4>
        <p class="pairing-book-author">by ${data.bookAuthor}</p>
        <blockquote class="pairing-quote">
          ${data.bookQuote}
        </blockquote>
      </div>
    `;

    pairingResultCard.style.opacity = "1";
    pairingResultCard.style.transform = "translateY(0)";
  }, 180);
}

// Mood button event listeners
moodButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    moodButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const genre = btn.getAttribute("data-genre");
    renderPairing(genre);
  });
});

// Initial render
renderPairing("mystery");

// 4. Curated Pairings Carousel Logic
let currentSlideIndex = 0;

function updateCarousel(index) {
  currentSlideIndex = index;
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${slideWidth * currentSlideIndex}px)`;

  // Update Dots
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlideIndex);
  });
}

nextBtn.addEventListener("click", () => {
  const nextIndex = (currentSlideIndex + 1) % slides.length;
  updateCarousel(nextIndex);
});

prevBtn.addEventListener("click", () => {
  const prevIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
  updateCarousel(prevIndex);
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    updateCarousel(index);
  });
});

// Handle resize so slide positioning stays pixel-perfect
window.addEventListener("resize", () => {
  updateCarousel(currentSlideIndex);
});

// 5. Mobile Navigation Toggle
hamburgerBtn.addEventListener("click", () => {
  navLinks.classList.toggle("nav-active");
  const isOpen = navLinks.classList.contains("nav-active");
  hamburgerBtn.setAttribute("aria-expanded", isOpen);
});

// Close nav when clicking any nav link
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("nav-active");
  });
});

// 6. Interactive Reservation Form Submission
function handleReservation() {
  const name = document.getElementById("guestName").value;
  const date = document.getElementById("visitDate").value;
  const count = document.getElementById("guestCount").value;
  const tea = document.getElementById("teaChoice").value;
  const alertBox = document.getElementById("reservationAlert");

  alertBox.className = "reservation-alert success";
  alertBox.innerHTML = `
    🍵 <strong>Nook Reserved for ${name}!</strong><br>
    We have set aside a quiet table for <strong>${count} guest(s)</strong> on <strong>${date}</strong>. 
    Your welcome cup of <em>${tea}</em> will be freshly prepared upon your arrival.
  `;

  // Reset form
  document.getElementById("reservationForm").reset();
}

console.log("Matcha & Muse interactive engine loaded successfully!");
