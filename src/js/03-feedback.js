import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const emailInput = formEl.querySelector('input[name="email"]');
const messageInput = formEl.querySelector('textarea[name="message"]');
const STORAGE_KEY = 'feedback-form-state';
const savedFormState = localStorage.getItem(STORAGE_KEY);
const throttleOnInput = throttle(onInput, 500);

formEl.addEventListener('input', throttleOnInput);
formEl.addEventListener('submit', onSubmit);

function onInput(e) {
  let formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
}

if (savedFormState) {
  try {
    const { email, message } = JSON.parse(savedFormState);
    formEl.email.value = email;
    formEl.message.value = message;
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
}

function onSubmit(e) {
  e.preventDefault();
  if (formEl.email.value === '') {
    return alert('Please fill the field "Email"!');
  } else {
    console.log(savedFormState);
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
  }
}
