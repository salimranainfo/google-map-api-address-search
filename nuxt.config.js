export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'google-search',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap',
      },
    ],
    // Font Link Below
    // <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet">
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/google-fonts',
    '@nuxtjs/tailwindcss',
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
  // Store API key in ENV variables

  env: {
    API_KEY: 'AIzaSyBzXIUvyEfFV7t7kmkengXi2UcIAQ7toXk',
  },
}
