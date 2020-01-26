export const getObjectPropertyByString = <T extends object>(
  obj: T,
  path: string
): unknown => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

export const arrayHasArrays = (array: string[]) => {
  return array.map(item => Array.isArray(item)).includes(true);
};
