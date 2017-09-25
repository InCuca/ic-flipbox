const loaders = require('vue-webpack-loaders');
/**
 * More info about this styleguide configuration in
 * vue-styleguidist/vue-styleguidist github repository
 */
module.exports = {
  sections: [
    {
      /* The component itself */
      name: 'ic-flipbox',
      content: 'docs/Introduction.md',
      components: 'src/**/ic-flipbox.vue',
      // ignore: ['src/ignored-component/ignored-component.vue'],
      sections: [
        /* One item for every different demo or doc of the component */
        {
          name: 'Use Case 1',
          content: 'docs/UseCase1.md'
        },
        /* One item for every different demo or doc of the component */
        {
          name: 'Use Case 2',
          content: 'docs/UseCase2.md'
        }
      ]
    },
  ],
  webpackConfig: {
    module: {
			loaders,
		}
  },
  serverPort: 6062
};
