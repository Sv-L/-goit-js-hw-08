import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const emailInput = formEl.querySelector('input[name="email"]');
const messageInput = formEl.querySelector('textarea[name="message"]');
const savedFormState = localStorage.getItem('feedback-form-state');
const throttleOnInput = throttle(onInput, 500);

formEl.addEventListener('input', throttleOnInput);
formEl.addEventListener('submit', onSubmit);

function onInput(e) {
  let formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formState));
}

if (savedFormState) {
  const { email, message } = JSON.parse(savedFormState);
  formEl.email.value = email;
  formEl.message.value = message;
}

function onSubmit(e) {
  e.preventDefault();
  if (formEl.email.value === '') {
    return alert('Please fill the field "Email"!');
  } else {
    console.log(savedFormState);
    e.currentTarget.reset();
    localStorage.removeItem('feedback-form-state');
  }
}
