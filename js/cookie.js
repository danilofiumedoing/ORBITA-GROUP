document.addEventListener("DOMContentLoaded", () => {






  // Controlla se l'utente ha già preso una decisione
  const cookiesAccepted = localStorage.getItem("cookiesAccepted");
  const cookieBanner = document.getElementById("cookie-banner");
  // Nasconde il banner se i cookie sono già stati accettati
  if (cookiesAccepted) {
    cookieBanner.style.display = "none";
  }
  // Mostra i collegamenti ai social se i cookie sono stati accettati
  if (cookiesAccepted === "true") {
    document.querySelectorAll(".social").forEach(function (element) {
      element.style.display = "inline-block";
    });
  }
  // Gestione del rifiuto dei cookie
  document
    .getElementById("reject-cookies")
    .addEventListener("click", function () {
      localStorage.setItem("cookiesAccepted", "false");
      cookieBanner.style.display = "none"; // Nasconde il banner
      document.querySelectorAll(".social").forEach(function (element) {
        element.style.display = "none"; // Nasconde i social
      });
    });
  // Gestione dell'accettazione dei cookie
  document
    .getElementById("accept-cookies")
    .addEventListener("click", function () {
      localStorage.setItem("cookiesAccepted", "true");
      cookieBanner.style.display = "none"; // Nasconde il banner

      document.querySelectorAll(".social").forEach(function (element) {
        element.style.display = "inline-block"; // Mostra i social
      });
    });

  window.addEventListener("load", () => {
    const openPopupLink = document.getElementById("open-cookie-popup");

    // Mostra il banner dopo un ritardo di 1.5 secondi
    setTimeout(() => {
      const banner = document.getElementById("cookie-banner");
      banner.style.top = "110px"; // Sposta il banner nella posizione visibile
      banner.style.opacity = "1"; // Rende visibile il banner
    }, 1500);

    // Quando clicchi sul link per riaprire il banner
    openPopupLink.addEventListener("click", (event) => {
      console.log('Hiiiii');
      
      event.preventDefault(); // Previene il comportamento predefinito del link

      // Rimuovi la scelta dal localStorage
      localStorage.removeItem("cookiesAccepted");

      // Ricarica la pagina per far riapparire il popup
      location.reload();
    });
  });

  // Funzione per far salire il banner con ritardo dopo il clic
  function hideBanner() {
    const banner = document.getElementById("cookie-banner");
    setTimeout(() => {
      banner.style.top = "-100px"; // Porta il banner fuori dallo schermo
      // banner.style.opacity = "0";   // Nasconde il banner
    }, 1000); // Ritardo di 1 secondo prima che salga
  }

  // Aggiungi event listener per il bottone "Accetta"
  document.getElementById("accept-cookies").addEventListener("click", () => {
    // Logica per memorizzare il consenso dei cookie (eventualmente)
    hideBanner();
  });

  // Aggiungi event listener per il bottone "Rifiuta"
  document.getElementById("reject-cookies").addEventListener("click", () => {
    // Logica per memorizzare il rifiuto dei cookie (eventualmente)
    hideBanner();
  });

});