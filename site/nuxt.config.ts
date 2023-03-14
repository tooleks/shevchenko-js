import { buildPageUrl } from './composables/route-utils';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['~/assets/style/main.scss'],
  app: {
    head: {
      charset: 'utf-8',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { name: 'msapplication-TileImage', content: buildPageUrl('/ms-icon-144x144.png') },
        { name: 'theme-color', content: '#ffffff' },
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '57x57', href: buildPageUrl('/apple-icon-57x57.png') },
        { rel: 'apple-touch-icon', sizes: '60x60', href: buildPageUrl('/apple-icon-60x60.png') },
        { rel: 'apple-touch-icon', sizes: '72x72', href: buildPageUrl('/apple-icon-72x72.png') },
        { rel: 'apple-touch-icon', sizes: '76x76', href: buildPageUrl('/apple-icon-76x76.png') },
        {
          rel: 'apple-touch-icon',
          sizes: '114x114',
          href: buildPageUrl('/apple-icon-114x114.png'),
        },
        {
          rel: 'apple-touch-icon',
          sizes: '120x120',
          href: buildPageUrl('/apple-icon-120x120.png'),
        },
        {
          rel: 'apple-touch-icon',
          sizes: '144x144',
          href: buildPageUrl('/apple-icon-144x144.png'),
        },
        {
          rel: 'apple-touch-icon',
          sizes: '152x152',
          href: buildPageUrl('/apple-icon-152x152.png'),
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: buildPageUrl('/apple-icon-180x180.png'),
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '192x192',
          href: buildPageUrl('/android-icon-192x192.png'),
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: buildPageUrl('/favicon-32x32.png'),
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '96x96',
          href: buildPageUrl('/favicon-96x96.png'),
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: buildPageUrl('/favicon-16x16.png'),
        },
        { rel: 'manifest', href: buildPageUrl('/manifest.json') },
      ],
      script: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.26.0/polyfill.min.js' },
      ],
    },
  },
  modules: ['@vueuse/nuxt'],
});
