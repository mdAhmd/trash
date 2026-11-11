/* Admission + contact forms. Builds a WhatsApp message and opens wa.me. No server, no tracking. */
(function () {
  var d = document, C = window.COLLEGE || {};
  var number = (C.whatsappNumber || '').replace(/\D/g, '');

  var SUBJECTS = {
    'B.A.': ['Hindi Literature, Political Science, History', 'English Literature, Sociology, Economics', 'Hindi Literature, Sanskrit, Geography', 'Political Science, History, Economics'],
    'B.Sc. (Biology Group)': ['Physics, Chemistry, Botany/Zoology'],
    'B.Sc. (Maths Group)': ['Physics, Chemistry, Mathematics'],
    'B.Com.': ['Commerce (General)', 'Commerce with Computer Applications'],
    'M.A.': ['Hindi', 'English', 'Political Science', 'Economics', 'History'],
    'M.Sc.': ['Chemistry', 'Mathematics', 'Botany', 'Zoology'],
    'M.Com.': ['Accounting & Finance', 'Business Management']
  };

  function ageFrom(dob) {
    var b = new Date(dob), t = new Date();
    if (isNaN(b)) return '';
    var a = t.getFullYear() - b.getFullYear(), m = t.getMonth() - b.getMonth();
    if (m < 0 || (m === 0 && t.getDate() < b.getDate())) a--;
    return a;
  }
  function field(el) { return el.closest('.field'); }
  function setBad(el, msg) {
    var f = field(el); if (!f) return;
    f.classList.add('bad'); el.setAttribute('aria-invalid', 'true');
    var e = f.querySelector('.err'); if (e && msg) e.textContent = msg;
  }
  function clearBad(el) {
    var f = field(el); if (!f) return;
    f.classList.remove('bad'); el.removeAttribute('aria-invalid');
  }
  function validate(form) {
    var first = null, ok = true;
    form.querySelectorAll('input,select,textarea').forEach(function (el) {
      clearBad(el);
      var v = el.value.trim(), bad = false, msg = '';
      if (el.required && !v && el.type !== 'checkbox') { bad = true; msg = 'This field is required.'; }
      else if (el.type === 'checkbox' && el.required && !el.checked) { bad = true; msg = 'Please tick to continue.'; }
      else if (v && el.dataset.type === 'phone' && !/^[6-9]\d{9}$/.test(v.replace(/[\s-]/g, '').replace(/^(\+91|91|0)/, ''))) { bad = true; msg = 'Enter a valid 10-digit mobile number.'; }
      else if (v && el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { bad = true; msg = 'Enter a valid email address.'; }
      else if (v && el.dataset.type === 'percent' && (isNaN(v) || +v < 0 || +v > 100)) { bad = true; msg = 'Enter a value between 0 and 100.'; }
      else if (v && el.dataset.type === 'year' && !/^(19|20)\d{2}$/.test(v)) { bad = true; msg = 'Enter a valid year, e.g. 2025.'; }
      else if (v && el.type === 'date' && (ageFrom(v) < 14 || ageFrom(v) > 70)) { bad = true; msg = 'Please check the date of birth.'; }
      if (bad) { setBad(el, msg); ok = false; if (!first) first = el; }
    });
    if (first) first.focus();
    return ok;
  }
  function val(form, name) { var el = form.elements[name]; return el ? el.value.trim() : ''; }

  function send(form, text) {
    var box = form.querySelector('.form-status');
    box.className = 'form-status show';
    if (number) {
      var url = 'https://wa.me/' + number + '?text=' + encodeURIComponent(text);
      box.classList.add('ok');
      box.innerHTML = '<b>Almost done!</b> WhatsApp is opening with your details filled in. <b>Press the Send button in WhatsApp</b> to submit. If nothing opened, <a href="' + url + '" target="_blank" rel="noopener">tap here</a>.';
      window.open(url, '_blank', 'noopener');
    } else {
      box.classList.add('warn');
      box.innerHTML = '<b>Test mode:</b> no WhatsApp number is set yet (see <code>assets/js/config.js</code>). This is the message that will be sent:<textarea readonly></textarea>';
      box.querySelector('textarea').value = text;
    }
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // ----- Admission form -----
  var adm = d.getElementById('admission-form');
  if (adm) {
    var dob = adm.elements.dob, ageOut = d.getElementById('age-out');
    dob.addEventListener('change', function () { var a = ageFrom(dob.value); ageOut.textContent = a !== '' && a >= 0 ? 'Age: ' + a + ' years' : ''; });
    dob.max = new Date().toISOString().slice(0, 10);

    var course = adm.elements.course, subj = adm.elements.subject;
    course.addEventListener('change', function () {
      subj.innerHTML = '<option value="">Select subject / group</option>';
      (SUBJECTS[course.value] || []).forEach(function (s) { var o = d.createElement('option'); o.textContent = s; subj.appendChild(o); });
    });
    var q = new URLSearchParams(location.search).get('course');
    if (q) { for (var i = 0; i < course.options.length; i++) if (course.options[i].value === q) { course.selectedIndex = i; course.dispatchEvent(new Event('change')); } }

    adm.addEventListener('input', function (e) { clearBad(e.target); });
    adm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(adm)) return;
      var v = function (n) { return val(adm, n) || '-'; };
      var text =
        '*ADMISSION FORM - ' + (C.name || 'College') + '*\n\n' +
        '*Personal details*\n' +
        'Name: ' + v('name') + '\n' +
        'Date of birth: ' + v('dob') + ' (Age ' + ageFrom(adm.elements.dob.value) + ')\n' +
        'Gender: ' + v('gender') + '\n' +
        'Category: ' + v('category') + '\n' +
        "Father's name: " + v('father') + '\n' +
        "Mother's name: " + v('mother') + '\n' +
        'Mobile: ' + v('phone') + '\n' +
        'Email: ' + v('email') + '\n' +
        'Address: ' + v('address') + '\n\n' +
        '*10th (High School)*\n' +
        'Board: ' + v('b10') + ' | Year: ' + v('y10') + ' | Marks: ' + v('p10') + '%\n\n' +
        '*12th (Higher Secondary)*\n' +
        'Board: ' + v('b12') + ' | Year: ' + v('y12') + ' | Marks: ' + v('p12') + '%\n' +
        'Stream: ' + v('stream') + '\n' +
        'Subjects: ' + v('s12') + '\n\n' +
        '*Course applied for*\n' +
        'Course: ' + v('course') + '\n' +
        'Subject / group: ' + v('subject') + '\n' +
        'Second choice: ' + v('course2') + '\n' +
        'Remarks: ' + v('remarks');
      send(adm, text);
    });
  }

  // ----- Contact form -----
  var con = d.getElementById('contact-form');
  if (con) {
    con.addEventListener('input', function (e) { clearBad(e.target); });
    con.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(con)) return;
      var v = function (n) { return val(con, n) || '-'; };
      send(con, '*ENQUIRY - ' + (C.name || 'College') + '*\n\nName: ' + v('name') + '\nMobile: ' + v('phone') + '\nEmail: ' + v('email') + '\nSubject: ' + v('topic') + '\n\nMessage:\n' + v('message'));
    });
  }
})();
