/* Gallery lightbox: click any gallery image to view it full size.
   Uses event delegation, so it also works if script.js builds the gallery. */
(function () {
  var SELECTOR = '.gallery-card img, .gallery-grid img, .gallery img';
  var lb, bigImg, caption, closeBtn;
  var list = [];
  var current = 0;
  var lastFocus = null;

  function build() {
    if (lb) return;
    lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Image viewer');
    lb.innerHTML =
      '<button class="lb-close" type="button" aria-label="Close">&times;</button>' +
      '<button class="lb-nav lb-prev" type="button" aria-label="Previous photo">&#8249;</button>' +
      '<figure class="lb-figure"><img class="lb-img" alt=""><figcaption class="lb-caption"></figcaption></figure>' +
      '<button class="lb-nav lb-next" type="button" aria-label="Next photo">&#8250;</button>';
    document.body.appendChild(lb);

    bigImg = lb.querySelector('.lb-img');
    caption = lb.querySelector('.lb-caption');
    closeBtn = lb.querySelector('.lb-close');

    closeBtn.addEventListener('click', close);
    lb.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function () { show(current + 1); });
    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target.classList.contains('lb-figure')) close();
    });

    var startX = null;
    lb.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
      startX = null;
    }, { passive: true });
  }

  function show(i) {
    current = (i + list.length) % list.length;
    var img = list[current];
    bigImg.src = img.currentSrc || img.src;
    bigImg.alt = img.alt || '';
    var card = img.closest('.gallery-card');
    var cap = card && card.querySelector('figcaption');
    caption.textContent = cap ? cap.textContent.trim() : (img.alt || '');
  }

  function open(img) {
    build();
    list = Array.prototype.slice.call(document.querySelectorAll(SELECTOR));
    var idx = list.indexOf(img);
    if (idx < 0) return;
    lastFocus = document.activeElement;
    show(idx);
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    bigImg.src = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.addEventListener('click', function (e) {
    var img = e.target.closest && e.target.closest(SELECTOR);
    if (img && !(lb && lb.contains(img))) {
      e.preventDefault();
      open(img);
    }
  });

  document.addEventListener('keydown', function (e) {
    if (!lb || !lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(current - 1);
    else if (e.key === 'ArrowRight') show(current + 1);
  });
})();
