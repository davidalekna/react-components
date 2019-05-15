export const minLength = (min: number) => (value: string) => {
  return value.length < min ? `Must be ${min} characters or more` : undefined;
};

export const mustContainLetter = (letter: string) => (value: string) => {
  return !value.includes(letter) ? `Must contain letter ${letter}` : undefined;
};

export const notEmpty = (value: string) => {
  return value.length < 1 ? `Cannot be empty` : undefined;
};
