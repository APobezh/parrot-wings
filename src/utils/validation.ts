export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateAmount = (value: string): boolean => {
  const parsedValue = parseFloat(value);
  return !isNaN(parsedValue) && isFinite(parsedValue) && parsedValue > 0;
};
