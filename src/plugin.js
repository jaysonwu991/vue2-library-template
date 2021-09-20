import Clock from './Clock';

module.exports = {
  install: function (Vue) {
    Vue.component('VueClock', Clock);
  },
};
