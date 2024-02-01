export const resolvePathVariables = (
  path: string,
  variables: { [K: string]: string | number }
): string =>
  Object.keys(variables).reduce((acc, paramName) => {
    return acc.replace(new RegExp(`\\{${paramName}\\}`, 'g'), String(variables[paramName]));
  }, path);
