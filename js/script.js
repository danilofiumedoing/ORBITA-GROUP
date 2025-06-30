document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetID = this.getAttribute("href");
      const target = document.querySelector(targetID);
      if (target) {
        const headerOffset = 0;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  gsap.registerPlugin(ScrollTrigger);

  // Header effetto trasparenza
  const header = document.getElementById("mainHeader");

  // All'inizio: header trasparente
  header.classList.add("transparent");

  // Primo scroll: diventa solid
  window.addEventListener("scroll", () => {
    if (
      window.scrollY > 50 &&
      !ScrollTrigger.isInViewport(document.querySelector(".container1"))
    ) {
      header.classList.add("solid");
      header.classList.remove("transparent");
    } else if (window.scrollY <= 50) {
      header.classList.remove("solid");
      header.classList.add("transparent");
    }
  });

  // Quando entra in .container1 → trasparente
  ScrollTrigger.create({
    trigger: ".container1",
    start: "top top",
    end: () =>
      `+=${
        (document.querySelectorAll(".panel").length - 1) * window.innerWidth
      }`,
    onEnter: () => {
      header.classList.add("transparent");
      header.classList.remove("solid");
    },
    onEnterBack: () => {
      header.classList.add("transparent");
      header.classList.remove("solid");
    },
    onLeave: () => {
      header.classList.add("solid");
      header.classList.remove("transparent");
    },
    onLeaveBack: () => {
      header.classList.add("solid");
      header.classList.remove("transparent");
    },
  });

  // Sezione "hero" bloccata, la successiva scorre sopra
  ScrollTrigger.create({
    trigger: "#hero",
    start: "top top",
    end: "bottom top",
    pin: true,
    pinSpacing: false,
  });

  // Animazione ingresso dei titoli
  gsap.utils.toArray(".section-white h2").forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  });

  // Funzione per adattare il testo alla sezione
  function fitTextToSection(sectionSelector) {
    const section = document.querySelector(sectionSelector);
    const textEl = section.querySelector("h2");

    if (!textEl) return;

    let fontSize = 200; // dimensione iniziale (px)
    textEl.style.fontSize = fontSize + "px";

    const sectionHeight = section.clientHeight - 40; // padding tolto
    const sectionWidth = section.clientWidth - 40;

    // scegli moltiplicatore in base a larghezza viewport
    const multiplier = window.innerWidth > 767 ? 0.35 : 0.2;

    while (
      (textEl.scrollHeight > sectionHeight ||
        textEl.scrollWidth > sectionWidth) &&
      fontSize > 10
    ) {
      fontSize--;
      textEl.style.fontSize = fontSize * multiplier + "px";
    }
  }

  function fitAllTexts() {
    fitTextToSection(".section-white");
  }

  window.addEventListener("load", fitAllTexts);
  window.addEventListener("resize", fitAllTexts);

  // Animazione ingresso dei testi
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".titolo", {
    x: "-100%",
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".titolo",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });

  gsap.from(".sottotitolo", {
    x: "100%",
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".sottotitolo",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });

  gsap.from(".testo", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.4,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".testo",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });

  // Animazione ingresso delle immagini
  gsap.registerPlugin(ScrollTrigger);

  const boxes = document.querySelectorAll(".hover-box");

  boxes.forEach((box, i) => {
    // Determina da che lato entrare
    const fromX = i % 2 === 0 ? "-100%" : "100%";

    gsap.fromTo(
      box,
      { x: fromX, opacity: 0 },
      {
        x: "0%",
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: box,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  });

  const carousel = document.getElementById("carousel8");
  let isDown = false;
  let startX;
  let scrollLeft;
  const scrollAmount = 2; // Velocità dello scorrimento continuo

  carousel.addEventListener("mousedown", (e) => {
    isDown = true;
    carousel.classList.add("active");
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener("mouseleave", () => {
    isDown = false;
    carousel.classList.remove("active");
  });

  carousel.addEventListener("mouseup", () => {
    isDown = false;
    carousel.classList.remove("active");
  });

  carousel.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast
    carousel.scrollLeft = scrollLeft - walk;
  });

  const carouselItems = document.querySelectorAll(".carousel-item8 img");

  // Disabilita il drag e la selezione delle immagini
  carouselItems.forEach((img) => {
    img.addEventListener("dragstart", (e) => e.preventDefault());
    img.addEventListener("mousedown", (e) => e.preventDefault());
    img.addEventListener("touchstart", (e) => e.preventDefault());
  });

  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");

  leftArrow.addEventListener("click", () => {
    carousel.scrollBy({ left: -400, behavior: "smooth" });
  });

  rightArrow.addEventListener("click", () => {
    carousel.scrollBy({ left: 400, behavior: "smooth" });
  });

  // Autoplay fluido
  function autoScroll() {
    carousel.scrollLeft += scrollAmount;

    // Se arriva alla fine, torna all'inizio per creare un loop infinito
    if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
      carousel.scrollLeft = 0;
    }

    requestAnimationFrame(autoScroll);
  }

  // Avvia lo scorrimento automatico
  // autoScroll();

  gsap.registerPlugin(ScrollTrigger);

  const panels = gsap.utils.toArray(".panel");
  const scrollLength = (panels.length - 1) * window.innerWidth;

  gsap.to(".horizontal-scroll", {
    x: () => `-${scrollLength}px`,
    ease: "none",
    scrollTrigger: {
      trigger: ".container1",
      start: "top top",
      end: () => `+=${scrollLength}`,
      scrub: 1,
      pin: true,
      snap: {
        snapTo: 1 / (panels.length - 1), // Snap ad ogni sezione
        duration: 0.5,
        ease: "power1.inOut",
      },
      anticipatePin: 1,
    },
  });

  gsap.from("#contact-form", {
    scrollTrigger: {
      trigger: "#contact-form",
      start: "top 80%",
    },
    opacity: 0,
    y: 100,
    duration: 0.8,
    ease: "power3.out",
  });

  gsap.from("#contact-form .form-group", {
    scrollTrigger: {
      trigger: "#contact-form",
      start: "top 80%",
    },
    opacity: 0,
    y: 30,
    stagger: 0.15,
    duration: 0.5,
    ease: "power2.out",
    delay: 0.1,
  });



  gsap.from("#carousel-container", {
    scrollTrigger: {
      trigger: "#carousel-container",
      start: "top 80%",
    },
    opacity: 0,
    x: -100,
    duration: 0.8,
    ease: "power3.out",
  });








});
