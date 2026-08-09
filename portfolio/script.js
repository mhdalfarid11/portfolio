// Navigation toggle (mobile)
const navToggle = document.getElementById('nav-toggle');
const navList = document.getElementById('nav-list');
navToggle && navToggle.addEventListener('click', ()=>{
  const open = navList.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',(e)=>{
    const href = a.getAttribute('href');
    if(href && href.startsWith('#')){
      e.preventDefault();
      const el = document.querySelector(href);
      if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
      // close mobile nav when clicking
      if(navList.classList.contains('open')) navList.classList.remove('open');
    }
  })
});

// Sticky header shadow & active link
const header = document.getElementById('header');
const navLinks = document.querySelectorAll('.nav-link');
const sections = Array.from(document.querySelectorAll('main section'));

window.addEventListener('scroll', ()=>{
  if(window.scrollY > 10) header.classList.add('scrolled'); else header.classList.remove('scrolled');
  updateActiveLink();
  backToTopVisibility();
});

function updateActiveLink(){
  const offset = window.innerHeight/3;
  let current = sections.find(s=> s.getBoundingClientRect().top - offset < 0);
  if(!current) current = sections[0];
  navLinks.forEach(l=> l.classList.toggle('active', l.getAttribute('href') === '#'+current.id));
}

// Scroll reveal using IntersectionObserver
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('reveal');
      observer.unobserve(entry.target);
    }
  })
},{threshold:0.12});
document.querySelectorAll('section, .project-card, .skill-card, .timeline-item').forEach(el=>observer.observe(el));

// Contact form validation
const form = document.getElementById('contact-form');
form && form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  if(!name || !email || !message){
    alert('Mohon lengkapi semua field sebelum mengirim.');
    return;
  }
  // simple email check
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    alert('Silakan masukkan alamat email yang valid.');
    return;
  }
  // since no backend, show confirmation
  alert('Pesan tervalidasi. Pesan siap dikirim (no backend dalam demo ini).');
  form.reset();
});

// Back to top
const backBtn = document.getElementById('back-to-top');
function backToTopVisibility(){
  if(window.scrollY > 400) backBtn.style.display = 'block'; else backBtn.style.display = 'none';
}
backBtn && backBtn.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));

// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
const saved = localStorage.getItem('theme');
if(saved) document.documentElement.setAttribute('data-theme', saved);
themeToggle && themeToggle.addEventListener('click', ()=>{
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeToggle.setAttribute('aria-pressed', String(next === 'dark'));
});

// Image fallback: if profile.jpg missing, load svg placeholder
const profileImg = document.getElementById('profile-img');
if(profileImg){
  profileImg.onerror = ()=>{ profileImg.src = 'assets/profile.svg'; };
}

// Initial activation
updateActiveLink();
backToTopVisibility();
