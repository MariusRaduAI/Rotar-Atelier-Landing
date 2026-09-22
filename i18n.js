/* Rotar Atelier: EN / RO copy and language switcher.
 *
 * The HTML ships in English, so the page reads correctly with JavaScript off.
 * Elements opt in with:
 *   data-i18n="key"            -> textContent
 *   data-i18n-html="key"       -> innerHTML (our own strings only)
 *   data-i18n-attr="attr:key;attr2:key2"
 */
(function () {
  var STRINGS = {
    en: {
      'meta.title': 'Rotar Atelier | Private chef catering in Bucharest',
      'meta.description': 'Private chef catering for companies and private events in Bucharest. Home-made, never frozen, cooked live at your venue. Set menus or fully bespoke.',

      'skip': 'Skip to content',
      'nav.cater': 'What we cater',
      'nav.how': 'How we cater',
      'nav.visit': 'We come to you',
      'nav.calm': 'Calm service',
      'nav.gallery': 'Gallery',
      'nav.faq': 'FAQ',
      'fab.wa': 'Chat with us on WhatsApp',
      'nav.cta': 'Request a quote',
      'nav.open': 'Open menu',
      'nav.close': 'Close menu',
      'lang.label': 'Language',
      'lang.en': 'English',
      'lang.ro': 'Română',

      'hero.h1': 'Your private chef,<br><em>cooking where you are.</em>',
      'hero.sub': 'Catering for companies and private events in Bucharest. Home-made, never frozen, cooked live at your venue. Choose a set menu or ask for anything else.',
      'hero.cta': 'Request a quote',
      'hero.callLabel': 'Call 0720 786 883',
      'alt.hero': 'Overhead view of a table: roasted tomatoes, hummus with pomegranate, marinated olives and focaccia, with gold cutlery',
      'alt.cater': 'Roasted tomatoes on a white plate and marinated olives in a steel pan, with gold spoons',

      'cater.title': 'What we cater',
      'cater.lead': 'Every job starts in the same kitchen. What changes is the room, the headcount and the clock.',
      'cater.ask': 'Ask about this',
      'cater.1.n': 'Corporate Lunches',
      'cater.1.d': 'A proper lunch for the team, made fresh and served at the office.',
      'cater.2.n': 'Private Events',
      'cater.2.d': 'Dinners, birthdays and celebrations, with a menu built around your guest list.',
      'cater.3.n': 'Cakes & Edible Gifts',
      'cater.3.d': 'Cakes for the occasion, and edible gifts for teams and clients.',
      'cater.4.n': 'Company Meetings',
      'cater.4.d': 'Breakfast spreads, working lunches and coffee-break platters, on time.',
      'cater.5.n': 'Launches & Shoots',
      'cater.5.d': 'Food for a launch night or a full crew on set, timed to your schedule.',
      'cater.6.n': 'Dessert Bars',
      'cater.6.d': 'A dessert table built around your theme and headcount.',

      'how.title': 'How we cater',
      'how.lead': 'We have a set menu for the days you would rather not decide. Anything outside it is just as possible.',
      'how.chef.t': 'Private chef, live cooking',
      'how.chef.p': 'A chef cooks at your venue while your guests are there, from a menu we plan together.',
      'how.home.t': 'Home-made',
      'how.home.p': 'Everything is cooked from scratch by our own team. Nothing arrives frozen, nothing is made with margarine.',
      'how.menu.t': 'The set menu',
      'how.menu.p': 'Options ready to book, for when you want a quick answer.',
      'how.bespoke.t': 'Fully bespoke',
      'how.bespoke.p': 'High-end steak, Asian, whatever the brief says. If it is not on the menu, we build it around your budget.',
      'alt.chef': 'A chef piping cream over freshly baked cinnamon rolls',

      'visit.title': 'We come to you',
      'visit.lead': 'Give us an address and a start time. We bring the kitchen.',
      'visit.1.t': 'Tell us the plan',
      'visit.1.p': 'Date, place, headcount and budget. A rough idea is enough.',
      'visit.2.t': 'We send a proposal',
      'visit.2.p': 'A set menu or a bespoke one, priced to your budget.',
      'visit.3.t': 'You confirm',
      'visit.3.p': 'We need 48 hours’ notice, or 72 when the production is larger.',
      'visit.4.t': 'We arrive',
      'visit.4.p': 'We set up, cook and serve at your venue. Platters can also be collected from Popa Savu 56, or delivered by Glovo when the quantity allows.',

      'calm.title': 'Calm service.',
      'calm.statement': 'Most people worry about the same thing: will there be enough, and will it be there on time. We plan backwards from your start time and cook for the full headcount.',
      'calm.a.t': 'One point of contact',
      'calm.a.p': 'The same person from the first message to the last plate.',
      'calm.b.t': 'Enough for everyone',
      'calm.b.p': 'Quantities are worked out for your headcount, with a margin.',
      'calm.c.t': 'Clear from the start',
      'calm.c.p': 'You know the menu, the price and the arrival time before you confirm.',

      'gallery.title': 'On the table',
      'gifts.t': 'Edible gifts for your team',
      'gifts.p': 'Gifts for teams and clients, made by hand and sized to your list.',
      'gifts.cta': 'Ask about gifts',
      'alt.baker': 'A baker holding a stack of freshly cut focaccia',
      'alt.focaccia': 'Freshly cut focaccia stacked on a board',
      'alt.sandwich': 'Open sandwiches with ham, rocket and cherry tomatoes on toasted bread',
      'alt.rolls': 'A tray of cinnamon rolls topped with cream',
      'gallery.lead': 'Swipe through a few plates.',
      'g.s1.t': 'The shared table', 'g.s1.p': 'Roasted tomatoes, hummus, olives and focaccia.',
      'g.s2.t': 'Rolled ham skewers', 'g.s2.p': 'Mint, pomegranate and lemon zest.',
      'g.s3.t': 'The tasting plate', 'g.s3.p': 'Two soups, a savoury tart, a tartare.',
      'g.s4.t': 'Ready to serve', 'g.s4.p': 'The same plate, a different table.',
      'g.s5.t': 'Baked that morning', 'g.s5.p': 'Fresh focaccia, every time.',
      'g.s6.t': 'Assembled to order', 'g.s6.p': 'Ham, rocket, cherry tomatoes.',
      'g.s7.t': 'The crumb', 'g.s7.p': 'Slow fermentation, real air.',
      'g.s8.t': 'Something sweet, too', 'g.s8.p': 'Cinnamon rolls, fresh cream.',
      'gallery.prev': 'Previous photo', 'gallery.next': 'Next photo',
      'alt.g1': 'Overhead view of roasted tomatoes, marinated olives and a bowl of hummus with pomegranate',
      'alt.g2': 'A steel tray of rolled ham skewers with mint, pomegranate seeds and lemon zest',
      'alt.g3a': 'Overhead view of a tasting plate with two soups in glasses, a savoury tart and a beef tartare',
      'alt.g3b': 'The same tasting plate in low sun, with more plates lined up behind',
      'faq.title': 'Questions people ask',
      'faq.q1': 'How far in advance do I need to book?',
      'faq.a1': 'At least 48 hours before the event. For larger productions we may need 72 — we\u2019ll tell you which one applies when we send the offer.',
      'faq.q2': 'Do I need to pay a deposit?',
      'faq.a2': 'Yes — a deposit at confirmation, with the balance due at the event.',
      'faq.q3': 'What if I need to change the date, or cancel?',
      'faq.a3': 'Talk to us directly. We\u2019re flexible with date changes when you give us reasonable notice.',
      'faq.q4': 'Can you work around allergies or dietary restrictions?',
      'faq.a4': 'Yes — tell us about any allergy or restriction when you book, and we adjust the menu around it.',
      'faq.q5': 'Is there a minimum or maximum number of guests?',
      'faq.a5': 'No fixed limit. Tell us the headcount and we\u2019ll confirm we can cover it, then build the offer around it.',
      'faq.q6': 'Do you only work in Bucharest?',
      'faq.a6': 'Mainly Bucharest, plus the surrounding area for an extra travel cost depending on distance.',
      'faq.q7': 'Do you cook at my venue, or do I collect the food?',
      'faq.a7': 'Both, depending on what you book. For a private chef, we set up and cook live at your venue. Platters can also be collected from Popa Savu 56, or delivered by Glovo when the quantity allows.',
      'faq.q8': 'Can I get something completely custom, not from the set menu?',
      'faq.a8': 'Yes. The set menu is there for a quick answer, but anything else is just as possible — we build it around your brief and your budget.',
      'proof.title': 'What clients say',

      'start.title': 'Tell us what you are planning.',
      'start.lead': 'A few details are enough. We reply with a proposal, usually a menu and a price.',
      'quick.call': 'Call us',
      'quick.wa': 'WhatsApp',
      'quick.waSub': 'Message us directly',
      'quick.visit': 'Popa Savu 56, ground floor',
      'quick.visitSub': '011434 Bucharest',

      'form.name': 'Name',
      'form.company': 'Company',
      'form.email': 'Email',
      'form.phone': 'Phone',
      'form.occasion': 'Occasion',
      'form.date': 'Date',
      'form.guests': 'Guests (approx.)',
      'form.format': 'Format',
      'form.message': 'Details',
      'form.messagePh': 'Where, when, what you have in mind, a budget if you have one.',
      'form.required': '* required',
      'form.submit': 'Send request',
      'form.note': 'Sending opens WhatsApp with your details filled in.',
      'opt.corporate-lunches': 'Corporate lunch',
      'opt.private-events': 'Private event',
      'opt.cakes-gifts': 'Cake or edible gift',
      'opt.company-meetings': 'Company meeting',
      'opt.launches-shoots': 'Launch or shoot',
      'opt.dessert-bars': 'Dessert bar',
      'opt.other': 'Something else',
      'fmt.unsure': 'Not sure yet',
      'fmt.set': 'Set menu',
      'fmt.live': 'Live cooking with a chef',
      'fmt.bespoke': 'Bespoke menu',
      'status.missing': 'Please add your name and phone number.',
      'status.opening': 'Opening WhatsApp…',
      'status.sent': 'Thank you. We will be in touch.',
      'status.error': 'Something went wrong. Please call us on 0720 786 883.',
      'confirm.title': 'Request sent.',
      'confirm.body': 'Thank you — we will be in touch.',
      'confirm.waNote': 'If WhatsApp did not open on its own,',
      'confirm.waLink': 'send it directly.',
      'confirm.reset': 'Send another request',
      'wa.hello': 'Hello Rotar Atelier, I would like a quote.',

      'footer.tag': 'Private chef catering in Bucharest',
      'footer.holy': 'Bakery \u0026 brunch, every day, at',
      'footer.rights': 'All rights reserved.',
      'cta.call': 'Call',
      'cta.quote': 'Request a quote'
    },

    ro: {
      'meta.title': 'Rotar Atelier | Catering cu chef privat în București',
      'meta.description': 'Catering cu chef privat pentru companii și evenimente private, în București. Făcut în casă, fără produse congelate, gătit live la locația ta. Meniuri fixe sau complet la comandă.',

      'skip': 'Sari la conținut',
      'nav.cater': 'Ce servim',
      'nav.how': 'Cum lucrăm',
      'nav.visit': 'Venim la tine',
      'nav.calm': 'Fără griji',
      'nav.gallery': 'Galerie',
      'nav.faq': 'Întrebări',
      'fab.wa': 'Scrie-ne pe WhatsApp',
      'nav.cta': 'Cere o ofertă',
      'nav.open': 'Deschide meniul',
      'nav.close': 'Închide meniul',
      'lang.label': 'Limba',
      'lang.en': 'English',
      'lang.ro': 'Română',

      'hero.h1': 'Bucătarul tău privat,<br><em>acolo unde ești tu.</em>',
      'hero.sub': 'Catering pentru companii și evenimente private, în București. Făcut în casă, fără produse congelate, gătit live la locația ta. Alege un meniu fix sau cere orice altceva.',
      'hero.cta': 'Cere o ofertă',
      'hero.callLabel': 'Sună la 0720 786 883',
      'alt.hero': 'Masă văzută de sus: roșii coapte, hummus cu rodie, măsline marinate și focaccia, cu tacâmuri aurii',
      'alt.cater': 'Roșii coapte pe o farfurie albă și măsline marinate într-o tavă de inox, cu linguri aurii',

      'cater.title': 'Ce servim',
      'cater.lead': 'Toate comenzile pleacă din aceeași bucătărie. Se schimbă locul, numărul de oameni și ora.',
      'cater.ask': 'Cere detalii',
      'cater.1.n': 'Prânzuri corporate',
      'cater.1.d': 'Un prânz adevărat pentru echipă, gătit proaspăt și servit la birou.',
      'cater.2.n': 'Evenimente private',
      'cater.2.d': 'Cine, aniversări și sărbători, cu un meniu construit în jurul invitaților tăi.',
      'cater.3.n': 'Torturi și cadouri comestibile',
      'cater.3.d': 'Torturi pentru ocazie și cadouri comestibile pentru echipe și clienți.',
      'cater.4.n': 'Ședințe și întâlniri',
      'cater.4.d': 'Mic dejun, prânz de lucru și platouri pentru pauza de cafea, la ora stabilită.',
      'cater.5.n': 'Lansări și filmări',
      'cater.5.d': 'Mâncare pentru o seară de lansare sau pentru o echipă întreagă pe platou, în ritmul programului tău.',
      'cater.6.n': 'Dessert bars',
      'cater.6.d': 'O masă de deserturi construită în jurul temei și al numărului de invitați.',

      'how.title': 'Cum lucrăm',
      'how.lead': 'Avem un meniu fix pentru zilele în care nu vrei să alegi. Tot ce e în afara lui rămâne la fel de posibil.',
      'how.chef.t': 'Chef privat, gătit live',
      'how.chef.p': 'Un chef gătește la locația ta, în timp ce invitații sunt de față, după un meniu pe care îl stabilim împreună.',
      'how.home.t': 'Făcut în casă',
      'how.home.p': 'Totul e gătit de la zero de echipa noastră. Nimic nu vine congelat, nimic nu se face cu margarină.',
      'how.menu.t': 'Meniul fix',
      'how.menu.p': 'Variante gata de rezervat, pentru când vrei un răspuns rapid.',
      'how.bespoke.t': 'Complet la comandă',
      'how.bespoke.p': 'Steak premium, bucătărie asiatică sau orice cere brief-ul. Dacă nu e în meniu, îl construim în jurul bugetului tău.',
      'alt.chef': 'Un chef pune cremă pe rulouri cu scorțișoară abia coapte',

      'visit.title': 'Venim la tine',
      'visit.lead': 'Ne dai o adresă și o oră de început. Aducem bucătăria.',
      'visit.1.t': 'Ne spui planul',
      'visit.1.p': 'Data, locul, numărul de persoane și bugetul. O idee aproximativă ajunge.',
      'visit.2.t': 'Primești o ofertă',
      'visit.2.p': 'Un meniu fix sau unul făcut la comandă, cu preț adaptat bugetului tău.',
      'visit.3.t': 'Confirmi',
      'visit.3.p': 'Avem nevoie de minimum 48 de ore, sau 72 când producția e mai mare.',
      'visit.4.t': 'Ajungem',
      'visit.4.p': 'Ne instalăm, gătim și servim la locația ta. Platourile se pot ridica și de la Popa Savu 56 sau se livrează prin Glovo, când cantitatea permite.',

      'calm.title': 'Serviciu fără griji.',
      'calm.statement': 'Cei mai mulți se îngrijorează pentru același lucru: să fie destul și să ajungă la timp. Noi planificăm de la ora de început înapoi și gătim pentru toți invitații.',
      'calm.a.t': 'O singură persoană de contact',
      'calm.a.p': 'Aceeași persoană, de la primul mesaj până la ultima farfurie.',
      'calm.b.t': 'Destul pentru toți',
      'calm.b.p': 'Cantitățile se calculează pe numărul tău de invitați, cu marjă.',
      'calm.c.t': 'Clar de la început',
      'calm.c.p': 'Știi meniul, prețul și ora sosirii înainte să confirmi.',

      'gallery.title': 'Pe masă',
      'gifts.t': 'Cadouri comestibile pentru echipa ta',
      'gifts.p': 'Cadouri pentru echipe și clienți, făcute manual, în numărul de care ai nevoie.',
      'gifts.cta': 'Cere detalii',
      'alt.baker': 'Un brutar ține o stivă de focaccia proaspăt tăiată',
      'alt.focaccia': 'Focaccia proaspăt tăiată, stivuită pe un blat',
      'alt.sandwich': 'Sandvișuri deschise cu șuncă, rucola și roșii cherry, pe pâine prăjită',
      'alt.rolls': 'O tavă cu rulouri cu scorțișoară, acoperite cu cremă',
      'gallery.lead': 'Răsfoiește câteva farfurii.',
      'g.s1.t': 'Masa comună', 'g.s1.p': 'Roșii coapte, hummus, măsline și focaccia.',
      'g.s2.t': 'Frigărui de șuncă rulată', 'g.s2.p': 'Mentă, rodie și coajă de lămâie.',
      'g.s3.t': 'Farfuria de degustare', 'g.s3.p': 'Două supe, o tartă sărată, un tartar.',
      'g.s4.t': 'Gata de servit', 'g.s4.p': 'Aceeași farfurie, altă masă.',
      'g.s5.t': 'Copt în aceeași dimineață', 'g.s5.p': 'Focaccia proaspătă, de fiecare dată.',
      'g.s6.t': 'Asamblat la comandă', 'g.s6.p': 'Șuncă, rucola, roșii cherry.',
      'g.s7.t': 'Miezul', 'g.s7.p': 'Fermentare lentă, aer adevărat.',
      'g.s8.t': 'Și ceva dulce', 'g.s8.p': 'Rulouri cu scorțișoară, cremă proaspătă.',
      'gallery.prev': 'Poza anterioară', 'gallery.next': 'Poza următoare',
      'alt.g1': 'Vedere de sus: roșii coapte, măsline marinate și un bol de hummus cu rodie',
      'alt.g2': 'O tavă de inox cu frigărui de șuncă rulată, cu mentă, semințe de rodie și coajă de lămâie',
      'alt.g3a': 'Vedere de sus a unei farfurii de degustare, cu două supe în pahare, o tartă sărată și un tartar de vită',
      'alt.g3b': 'Aceeași farfurie de degustare, în lumina joasă a soarelui, cu alte farfurii aliniate în spate',
      'faq.title': 'Întrebări frecvente',
      'faq.q1': 'Cu cât timp înainte trebuie să rezerv?',
      'faq.a1': 'Cu minimum 48 de ore înainte de eveniment. Pentru producții mai mari poate fi nevoie de 72 — îți spunem exact care se aplică atunci când trimitem oferta.',
      'faq.q2': 'Trebuie să plătesc avans?',
      'faq.a2': 'Da — un avans la confirmarea comenzii, iar restul se plătește la eveniment.',
      'faq.q3': 'Ce se întâmplă dacă vreau să schimb data sau să anulez?',
      'faq.a3': 'Vorbește direct cu noi. Suntem flexibili la schimbări de dată, cu cât mai mult preaviz posibil.',
      'faq.q4': 'Puteți ține cont de alergii sau restricții alimentare?',
      'faq.a4': 'Da — spune-ne din timp despre orice alergie sau restricție, și ajustăm meniul în funcție de asta.',
      'faq.q5': 'Există un minim sau un maxim de persoane?',
      'faq.a5': 'Fără o limită fixă. Ne spui numărul de persoane, confirmăm că putem acoperi comanda și construim oferta în jurul lui.',
      'faq.q6': 'Lucrați doar în București?',
      'faq.a6': 'În principal București, plus zonele din apropiere, cu un cost suplimentar de deplasare în funcție de distanță.',
      'faq.q7': 'Gătiți la locația mea, sau ridic eu comanda?',
      'faq.a7': 'Ambele, în funcție de ce alegi. Pentru chef privat, ne instalăm și gătim live la locația ta. Platourile se pot ridica și de la Popa Savu 56, sau se livrează prin Glovo, când cantitatea permite.',
      'faq.q8': 'Pot cere ceva complet personalizat, în afara meniului fix?',
      'faq.a8': 'Da. Meniul fix există pentru un răspuns rapid, dar orice altceva rămâne la fel de posibil — îl construim în jurul brief-ului și al bugetului tău.',
      'proof.title': 'Ce spun clienții',

      'start.title': 'Spune-ne ce plănuiești.',
      'start.lead': 'Câteva detalii ajung. Revenim cu o propunere, de obicei un meniu și un preț.',
      'quick.call': 'Sună-ne',
      'quick.wa': 'WhatsApp',
      'quick.waSub': 'Scrie-ne direct',
      'quick.visit': 'Popa Savu 56, parter',
      'quick.visitSub': '011434 București',

      'form.name': 'Nume',
      'form.company': 'Companie',
      'form.email': 'Email',
      'form.phone': 'Telefon',
      'form.occasion': 'Ocazie',
      'form.date': 'Data',
      'form.guests': 'Nr. persoane (aprox.)',
      'form.format': 'Format',
      'form.message': 'Detalii',
      'form.messagePh': 'Unde, când, ce ai în minte, un buget dacă ai.',
      'form.required': '* obligatoriu',
      'form.submit': 'Trimite cererea',
      'form.note': 'La trimitere se deschide WhatsApp, cu datele tale completate.',
      'opt.corporate-lunches': 'Prânz corporate',
      'opt.private-events': 'Eveniment privat',
      'opt.cakes-gifts': 'Tort sau cadou comestibil',
      'opt.company-meetings': 'Ședință sau întâlnire',
      'opt.launches-shoots': 'Lansare sau filmare',
      'opt.dessert-bars': 'Dessert bar',
      'opt.other': 'Altceva',
      'fmt.unsure': 'Nu știu încă',
      'fmt.set': 'Meniu fix',
      'fmt.live': 'Gătit live, cu chef',
      'fmt.bespoke': 'Meniu la comandă',
      'status.missing': 'Adaugă numele și numărul de telefon.',
      'status.opening': 'Se deschide WhatsApp…',
      'status.sent': 'Mulțumim. Te contactăm în curând.',
      'status.error': 'Ceva nu a mers. Sună-ne la 0720 786 883.',
      'confirm.title': 'Cerere trimisă.',
      'confirm.body': 'Mulțumim — revenim cu un răspuns.',
      'confirm.waNote': 'Dacă WhatsApp nu s-a deschis singur,',
      'confirm.waLink': 'trimite-o direct.',
      'confirm.reset': 'Trimite altă cerere',
      'wa.hello': 'Bună ziua, aș dori o ofertă de la Rotar Atelier.',

      'footer.tag': 'Catering cu chef privat în București',
      'footer.holy': 'Bakery \u0026 brunch, în fiecare zi, la',
      'footer.rights': 'Toate drepturile rezervate.',
      'cta.call': 'Sună',
      'cta.quote': 'Cere o ofertă'
    }
  };

  var STORAGE_KEY = 'rotar-lang';
  var DEFAULT_LANG = 'en';
  var listeners = [];

  function safeGet() {
    try { return window.localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function safeSet(v) {
    try { window.localStorage.setItem(STORAGE_KEY, v); } catch (e) { /* private mode */ }
  }

  function t(key, lang) {
    var l = lang || document.documentElement.lang || DEFAULT_LANG;
    var table = STRINGS[l] || STRINGS[DEFAULT_LANG];
    return table[key] != null ? table[key] : (STRINGS[DEFAULT_LANG][key] || key);
  }

  function apply(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'), lang);
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      el.innerHTML = t(el.getAttribute('data-i18n-html'), lang);
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var i = pair.indexOf(':');
        if (i < 1) return;
        el.setAttribute(pair.slice(0, i).trim(), t(pair.slice(i + 1).trim(), lang));
      });
    });

    document.title = t('meta.title', lang);
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('meta.description', lang));
    var ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', t('meta.title', lang));
    var ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', t('meta.description', lang));

    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });

    listeners.forEach(function (fn) { fn(lang); });
  }

  function setLang(lang) {
    if (!STRINGS[lang]) lang = DEFAULT_LANG;
    safeSet(lang);
    apply(lang);
  }

  // Browser-language guess, used only when the visitor has never picked a
  // language explicitly. Never persisted — setLang() is the only path that
  // writes to storage, so this keeps re-guessing on every visit until the
  // person actually clicks a flag.
  function detectLang() {
    var candidates = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || ''];
    for (var i = 0; i < candidates.length; i++) {
      if (/^ro\b/i.test(candidates[i])) return 'ro';
    }
    return DEFAULT_LANG;
  }

  window.RotarI18n = {
    t: t,
    get: function () { return document.documentElement.lang || DEFAULT_LANG; },
    set: setLang,
    onChange: function (fn) { listeners.push(fn); }
  };

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
    });
    var saved = safeGet();
    apply(STRINGS[saved] ? saved : detectLang());
  });
})();
