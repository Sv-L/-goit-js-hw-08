import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const throttleOnInput = throttle(onInput, 500);
const STORAGE_KEY = 'feedback-form-state';
let formState = {};

formEl.addEventListener('input', throttleOnInput);
formEl.addEventListener('submit', onSubmit);

function onInput(e) {
  formState[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
}

if (localStorage.getItem(STORAGE_KEY)) {
  formState = JSON.parse(localStorage.getItem(STORAGE_KEY));
  try {
    const { email, message } = JSON.parse(localStorage.getItem(STORAGE_KEY));
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
    console.log(localStorage.getItem(STORAGE_KEY));
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    formState = {};
  }
}
