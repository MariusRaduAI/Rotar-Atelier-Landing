/* Rotar Atelier: page behaviour. Copy and language switching live in i18n.js. */
(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var t = function (key) { return window.RotarI18n.t(key); };

  /* ------------------------------------------------------------------
   * Configuration
   * ------------------------------------------------------------------ */

  // Real client quotes for the "What clients say" block. While this list is
  // empty the block stays hidden, so nothing invented is ever shown.
  //   { quote: { en: '...', ro: '...' }, by: { en: 'Name, role, company', ro: '...' } }
  var TESTIMONIALS = [];

  // Where the lead form posts (Formspree, a serverless function, etc.).
  // Left empty, the form hands the request to WhatsApp instead.
  var FORM_ENDPOINT = '';

  var WHATSAPP_NUMBER = '40720786883';

  /* ------------------------------------------------------------------
   * Footer year
   * ------------------------------------------------------------------ */
  var year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------
   * Mobile navigation
   * ------------------------------------------------------------------ */
  var toggle = $('#navToggle');
  var nav = $('#mainNav');

  function setNav(open) {
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', t(open ? 'nav.close' : 'nav.open'));
  }
  toggle.addEventListener('click', function () { setNav(!nav.classList.contains('is-open')); });
  $$('a', nav).forEach(function (a) { a.addEventListener('click', function () { setNav(false); }); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setNav(false); toggle.focus(); }
  });
  window.matchMedia('(min-width: 1101px)').addEventListener('change', function (e) { if (e.matches) setNav(false); });
  window.RotarI18n.onChange(function () { setNav(nav.classList.contains('is-open')); });

  /* ------------------------------------------------------------------
   * "Ask about this" links pre-select the occasion in the form
   * ------------------------------------------------------------------ */
  var occasion = $('#occasion');
  $$('[data-occasion]').forEach(function (el) {
    el.addEventListener('click', function () {
      if (occasion) occasion.value = el.getAttribute('data-occasion');
    });
  });

  /* ------------------------------------------------------------------
   * Social proof
   * ------------------------------------------------------------------ */
  var proof = $('#proof');
  var proofList = $('#proofList');

  function renderProof(lang) {
    if (!proof || !proofList) return;
    proofList.textContent = '';
    if (!TESTIMONIALS.length) { proof.hidden = true; return; }
    TESTIMONIALS.forEach(function (item) {
      var fig = document.createElement('figure');
      fig.className = 'quote';
      var bq = document.createElement('blockquote');
      var p = document.createElement('p');
      p.textContent = '“' + (item.quote[lang] || item.quote.en) + '”';
      bq.appendChild(p);
      var cap = document.createElement('footer');
      cap.textContent = item.by[lang] || item.by.en;
      fig.appendChild(bq);
      fig.appendChild(cap);
      proofList.appendChild(fig);
    });
    proof.hidden = false;
  }
  renderProof(window.RotarI18n.get());
  window.RotarI18n.onChange(renderProof);

  /* ------------------------------------------------------------------
   * Lead form
   * ------------------------------------------------------------------ */
  var form = $('#offerForm');
  var status = $('#formStatus');
  var dateInput = $('#f-date');

  if (dateInput) dateInput.min = new Date().toISOString().slice(0, 10);

  function setStatus(msg, isError) {
    status.textContent = msg;
    status.classList.toggle('is-error', !!isError);
  }

  function optionLabel(select) {
    return select.options[select.selectedIndex] ? select.options[select.selectedIndex].textContent : '';
  }

  function formatDate(value, lang) {
    if (!value) return '';
    var p = value.split('-');
    var d = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2]));
    return d.toLocaleDateString(lang === 'ro' ? 'ro-RO' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  }

  function collect(lang) {
    var f = form.elements;
    return {
      name: f.name.value.trim(),
      company: f.company.value.trim(),
      phone: f.phone.value.trim(),
      email: f.email.value.trim(),
      occasion: optionLabel(f.occasion),
      format: optionLabel(f.format),
      date: formatDate(f.date.value, lang),
      guests: f.guests.value.trim(),
      message: f.message.value.trim()
    };
  }

  function buildMessage(d) {
    var rows = [
      [t('form.name'), d.name],
      [t('form.company'), d.company],
      [t('form.phone'), d.phone],
      [t('form.email'), d.email],
      [t('form.occasion'), d.occasion],
      [t('form.format'), d.format],
      [t('form.date'), d.date],
      [t('form.guests'), d.guests],
      [t('form.message'), d.message]
    ].filter(function (r) { return r[1]; });
    return t('wa.hello') + '\n\n' + rows.map(function (r) { return r[0] + ': ' + r[1]; }).join('\n');
  }

  function validate() {
    var name = form.elements.name;
    var phone = form.elements.phone;
    var email = form.elements.email;
    var ok = true;
    [name, phone].forEach(function (el) {
      var bad = !el.value.trim();
      el.classList.toggle('is-invalid', bad);
      el.setAttribute('aria-invalid', String(bad));
      if (bad) ok = false;
    });
    var badMail = !!email.value.trim() && !email.checkValidity();
    email.classList.toggle('is-invalid', badMail);
    email.setAttribute('aria-invalid', String(badMail));
    if (badMail) ok = false;
    return ok;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form.elements.website.value) return; // honeypot
    if (!validate()) {
      setStatus(t('status.missing'), true);
      var firstBad = $('.is-invalid', form);
      if (firstBad) firstBad.focus();
      return;
    }

    var lang = window.RotarI18n.get();
    var data = collect(lang);

    if (FORM_ENDPOINT) {
      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(Object.assign({ language: lang }, data))
      }).then(function (res) {
        if (!res.ok) throw new Error('bad status');
        form.reset();
        setStatus(t('status.sent'), false);
      }).catch(function () {
        setStatus(t('status.error'), true);
      });
      return;
    }

    setStatus(t('status.opening'), false);
    var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(buildMessage(data));
    window.open(url, '_blank', 'noopener');
  });

  $$('input', form).forEach(function (el) {
    el.addEventListener('input', function () {
      el.classList.remove('is-invalid');
      el.removeAttribute('aria-invalid');
    });
  });
})();
