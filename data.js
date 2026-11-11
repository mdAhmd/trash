// All sample content lives here. Replace with real details, then run: node _build/build.js
// (or edit the generated .html files directly: both work)

const college = {
  name: 'Govt. PG College, Seoni',
  short: 'Govt. PG College',
  place: 'Seoni, Madhya Pradesh',
  tagline: 'Higher education for the heart of Madhya Pradesh',
  address: 'Govt. PG College, Seoni, Madhya Pradesh – 480661',
  phone: '+91 00000 00000',
  email: 'college@example.com',
  hours: 'Mon – Sat, 10:30 AM – 4:30 PM',
  mapQuery: 'Govt PG College Seoni Madhya Pradesh'
};

const director = {
  name: 'Dr. Rajendra Kumar Verma',
  title: 'Director / Principal',
  initials: 'RV',
  qual: 'M.A., Ph.D. (Political Science)',
  note: [
    'Dear students, parents and well-wishers, welcome to our college family. For us, education is not only about marks and degrees. It is about building character, curiosity and the confidence to stand on your own feet.',
    'Our campus brings together students from towns and villages across the district, many of them the first in their families to attend college. That responsibility inspires every teacher here. We offer strong academics in Arts, Commerce and Science, along with sports, NSS, cultural activities and career guidance.',
    'To every new student: attend your classes, use the library, ask questions and never be afraid of failing. A good college can open the door, but you have to walk through it with hard work and honesty. My team and I are always here to guide you.'
  ]
};

const stats = [
  ['3', 'Faculties: Arts, Commerce & Science'],
  ['40+', 'Qualified faculty members'],
  ['2,500+', 'Students on roll'],
  ['15+', 'UG & PG programmes']
];

const notices = [
  ['15', 'Nov', 'Admissions open for 2026-27 (UG & PG)', 'Fill the online admission form and submit original documents at the office for verification.'],
  ['23', 'Nov', 'Internal assessment schedule released', 'Students must carry their college ID card for all internal tests.'],
  ['05', 'Dec', 'Admit cards available for semester exams', 'Download from the Exam page and get it stamped by your department.'],
  ['20', 'Dec', 'Annual sports meet & NSS special camp', 'Names to be submitted to the physical education department.']
];

const courses = {
  ug: [
    ['B.A.', 'Bachelor of Arts', '3 yrs (NEP: up to 4)', '10+2 in any stream', 'Hindi, English, Political Science, History, Economics, Sociology, Sanskrit, Geography'],
    ['B.Sc. (Bio)', 'Bachelor of Science: Biology group', '3 yrs (NEP: up to 4)', '10+2 Science (PCB)', 'Physics, Chemistry, Botany, Zoology'],
    ['B.Sc. (Maths)', 'Bachelor of Science: Maths group', '3 yrs (NEP: up to 4)', '10+2 Science (PCM)', 'Physics, Chemistry, Mathematics'],
    ['B.Com.', 'Bachelor of Commerce', '3 yrs (NEP: up to 4)', '10+2 in any stream', 'Accounting, Business Law, Economics, Taxation, Computer Applications']
  ],
  pg: [
    ['M.A.', 'Master of Arts', '2 yrs', 'Graduation in relevant subject', 'Hindi, English, Political Science, Economics, History'],
    ['M.Sc.', 'Master of Science', '2 yrs', 'B.Sc. in relevant subject', 'Chemistry, Mathematics, Botany, Zoology'],
    ['M.Com.', 'Master of Commerce', '2 yrs', 'B.Com. or equivalent', 'Accounting & Finance, Business Management']
  ],
  extra: [
    ['PGDCA', 'Post Graduate Diploma in Computer Applications', '1 yr', 'Graduation in any stream'],
    ['Certificate in Computer Concepts', 'Basic computer & office skills', '3 months', '10+2 or pursuing graduation']
  ]
};

// dept: arts | commerce | science
const professors = [
  { n: 'Dr. Sunita Mishra', i: 'SM', d: 'arts', dn: 'Arts', role: 'Professor & Head, Hindi', q: 'M.A., Ph.D. (Hindi)', s: 'Modern Hindi poetry, Folk literature', x: '22 years', note: 'Read widely and write daily. Good language is the base of every career, whether you become a teacher, an officer or an entrepreneur.' },
  { n: 'Prof. Anil Chourasia', i: 'AC', d: 'arts', dn: 'Arts', role: 'Associate Professor, Political Science', q: 'M.A., NET, Ph.D.', s: 'Indian polity, Local governance', x: '16 years', note: 'Follow the news, question everything respectfully and form your own opinion. A good citizen starts as a good student.' },
  { n: 'Dr. Farah Siddiqui', i: 'FS', d: 'arts', dn: 'Arts', role: 'Assistant Professor, English', q: 'M.A., M.Phil., Ph.D.', s: 'Communication skills, Indian writing in English', x: '9 years', note: 'Do not fear making mistakes in English. Speak, make errors, correct them and grow. Confidence comes from practice.' },
  { n: 'Dr. Prakash Tiwari', i: 'PT', d: 'commerce', dn: 'Commerce', role: 'Professor & Head, Commerce', q: 'M.Com., Ph.D., CS (Inter)', s: 'Accounting standards, Taxation', x: '24 years', note: 'Accounts are the language of business. Learn the basics thoroughly and every advanced topic becomes simple.' },
  { n: 'Prof. Neha Agrawal', i: 'NA', d: 'commerce', dn: 'Commerce', role: 'Assistant Professor, Business Management', q: 'M.Com., MBA, NET', s: 'Marketing, Entrepreneurship', x: '8 years', note: 'Every big business began with a small idea. Observe problems around you: they are opportunities waiting to be solved.' },
  { n: 'Dr. Vikram Singh Thakur', i: 'VT', d: 'commerce', dn: 'Commerce', role: 'Associate Professor, Economics', q: 'M.A., Ph.D. (Economics)', s: 'Rural economy, Banking', x: '14 years', note: 'Understand money early: saving, investing, budgeting. These skills matter far beyond the classroom.' },
  { n: 'Dr. Meena Joshi', i: 'MJ', d: 'science', dn: 'Science', role: 'Professor & Head, Chemistry', q: 'M.Sc., Ph.D. (Organic Chemistry)', s: 'Green chemistry, Natural products', x: '20 years', note: 'Science is curiosity with discipline. Come to the lab with questions, not just a manual.' },
  { n: 'Dr. Arvind Patel', i: 'AP', d: 'science', dn: 'Science', role: 'Associate Professor, Mathematics', q: 'M.Sc., Ph.D., CSIR-NET', s: 'Algebra, Mathematical modelling', x: '15 years', note: 'Mathematics is not about memorising formulas. Solve a few problems every day and you will see the pattern.' },
  { n: 'Dr. Kavita Dubey', i: 'KD', d: 'science', dn: 'Science', role: 'Assistant Professor, Botany', q: 'M.Sc., Ph.D. (Botany)', s: 'Medicinal plants, Forest ecology', x: '10 years', note: 'We live in one of the greenest districts of India. Study the forests and plants around you: your project is outside the window.' }
];

const departments = {
  arts: {
    title: 'Department of Arts', short: 'Arts', slug: 'department-arts.html',
    lead: 'Humanities and social sciences that build thinkers, writers, civil servants and teachers.',
    about: 'The Faculty of Arts is the largest in the college. It combines classroom teaching with seminars, debates, essay writing, field visits and civic projects, to prepare students for competitive exams, teaching and public service.',
    subjects: ['Hindi Literature', 'English Literature', 'Political Science', 'History', 'Economics', 'Sociology', 'Sanskrit', 'Geography'],
    programmes: ['B.A. (3/4 yrs)', 'M.A. Hindi', 'M.A. English', 'M.A. Political Science', 'M.A. Economics', 'M.A. History'],
    facilities: ['Well-stocked departmental library', 'Smart classrooms and seminar hall', 'Debate, quiz and literary club', 'Competitive-exam guidance cell'],
    jobs: [
      ['Civil Services', 'UPSC, MPPSC, Patwari, Police and other state exams'],
      ['Teaching', 'School teacher (TET/CTET), lecturer after M.A. + NET/SET'],
      ['Media & Writing', 'Journalism, content writing, translation, publishing'],
      ['Law & Policy', 'LL.B. after graduation, public policy and NGOs'],
      ['Banking & SSC', 'Clerical and officer posts in banks, SSC, Railways']
    ],
    higher: 'M.A., B.Ed., LL.B., MJMC (Mass Communication), UGC-NET/JRF, Ph.D.',
    stat: [['6', 'Programmes'], ['14', 'Faculty'], ['1,200+', 'Students']]
  },
  commerce: {
    title: 'Department of Commerce', short: 'Commerce', slug: 'department-commerce.html',
    lead: 'Accounting, finance and business skills for tomorrow’s professionals and entrepreneurs.',
    about: 'The Commerce department blends theory with practical training in accounting software, GST and income-tax filing, banking procedures and business communication. Guest lectures by local CAs, bankers and traders keep teaching close to the real world.',
    subjects: ['Financial Accounting', 'Business Law', 'Business Economics', 'Cost Accounting', 'Taxation (GST & Income Tax)', 'Banking & Insurance', 'Computer Applications', 'Business Communication'],
    programmes: ['B.Com. (General)', 'B.Com. (Computer Applications)', 'M.Com. Accounting & Finance', 'M.Com. Business Management', 'PGDCA'],
    facilities: ['Computer lab with accounting software', 'Commerce club and mock stock market', 'Placement & internship cell', 'Library with CA / CS reference books'],
    jobs: [
      ['Chartered Professions', 'CA, CS, CMA: coaching support for foundation level'],
      ['Banking & Finance', 'IBPS, SBI, insurance, mutual fund advisory'],
      ['Accounts & Taxation', 'Accountant, auditor assistant, GST / tax consultant'],
      ['Business', 'Start-ups, family business management, retail & e-commerce'],
      ['Government', 'SSC, Railways, state accounts and treasury services']
    ],
    higher: 'M.Com., MBA, CA / CS / CMA, UGC-NET (Commerce), Ph.D.',
    stat: [['5', 'Programmes'], ['10', 'Faculty'], ['800+', 'Students']]
  },
  science: {
    title: 'Department of Science', short: 'Science', slug: 'department-science.html',
    lead: 'Laboratory-based learning in Physics, Chemistry, Mathematics and Life Sciences.',
    about: 'The Science faculty emphasises hands-on practicals, projects and field work. Students use well-equipped laboratories, a herbarium and a computer lab, and are encouraged to take part in science exhibitions and research-oriented competitions.',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Botany', 'Zoology', 'Environmental Science', 'Computer Science (basics)'],
    programmes: ['B.Sc. (Biology group)', 'B.Sc. (Maths group)', 'M.Sc. Chemistry', 'M.Sc. Mathematics', 'M.Sc. Botany', 'M.Sc. Zoology'],
    facilities: ['Physics, Chemistry, Botany and Zoology laboratories', 'Herbarium and museum', 'Computer lab', 'Science club and annual exhibition'],
    jobs: [
      ['Research & Teaching', 'M.Sc., CSIR-NET, Ph.D., lecturer / scientist'],
      ['Healthcare & Allied', 'Lab technology, pharma, B.Ed. and allied-health courses'],
      ['Forest & Agriculture', 'Forest services, agriculture officer, environmental consultancy'],
      ['Defence & Technical', 'NDA / CDS, technical posts, data and IT roles with added skills'],
      ['Industry', 'Quality-control chemist, lab analyst, production roles']
    ],
    higher: 'M.Sc., B.Ed., M.Sc. (Computer Science), CSIR-NET / GATE, Ph.D.',
    stat: [['6', 'Programmes'], ['16', 'Faculty'], ['500+', 'Students']]
  }
};

const gallery = [
  ['main-building', 'Main building', 'campus'],
  ['library', 'Central library', 'campus'],
  ['science-lab', 'Chemistry laboratory', 'academics'],
  ['computer-lab', 'Computer lab', 'academics'],
  ['sports-day', 'Annual sports meet', 'events'],
  ['annual-function', 'Annual cultural function', 'events'],
  ['nss-camp', 'NSS special camp', 'events'],
  ['convocation', 'Convocation ceremony', 'events'],
  ['garden', 'Campus garden', 'campus']
];

const faqs = {
  result: [
    ['When will results be declared?', 'Results are declared by the affiliated university after the exams. Dates are announced on the university website and the college notice board.'],
    ['What if my name or marks are wrong?', 'Contact the college examination cell within 7 days with your ID card and a photocopy of your marksheet. We will forward the correction to the university.'],
    ['How do I apply for re-checking or re-evaluation?', 'Applications are made through the college exam cell within the date announced by the university, with the prescribed fee.'],
    ['When can I collect my original marksheet?', 'Original marksheets are issued by the university. The college office informs students when they arrive.']
  ],
  admission: [
    ['Is the form free?', 'The online enquiry form is free. Official admission fees are paid at the college office as per the Department of Higher Education norms.'],
    ['Do I have to visit the college?', 'Yes. After you send the form, bring original documents to the office for verification and fee deposit.'],
    ['Can I choose two courses?', 'You can mention a second preference in the form. Seats are allotted by merit and as per reservation rules.']
  ]
};

const examDates = [
  ['Internal assessment / class tests', '23 – 28 Nov 2026', 'All UG & PG students'],
  ['Practical exams (Science)', '07 – 12 Dec 2026', 'B.Sc. & M.Sc.'],
  ['Admit cards available online', 'From 05 Dec 2026', 'All students'],
  ['Theory examinations begin', '15 Dec 2026', 'As per university time-table'],
  ['Theory examinations end', '05 Jan 2027 (approx.)', 'As per university time-table'],
  ['Result declaration', 'Feb 2027 (expected)', 'Announced by the university']
];

module.exports = { college, director, stats, notices, courses, professors, departments, gallery, faqs, examDates };
