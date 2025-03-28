module.exports = {
  name: require('./package').name,
  options: {
    babel: {
      plugins: [require.resolve('ember-concurrency/async-arrow-task-transform')]
    }
  }
};
