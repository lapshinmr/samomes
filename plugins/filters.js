import Vue from 'vue';
import moment from 'moment';

const titleEllipseFilter = (title, limit = 35) => {
  let toShow = title.slice(0, limit);
  toShow += title.length > limit ? '...' : '';
  return toShow;
};

Vue.filter('ellipse', titleEllipseFilter);

Vue.filter('price', (value) => {
  let price;
  if (value > 0) {
    const currencyFormatter = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
    });
    price = !Number.isNaN(value) && value !== undefined && value !== null ? currencyFormatter.format(Math.floor(value)) : '';
  } else {
    price = '—';
  }
  return price;
});

Vue.filter('paymentPrice', (value) => {
  const currencyFormatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return !Number.isNaN(value) && value !== undefined && value !== null ? currencyFormatter.format(value) : '';
});

Vue.filter('separator', (value) => {
  const currencyFormatter = new Intl.NumberFormat('en-GB');
  return value ? currencyFormatter.format(value) : 0;
});

Vue.filter('date', (value, format = 'DD/MM/YYYY') => (value ? moment.unix(value).format(format) : ''));

Vue.filter('time', (value, format = 'HH:mm:ss') => (value ? moment.unix(value).format(format) : ''));

Vue.filter('dateTime', (value, format = 'DD/MM/YYYY, HH:mm') => (value ? moment.unix(value).format(format) : ''));

Vue.filter('fileSize', (value) => {
  if (value) {
    const size = Number.parseInt(value, 10);
    switch (true) {
      case size > 1024 * 1024:
        return `${(size / (1024 * 1024)).toFixed(1)} MB`;
      case size > 1024:
        return `${Math.floor(size / (1024))} KB`;
      default:
        return `${size} B`;
    }
  }
  return '–';
});
