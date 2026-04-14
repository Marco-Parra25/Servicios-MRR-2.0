
document.addEventListener("DOMContentLoaded", () => {

  // ─── Menú móvil ────────────────────────────────────────────
  const toggleBtn   = document.getElementById('menu-toggle');
  const menuMobile  = document.getElementById('menu-mobile');

  if (toggleBtn && menuMobile) {
    toggleBtn.addEventListener('click', () => {
      menuMobile.classList.toggle('hidden');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.className = menuMobile.classList.contains('hidden')
          ? 'bi bi-list'
          : 'bi bi-x-lg';
      }
    });

    // Cerrar menú al hacer clic en un enlace
    menuMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuMobile.classList.add('hidden');
        const icon = toggleBtn.querySelector('i');
        if (icon) icon.className = 'bi bi-list';
      });
    });
  }

  // ─── Fondo animado del hero ────────────────────────────────
  const fondo = document.getElementById("fondo-animado");
  if (fondo) {
    const imagenes = [
      "IMAGENES/1.jpeg",
      "IMAGENES/2.jpg",
      "IMAGENES/3.jpg",
      "IMAGENES/4.jpg",
      "IMAGENES/5.jpg",
      "IMAGENES/6.jpg",
      "IMAGENES/7.jpg",
      "IMAGENES/9.jpg",
    ];
    let index = 0;

    // Imagen inicial
    fondo.style.backgroundImage = `url('${imagenes[index]}')`;
    fondo.style.backgroundSize  = 'cover';
    fondo.style.backgroundPosition = 'center';

    setInterval(() => {
      // Fade out suave
      fondo.style.opacity = '0';
      setTimeout(() => {
        index = (index + 1) % imagenes.length;
        fondo.style.backgroundImage = `url('${imagenes[index]}')`;
        fondo.style.opacity = '1';
      }, 800);
    }, 6000);

    // Asegurar transición de opacidad
    fondo.style.transition = 'opacity 0.8s ease';
  }

  // ─── Contador animado ──────────────────────────────────────
  const counters = document.querySelectorAll('[data-count]');

  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el     = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const duration = 1200; // ms
        const steps    = 60;
        const increment = target / steps;
        let current = 0;
        let step    = 0;

        const timer = setInterval(() => {
          step++;
          // Ease-out: slow down near the end
          const progress = step / steps;
          const eased = 1 - Math.pow(1 - progress, 3);
          current = Math.round(target * eased);

          el.textContent = current;

          if (step >= steps) {
            el.textContent = target;
            clearInterval(timer);
          }
        }, duration / steps);

        counterObserver.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

});
