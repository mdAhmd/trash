// Static page generator. Run from the project root:  node _build/build.js
const fs = require('fs');
const path = require('path');
const D = require('./data');
const C = D.college;
const root = path.join(__dirname, '..');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const svg = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const I = {
  book: svg('<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5"/><path d="M9 7h6"/>'),
  chart: svg('<path d="M4 20V4"/><path d="M4 20h16"/><rect x="7" y="11" width="3" height="6"/><rect x="12" y="7" width="3" height="10"/><rect x="17" y="13" width="3" height="4"/>'),
  flask: svg('<path d="M9 3h6"/><path d="M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4a1.5 1.5 0 0 0 1.3-2.2L14 9V3"/><path d="M7.5 15h9"/>'),
  cap: svg('<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5"/><path d="M22 9v6"/>'),
  users: svg('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><circle cx="17" cy="9" r="2.5"/><path d="M17.5 14c2.5.2 4 2 4 4.5"/>'),
  cal: svg('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
  pin: svg('<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>'),
  phone: svg('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>'),
  mail: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'),
  clock: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  lib: svg('<path d="M3 21h18M5 21V9l7-5 7 5v12"/><path d="M9 21v-7h6v7"/>'),
  ball: svg('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'),
  pc: svg('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>'),
  heart: svg('<path d="M12 20s-8-4.7-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.3 12 20 12 20z"/>'),
  wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.2-1.4A9.9 9.9 0 1 0 12.04 2zm0 1.8a8.1 8.1 0 1 1-4.2 15l-.3-.2-3 .8.8-2.9-.2-.3a8.1 8.1 0 0 1 6.9-12.4zM8.7 7.6c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 2.4 1 2.9.8 3.4.7.5 0 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4l-.5-.3-1.9-.9c-.3-.1-.5-.1-.7.1l-.9 1.1c-.2.2-.3.2-.6.1a6.6 6.6 0 0 1-3.2-2.8c-.2-.4.2-.4.7-1.3.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.4-.5-.6-.5z"/></svg>'
};

const NAV = [
  ['index.html', 'Home'],
  ['about.html', 'About'],
  ['courses.html', 'Courses'],
  ['Departments', [['departments.html', 'All Departments'], ['department-arts.html', 'Arts'], ['department-commerce.html', 'Commerce'], ['department-science.html', 'Science']]],
  ['professors.html', 'Professors'],
  ['Students', [['admission.html', 'Admission'], ['exam.html', 'Exam'], ['result.html', 'Result']]],
  ['gallery.html', 'Gallery'],
  ['contact.html', 'Contact Us']
];

const logo = '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="9" fill="#fff"/><path d="M20 7 5 14.5v3h30v-3z" fill="#0e2a3b"/><g fill="#0e2a3b"><rect x="8" y="20" width="4.5" height="11"/><rect x="15.5" y="20" width="4.5" height="11"/><rect x="23" y="20" width="4.5" height="11"/><rect x="30" y="20" width="2.5" height="11"/><rect x="5" y="32.5" width="30" height="3"/></g></svg>';

function nav(cur) {
  return NAV.map(it => {
    if (Array.isArray(it[1])) {
      const active = it[1].some(s => s[0] === cur);
      return `<li class="has-sub${active ? ' active' : ''}"><button class="nav-link" type="button" aria-expanded="false" aria-haspopup="true">${it[0]}<span class="caret"></span></button><ul class="submenu">${it[1].map(s => `<li><a href="${s[0]}"${s[0] === cur ? ' aria-current="page"' : ''}>${s[1]}</a></li>`).join('')}</ul></li>`;
    }
    return `<li${it[0] === cur ? ' class="active"' : ''}><a href="${it[0]}"${it[0] === cur ? ' aria-current="page"' : ''}>${it[1]}</a></li>`;
  }).join('');
}

function footer() {
  return `<footer class="site-footer"><div class="container"><div class="footer-grid">
<div><a class="brand" href="index.html" style="margin-bottom:14px">${logo}<span class="brand-text">${esc(C.name)}</span></a><p>${esc(C.tagline)}. Quality education in Arts, Commerce and Science for the students of Seoni and nearby districts.</p></div>
<div><h4>Quick links</h4><ul><li><a href="about.html">About the college</a></li><li><a href="courses.html">Courses</a></li><li><a href="departments.html">Departments</a></li><li><a href="professors.html">Professors</a></li><li><a href="gallery.html">Photo gallery</a></li></ul></div>
<div><h4>Students</h4><ul><li><a href="admission.html">Admission</a></li><li><a href="exam.html">Exam dates &amp; admit card</a></li><li><a href="result.html">Results</a></li><li><a href="contact.html">Contact us</a></li></ul></div>
<div><h4>Contact</h4><ul><li>${esc(C.address)}</li><li>${esc(C.phone)}</li><li>${esc(C.email)}</li><li>${esc(C.hours)}</li></ul></div>
</div><div class="footer-bottom"><span>&copy; <span data-year>2026</span> ${esc(C.name)}. All rights reserved.</span><span>Demo website with sample content: replace details before publishing.</span></div></div></footer>
<a class="wa-fab" aria-label="Chat on WhatsApp" href="#" target="_blank" rel="noopener">${I.wa}</a>`;
}

function page(file, o) {
  const title = o.home ? `${C.name} | Arts, Commerce & Science College` : `${o.title} | ${C.name}`;
  const hero = o.home ? o.heroHtml : `<section class="page-hero"><img class="hero-bg" src="assets/img/hero.svg" alt="" width="1600" height="900" decoding="async"><div class="page-hero-inner"><div class="crumbs"><a href="index.html">Home</a> &rsaquo; ${esc(o.crumb || o.title)}</div><h1>${esc(o.h1 || o.title)}</h1><p>${esc(o.sub || '')}</p></div></section>`;
  const html = `<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(o.desc)}">
<meta name="theme-color" content="#0e2a3b">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(o.desc)}">
<meta property="og:type" content="website">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&amp;family=Playfair+Display:wght@400;500&amp;display=swap" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&amp;family=Playfair+Display:wght@400;500&amp;display=swap"></noscript>
<link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-header"><div class="container header-inner">
<a class="brand" href="index.html" aria-label="${esc(C.name)} home">${logo}<span class="brand-text">${esc(C.name.split(',')[0])}<small>${esc(C.place)}</small></span></a>
<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu"><span></span></button>
<nav id="site-nav" aria-label="Main"><ul class="nav-list">${nav(file)}</ul></nav>
</div></header>
${hero}
<main id="main">${o.body}</main>
${footer()}
<script src="assets/js/config.js"></script>
<script src="assets/js/main.js" defer></script>
${(o.scripts || []).map(s => `<script src="assets/js/${s}" defer></script>`).join('\n')}
</body>
</html>
`;
  fs.writeFileSync(path.join(root, file), html);
}

// ---------- components ----------
const initials = n => n.replace(/^(Dr\.|Prof\.)\s*/, '').split(' ').map(w => w[0]).slice(0, 2).join('');
const quoteCard = p => `<figure class="card quote reveal" style="margin:0"><p>${esc(p.note)}</p><figcaption class="who"><span class="avatar">${p.i}</span><span><b>${esc(p.n)}</b><small>${esc(p.role)}</small></span></figcaption></figure>`;
const profCard = p => `<article class="card prof reveal" data-cat="${p.d}"><div class="prof-head"><span class="avatar lg">${p.i}</span><div><h3>${esc(p.n)}</h3><small>${esc(p.role)}</small></div></div><dl><dt>Degree</dt><dd>${esc(p.q)}</dd><dt>Field</dt><dd>${esc(p.s)}</dd><dt>Experience</dt><dd>${esc(p.x)}</dd><dt>Faculty</dt><dd>${esc(p.dn)}</dd></dl><blockquote>&ldquo;${esc(p.note)}&rdquo;</blockquote></article>`;
const hint = '<p class="swipe-hint">Swipe sideways to see the full table &rarr;</p>';
const faq = list => list.map(f => `<details class="faq"><summary>${esc(f[0])}</summary><div>${esc(f[1])}</div></details>`).join('');
const cta = (h, p, btn) => `<section class="section"><div class="container"><div class="cta reveal"><div><h2>${h}</h2><p>${p}</p></div>${btn}</div></div></section>`;
const title = (eyebrow, h, center) => `<div class="${center ? 'center ' : ''}" style="margin-bottom:34px"><span class="eyebrow">${eyebrow}</span><h2 class="section-title h-line">${h}</h2></div>`;

// ---------- form helpers ----------
const wrap = (id, label, inner, o = {}) => `<div class="field${o.full ? ' full' : ''}"><label for="${id}">${label}${o.req ? ' <span class="req">*</span>' : ''}</label>${inner}${o.hint ? `<p class="hint">${o.hint}</p>` : ''}<p class="err" role="alert"></p></div>`;
const inp = (id, label, o = {}) => wrap(id, label, `<input id="${id}" name="${id}" type="${o.type || 'text'}"${o.req ? ' required' : ''}${o.ph ? ` placeholder="${o.ph}"` : ''}${o.ac ? ` autocomplete="${o.ac}"` : ''}${o.dt ? ` data-type="${o.dt}"` : ''}${o.im ? ` inputmode="${o.im}"` : ''}${o.max ? ` maxlength="${o.max}"` : ''}>`, o);
const sel = (id, label, opts, o = {}) => wrap(id, label, `<select id="${id}" name="${id}"${o.req ? ' required' : ''}><option value="">${o.first || 'Select'}</option>${opts.map(x => `<option>${x}</option>`).join('')}</select>`, o);
const ta = (id, label, o = {}) => wrap(id, label, `<textarea id="${id}" name="${id}"${o.req ? ' required' : ''}${o.ph ? ` placeholder="${o.ph}"` : ''}></textarea>`, o);

// =====================================================
// HOME
// =====================================================
const homeHero = `<section class="hero"><img class="hero-bg" src="assets/img/hero.svg" alt="" width="1600" height="900" fetchpriority="high" decoding="async">
<div class="hero-inner"><span class="hero-stamp">Admissions open 2026&ndash;27</span>
<h1><span>Govt. PG College</span><span>Seoni</span></h1>
<p>${esc(C.name)} is a government institution of higher education offering quality Arts, Commerce and Science programmes. Join our campus and be a part of a proud tradition of learning.</p>
<div class="btn-row" style="justify-content:center"><a class="btn btn-light" href="admission.html">Apply for admission</a><a class="btn btn-light" href="contact.html">Contact us</a></div></div></section>`;

const homeBody = `
<section class="section-mint" style="padding-bottom:84px"><div class="container">
<div class="stats reveal">${D.stats.map(s => `<div class="stat"><b>${s[0]}</b><span>${s[1]}</span></div>`).join('')}</div>
<div class="split" style="margin-top:78px">
<div class="reveal"><h2 class="section-title h-line" style="font-weight:400">About College</h2></div>
<div class="reveal"><p class="muted">At our campus you will find a diverse and welcoming community that will teach you life skills along with having fun. Run under the Department of Higher Education, Government of Madhya Pradesh, the college serves students from Seoni and the surrounding districts, many of them first-generation learners.</p><p class="muted">With experienced faculty, a growing library, laboratories, a computer lab, NSS and sports, we aim to give every student the knowledge, confidence and values to build a successful future.</p><a class="btn" href="about.html">Discover more</a></div></div>
<div class="feature-cards">
<a class="feature reveal" href="courses.html"><img src="assets/img/gallery/library.svg" alt="" loading="lazy" width="800" height="600"><div><h3>Courses &amp; programmes</h3><p>UG and PG programmes in Arts, Commerce and Science</p></div></a>
<a class="feature reveal" href="admission.html"><img src="assets/img/gallery/convocation.svg" alt="" loading="lazy" width="800" height="600"><div><h3>Apply for admission</h3><p>Fill the form online in 5 minutes and send it on WhatsApp</p></div></a>
</div></div></section>

<section class="section"><div class="container"><div class="director">
<figure class="portrait reveal" style="margin:0"><span class="initials">${D.director.initials}</span><figcaption><b>${esc(D.director.name)}</b>${esc(D.director.title)}</figcaption></figure>
<div class="note-text reveal"><span class="eyebrow">From the director&rsquo;s desk <span class="tag">Sample message</span></span><h2 class="section-title h-line">Director&rsquo;s Message</h2><span class="quote-mark" aria-hidden="true">&ldquo;</span>
${D.director.note.map(p => `<p>${esc(p)}</p>`).join('')}
<p class="sign">${esc(D.director.name)}<small>${esc(D.director.title)} &middot; ${esc(D.director.qual)}</small></p></div></div></div></section>

<section class="section section-mint"><div class="container">${title('Faculties', 'Our Departments', true)}
<div class="grid-3">
${['arts', 'commerce', 'science'].map(k => { const d = D.departments[k]; const ic = { arts: I.book, commerce: I.chart, science: I.flask }[k]; return `<div class="card card-hover dept reveal"><div class="icon">${ic}</div><h3>${d.short}</h3><p class="muted" style="font-size:.95rem">${esc(d.lead)}</p><ul>${d.subjects.slice(0, 4).map(s => `<li>${s}</li>`).join('')}</ul><a class="more" href="${d.slug}">Explore department &rarr;</a></div>`; }).join('')}
</div></div></section>

<section class="section"><div class="container">${title('Words of wisdom', 'Notes from our Professors', true)}
<div class="grid-3">${[D.professors[0], D.professors[3], D.professors[6]].map(quoteCard).join('')}</div>
<p class="center" style="margin-top:32px"><a class="btn" href="professors.html">Meet all professors</a></p></div></section>

<section class="section section-mint"><div class="container"><div class="grid-2" style="grid-template-columns:1.3fr 1fr;align-items:start">
<div class="reveal">${title('Stay updated', 'Latest Notices')}<ul class="notice-list">${D.notices.map(n => `<li><div class="date-badge"><b>${n[0]}</b><span>${n[1]}</span></div><div><h4>${esc(n[2])}</h4><p>${esc(n[3])}</p></div></li>`).join('')}</ul></div>
<div class="card reveal"><h3>Students quick links</h3><ul class="check" style="margin:8px 0 18px"><li><a href="admission.html">Online admission form</a></li><li><a href="exam.html">Exam dates &amp; admit card</a></li><li><a href="result.html">Check your result</a></li><li><a href="courses.html">Courses &amp; eligibility</a></li><li><a href="contact.html">Contact the office</a></li></ul><a class="btn btn-solid" href="admission.html">Apply now</a></div>
</div></div></section>

<section class="section"><div class="container">${title('Campus life', 'Photo Gallery', true)}
<div class="gallery">${D.gallery.slice(0, 4).map(g => `<a class="shot reveal" href="gallery.html"><img src="assets/img/gallery/${g[0]}.svg" alt="${esc(g[1])}" loading="lazy" width="800" height="600"><span>${esc(g[1])}</span></a>`).join('')}</div>
<p class="center" style="margin-top:30px"><a class="btn" href="gallery.html">View full gallery</a></p></div></section>
${cta('Ready to begin your journey?', 'Admissions are open for UG and PG programmes. Apply online today.', '<a class="btn btn-gold" href="admission.html">Apply for admission</a>')}
`;
page('index.html', { home: true, heroHtml: homeHero, desc: `${C.name}: government college offering B.A., B.Sc., B.Com., M.A., M.Sc. and M.Com. in Seoni, Madhya Pradesh. Admissions, exams, results and more.`, body: homeBody });

// =====================================================
// ABOUT
// =====================================================
const facilities = [
  [I.lib, 'Library & reading room', 'Thousands of textbooks, reference books, journals and newspapers, with a quiet reading hall.'],
  [I.flask, 'Science laboratories', 'Physics, Chemistry, Botany and Zoology labs for practical learning.'],
  [I.pc, 'Computer lab', 'Computers with internet for classes, accounting software and online forms.'],
  [I.ball, 'Sports & playground', 'Ground for cricket, football, kabaddi, athletics and indoor games.'],
  [I.heart, 'NSS & community service', 'Camps, blood donation drives, cleanliness and literacy campaigns.'],
  [I.cap, 'Career guidance cell', 'Guidance for competitive exams, higher studies and job opportunities.']
];
page('about.html', {
  title: 'About the College', sub: 'A government institution committed to accessible, quality higher education.',
  desc: `About ${C.name}: vision, mission, values and campus facilities.`,
  body: `<section class="section"><div class="container"><div class="split"><div class="reveal"><span class="eyebrow">Who we are</span><h2 class="section-title h-line">About ${esc(C.short)}</h2></div><div class="reveal"><p class="muted">${esc(C.name)} is run by the Department of Higher Education, Government of Madhya Pradesh. It offers undergraduate and postgraduate programmes in Arts, Commerce and Science to students of Seoni and the neighbouring region, at government fee levels.</p><p class="muted">Our focus is simple: good teaching, a safe and disciplined campus, and equal opportunity for every student, regardless of background. We also encourage sports, cultural activities, NSS, and skill development so that students grow beyond textbooks.</p></div></div></div></section>
<section class="section section-mint"><div class="container"><div class="grid-3">
<div class="card reveal"><div class="icon">${I.cap}</div><h3>Our Vision</h3><p class="muted">To be a centre of excellence in higher education that empowers young people of the region with knowledge, skills and social responsibility.</p></div>
<div class="card reveal"><div class="icon">${I.book}</div><h3>Our Mission</h3><p class="muted">To provide affordable, quality education; to nurture critical thinking and ethics; and to prepare students for careers and higher studies.</p></div>
<div class="card reveal"><div class="icon">${I.heart}</div><h3>Our Values</h3><p class="muted">Integrity, inclusiveness, discipline, curiosity and service to society. These guide everything we do on campus.</p></div></div></div></section>
<section class="section"><div class="container">${title('Campus', 'Facilities', true)}<div class="grid-3">${facilities.map(f => `<div class="card card-hover reveal"><div class="icon">${f[0]}</div><h3>${f[1]}</h3><p class="muted" style="margin:0">${f[2]}</p></div>`).join('')}</div></div></section>
<section class="section section-mint"><div class="container"><div class="grid-2" style="align-items:start"><div class="reveal">${title('Why us', 'Why choose our college?')}<ul class="check"><li>Experienced, qualified and approachable faculty</li><li>Affordable government fee structure and scholarships</li><li>Arts, Commerce and Science under one roof</li><li>Active NSS, sports and cultural clubs</li><li>Guidance for competitive exams and careers</li><li>Safe, disciplined and green campus</li></ul></div>
<div class="card reveal"><span class="eyebrow">Director&rsquo;s message</span><p class="muted" style="font-style:italic">&ldquo;${esc(D.director.note[0])}&rdquo;</p><p class="sign">${esc(D.director.name)}<small>${esc(D.director.title)}</small></p><a class="btn" href="index.html#main">Read the full message</a></div></div></div></section>
${cta('Visit our campus', 'Come and see our classrooms, labs and library, or talk to our faculty.', '<a class="btn btn-gold" href="contact.html">Get in touch</a>')}`
});

// =====================================================
// COURSES
// =====================================================
const courseTable = rows => `${hint}<div class="table-wrap"><table><thead><tr><th>Programme</th><th>Duration</th><th>Eligibility</th><th>Subjects / groups</th><th></th></tr></thead><tbody>${rows.map(r => `<tr><td><b>${r[0]}</b><br><small class="muted">${r[1]}</small></td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td><td><a href="admission.html?course=${encodeURIComponent(r[0])}">Apply</a></td></tr>`).join('')}</tbody></table></div>`;
page('courses.html', {
  title: 'Courses', sub: 'Undergraduate, postgraduate and skill programmes across Arts, Commerce and Science.',
  desc: `Courses at ${C.name}: B.A., B.Sc., B.Com., M.A., M.Sc., M.Com. and certificate programmes with eligibility.`,
  body: `<section class="section"><div class="container">${title('Undergraduate', 'UG Programmes')}<div class="reveal">${courseTable(D.courses.ug)}</div>
<div style="height:56px"></div>${title('Postgraduate', 'PG Programmes')}<div class="reveal">${courseTable(D.courses.pg)}</div>
<div style="height:56px"></div>${title('Skill courses', 'Diploma & Certificate')}${hint}<div class="reveal table-wrap"><table><thead><tr><th>Programme</th><th>Details</th><th>Duration</th><th>Eligibility</th></tr></thead><tbody>${D.courses.extra.map(r => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join('')}</tbody></table></div>
<p class="note-box" style="margin-top:28px">Sample information: programmes, seats and eligibility follow the affiliated university and Department of Higher Education, M.P. Confirm the latest details with the college office before applying.</p></div></section>
${cta('Found your course?', 'Fill the admission form online; it takes about five minutes.', '<a class="btn btn-gold" href="admission.html">Go to admission form</a>')}`
});

// =====================================================
// DEPARTMENTS
// =====================================================
page('departments.html', {
  title: 'Departments', sub: 'Three faculties, one campus: Arts, Commerce and Science.',
  desc: `Departments at ${C.name}: Arts, Commerce and Science with subjects, faculty and career options.`,
  body: `<section class="section"><div class="container"><div class="grid-3">${['arts', 'commerce', 'science'].map(k => { const d = D.departments[k]; const ic = { arts: I.book, commerce: I.chart, science: I.flask }[k]; return `<div class="card card-hover dept reveal"><div class="icon">${ic}</div><h3>${d.title}</h3><p class="muted" style="font-size:.95rem">${esc(d.lead)}</p><p style="margin-bottom:6px"><b>Subjects</b></p><div style="margin-bottom:14px">${d.subjects.slice(0, 5).map(s => `<span class="pill">${s}</span>`).join('')}</div><p style="margin-bottom:6px"><b>Career paths</b></p><ul>${d.jobs.slice(0, 3).map(j => `<li>${j[0]}</li>`).join('')}</ul><a class="more" href="${d.slug}">View full details &rarr;</a></div>`; }).join('')}</div></div></section>
<section class="section section-mint"><div class="container">${title('Compare', 'At a glance', true)}${hint}<div class="table-wrap reveal"><table><thead><tr><th>Department</th><th>Programmes</th><th>Faculty</th><th>Students</th><th>Head of department</th></tr></thead><tbody>${['arts', 'commerce', 'science'].map(k => { const d = D.departments[k]; const h = D.professors.find(p => p.d === k && /Head/.test(p.role)); return `<tr><td><a href="${d.slug}"><b>${d.short}</b></a></td><td>${d.stat[0][0]}</td><td>${d.stat[1][0]}</td><td>${d.stat[2][0]}</td><td>${esc(h.n)}</td></tr>`; }).join('')}</tbody></table></div></div></section>
${cta('Not sure which stream to choose?', 'Talk to our faculty and career guidance cell: we are happy to help.', '<a class="btn btn-gold" href="contact.html">Talk to us</a>')}`
});

['arts', 'commerce', 'science'].forEach(k => {
  const d = D.departments[k];
  const profs = D.professors.filter(p => p.d === k);
  const ic = { arts: I.book, commerce: I.chart, science: I.flask }[k];
  page(d.slug, {
    title: d.title, crumb: d.short, sub: d.lead,
    desc: `${d.title} at ${C.name}: subjects, programmes, faculty and job opportunities.`,
    body: `<section class="section-mint"><div class="container"><div class="stats reveal" style="grid-template-columns:repeat(3,1fr)">${d.stat.map(s => `<div class="stat"><b>${s[0]}</b><span>${s[1]}</span></div>`).join('')}</div>
<div class="split" style="margin:70px 0 0;padding-bottom:70px;align-items:start"><div class="reveal"><div class="icon">${ic}</div><h2 class="section-title h-line">About the department</h2></div><div class="reveal"><p class="muted">${esc(d.about)}</p><p><b>Programmes offered</b></p><div>${d.programmes.map(s => `<span class="pill">${s}</span>`).join('')}</div></div></div></div></section>
<section class="section"><div class="container"><div class="grid-2" style="align-items:start">
<div class="reveal">${title('Syllabus', 'Subjects taught')}<ul class="check">${d.subjects.map(s => `<li>${s}</li>`).join('')}</ul></div>
<div class="reveal">${title('Infrastructure', 'Facilities')}<ul class="check">${d.facilities.map(s => `<li>${s}</li>`).join('')}</ul></div></div></div></section>
<section class="section section-mint"><div class="container">${title('Careers', 'Job opportunities after graduation', true)}<div class="table-wrap table-sm reveal"><table><thead><tr><th style="width:30%">Career area</th><th>Opportunities</th></tr></thead><tbody>${d.jobs.map(j => `<tr><td><b>${j[0]}</b></td><td>${j[1]}</td></tr>`).join('')}</tbody></table></div><p class="callout reveal" style="margin-top:24px"><b>Higher studies:</b> ${d.higher}</p></div></section>
<section class="section"><div class="container">${title('Faculty', `Professors of ${d.short}`, true)}<div class="grid-3">${profs.map(profCard).join('')}</div></div></section>
${cta(`Join the ${d.short} department`, 'Admissions are open. Fill the form and our office will guide you.', '<a class="btn btn-gold" href="admission.html">Apply for admission</a>')}`
  });
});

// =====================================================
// PROFESSORS
// =====================================================
page('professors.html', {
  title: 'Our Professors', sub: 'Dedicated teachers who guide, mentor and inspire.',
  desc: `Faculty of ${C.name} with qualifications, specialisation and personal notes for students.`,
  scripts: ['gallery.js'],
  body: `<section class="section"><div class="container"><div class="chips" role="group" aria-label="Filter by faculty"><button class="chip on" type="button" data-filter="all" aria-pressed="true">All</button><button class="chip" type="button" data-filter="arts" aria-pressed="false">Arts</button><button class="chip" type="button" data-filter="commerce" aria-pressed="false">Commerce</button><button class="chip" type="button" data-filter="science" aria-pressed="false">Science</button></div>
<div class="grid-3">${D.professors.map(profCard).join('')}</div>
<p class="note-box" style="margin-top:30px">Sample faculty list and notes. Replace with the actual teachers and their messages.</p></div></section>`
});

// =====================================================
// ADMISSION
// =====================================================
const boards = ['MP Board (MPBSE)', 'CBSE', 'ICSE', 'Other state board', 'Other'];
page('admission.html', {
  title: 'Admission', sub: 'Apply for 2026-27. Fill the form and your details reach the college office on WhatsApp.',
  desc: `Online admission form for ${C.name}. Fill in personal and academic details and send directly to the college on WhatsApp.`,
  scripts: ['forms.js'],
  body: `<section class="section"><div class="container"><div class="adm-grid">
<div class="form-card reveal"><form id="admission-form" novalidate>
<fieldset><legend>1. Personal details</legend><div class="fgrid">
${inp('name', "Student's full name", { req: 1, ac: 'name', full: 1 })}
${inp('dob', 'Date of birth', { type: 'date', req: 1, ac: 'bday', hint: '<span id="age-out"></span>' })}
${sel('gender', 'Gender', ['Male', 'Female', 'Other'], { req: 1 })}
${sel('category', 'Category', ['General', 'OBC', 'SC', 'ST', 'EWS'], { req: 1 })}
${inp('phone', 'Mobile number', { type: 'tel', req: 1, ac: 'tel', dt: 'phone', im: 'numeric', ph: '10-digit number' })}
${inp('father', "Father's name", { req: 1 })}
${inp('mother', "Mother's name", { req: 1 })}
${inp('email', 'Email', { type: 'email', req: 1, ac: 'email', full: 1 })}
${ta('address', 'Full address', { req: 1, full: 1, ph: 'Village / ward, post, tehsil, district, PIN' })}
</div></fieldset>
<fieldset><legend>2. Academic details</legend><p class="muted" style="font-size:.9rem;margin-top:-6px">Enter marks in percentage.</p><div class="fgrid">
${sel('b10', '10th board', boards, { req: 1 })}
${inp('y10', '10th passing year', { req: 1, dt: 'year', im: 'numeric', max: 4, ph: '2022' })}
${inp('p10', '10th percentage', { req: 1, dt: 'percent', im: 'decimal', ph: 'e.g. 72.5' })}
<div></div>
${sel('b12', '12th board', boards, { req: 1 })}
${inp('y12', '12th passing year', { req: 1, dt: 'year', im: 'numeric', max: 4, ph: '2024' })}
${inp('p12', '12th percentage', { req: 1, dt: 'percent', im: 'decimal', ph: 'e.g. 68' })}
${sel('stream', '12th stream', ['Arts', 'Commerce', 'Science (Biology)', 'Science (Maths)', 'Other'], { req: 1 })}
${inp('s12', '12th subjects', { full: 1, ph: 'e.g. Hindi, English, Physics, Chemistry, Maths' })}
</div></fieldset>
<fieldset><legend>3. Course selection</legend><div class="fgrid">
${sel('course', 'Course you want to join', ['B.A.', 'B.Sc. (Biology Group)', 'B.Sc. (Maths Group)', 'B.Com.', 'M.A.', 'M.Sc.', 'M.Com.'], { req: 1 })}
${sel('subject', 'Subject / group', [], { req: 1, first: 'Select a course first' })}
${sel('course2', 'Second choice (optional)', ['B.A.', 'B.Sc. (Biology Group)', 'B.Sc. (Maths Group)', 'B.Com.', 'M.A.', 'M.Sc.', 'M.Com.'], { full: 1, first: 'None' })}
${ta('remarks', 'Anything else? (optional)', { full: 1 })}
</div></fieldset>
<div class="field" style="margin-bottom:22px"><label class="check-line" for="consent"><input type="checkbox" id="consent" name="consent" required><span>I confirm that the information is correct and I agree to share it with the college office on WhatsApp.</span></label><p class="err" role="alert"></p></div>
<button class="btn btn-solid" type="submit">${I.wa.replace('<svg', '<svg width="20" height="20"')} Send form on WhatsApp</button>
<div class="form-status" role="status" aria-live="polite"></div>
</form></div>
<aside class="reveal"><div class="card" style="margin-bottom:20px"><h3>How it works</h3><ol class="steps" style="margin:14px 0 0"><li><b>Fill the form</b>Enter your details carefully.</li><li><b>Send on WhatsApp</b>WhatsApp opens with the message ready. Press Send.</li><li><b>Verification</b>Visit the college with original documents.</li></ol></div>
<div class="card" style="margin-bottom:20px"><h3>Documents required</h3><ul class="check" style="margin-top:8px"><li>10th &amp; 12th marksheets</li><li>Transfer certificate (TC)</li><li>Migration certificate</li><li>Caste / EWS certificate (if applicable)</li><li>Aadhaar card</li><li>4 passport-size photographs</li><li>Samagra ID</li></ul></div>
<div class="note-box">Your details are not stored on this website. They go only to the college WhatsApp number, and only after you press Send.</div></aside>
</div>
<div style="max-width:780px;margin:56px auto 0">${title('Questions', 'Admission FAQs')}${faq(D.faqs.admission)}</div></div></section>`
});

// =====================================================
// EXAM
// =====================================================
page('exam.html', {
  title: 'Examinations', sub: 'Important dates, instructions and admit card download.',
  desc: `Exam dates, instructions and admit card link for ${C.name} students.`,
  body: `<section class="section"><div class="container">${title('Schedule', 'Important exam dates')}<div class="table-wrap table-sm reveal"><table><thead><tr><th>Event</th><th>Date</th><th>Applies to</th></tr></thead><tbody>${D.examDates.map(r => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody></table></div>
<p class="note-box" style="margin-top:20px">Sample dates. Final dates are announced by the university and on the college notice board.</p></div></section>
<section class="section section-mint"><div class="container"><div class="grid-2" style="align-items:start">
<div class="card reveal"><div class="icon">${I.cap}</div><h3>Admit card</h3><p class="muted">Download your admit card from the official portal and get it signed by your head of department. You cannot sit for the exam without it.</p><p><a class="btn btn-solid" data-link="admitCardUrl" href="#">Download admit card</a></p></div>
<div class="card reveal"><h3>How to download</h3><ol class="steps" style="margin:14px 0 0"><li><b>Open the admit card link</b>Use the button on this page.</li><li><b>Enter your details</b>Enrolment number and date of birth.</li><li><b>Print and verify</b>Check name, subjects and centre, then print.</li></ol></div></div></div></section>
<section class="section"><div class="container"><div class="grid-2" style="align-items:start">
<div class="reveal">${title('Rules', 'Exam instructions')}<ul class="check"><li>Reach the centre 30 minutes before the exam</li><li>Carry admit card and college ID card</li><li>Mobile phones and smart watches are strictly prohibited</li><li>Use only blue or black pen</li><li>Unfair means leads to cancellation of the exam</li></ul></div>
<div class="reveal">${title('Contact', 'Examination cell')}<p class="muted">For corrections in admit card, subject or centre, contact the exam cell with your ID card.</p><p><b>${esc(C.phone)}</b><br>${esc(C.email)}<br>${esc(C.hours)}</p><a class="btn" href="contact.html">Contact page</a></div></div></div></section>`
});

// =====================================================
// RESULT
// =====================================================
page('result.html', {
  title: 'Results', sub: 'Check your semester or annual result online.',
  desc: `Check results for ${C.name} students and find answers to common questions.`,
  body: `<section class="section"><div class="container"><div class="grid-2" style="align-items:start">
<div class="card reveal" style="text-align:center;padding:44px 26px"><div class="icon" style="margin:0 auto 16px">${I.chart}</div><h2 style="font-size:1.8rem">View your result</h2><p class="muted">Results are published on the official portal of the affiliated university.</p><a class="btn btn-solid" data-link="resultUrl" href="#">Check result</a></div>
<div class="reveal">${title('Steps', 'How to check')}<ol class="steps"><li><b>Click &ldquo;Check result&rdquo;</b>You will be taken to the official result page.</li><li><b>Select your exam</b>Choose course, semester and year.</li><li><b>Enter enrolment number</b>Use the number printed on your admit card.</li><li><b>Download</b>Save or print the result for your records. Original marksheets are issued later.</li></ol></div></div>
<div style="max-width:780px;margin:56px auto 0">${title('Questions', 'Result FAQs')}${faq(D.faqs.result)}</div></div></section>`
});

// =====================================================
// GALLERY
// =====================================================
page('gallery.html', {
  title: 'Photo Gallery', sub: 'A glimpse of campus life, academics and events.',
  desc: `Photo gallery of ${C.name}: campus, labs, library, sports and cultural events.`,
  scripts: ['gallery.js'],
  body: `<section class="section"><div class="container"><div class="chips" role="group" aria-label="Filter photos"><button class="chip on" type="button" data-filter="all" aria-pressed="true">All</button><button class="chip" type="button" data-filter="campus" aria-pressed="false">Campus</button><button class="chip" type="button" data-filter="academics" aria-pressed="false">Academics</button><button class="chip" type="button" data-filter="events" aria-pressed="false">Events</button></div>
<div class="gallery">${D.gallery.map(g => `<button class="shot reveal" type="button" data-cat="${g[2]}" data-full="assets/img/gallery/${g[0]}.svg" data-alt="${esc(g[1])}"><img src="assets/img/gallery/${g[0]}.svg" alt="${esc(g[1])}" loading="lazy" width="800" height="600"><span>${esc(g[1])}</span></button>`).join('')}</div>
<p class="note-box" style="margin-top:30px">These are placeholder illustrations. Add your real photos to <code>assets/img/gallery/</code> and update the file names in this page.</p></div></section>
<dialog class="lightbox" id="lightbox" aria-label="Photo viewer"><div class="lb-body"><button class="lb-close" type="button" aria-label="Close">&times;</button><button class="lb-btn lb-prev" type="button" aria-label="Previous photo">&lsaquo;</button><img alt="" src=""><button class="lb-btn lb-next" type="button" aria-label="Next photo">&rsaquo;</button><p></p></div></dialog>`
});

// =====================================================
// CONTACT
// =====================================================
page('contact.html', {
  title: 'Contact Us', sub: 'We are happy to answer your questions.',
  desc: `Contact ${C.name}: address, phone, email, office hours, map and enquiry form.`,
  scripts: ['forms.js'],
  body: `<section class="section"><div class="container"><div class="contact-cards">
<div class="card reveal"><div class="icon">${I.pin}</div><h3 style="font-size:1.1rem">Address</h3><p class="muted" style="margin:0">${esc(C.address)}</p></div>
<div class="card reveal"><div class="icon">${I.phone}</div><h3 style="font-size:1.1rem">Phone</h3><p class="muted" style="margin:0">${esc(C.phone)}</p></div>
<div class="card reveal"><div class="icon">${I.mail}</div><h3 style="font-size:1.1rem">Email</h3><p class="muted" style="margin:0;word-break:break-all">${esc(C.email)}</p></div>
<div class="card reveal"><div class="icon">${I.clock}</div><h3 style="font-size:1.1rem">Office hours</h3><p class="muted" style="margin:0">${esc(C.hours)}</p></div></div>
<div class="adm-grid" style="margin-top:44px">
<div class="form-card reveal"><h2 style="font-size:1.6rem">Send us a message</h2><form id="contact-form" novalidate><div class="fgrid">
${inp('name', 'Your name', { req: 1, ac: 'name' })}
${inp('phone', 'Mobile number', { type: 'tel', req: 1, ac: 'tel', dt: 'phone', im: 'numeric' })}
${inp('email', 'Email (optional)', { type: 'email', ac: 'email' })}
${sel('topic', 'Subject', ['Admission', 'Courses', 'Exam', 'Result', 'Scholarship', 'Other'], { req: 1 })}
${ta('message', 'Message', { req: 1, full: 1 })}
</div><button class="btn btn-solid" type="submit" style="margin-top:20px">${I.wa.replace('<svg', '<svg width="20" height="20"')} Send on WhatsApp</button><div class="form-status" role="status" aria-live="polite"></div></form></div>
<div class="reveal"><iframe class="map" title="Map showing the college location" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=${encodeURIComponent(C.mapQuery)}&amp;output=embed"></iframe><p class="muted" style="font-size:.85rem;margin-top:8px"><a href="https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent(C.mapQuery)}" target="_blank" rel="noopener">Open in Google Maps</a></p></div></div></div></section>`
});

// =====================================================
// 404
// =====================================================
page('404.html', {
  title: 'Page not found', sub: 'The page you are looking for does not exist.',
  desc: 'Page not found.',
  body: `<section class="section"><div class="container center"><h2 class="section-title">Sorry, we couldn&rsquo;t find that page</h2><p class="muted">Try the menu above or go back to the home page.</p><a class="btn btn-solid" href="index.html">Back to home</a></div></section>`
});

console.log('pages built');
