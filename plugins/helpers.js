export default (context, inject) => {
  inject('isEmpty', (object) => !object || (typeof object === 'object' && Object.keys(object).length === 0));
  inject('isNotEmpty', (object) => !!object && typeof object === 'object' && Object.keys(object).length > 0);
};
