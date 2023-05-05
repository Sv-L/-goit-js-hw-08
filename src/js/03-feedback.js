import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const throttleOnInput = throttle(onInput, 500);
const STORAGE_KEY = 'feedback-form-state';
let formState = {};

formEl.addEventListener('input', throttleOnInput);
formEl.addEventListener('submit', onSubmit);

if (localStorage.getItem(STORAGE_KEY)) {
  try {
    formState = JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch (error) {
    console.log(error);
  }
  fillFormFields(formState, formEl);
}

function fillFormFields(storageValue, form) {
  const formStateKeys = Object.keys(storageValue);
  for (let i = 0; i < form.elements.length; i++) {
    const element = form.elements[i];
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      const fieldName = element.name;
      if (formStateKeys.includes(fieldName)) {
        element.value = storageValue[fieldName];
      }
    }
  }
}

function onInput(e) {
  formState[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
}

function onSubmit(e) {
  e.preventDefault();
  if (formEl.email.value === '' || formEl.message.value === '') {
    return alert('Please fill in all the fields!');
  } else {
    try {
      console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    } catch (error) {
      console.log(error);
    }
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    formState = {};
  }
}
