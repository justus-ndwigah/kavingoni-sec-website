  /* ---------- mobile nav + dropdowns ---------- */
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const backTop = document.querySelector('.back-top');

  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  document.querySelectorAll('.nav-links > li > a').forEach(link => {
    link.addEventListener('click', event => {
      const parent = link.parentElement;
      const dropdown = parent.querySelector('.dropdown-menu');
      if (window.innerWidth <= 860 && dropdown) {
        event.preventDefault();
        parent.classList.toggle('open');
        return;
      }
      navLinks.classList.remove('open');
      document.querySelectorAll('.has-dropdown').forEach(item => item.classList.remove('open'));
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.querySelectorAll('.dropdown-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      document.querySelectorAll('.has-dropdown').forEach(item => item.classList.remove('open'));
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  window.addEventListener('scroll', () => {
    backTop.classList.toggle('show', window.scrollY > 500);
  });

  /* ---------- scroll-spy active nav link ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const spyLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        spyLinks.forEach(link => { const href = link.getAttribute('href') || ''; link.classList.toggle('active', href.endsWith('#' + entry.target.id)); });
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach(section => spy.observe(section));

  /* ---------- hero slideshow ---------- */
  let heroIdx = 0;
  function goSlide(n) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hdot');
    slides[heroIdx].classList.remove('active');
    dots[heroIdx].classList.remove('active');
    heroIdx = (n !== undefined) ? n : (heroIdx + 1) % slides.length;
    slides[heroIdx].classList.add('active');
    dots[heroIdx].classList.add('active');
  }
  setInterval(() => goSlide(), 5000);

  /* ---------- events calendar ---------- */
 const calEvents = {
    '2026-05-06': {
      title: 'Form 3 Academic Day',
      detail: 'Mandatory — all parents of Form 3 students must attend in full. 9:00 AM at the assembly grounds.',
      tag: 'Parents Must Attend',
      color: '#a83a1c'
    },
    '2026-05-09': {
      title: 'Launch of The Imperiums (Form 4)',
      detail: 'Grand class launch for Form 4 — The Imperiums. Distinguished guests invited. Smart/formal dress. 10:00 AM.',
      tag: 'Special Event',
      color: '#c8960c'
    },
    '2026-05-10': {
      title: 'Annual Sports Day',
      detail: 'Inter-house sports day: athletics, team games and relay races. Parents welcome.',
      tag: 'Sports',
      color: '#1a6b3a'
    },
    '2026-05-20': {
      title: 'Prize Giving Day — Term 1',
      detail: 'Celebrating top performers. Parents and guests cordially invited. 10:00 AM.',
      tag: 'Ceremony',
      color: '#c8960c'
    },
    '2026-06-05': {
      title: 'Form 4 Mock Examinations',
      detail: 'First KCSE mock in full KNEC format. Duration: two weeks.',
      tag: 'Academics',
      color: '#0a1f44'
    },
    '2026-06-15': {
      title: 'Makueni County Drama Festival',
      detail: 'Our drama club performs in Wote — targeting gold!',
      tag: 'Arts',
      color: '#4a1a6b'
    },
    '2026-06-24': {
      title: 'Mid-Term Break Begins',
      detail: 'One-week holiday. Parents: please send fares early. Return date in the circular.',
      tag: 'Holiday',
      color: '#1a6b3a'
    },
    '2026-07-03': {
      title: 'Phoenixes Prize Giving Day',
      detail: 'Honouring The Phoenixes (Form 4, 2025 — mean 6.5). All parents and guests invited.',
      tag: 'Ceremony',
      color: '#c8960c'
    },
    '2026-07-24': {
      title: 'School Bus Harambee',
      detail: 'The school bus Harambee was a great success. We thank all parents, guardians, alumni and friends who contributed.',
      tag: 'School Event',
      color: '#a83a1c'
    },
    '2026-08-01': {
      title: 'Term 2 Opening Day',
      detail: 'All students report back to school with all requirements.',
      tag: 'School',
      color: '#0a1f44'
    },
    '2026-08-26': {
      title: 'Term 3 Opener Examination',
      detail: 'All students sit the Term 3 opener. Papers are being marked; results coming soon.',
      tag: 'Academics',
      color: '#0a1f44'
    },
    '2026-10-16': {
      title: 'KCSE Rehearsal',
      detail: 'All candidates begin exam preparations. Parents should ensure their children have all necessary materials.',
      tag: 'Academics',
      color: '#0a1f44'
    },
    '2026-10-29': {
      title: 'KCSE Begins',
      detail: 'Computer Studies candidates begin with paper 451/1. We wish them all the best.',
      tag: 'Academics',
      color: '#0a1f44'
    }
  };

  let calYear;
  let calMonth;

  const calMonthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  function getTodayKey() {
    const today = new Date();

    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  }

  function formatEventDate(date) {
    return new Date(`${date}T00:00:00`).toLocaleDateString('en-KE', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  function showCalEvent(key) {
    const event = calEvents[key];
    const popup = document.getElementById('cal-event-popup');

    if (!event || !popup) return;

    document.getElementById('cal-popup-title').textContent = event.title;
    document.getElementById('cal-popup-detail').textContent = event.detail;

    const tag = document.getElementById('cal-popup-tag');
    tag.textContent = event.tag;
    tag.style.cssText = `
      background: ${event.color};
      color: #ffffff;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 0.72rem;
      font-weight: 800;
    `;

    popup.style.borderLeftColor = event.color;
    popup.hidden = false;
  }

  function renderUpcomingEvents() {
    const eventBox = document.getElementById('upcoming-events');
    const todayKey = getTodayKey();

    const upcomingEvents = Object.entries(calEvents)
      .filter(([date]) => date >= todayKey)
      .sort(([firstDate], [secondDate]) => firstDate.localeCompare(secondDate));

    eventBox.innerHTML = '';

    if (upcomingEvents.length === 0) {
      eventBox.innerHTML = '<p class="no-events">No upcoming events at the moment.</p>';
      return;
    }

    upcomingEvents.forEach(([date, event]) => {
      const button = document.createElement('button');

      button.type = 'button';
      button.className = 'upcoming-event';
      button.style.setProperty('--event-color', event.color);

      const dateText = document.createElement('span');
      dateText.className = 'upcoming-date';
      dateText.textContent = formatEventDate(date);

      const title = document.createElement('strong');
      title.textContent = event.title;

      const tag = document.createElement('span');
      tag.className = 'upcoming-tag';
      tag.textContent = event.tag;

      button.append(dateText, title, tag);

      button.addEventListener('click', () => {
        calYear = Number(date.slice(0, 4));
        calMonth = Number(date.slice(5, 7)) - 1;
        renderCalendar();
        showCalEvent(date);
      });

      eventBox.appendChild(button);
    });
  }

  function renderCalendar() {
    const title = document.getElementById('cal-title');
    const grid = document.getElementById('cal-grid');
    const today = new Date();

    title.textContent = `${calMonthNames[calMonth]} ${calYear}`;
    grid.innerHTML = '';

    const firstDay = new Date(calYear, calMonth, 1).getDay();
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

    for (let blankDay = 0; blankDay < firstDay; blankDay++) {
      const blank = document.createElement('div');
      blank.className = 'calendar-day';
      grid.appendChild(blank);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey =
        `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

      const event = calEvents[dateKey];
      const isToday =
        today.getFullYear() === calYear &&
        today.getMonth() === calMonth &&
        today.getDate() === day;

      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'calendar-day';
      cell.textContent = day;

      if (isToday) {
        cell.classList.add('is-today');
      }

      if (event) {
        cell.classList.add('has-event');
        cell.style.setProperty('--event-color', event.color);
        cell.title = event.title;
        cell.setAttribute('aria-label', `${dateKey}: ${event.title}`);

        const dot = document.createElement('span');
        dot.className = 'event-dot';
        cell.appendChild(dot);

        cell.addEventListener('click', () => showCalEvent(dateKey));
      } else {
        cell.disabled = true;
      }

      grid.appendChild(cell);
    }

    renderUpcomingEvents();
  }

  function goToToday() {
    const today = new Date();
    calYear = today.getFullYear();
    calMonth = today.getMonth();
    document.getElementById('cal-event-popup').hidden = true;
    renderCalendar();
  }

  function initialiseCalendar() {
    const today = new Date();

    calYear = today.getFullYear();
    calMonth = today.getMonth();

    document.getElementById('cal-prev').addEventListener('click', () => {
      calMonth--;

      if (calMonth < 0) {
        calMonth = 11;
        calYear--;
      }

      document.getElementById('cal-event-popup').hidden = true;
      renderCalendar();
    });

    document.getElementById('cal-next').addEventListener('click', () => {
      calMonth++;

      if (calMonth > 11) {
        calMonth = 0;
        calYear++;
      }

      document.getElementById('cal-event-popup').hidden = true;
      renderCalendar();
    });

    document.getElementById('cal-today').addEventListener('click', goToToday);

    document.getElementById('cal-popup-close').addEventListener('click', () => {
      document.getElementById('cal-event-popup').hidden = true;
    });

    renderCalendar();
  }

  if (document.getElementById('cal-grid')) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initialiseCalendar);
    } else {
      initialiseCalendar();
    }
  }

  /* ---------- news article modal ---------- */
  const articles = {
    holiday: {
      title: 'August Holiday Break',
      author: 'By Mr. Nzioki D.K · August 1, 2026',
      content: `
        <p>St Thomas Kavingoni Senior School wishes all students and parents a blessed August holiday. Holiday assignments are compulsory and form part of continuous assessment.</p>
        <p>Students are expected to complete all holiday assignments and engage in personal revision ahead of the <strong>Term 3 Opener Examination on Wednesday, August 26, 2026.</strong></p>
        <p>Parents are encouraged to create a conducive study environment at home. Happy holidays!</p>
      `
    },

    laun: {
      title: 'Peter Laun Advances to National Games in Kisumu!',
      author: 'By Mr. Musila O.M · April 6, 2026',
      content: `
        <p>We are immensely proud that <strong>Peter Laun of Form 4B</strong> has qualified to represent St Thomas Kavingoni Senior School at the National Schools Games in Kisumu.</p>
        <p>Peter competes in the <strong>Triple Jump</strong> and <strong>High Jump</strong>, having performed excellently at the Makueni County Games.</p>
        <p>The entire school community is behind him. Go, Laun!</p>
      `
    },

    kcse: {
      title: 'KCSE 2025: School Posts Mean Grade of 6.5',
      author: 'By The Editorial Team · February 2026',
      content: `
        <p>St Thomas Kavingoni Senior School achieved a <strong>school mean grade of 6.5</strong> in the 2025 KCSE examinations, reflecting the hard work of students and teachers.</p>
        <p>Several candidates scored B+ and above, with strong performance in Biology, Kiswahili, and History &amp; Government.</p>
        <p>The school is determined to build on this achievement and reach an even higher target in 2026.</p>
      `
    },

    sciencelab: {
      title: 'New Science Laboratory Equipped',
      author: 'By Editorial Team · March 2026',
      content: `
        <p>The school's science laboratory has received an important upgrade, with new equipment for Biology, Chemistry and Physics practicals.</p>
        <p>The upgrade will help learners complete required practical work and prepare more effectively for KCSE examinations.</p>
        <p>We appreciate the school board, parents, alumni and all supporters who contributed to this development.</p>
      `
    },

    music: {
      title: 'Music Team Shines at Eastern Regional Music Festival',
      author: 'By Music Club · July 2026',
      content: `
        <p>Our school music team performed excellently at the Eastern Regional Music Festivals held in Makueni. Through discipline, teamwork and committed preparation, our learners represented the school with confidence.</p>
        <p>We congratulate the entire music team and their trainers for this commendable achievement.</p>
        <p>We also thank parents, school management and all stakeholders whose support made this successful participation possible.</p>
      `
    },

    harambee: {
      title: 'School Bus Harambee a Success',
      author: 'By School Administration · July 2026',
      content: `
        <p>Our School Bus Harambee was a success, bringing together parents, guardians, alumni, staff, friends and well-wishers in support of safer and more reliable transport for our learners.</p>
        <p>Although the funds raised were not enough to meet the full cost of the bus, they have taken us a significant step closer to the goal. The school is pursuing additional support to meet the remaining amount.</p>
        <p>We are pleased to announce that the school bus is expected to arrive in the 3rd Term. Thank you to all stakeholders for believing in this vision.</p>
      `
    },

    essay: {
      title: '"Inkíshú" — The Pride of Our Community',
      author: 'By Edward Katitia, Form 3 · Winner, Music Festivals at Regionals 2026',
      content: `
        <p>Cattle are our wealth, our pride and our living treasure. They feed our children and make our homes better. With milk in the morning and strength through the day, they guide our community in a meaningful way.</p>
        <p>Goats and sheep bring hope when times are hard. They are carefully loved, protected, and guarded. Our livestock unite us, young and old alike. They teach us responsibility, courage and pride.</p>
        <p>We honour the animals that sustain our land, A blessing entrusted to every Maasai hand. Through care and unity, our future will grow—For livestock is the heart of the community we know.</p>
      `
    }
  };

  const modal = document.getElementById('article-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalAuthor = document.getElementById('modal-author');
  const modalContent = document.getElementById('modal-content');

  function openArticle(articleId) {
    const article = articles[articleId];

    if (!article) return;

    modalTitle.textContent = article.title;
    modalAuthor.textContent = article.author;
    modalContent.innerHTML = article.content;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeArticle() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-article]').forEach((button) => {
    button.addEventListener('click', () => {
      openArticle(button.dataset.article);
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach((button) => {
    button.addEventListener('click', closeArticle);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeArticle();
    }
  });

  /* ---------- contact form via Formspree ---------- */
 async function handleFormspree(e) {
    e.preventDefault();
    const btn = document.getElementById('cf-btn');
    const ok  = document.getElementById('cf-ok');
    const err = document.getElementById('cf-err');
    btn.textContent = 'Sending…'; btn.disabled = true;
    ok.style.display = 'none'; err.style.display = 'none';
    try {
      const res = await fetch(e.target.action, {
        method: 'POST',
        body: new FormData(e.target),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) { ok.style.display = 'block'; e.target.reset(); }
      else { err.style.display = 'block'; }
    } catch (ex) {
      err.style.display = 'block';
    }
    btn.textContent = 'Send Message ✉️'; btn.disabled = false;
  }
