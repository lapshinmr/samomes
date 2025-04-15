// TODO: return number or null?
export const format = (value: string | number, precision = 3) => {
  if (value === undefined || value === null) return '';

  // Convert to number if it's a string
  const num = typeof value === 'string' ? parseFloat(value) : value;

  // Check if it's a valid number
  if (isNaN(num)) return '';

  // Format with the specified precision
  // const formatted = num.toFixed(precision);
  const options = {};
  if (precision !== undefined) {
    options['maximumSignificantDigits'] = precision;
  }
  const formatter = new Intl.NumberFormat('en-US', options);

  // Remove trailing zeros
  // return formatted.replace(/\.?0+$/, '');
  return formatter.format(num);
};
