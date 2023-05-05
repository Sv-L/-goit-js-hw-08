export function checkFormFill(form) {
  let isFormValid = true;
  for (let i = 0; i < form.elements.length; i++) {
    const element = form.elements[i];

    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      const fieldValue = element.value.trim();
      if (fieldValue === '') {
        isFormValid = false;
        break;
      }
    }
  }
  if (isFormValid) {
    return true;
  } else {
    alert('Please fill in all the fields!');
    return false;
  }
}
