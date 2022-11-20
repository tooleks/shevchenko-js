// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['~/assets/style/main.scss'],
  app: {
    head: {
      charset: 'utf-8',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { name: 'msapplication-TileImage', content: './ms-icon-144x144.png' },
        { name: 'theme-color', content: '#ffffff' },
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '57x57', href: './apple-icon-57x57.png' },
        { rel: 'apple-touch-icon', sizes: '60x60', href: './apple-icon-60x60.png' },
        { rel: 'apple-touch-icon', sizes: '72x72', href: './apple-icon-72x72.png' },
        { rel: 'apple-touch-icon', sizes: '76x76', href: './apple-icon-76x76.png' },
        { rel: 'apple-touch-icon', sizes: '114x114', href: './apple-icon-114x114.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: './apple-icon-120x120.png' },
        { rel: 'apple-touch-icon', sizes: '144x144', href: './apple-icon-144x144.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: './apple-icon-152x152.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: './apple-icon-180x180.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: './android-icon-192x192.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: './favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: './favicon-96x96.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: './favicon-16x16.png' },
        { rel: 'manifest', href: './manifest.json' },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/bootstrap@4.2.1/dist/css/bootstrap.min.css',
          integrity: 'sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS',
          crossorigin: 'anonymous',
        },
      ],
      script: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.26.0/polyfill.min.js' },
        { src: 'https://use.fontawesome.com/2c801adbe2.js' },
        {
          src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js',
          integrity: 'sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo',
          crossorigin: 'anonymous',
        },
        {
          src: 'https://cdn.jsdelivr.net/npm/popper.js@1.14.6/dist/umd/popper.min.js',
          integrity: 'sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut',
          crossorigin: 'anonymous',
        },
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@4.2.1/dist/js/bootstrap.min.js',
          integrity: 'sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k',
          crossorigin: 'anonymous',
        },
      ],
    },
  },
  modules: ['@vueuse/nuxt'],
});
