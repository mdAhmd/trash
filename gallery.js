/* Filter chips (gallery + professors) and lightbox. */
(function () {
  var d = document;

  // Filtering: chips [data-filter] show/hide items [data-cat]
  var chips = d.querySelectorAll('.chip[data-filter]');
  var items = d.querySelectorAll('[data-cat]');
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      var f = c.getAttribute('data-filter');
      chips.forEach(function (x) { x.classList.toggle('on', x === c); x.setAttribute('aria-pressed', x === c); });
      items.forEach(function (it) { it.hidden = !(f === 'all' || it.getAttribute('data-cat') === f); });
    });
  });

  // Lightbox
  var dlg = d.getElementById('lightbox');
  if (!dlg || typeof dlg.showModal !== 'function') return;
  var img = dlg.querySelector('img'), cap = dlg.querySelector('p'), idx = 0, list = [];
  function show(i) {
    idx = (i + list.length) % list.length;
    var b = list[idx];
    img.src = b.getAttribute('data-full'); img.alt = b.getAttribute('data-alt') || '';
    cap.textContent = b.getAttribute('data-alt') || '';
  }
  d.querySelectorAll('.shot').forEach(function (b) {
    b.addEventListener('click', function () {
      list = Array.prototype.filter.call(d.querySelectorAll('.shot'), function (x) { return !x.hidden; });
      show(list.indexOf(b)); dlg.showModal();
    });
  });
  dlg.querySelector('.lb-prev').onclick = function () { show(idx - 1); };
  dlg.querySelector('.lb-next').onclick = function () { show(idx + 1); };
  dlg.querySelector('.lb-close').onclick = function () { dlg.close(); };
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
})();
