export const kebabCase = (string: string) => {
  return string ? string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase() : null;
};
