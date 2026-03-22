const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach((item) => observer.observe(item));

const bookingForm = document.getElementById('bookingForm');
const output = document.getElementById('messageOutput');
const copyButton = document.getElementById('copyMessage');
const instagramUrl = 'https://www.instagram.com/andreiaalves_unhass/';

function generateMessage(formData) {
  const nome = formData.get('nome')?.trim() || 'Olá';
  const servico = formData.get('servico')?.trim() || 'serviço';
  const data = formData.get('data')?.trim();
  const detalhes = formData.get('detalhes')?.trim();

  const linhas = [
    `Olá Andreia! O meu nome é ${nome}.`,
    `Gostaria de marcar o serviço: ${servico}.`
  ];

  if (data) {
    linhas.push(`Data/horário pretendido: ${data}.`);
  }

  if (detalhes) {
    linhas.push(`Detalhes/inspiração: ${detalhes}.`);
  }

  linhas.push('Pode indicar disponibilidade, por favor? Obrigada!');
  return linhas.join('\n');
}

if (bookingForm && output) {
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(bookingForm);
    const message = generateMessage(formData);
    output.value = message;
    output.focus();
    output.select();

    navigator.clipboard?.writeText(message).catch(() => {});
    window.open(instagramUrl, '_blank', 'noopener');
  });
}

if (copyButton && output) {
  copyButton.addEventListener('click', async () => {
    if (!output.value.trim()) {
      output.value = 'Preencha o formulário e clique em “Gerar mensagem”.';
      return;
    }

    try {
      await navigator.clipboard.writeText(output.value);
      const previous = copyButton.textContent;
      copyButton.textContent = 'Copiado';
      setTimeout(() => {
        copyButton.textContent = previous;
      }, 1500);
    } catch {
      output.select();
      document.execCommand('copy');
    }
  });
}
