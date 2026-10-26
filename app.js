(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', () => {
    const dark = root.dataset.theme !== 'dark';
    root.dataset.theme = dark ? 'dark' : 'light';
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.textContent = dark ? 'Switch to light' : 'Switch theme';
  });

  const detailsButton = document.getElementById('detailsButton');
  const detailsMessage = document.getElementById('detailsMessage');
  detailsButton.addEventListener('click', () => {
    detailsMessage.textContent = 'This sample card represents a reusable event-listing pattern.';
    detailsButton.textContent = 'Shown ✓';
  });

  const form = document.getElementById('registrationForm');
  const nameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const yearInput = document.getElementById('year');
  const consentInput = document.getElementById('consent');
  const message = document.getElementById('formMessage');

  function setError(input, errorId, text) {
    const error = document.getElementById(errorId);
    error.textContent = text;
    input.classList.toggle('invalid', Boolean(text));
    input.setAttribute('aria-invalid', String(Boolean(text)));
    if (text) input.setAttribute('aria-describedby', errorId);
    else input.removeAttribute('aria-describedby');
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const validEmail = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
    setError(nameInput, 'nameError', name.length < 2 ? 'Please enter your name (at least 2 characters).' : '');
    setError(emailInput, 'emailError', !validEmail ? 'Enter a valid email address.' : '');
    const yearValid = Boolean(yearInput.value);
    yearInput.classList.toggle('invalid', !yearValid);
    yearInput.setAttribute('aria-invalid', String(!yearValid));
    consentInput.setAttribute('aria-invalid', String(!consentInput.checked));
    if (!yearValid || !consentInput.checked) {
      message.className = 'form-message failure';
      message.textContent = !yearValid ? 'Please select your year of study.' : 'Please agree to event-related updates to continue.';
      (!yearValid ? yearInput : consentInput).focus();
      return;
    }
    if (name.length < 2 || !validEmail) {
      message.className = 'form-message failure';
      message.textContent = 'Please correct the highlighted fields.';
      (name.length < 2 ? nameInput : emailInput).focus();
      return;
    }
    message.className = 'form-message success';
    message.textContent = `Thanks, ${name}! Your demo registration is complete. No information was sent or saved.`;
    form.querySelector('button[type="submit"]').textContent = 'Demo registration complete ✓';
  });
})();
