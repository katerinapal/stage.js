var startsWith = function(str, sub) {
  return typeof str === 'string' && typeof sub === 'string'
      && str.substring(0, sub.length) == sub;
};

export { startsWith };;