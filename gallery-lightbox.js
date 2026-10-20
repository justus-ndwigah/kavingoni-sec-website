/* Gallery lightbox: click any .gallery-card image to view it full size */
(function () {
  var imgs = Array.prototype.slice.call(document.querySelectorAll('.gallery-card img'));
  if (!imgs.length) return;

  var lb = document.createElement('div');
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

  var bigImg = lb.querySelector('.lb-img');
  var caption = lb.querySelector('.lb-caption');
  var closeBtn = lb.querySelector('.lb-close');
  var current = 0;
  var lastFocus = null;

  function show(i) {
    current = (i + imgs.length) % imgs.length;
    var img = imgs[current];
    bigImg.src = img.currentSrc || img.src;
    bigImg.alt = img.alt || '';
    var fig = img.closest('.gallery-card');
    var cap = fig && fig.querySelector('figcaption');
    caption.textContent = cap ? cap.textContent : (img.alt || '');
  }

  function open(i) {
    lastFocus = document.activeElement;
    show(i);
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

  imgs.forEach(function (img, i) {
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.addEventListener('click', function () { open(i); });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
    });
  });

  closeBtn.addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1); });
  lb.querySelector('.lb-next').addEventListener('click', function () { show(current + 1); });

  // click on the dark background closes it
  lb.addEventListener('click', function (e) {
    if (e.target === lb || e.target.classList.contains('lb-figure')) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(current - 1);
    else if (e.key === 'ArrowRight') show(current + 1);
  });

  // swipe left/right on phones
  var startX = null;
  lb.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    startX = null;
  }, { passive: true });
})();
