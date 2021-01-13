module.exports = (fn, handler) => {
  Object.keys(handler).forEach((property) => {
    const decorators = handler[property].reverse();
    decorators.forEach((decorator) => {
      const method = fn[property] || fn.prototype[property];
      const decoratedMethod = function (...args) {
        return decorator(method.bind(this), property, args, fn.name || fn.constructor.name);
      };

      fn[property]
        ? (fn[property] = decoratedMethod)
        : (fn.prototype[property] = decoratedMethod);
    });
  });
};
