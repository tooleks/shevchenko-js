import { getAbsoluteUrl } from './composables/absolute-url';
import config from './config';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // https://github.com/nuxt/nuxt/pull/24504#issuecomment-1870925896
  nitro: {
    prerender: {
      ignore: ['/manifest.json'],
    },
  },
  runtimeConfig: {
    public: {
      siteUrl: 'http://localhost:3000',
      siteEmail: 'admin@localhost',
    },
  },
  app: {
    head: {
      titleTemplate: `${config.library.displayName} - %s`,
      charset: 'utf-8',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'msapplication-TileColor', content: '#ffffff' },
        {
          name: 'msapplication-TileImage',
          content: getAbsoluteUrl('/ms-icon-144x144.png', process.env.NUXT_PUBLIC_SITE_URL),
        },
        { name: 'theme-color', content: '#ffffff' },
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '57x57',
          href: getAbsoluteUrl('/apple-icon-57x57.png', process.env.NUXT_PUBLIC_SITE_URL),
        },
        {
          rel: 'apple-touch-icon',
          sizes: '60x60',
          href: getAbsoluteUrl('/apple-icon-60x60.png', process.env.NUXT_PUBLIC_SITE_URL),
        },
        {
          rel: 'apple-touch-icon',
          sizes: '72x72',
          href: getAbsoluteUrl('/apple-icon-72x72.png', process.env.NUXT_PUBLIC_SITE_URL),
        },
        {
          rel: 'apple-touch-icon',
          sizes: '76x76',
          href: getAbsoluteUrl('/apple-icon-76x76.png', process.env.NUXT_PUBLIC_SITE_URL),
        },
        {
          rel: 'apple-touch-icon',
          sizes: '114x114',
          href: getAbsoluteUrl('/apple-icon-114x114.png', process.env.NUXT_PUBLIC_SITE_URL),
        },
        {
          rel: 'apple-touch-icon',
          sizes: '120x120',
          href: getAbsoluteUrl('/apple-icon-120x120.png', process.env.NUXT_PUBLIC_SITE_URL),
        },
        {
          rel: 'apple-touch-icon',
          sizes: '144x144',
          href: getAbsoluteUrl('/apple-icon-144x144.png', process.env.NUXT_PUBLIC_SITE_URL),
        },
        {
          rel: 'apple-touch-icon',
          sizes: '152x152',
          href: getAbsoluteUrl('/apple-icon-152x152.png', process.env.NUXT_PUBLIC_SITE_URL),
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: getAbsoluteUrl('/apple-icon-180x180.png', process.env.NUXT_PUBLIC_SITE_URL),
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '192x192',
          href: getAbsoluteUrl('/android-icon-192x192.png', process.env.NUXT_PUBLIC_SITE_URL),
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: getAbsoluteUrl('/favicon-32x32.png', process.env.NUXT_PUBLIC_SITE_URL),
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '96x96',
          href: getAbsoluteUrl('/favicon-96x96.png', process.env.NUXT_PUBLIC_SITE_URL),
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: getAbsoluteUrl('/favicon-16x16.png', process.env.NUXT_PUBLIC_SITE_URL),
        },
        {
          rel: 'manifest',
          href: getAbsoluteUrl('/manifest.json', process.env.NUXT_PUBLIC_SITE_URL),
        },
      ],
      script: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.26.0/polyfill.min.js' },
      ],
    },
  },
  css: ['~/assets/style/main.scss'],
  modules: ['@vueuse/nuxt'],
});
