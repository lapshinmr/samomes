export const formatPrecision = (value: string | number, precision = 2) => {
  if (value === undefined || value === null) return '';

  // Convert to number if it's a string
  const num = typeof value === 'string' ? parseFloat(value) : value;

  // Check if it's a valid number
  if (isNaN(num)) return '';

  // Format with the specified precision
  const formatted = num.toFixed(precision);

  // Remove trailing zeros
  return formatted.replace(/\.?0+$/, '');
}
