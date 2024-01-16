export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateAmount = (value: number): boolean => {
  const parsedValue = parseFloat(value.toString());
  return !isNaN(parsedValue) && isFinite(parsedValue) && parsedValue > 0;
};
