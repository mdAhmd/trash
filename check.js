// Link / asset / structure checker. Run: node _build/check.js
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const pages = fs.readdirSync(root).filter(f => f.endsWith('.html'));
let bad = 0;
const fail = m => { bad++; console.log('FAIL', m); };

for (const f of pages) {
  const html = fs.readFileSync(path.join(root, f), 'utf8');
  // internal refs
  const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map(m => m[1]);
  for (let r of refs) {
    if (/^(https?:|mailto:|tel:|#|data:)/.test(r)) continue;
    if (r.startsWith('/')) fail(`${f}: absolute path ${r}`);
    const [p, hash] = r.split('#');
    const file = p.split('?')[0];
    if (file && !fs.existsSync(path.join(root, file))) fail(`${f}: missing ${r}`);
    if (hash && file && file.endsWith('.html')) {
      const t = fs.readFileSync(path.join(root, file), 'utf8');
      if (!t.includes(`id="${hash}"`)) fail(`${f}: missing anchor ${r}`);
    }
  }
  // duplicate ids
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
  const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
  if (dup.length) fail(`${f}: duplicate ids ${[...new Set(dup)]}`);
  // label targets
  [...html.matchAll(/<label for="([^"]+)"/g)].forEach(m => { if (!ids.includes(m[1])) fail(`${f}: label for=${m[1]} has no target`); });
  // tag balance for common block tags
  for (const t of ['div', 'section', 'ul', 'ol', 'table', 'form', 'fieldset', 'details', 'article', 'figure', 'main', 'nav', 'header', 'footer', 'dialog', 'select', 'button', 'a', 'p']) {
    const o = (html.match(new RegExp(`<${t}[\\s>]`, 'g')) || []).length;
    const c = (html.match(new RegExp(`</${t}>`, 'g')) || []).length;
    if (o !== c) fail(`${f}: <${t}> open ${o} / close ${c}`);
  }
  if (!/<h1[\s>]/.test(html)) fail(`${f}: no h1`);
  if ((html.match(/<h1[\s>]/g) || []).length > 1) fail(`${f}: multiple h1`);
}
// JS syntax
for (const j of fs.readdirSync(path.join(root, 'assets/js'))) {
  try { new Function(fs.readFileSync(path.join(root, 'assets/js', j), 'utf8')); } catch (e) { fail(`${j}: ${e.message}`); }
}
console.log(bad ? `${bad} problem(s)` : `OK: ${pages.length} pages, links/assets/ids/tags/JS all fine`);
process.exit(bad ? 1 : 0);
