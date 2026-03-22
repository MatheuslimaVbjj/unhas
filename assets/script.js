
const body = document.body;
const navToggle = document.querySelector('.nav-toggle');
const siteMenu = document.getElementById('site-menu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    body.classList.toggle('menu-open');
  });

  document.querySelectorAll('.site-nav a').forEach((link) => {
    link.addEventListener('click', () => {
      body.classList.remove('menu-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const filterButtons = document.querySelectorAll('.filter-chip');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((b) => b.classList.remove('is-active'));
    button.classList.add('is-active');

    portfolioItems.forEach((item) => {
      const category = item.dataset.category || '';
      const show = filter === 'all' || category.includes(filter);
      item.classList.toggle('is-hidden', !show);
    });
  });
});

const bookingForm = document.getElementById('bookingForm');
const output = document.getElementById('messageOutput');
const copyButton = document.getElementById('copyMessage');
const whatsappBase = 'https://wa.me/351927251381?text=';

function buildMessage() {
  if (!bookingForm) return '';
  const formData = new FormData(bookingForm);
  const nome = (formData.get('nome') || '').toString().trim();
  const servico = (formData.get('servico') || '').toString().trim();
  const data = (formData.get('data') || '').toString().trim();
  const detalhes = (formData.get('detalhes') || '').toString().trim();

  const lines = [
    'Olá Andreia!',
    '',
    nome ? `O meu nome é ${nome}.` : '',
    servico ? `Gostaria de marcar: ${servico}.` : '',
    data ? `Data pretendida: ${data}.` : '',
    detalhes ? `Detalhes / inspiração: ${detalhes}` : '',
    '',
    'Podes dizer-me a tua disponibilidade?'
  ].filter(Boolean);

  return lines.join('\n');
}

if (bookingForm && output) {
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = buildMessage();
    output.value = message;
    window.open(`${whatsappBase}${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  });

  bookingForm.addEventListener('input', () => {
    output.value = buildMessage();
  });
}

if (copyButton && output) {
  copyButton.addEventListener('click', async () => {
    const message = output.value || buildMessage();
    if (!message) return;
    try {
      await navigator.clipboard.writeText(message);
      copyButton.textContent = 'Mensagem copiada';
      setTimeout(() => { copyButton.textContent = 'Copiar mensagem'; }, 1600);
    } catch {
      output.focus();
      output.select();
    }
  });
}

const video = document.getElementById('heroVideo');
const videoToggle = document.getElementById('videoToggle');

if (video && videoToggle) {
  videoToggle.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      videoToggle.classList.remove('is-paused');
      videoToggle.lastChild.textContent = ' Vídeo em movimento';
    } else {
      video.pause();
      videoToggle.classList.add('is-paused');
      videoToggle.lastChild.textContent = ' Vídeo pausado';
    }
  });
}

const stage = document.getElementById('interactiveStage');
if (stage && window.matchMedia('(hover: hover)').matches) {
  stage.addEventListener('mousemove', (event) => {
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    stage.style.transform = `perspective(1200px) rotateY(${x * 4}deg) rotateX(${y * -4}deg)`;
  });

  stage.addEventListener('mouseleave', () => {
    stage.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)';
  });
}
