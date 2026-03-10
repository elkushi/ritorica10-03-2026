/* ============================================
   ELEMENTS
   ============================================ */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const langSelector = document.getElementById('langSelector');
const langBtn = document.getElementById('langBtn');
const langLabel = document.getElementById('langLabel');
const langDropdown = document.getElementById('langDropdown');

const overlay = document.createElement('div');
overlay.classList.add('navbar__mobile-overlay');
document.body.appendChild(overlay);

/* ============================================
   HELPERS
   ============================================ */
function openMenu() {
    hamburger.classList.add('open');
    navMenu.classList.add('open');
    overlay.classList.add('show');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    overlay.classList.remove('show');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    document.querySelectorAll('.has-dropdown').forEach(el => el.classList.remove('mobile-open'));
}

function openLang() {
    langSelector.classList.add('open');
    langBtn.setAttribute('aria-expanded', 'true');
}

function closeLang() {
    langSelector.classList.remove('open');
    langBtn.setAttribute('aria-expanded', 'false');
}

/* ============================================
   HAMBURGER
   ============================================ */
hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
});

// Only close menu on leaf links (not dropdown parents)
navMenu.querySelectorAll('a').forEach(link => {
    if (!link.parentElement.classList.contains('has-dropdown')) {
        link.addEventListener('click', closeMenu);
    }
});

overlay.addEventListener('click', closeMenu);

/* ============================================
   MOBILE ACCORDION DROPDOWNS
   ============================================ */
document.querySelectorAll('.has-dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const li = link.parentElement;
            const isOpen = li.classList.contains('mobile-open');
            document.querySelectorAll('.has-dropdown').forEach(el => el.classList.remove('mobile-open'));
            if (!isOpen) li.classList.add('mobile-open');
        }
    });
});

/* ============================================
   LANGUAGE SELECTOR
   ============================================ */
langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langSelector.classList.contains('open') ? closeLang() : openLang();
});
langDropdown.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.querySelectorAll('li').forEach(li => li.classList.remove('active'));
        item.classList.add('active');
        langLabel.textContent = item.getAttribute('data-lang');
        document.documentElement.setAttribute('dir', item.getAttribute('data-dir'));
        document.documentElement.setAttribute('lang', item.getAttribute('data-lang').toLowerCase());
        closeLang();
    });
});

/* ============================================
   OUTSIDE CLICK & RESIZE
   ============================================ */
document.addEventListener('click', (e) => {
    if (!langSelector.contains(e.target)) closeLang();
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) closeMenu();
});
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
});



/* ============================================
   SCROLL — SHRINK NAVBAR
   ============================================ */
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


/* ============================================
   SCROLL PROGRESS BAR
   ============================================ */
const progressBar = document.createElement('div');
progressBar.classList.add('scroll-progress');
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
});

/* ============================================
   SECTION 4 — FEATURE TABS
   ============================================ */
document.querySelectorAll('.sms-features__tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        // remove active from all tabs and mockups
        document.querySelectorAll('.sms-features__tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.sms-features__mockup').forEach(m => m.classList.remove('active'));

        // activate clicked tab and matching mockup
        tab.classList.add('active');
        document.querySelector(`.sms-features__mockup[data-mockup="${target}"]`).classList.add('active');
    });
});