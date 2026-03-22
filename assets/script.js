const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('is-open');
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => revealObserver.observe(el));

const bookingForm = document.getElementById('bookingForm');
const messageOutput = document.getElementById('messageOutput');
const copyMessageButton = document.getElementById('copyMessage');
const instagramProfile = 'https://www.instagram.com/andreiaalves_unhass/';

function buildMessage(formData) {
  const nome = formData.get('nome')?.trim() || 'Cliente';
  const servico = formData.get('servico')?.trim() || 'serviço';
  const data = formData.get('data')?.trim();
  const detalhes = formData.get('detalhes')?.trim();

  return [
    `Olá, Andreia! O meu nome é ${nome}.`,
    `Gostaria de pedir informações / marcar o serviço: ${servico}.`,
    data ? `Data pretendida: ${data}.` : '',
    detalhes ? `Inspiração / detalhes: ${detalhes}` : '',
    'Pode indicar disponibilidade, por favor?'
  ]
    .filter(Boolean)
    .join('\n');
}

if (bookingForm && messageOutput) {
  bookingForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(bookingForm);
    const message = buildMessage(formData);
    messageOutput.value = message;

    try {
      await navigator.clipboard.writeText(message);
      copyMessageButton.textContent = 'Mensagem copiada';
      setTimeout(() => {
        copyMessageButton.textContent = 'Copiar mensagem';
      }, 2200);
    } catch (error) {
      copyMessageButton.textContent = 'Copie manualmente';
      setTimeout(() => {
        copyMessageButton.textContent = 'Copiar mensagem';
      }, 2200);
    }

    window.open(instagramProfile, '_blank', 'noopener,noreferrer');
  });
}

if (copyMessageButton && messageOutput) {
  copyMessageButton.addEventListener('click', async () => {
    if (!messageOutput.value.trim()) {
      messageOutput.focus();
      return;
    }

    try {
      await navigator.clipboard.writeText(messageOutput.value);
      copyMessageButton.textContent = 'Mensagem copiada';
    } catch (error) {
      copyMessageButton.textContent = 'Copie manualmente';
    }

    setTimeout(() => {
      copyMessageButton.textContent = 'Copiar mensagem';
    }, 2200);
  });
}
