import { checkFormFill } from './04-checkformfield';
import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const throttleOnInput = throttle(onInput, 500);
const STORAGE_KEY = 'feedback-form-state';
let formState = {};

formEl.addEventListener('input', throttleOnInput);
formEl.addEventListener('submit', onSubmit);

if (localStorage.getItem(STORAGE_KEY)) {
  formState = parseStorage(STORAGE_KEY);
  fillFormFields(formState, formEl);
}

function parseStorage(storageKey) {
  try {
    return JSON.parse(localStorage.getItem(storageKey));
  } catch (error) {
    console.log(error);
  }
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
  if (checkFormFill(e.currentTarget)) {
    console.log(parseStorage(STORAGE_KEY));
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    formState = {};
  }
}
