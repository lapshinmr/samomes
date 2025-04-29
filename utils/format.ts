export const format = (value: string | number, precision: number | undefined = 3): number | null => {
  if (value === undefined || value === null) {
    return null;
  }
  const num = +value;
  if (isNaN(num)) {
    return null;
  }

  const options = {
    useGrouping: false,
  };
  if (precision !== undefined) {
    options['maximumSignificantDigits'] = precision;
  }
  const formatter = new Intl.NumberFormat('en-US', options);
  return +formatter.format(num);
};

