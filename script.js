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

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

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
  note.textContent = 'Se deschide emailul cu solicitarea ta — trimite-o pentru a o confirma.';
});
