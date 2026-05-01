'use strict';

import '../scss/style.scss';

const form = document.getElementById('form');
const message = document.getElementById('form-message');

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzo663NZCqdTiCQ8Oo74z9d4Fh5RULUx045bm-OPBXZiKTUAzf4191E74qwf9WG4wpY/exec';

const phoneInput = document.querySelector('input[name="phone"]');

if (phoneInput) {
  phoneInput.addEventListener('input', () => {
    phoneInput.value = phoneInput.value.replace(/[^0-9+]/g, '');
  });
}

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);

    if (phoneInput && phoneInput.value.length < 10) {
      if (message) message.textContent = 'Введіть коректний номер телефону';
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Відправка...';

    if (message) message.textContent = '';

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      });

      // Meta Pixel Lead event
      if (typeof fbq === 'function') {
        fbq('track', 'Lead', {
          content_name: 'Elycura Pro-Collagen Firming Oil',
          value: 299,
          currency: 'UAH'
        });
      }

      if (message) {
        message.textContent = 'Дякуємо! Ваша заявка успішно відправлена.';
      }

      form.reset();
    } catch (error) {
      console.error(error);

      if (message) {
        message.textContent = 'Сталася помилка. Спробуйте ще раз.';
      }
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Оформити замовлення';
    }
  });
}