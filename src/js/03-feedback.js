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
  try {
    formState = JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch (error) {
    console.log(error);
  }
  const formStateKeys = Object.keys(formState);

  for (let i = 0; i < formEl.elements.length; i++) {
    const element = formEl.elements[i];

    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      const fieldName = element.name;
      if (formStateKeys.includes(fieldName)) {
        element.value = formState[fieldName];
      }
    }
  }
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
