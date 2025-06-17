document.addEventListener("DOMContentLoaded", () => {

     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  
  gsap.registerPlugin(ScrollTrigger);

  // Header effetto trasparenza
  const header = document.getElementById("mainHeader");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.remove("transparent");
      header.classList.add("solid");
    } else {
      header.classList.remove("solid");
      header.classList.add("transparent");
    }
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

  gsap.utils.toArray(".section-black h2").forEach((el) => {
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

  function fitTextToSection(sectionSelector) {
    const section = document.querySelector(sectionSelector);
    const textEl = section.querySelector("h2");

    if (!textEl) return;

    let fontSize = 200; // dimensione iniziale (px)
    textEl.style.fontSize = fontSize + "px";

    const sectionHeight = section.clientHeight - 40; // padding tolto
    const sectionWidth = section.clientWidth - 40;

    // scegli moltiplicatore in base a larghezza viewport
    const multiplier = window.innerWidth > 767 ? 0.39 : 0.2;

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


  

 gsap.registerPlugin(ScrollTrigger);

const container = document.querySelector(".container");

const totalPanels = container.children.length;
const maxScroll = container.scrollWidth - window.innerWidth;

gsap.to(container, {
  x: () => -maxScroll,
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-wrapper",
    start: "top top",
    end: () => "+=" + maxScroll,
    scrub: 0.8,
    pin: true,
    snap: 1 / (totalPanels - 1),  // snap esatto ad ogni pagina
    invalidateOnRefresh: true,
  },
});


});
