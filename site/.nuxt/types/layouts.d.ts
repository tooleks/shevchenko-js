import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default"
declare module "/home/tooleks/Projects/shevchenko-js/site/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}