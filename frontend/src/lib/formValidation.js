export const validateFirstName = (value) => {
  const trimmedValue = value.trim();
  return trimmedValue.length === 0 || trimmedValue.length < 2
    ? "Name must have at least 2 letters"
    : null;
};

export const validateLastName = (value) => {
  const trimmedValue = value.trim();
  return trimmedValue.length < 2 ? "Name must have at least 2 letters" : null;
};

export const validateAddress = (value) => {
  const trimmedValue = value.trim();
  return trimmedValue.length < 5 ? "Address must have at least 5 letters" : null;
};

export const validateEmail = (value) =>
  /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/.test(value)
    ? null
    : "Email must be from Gmail or Yahoo and end with gmail.com or yahoo.com";

export const validatePassword = (value) => {
  if (value.length < 8) {
    return "Password must have at least 8 characters";
  }
  if (value.length > 200) {
    return "Password must not exceed 200 characters";
  }
  if (!/[A-Z]/.test(value)) {
    return "Password must have at least 1 uppercase letter";
  }
  if (!/[a-z]/.test(value)) {
    return "Password must have at least 1 lowercase letter";
  }
  if (!/\d/.test(value)) {
    return "Password must have at least 1 number";
  }
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) {
    return "Password must have at least 1 symbol";
  }
  return null;
};


export const validateConfirmPassword = (value, values) =>
  value !== values.password ? "Passwords did not match" : null;
