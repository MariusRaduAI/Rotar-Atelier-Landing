// Rotar Atelier — landing page interactions

document.getElementById('year').textContent = new Date().getFullYear();

// Sticky header background on scroll
const header = document.getElementById('siteHeader');
const onScroll = () => {
  if (window.scrollY > 40) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll);
onScroll();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mainNav.classList.remove('open'));
});

// Craft image reveal — the one deliberate scroll-triggered moment.
// Base CSS already renders the image fully visible; this class only
// adds a one-time wipe-in flourish when it enters view.
const craftMedia = document.querySelector('.craft-media');
if (craftMedia) {
  const mediaIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        mediaIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  mediaIO.observe(craftMedia);
}

// Contact form — builds a mailto with the request details
const form = document.getElementById('offerForm');
const note = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const nume = data.get('nume') || '';
  const companie = data.get('companie') || '';
  const email = data.get('email') || '';
  const telefon = data.get('telefon') || '';
  const persoane = data.get('persoane') || '';
  const dataEv = data.get('data') || '';
  const mesaj = data.get('mesaj') || '';

  const subject = encodeURIComponent(`Cerere ofertă — ${nume}${companie ? ' / ' + companie : ''}`);
  const body = encodeURIComponent(
`Nume: ${nume}
Companie: ${companie}
Email: ${email}
Telefon: ${telefon}
Nr. persoane: ${persoane}
Data eveniment: ${dataEv}

Detalii & preferințe:
${mesaj}`
  );

  window.location.href = `mailto:contact@rotaratelier.ro?subject=${subject}&body=${body}`;
  note.textContent = 'Se deschide emailul cu solicitarea ta. Trimite-o pentru a o confirma.';
});
