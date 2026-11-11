// Generates the vector artwork (hero, gallery scenes, favicon). Run: node _build/art.js
const fs = require('fs');
const path = require('path');
const img = path.join(__dirname, '..', 'assets', 'img');
fs.mkdirSync(path.join(img, 'gallery'), { recursive: true });
const put = (f, s) => fs.writeFileSync(path.join(img, f), s);

const cloud = (x, y, s = 1, o = 0.85) =>
  `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff" opacity="${o}"><ellipse rx="90" ry="24"/><ellipse cx="-40" cy="-16" rx="46" ry="26"/><ellipse cx="22" cy="-26" rx="56" ry="32"/><ellipse cx="72" cy="-6" rx="38" ry="20"/></g>`;

const blob = (cx, cy, r, c = ['#0f3016', '#1b5124', '#34843a']) =>
  `<g><circle cx="${cx}" cy="${cy}" r="${r}" fill="${c[0]}"/>` +
  `<circle cx="${cx - r * 0.35}" cy="${cy - r * 0.2}" r="${r * 0.72}" fill="${c[1]}"/>` +
  `<circle cx="${cx - r * 0.5}" cy="${cy - r * 0.45}" r="${r * 0.38}" fill="${c[2]}" opacity=".85"/>` +
  `<circle cx="${cx + r * 0.3}" cy="${cy + r * 0.25}" r="${r * 0.4}" fill="${c[0]}" opacity=".7"/></g>`;

// ---------- HERO ----------
function hero() {
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration of a college campus with a clock tower">`;
  s += `<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b5aa3"/><stop offset=".55" stop-color="#5b9bd5"/><stop offset="1" stop-color="#c3e0f3"/></linearGradient>
<linearGradient id="lawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4b8a34"/><stop offset="1" stop-color="#27541d"/></linearGradient>
<linearGradient id="stone" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#bdb59f"/><stop offset=".5" stop-color="#e3dcc8"/><stop offset="1" stop-color="#b3ab95"/></linearGradient>
<linearGradient id="wing" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfc8b4"/><stop offset="1" stop-color="#a69f8a"/></linearGradient>
<pattern id="win" width="30" height="46" patternUnits="userSpaceOnUse"><rect x="9" y="9" width="12" height="26" rx="6" fill="#58513f"/></pattern>
</defs>`;
  s += `<rect width="1600" height="900" fill="url(#sky)"/>`;
  s += cloud(360, 130, 1.4, 0.8) + cloud(1210, 190, 1.7, 0.75) + cloud(820, 60, 1, 0.6) + cloud(1480, 90, 1.1, 0.7);
  // wings
  s += `<rect x="150" y="505" width="560" height="150" fill="url(#wing)"/><rect x="150" y="505" width="560" height="150" fill="url(#win)" opacity=".75"/><rect x="140" y="492" width="580" height="16" fill="#9b937e"/>`;
  s += `<rect x="890" y="505" width="560" height="150" fill="url(#wing)"/><rect x="890" y="505" width="560" height="150" fill="url(#win)" opacity=".75"/><rect x="880" y="492" width="580" height="16" fill="#9b937e"/>`;
  // right pediment hall
  s += `<polygon points="1010,500 1170,425 1330,500" fill="#ded7c3" stroke="#b3ab95" stroke-width="4"/><rect x="1020" y="500" width="300" height="155" fill="#e7e0cc"/>`;
  for (let i = 0; i < 6; i++) s += `<rect x="${1035 + i * 54}" y="505" width="20" height="150" fill="#f4efe0" stroke="#b9b199" stroke-width="2"/>`;
  // left hall
  s += `<polygon points="270,500 410,435 550,500" fill="#ded7c3" stroke="#b3ab95" stroke-width="4"/><rect x="280" y="500" width="260" height="155" fill="#e7e0cc"/>`;
  for (let i = 0; i < 5; i++) s += `<rect x="${292 + i * 54}" y="505" width="18" height="150" fill="#f4efe0" stroke="#b9b199" stroke-width="2"/>`;
  // central tower
  s += `<rect x="690" y="470" width="220" height="190" fill="url(#stone)" stroke="#a49c86" stroke-width="3"/>`;
  s += `<rect x="718" y="300" width="164" height="175" fill="url(#stone)" stroke="#a49c86" stroke-width="3"/>`;
  s += `<rect x="708" y="292" width="184" height="14" fill="#cdc5ae"/><rect x="708" y="468" width="184" height="12" fill="#cdc5ae"/>`;
  s += `<rect x="730" y="208" width="140" height="90" fill="url(#stone)" stroke="#a49c86" stroke-width="3"/>`;
  s += `<path d="M752 296v-62a14 14 0 0 1 28 0v62zM820 296v-62a14 14 0 0 1 28 0v62z" fill="#3e382b"/>`;
  s += `<path d="M742 208C742 150 770 120 800 120s58 30 58 88z" fill="#8f9a96"/><path d="M742 208C742 150 770 120 800 120" fill="none" stroke="#b6c0bc" stroke-width="5"/>`;
  s += `<rect x="786" y="88" width="28" height="34" fill="#cbc3ad"/><path d="M800 40l8 48h-16z" fill="#7d7662"/>`;
  s += `<circle cx="800" cy="360" r="34" fill="#f6f1de" stroke="#8c846e" stroke-width="5"/><path d="M800 338v22l14 10" stroke="#3e382b" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  s += `<path d="M760 660v-80a40 40 0 0 1 80 0v80z" fill="#2d281e"/><path d="M748 660v-88a52 52 0 0 1 104 0v88" fill="none" stroke="#f1ecd9" stroke-width="10"/>`;
  s += `<rect x="716" y="520" width="14" height="140" fill="#f1ecd9"/><rect x="870" y="520" width="14" height="140" fill="#f1ecd9"/>`;
  // lawn + path
  s += `<rect y="650" width="1600" height="250" fill="url(#lawn)"/><polygon points="758,655 842,655 1010,900 590,900" fill="#cbc5b4" opacity=".95"/>`;
  s += `<polygon points="758,655 842,655 850,700 750,700" fill="#b7b19f" opacity=".6"/>`;
  // people
  [[700, 700], [925, 705], [1010, 690], [610, 725]].forEach(([x, y]) => {
    s += `<g><circle cx="${x}" cy="${y - 22}" r="6" fill="#3a2e28"/><rect x="${x - 6}" y="${y - 16}" width="12" height="26" rx="4" fill="${x % 2 ? '#7a2e3a' : '#2e4a7a'}"/></g>`;
  });
  // trees
  s += `<rect x="150" y="480" width="36" height="260" fill="#2a1b10"/><rect x="1430" y="440" width="40" height="300" fill="#2a1b10"/>`;
  [[90, 120, 190], [260, 230, 170], [30, 360, 170], [180, 420, 150], [310, 120, 120], [-30, 560, 160]].forEach(a => (s += blob(...a)));
  [[1500, 110, 200], [1330, 230, 170], [1570, 380, 170], [1420, 450, 150], [1290, 100, 120], [1640, 560, 160]].forEach(a => (s += blob(...a)));
  s += `<rect y="650" width="1600" height="4" fill="#2c5a22" opacity=".5"/>`;
  s += `</svg>`;
  return s;
}
put('hero.svg', hero());

// ---------- GALLERY SCENES (800x600) ----------
const head = (a, b) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="800" height="600" fill="url(#g)"/>`;
const tail = '</svg>';
const person = (x, y, c = '#274c77', k = 1) =>
  `<g transform="translate(${x} ${y}) scale(${k})"><circle cy="-52" r="12" fill="#3b2a22"/><path d="M-16 0q0-36 16-38t16 38z" fill="${c}"/></g>`;

const scenes = {
  'main-building': () =>
    head('#2b6cb0', '#cfe6f6') + cloud(160, 110, 1.2) + cloud(620, 150, 1.5, 0.7) +
    `<rect y="440" width="800" height="160" fill="#4a8a35"/><rect x="60" y="300" width="680" height="150" fill="#d9d2bd"/><rect x="60" y="300" width="680" height="14" fill="#a59d86"/>` +
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => `<rect x="${90 + i * 53}" y="335" width="20" height="45" rx="10" fill="#6a634f"/>`).join('') +
    `<rect x="320" y="180" width="160" height="270" fill="#e8e1cd" stroke="#a59d86" stroke-width="3"/><polygon points="305,180 400,120 495,180" fill="#cfc7b0"/><rect x="330" y="190" width="14" height="260" fill="#f6f1e1"/><rect x="456" y="190" width="14" height="260" fill="#f6f1e1"/><path d="M360 450v-60a40 40 0 0 1 80 0v60z" fill="#2f2a20"/>` +
    `<path d="M370 120C370 80 385 60 400 60s30 20 30 60z" fill="#8f9a96"/><rect x="395" y="30" width="10" height="34" fill="#7d7662"/>` +
    `<polygon points="330,600 470,600 430,450 370,450" fill="#cdc7b6"/>` + blobDeco() + tail,
  library: () =>
    head('#6b4a2f', '#c9a56b') + `<rect x="40" y="60" width="720" height="360" fill="#3b2616"/>` +
    [0, 1, 2, 3].map(r => `<rect x="50" y="${80 + r * 85}" width="700" height="6" fill="#2a1a0d"/>` + Array.from({ length: 24 }, (_, i) => `<rect x="${58 + i * 29}" y="${r * 85 + 30 + (i % 3) * 4 + 22}" width="${18 + (i % 4) * 3}" height="${56 - (i % 3) * 4}" fill="${['#9b2c2c', '#2c5282', '#276749', '#b7791f', '#553c9a', '#c05621'][(i + r) % 6]}"/>`).join('')).join('') +
    `<rect y="430" width="800" height="170" fill="#a8763e"/><rect x="170" y="440" width="460" height="22" rx="6" fill="#6b4423"/><rect x="200" y="462" width="14" height="110" fill="#4a2f17"/><rect x="586" y="462" width="14" height="110" fill="#4a2f17"/>` +
    `<path d="M260 440l60-30 60 30-60 22z" fill="#f6efe0"/><path d="M420 440l60-30 60 30-60 22z" fill="#e6dcc4"/>` + tail,
  'science-lab': () =>
    head('#134e4a', '#99d6cd') + `<rect y="380" width="800" height="220" fill="#0f3d3a"/><rect x="40" y="360" width="720" height="40" fill="#d6e4e1"/>` +
    flask(150, 360, '#38bdf8') + flask(280, 360, '#f472b6') + flask(410, 360, '#a3e635') +
    `<g transform="translate(560 360)"><rect x="-8" y="-130" width="16" height="130" fill="#334155"/><rect x="-50" y="-8" width="100" height="10" rx="4" fill="#1e293b"/><rect x="-34" y="-150" width="46" height="26" rx="6" transform="rotate(-24 -10 -140)" fill="#475569"/><circle cx="30" cy="-60" r="14" fill="#64748b"/></g>` +
    `<rect x="60" y="80" width="680" height="120" rx="10" fill="#0b2f2d" opacity=".55"/>` + [0, 1, 2, 3, 4, 5].map(i => `<circle cx="${130 + i * 105}" cy="140" r="10" fill="${['#38bdf8', '#f472b6', '#a3e635', '#fbbf24', '#38bdf8', '#f472b6'][i]}" opacity=".9"/>`).join('') + tail,
  'computer-lab': () =>
    head('#1e293b', '#475569') + `<rect y="410" width="800" height="190" fill="#0f172a"/>` +
    [0, 1, 2].map(i => `<g transform="translate(${70 + i * 235} 250)"><rect width="190" height="120" rx="8" fill="#0b1220" stroke="#64748b" stroke-width="5"/><rect x="10" y="10" width="170" height="100" rx="3" fill="${['#0ea5e9', '#22c55e', '#a855f7'][i]}" opacity=".85"/><rect x="25" y="28" width="90" height="8" rx="4" fill="#fff" opacity=".8"/><rect x="25" y="46" width="130" height="6" rx="3" fill="#fff" opacity=".5"/><rect x="25" y="60" width="110" height="6" rx="3" fill="#fff" opacity=".5"/><rect x="85" y="120" width="20" height="40" fill="#64748b"/><rect x="55" y="158" width="80" height="10" rx="4" fill="#64748b"/><rect x="30" y="190" width="130" height="14" rx="4" fill="#94a3b8"/></g>`).join('') + tail,
  'sports-day': () =>
    head('#38a3e8', '#d5eefc') + cloud(600, 100, 1.2) + `<rect y="320" width="800" height="280" fill="#3f8f3a"/><ellipse cx="400" cy="470" rx="360" ry="110" fill="#c0562f"/><ellipse cx="400" cy="470" rx="300" ry="82" fill="#3f8f3a"/><ellipse cx="400" cy="470" rx="250" ry="62" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="14 10"/>` +
    [0, 1, 2, 3, 4].map(i => `<g transform="translate(${90 + i * 145} 300)"><rect width="3" height="70" fill="#7c5a3c"/><path d="M3 0h42l-10 14 10 14H3z" fill="${['#e11d48', '#f59e0b', '#16a34a', '#2563eb', '#9333ea'][i]}"/></g>`).join('') +
    person(260, 430, '#e11d48') + person(330, 415, '#2563eb', .9) + person(420, 440, '#f59e0b', 1.05) + person(520, 420, '#16a34a', .9) + tail,
  'annual-function': () =>
    head('#3b0d3f', '#a3205a') + `<rect x="30" y="0" width="150" height="460" fill="#7f1d1d"/><rect x="620" y="0" width="150" height="460" fill="#7f1d1d"/><path d="M180 0q220 90 440 0v50q-220 90-440 0z" fill="#991b1b"/>` +
    `<polygon points="230,0 340,430 120,430" fill="#fde68a" opacity=".18"/><polygon points="570,0 680,430 460,430" fill="#fde68a" opacity=".18"/><polygon points="400,0 500,430 300,430" fill="#fde68a" opacity=".22"/>` +
    `<rect y="430" width="800" height="170" fill="#2a1030"/><rect x="60" y="420" width="680" height="24" fill="#6b3a1e"/>` + person(300, 420, '#f59e0b', 1.5) + person(400, 420, '#38bdf8', 1.6) + person(500, 420, '#f472b6', 1.5) +
    Array.from({ length: 9 }, (_, i) => `<circle cx="${60 + i * 85}" cy="${555 + (i % 2) * 8}" r="22" fill="#12071a"/>`).join('') + tail,
  'nss-camp': () =>
    head('#f59e0b', '#fde7b0') + `<circle cx="620" cy="140" r="64" fill="#fff4c2" opacity=".9"/><path d="M0 360q200-90 400-20t400-40v300H0z" fill="#2f6b3a"/><path d="M0 430q250-70 500 0t300-10v180H0z" fill="#3f8a46"/>` +
    [[170, 440, 1], [360, 460, 1.2], [560, 440, .9]].map(([x, y, k], i) => `<g transform="translate(${x} ${y}) scale(${k})"><polygon points="-70,0 0,-90 70,0" fill="${['#e11d48', '#2563eb', '#16a34a'][i]}"/><polygon points="-14,0 0,-40 14,0" fill="#1f2937"/></g>`).join('') +
    blob(60, 330, 90) + blob(740, 340, 100) + person(260, 520, '#1d4ed8') + person(480, 530, '#be123c') + tail,
  convocation: () =>
    head('#1e3a8a', '#93c5fd') + `<rect x="120" y="70" width="560" height="90" rx="8" fill="#fef3c7"/><rect x="140" y="90" width="520" height="12" rx="6" fill="#92400e"/><rect x="240" y="116" width="320" height="10" rx="5" fill="#b45309"/>` +
    [0, 1, 2, 3, 4, 5].map(i => { const x = 110 + i * 116; return `<g transform="translate(${x} 330)"><path d="M-44 -18l44-22 44 22-44 22z" fill="#111827"/><rect x="-5" y="-4" width="10" height="12" fill="#111827"/><circle cy="20" r="26" fill="#d6a77a"/><path d="M-50 140q0-92 50-92t50 92z" fill="#1d4ed8"/><rect x="-6" y="48" width="12" height="92" fill="#f59e0b"/><line x1="40" y1="-18" x2="52" y2="12" stroke="#f59e0b" stroke-width="3"/></g>`; }).join('') +
    `<rect y="520" width="800" height="80" fill="#1e293b"/>` + tail,
  garden: () =>
    head('#7dd3fc', '#ecfccb') + cloud(180, 100, 1.2) + `<rect y="380" width="800" height="220" fill="#4d9a3a"/>` + blob(110, 300, 120) + blob(700, 290, 130) +
    Array.from({ length: 22 }, (_, i) => `<g transform="translate(${40 + i * 34} ${470 + (i % 4) * 28})"><line y2="26" stroke="#2f6b2a" stroke-width="3"/><circle r="8" fill="${['#f43f5e', '#f59e0b', '#a855f7', '#fb7185', '#fde047'][i % 5]}"/><circle r="3" fill="#fff7"/></g>`).join('') +
    `<rect x="300" y="400" width="200" height="14" rx="4" fill="#7c4a21"/><rect x="310" y="414" width="10" height="40" fill="#5a3416"/><rect x="480" y="414" width="10" height="40" fill="#5a3416"/><rect x="300" y="370" width="200" height="10" rx="4" fill="#7c4a21"/>` + tail
};

function flask(x, y, col) {
  return `<g transform="translate(${x} ${y})"><path d="M-12 -110h24v50l44 70q8 20-14 20h-84q-22 0-14-20l44-70z" fill="#e2f4f1" opacity=".5" stroke="#d6e4e1" stroke-width="4"/><path d="M-50 -2l22-36h56l22 36q6 14-10 14h-80q-16 0-10-14z" fill="${col}" opacity=".9"/><rect x="-16" y="-118" width="32" height="10" rx="4" fill="#d6e4e1"/></g>`;
}
function blobDeco() {
  return blob(20, 420, 80) + blob(780, 430, 90);
}
Object.entries(scenes).forEach(([k, f]) => put(`gallery/${k}.svg`, f()));

// ---------- FAVICON ----------
put(
  'favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="9" fill="#0e2a3b"/><path d="M20 8 6 15v3h28v-3z" fill="#fff"/><g fill="#fff"><rect x="9" y="20" width="4" height="11"/><rect x="16" y="20" width="4" height="11"/><rect x="23" y="20" width="4" height="11"/><rect x="30" y="20" width="2" height="11"/><rect x="6" y="32" width="28" height="3"/></g><circle cx="20" cy="14.5" r="1.6" fill="#0e2a3b"/></svg>`
);
console.log('art ok');
