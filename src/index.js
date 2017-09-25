import Component from './ic-flipbox/ic-flipbox.vue';

Component.install = Vue => Vue.component(Component.name, Component);
Component.version = process.env.VERSION;

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Component)
}

export default Component;
