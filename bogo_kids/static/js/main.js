console.log("Hello from main.js");

document.addEventListener("DOMContentLoaded", () => {
  // ==========================
  // 🔍 FILTRO DE ACTIVIDADES
  // ==========================
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("filterCategory");
  const activityCards = document.querySelectorAll(".activity-card");
  const noResults = document.getElementById("noResults");

  function normalizeText(s) {
    return s?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || "";
  }

  function filtrarActividades() {
    const term = normalizeText(searchInput.value);
    const selectedCategory = normalizeText(categoryFilter.value);
    let visibleCount = 0;

    activityCards.forEach(card => {
      const name = normalizeText(card.querySelector("h2")?.textContent);
      const description = normalizeText(card.querySelector(".descripcion")?.textContent);
      const categoria = normalizeText(card.querySelector(".categoria")?.textContent);

      const matchesSearch =
        name.includes(term) || description.includes(term) || categoria.includes(term);
      const matchesCategory =
        selectedCategory === "" || categoria.includes(selectedCategory);

      if (matchesSearch && matchesCategory) {
        card.style.display = "";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    noResults.style.display = visibleCount === 0 ? "block" : "none";
  }

  searchInput.addEventListener("keyup", filtrarActividades);
  categoryFilter.addEventListener("change", filtrarActividades);


  // ==========================
  // 🎠 CARRUSEL AUTOMÁTICO
  // ==========================
  const track = document.querySelector(".carousel-track");
  const cards = document.querySelectorAll(".carousel-card");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  if (track && cards.length > 0) {
    let index = 0;
    const total = cards.length;
    let autoSlide;

    function moveCarousel() {
      const cardWidth = cards[0].offsetWidth + 20; // ancho + gap
      track.style.transform = `translateX(-${index * cardWidth}px)`;
    }

    function nextSlide() {
      index = (index + 1) % total;
      moveCarousel();
    }

    function prevSlide() {
      index = (index - 1 + total) % total;
      moveCarousel();
    }

    nextBtn?.addEventListener("click", () => {
      nextSlide();
      resetAutoplay();
    });

    prevBtn?.addEventListener("click", () => {
      prevSlide();
      resetAutoplay();
    });

    function startAutoplay() {
      autoSlide = setInterval(nextSlide, 4000);
    }

    function stopAutoplay() {
      clearInterval(autoSlide);
    }

    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    // Detiene el autoplay al pasar el mouse y lo reanuda al salir
    const carouselContainer = document.querySelector(".carousel-container");
    carouselContainer.addEventListener("mouseenter", stopAutoplay);
    carouselContainer.addEventListener("mouseleave", startAutoplay);

    // Recalcular desplazamiento en resize
    window.addEventListener("resize", moveCarousel);

    // Iniciar autoplay al cargar
    startAutoplay();
  }
});
