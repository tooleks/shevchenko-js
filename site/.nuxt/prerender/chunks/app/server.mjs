import { getCurrentInstance, inject, version, defineComponent, h, computed, unref, Suspense, nextTick, Transition, provide, reactive, ref, resolveComponent, shallowRef, useSSRContext, createApp, toRef, isRef, defineAsyncComponent, onErrorCaptured, withCtx, createVNode } from 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/vue/index.mjs';
import { $fetch } from 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/ofetch/dist/node.mjs';
import { createHooks } from 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/hookable/dist/index.mjs';
import { getContext, executeAsync } from 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/unctx/dist/index.mjs';
import { hasProtocol, isEqual, parseURL, joinURL } from 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/ufo/dist/index.mjs';
import { createError as createError$1, sendRedirect } from 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/h3/dist/index.mjs';
import { useHead, createHead as createHead$1 } from 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/@unhead/vue/dist/index.mjs';
import { renderDOMHead, debouncedRenderDOMHead } from 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/@unhead/dom/dist/index.mjs';
import { useRoute as useRoute$1, RouterView, createMemoryHistory, createRouter } from 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/vue-router/dist/vue-router.node.mjs';
import { createI18n } from 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/vue-i18n/index.mjs';
import { ssrRenderSuspense, ssrRenderComponent } from 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/vue/server-renderer/index.mjs';
import { defu } from 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/defu/dist/defu.mjs';
import { a as useRuntimeConfig$1 } from '../nitro/nitro-prerenderer.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/node-fetch-native/dist/polyfill.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/destr/dist/index.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/scule/dist/index.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/ohash/dist/index.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/unstorage/dist/index.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/unstorage/dist/drivers/fs.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/radix3/dist/index.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/nitropack/dist/runtime/plugin.mjs';

var _a, _b, _c, _d;
const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const nuxtAppCtx = getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    payload: reactive({
      data: {},
      state: {},
      _errors: {},
      ...{ serverRendered: true }
    }),
    static: {
      data: {}
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.payload.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  const compatibilityConfig = new Proxy(runtimeConfig, {
    get(target, prop) {
      var _a2;
      if (prop === "public") {
        return target.public;
      }
      return (_a2 = target[prop]) != null ? _a2 : target.public[prop];
    },
    set(target, prop, value) {
      {
        return false;
      }
    }
  });
  nuxtApp.provide("config", compatibilityConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin !== "function") {
    return;
  }
  const { provide: provide2 } = await callWithNuxt(nuxtApp, plugin, [nuxtApp]) || {};
  if (provide2 && typeof provide2 === "object") {
    for (const key in provide2) {
      nuxtApp.provide(key, provide2[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  for (const plugin of plugins2) {
    await applyPlugin(nuxtApp, plugin);
  }
}
function normalizePlugins(_plugins2) {
  const plugins2 = _plugins2.map((plugin) => {
    if (typeof plugin !== "function") {
      return null;
    }
    if (plugin.length > 1) {
      return (nuxtApp) => plugin(nuxtApp, nuxtApp.provide);
    }
    return plugin;
  }).filter(Boolean);
  return plugins2;
}
function defineNuxtPlugin(plugin) {
  plugin[NuxtPluginIndicator] = true;
  return plugin;
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxtAppCtx.callAsync(nuxt, fn);
  }
}
function useNuxtApp() {
  const nuxtAppInstance = nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    const vm = getCurrentInstance();
    if (!vm) {
      throw new Error("nuxt instance unavailable");
    }
    return vm.appContext.app.$nuxt;
  }
  return nuxtAppInstance;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
function defineAppConfig(config2) {
  return config2;
}
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = useNuxtApp();
    nuxtApp.callHook("app:error", err);
    const error = useError();
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = "$s" + _key;
  const nuxt = useNuxtApp();
  const state = toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const useRouter = () => {
  var _a2;
  return (_a2 = useNuxtApp()) == null ? void 0 : _a2.$router;
};
const useRoute = () => {
  if (getCurrentInstance()) {
    return inject("_route", useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
const defineNuxtRouteMiddleware = (middleware) => middleware;
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : to.path || "/";
  const isExternal = hasProtocol(toPath, true);
  if (isExternal && !(options == null ? void 0 : options.external)) {
    throw new Error("Navigating to external URL is not allowed by default. Use `nagivateTo (url, { external: true })`.");
  }
  if (isExternal && parseURL(toPath).protocol === "script:") {
    throw new Error("Cannot navigate to an URL with script protocol.");
  }
  const router = useRouter();
  {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      const redirectLocation = isExternal ? toPath : joinURL(useRuntimeConfig().app.baseURL, router.resolve(to).fullPath || "/");
      return nuxtApp.callHook("app:redirected").then(() => sendRedirect(nuxtApp.ssrContext.event, redirectLocation, (options == null ? void 0 : options.redirectCode) || 302));
    }
  }
  if (isExternal) {
    if (options == null ? void 0 : options.replace) {
      location.replace(toPath);
    } else {
      location.href = toPath;
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
const DEFAULT_EXTERNAL_REL_ATTRIBUTE = "noopener noreferrer";
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  return defineComponent({
    name: componentName,
    props: {
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const to = computed(() => {
        return props.to || props.href || "";
      });
      const isExternal = computed(() => {
        if (props.external) {
          return true;
        }
        if (props.target && props.target !== "_self") {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || hasProtocol(to.value, true);
      });
      const prefetched = ref(false);
      const el = void 0;
      return () => {
        var _a2, _b2, _c2;
        if (!isExternal.value) {
          return h(
            resolveComponent("RouterLink"),
            {
              ref: void 0,
              to: to.value,
              ...prefetched.value && !props.custom ? { class: props.prefetchedClass || options.prefetchedClass } : {},
              activeClass: props.activeClass || options.activeClass,
              exactActiveClass: props.exactActiveClass || options.exactActiveClass,
              replace: props.replace,
              ariaCurrentValue: props.ariaCurrentValue,
              custom: props.custom
            },
            slots.default
          );
        }
        const href = typeof to.value === "object" ? (_b2 = (_a2 = router.resolve(to.value)) == null ? void 0 : _a2.href) != null ? _b2 : null : to.value || null;
        const target = props.target || null;
        const rel = props.noRel ? null : firstNonUndefined(props.rel, options.externalRelAttribute, href ? DEFAULT_EXTERNAL_REL_ATTRIBUTE : "") || null;
        const navigate = () => navigateTo(href, { replace: props.replace });
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href,
            navigate,
            route: router.resolve(href),
            rel,
            target,
            isExternal: isExternal.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", { ref: el, href, rel, target }, (_c2 = slots.default) == null ? void 0 : _c2.call(slots));
      };
    }
  });
}
const __nuxt_component_0$1 = defineNuxtLink({ componentName: "NuxtLink" });
function isObject(value) {
  return value !== null && typeof value === "object";
}
function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isObject(value) && isObject(object[key])) {
      object[key] = _defu(value, object[key], (namespace ? `${namespace}.` : "") + key.toString(), merger);
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => arguments_.reduce((p, c) => _defu(p, c, "", merger), {});
}
const defuFn = createDefu((object, key, currentValue, _namespace) => {
  if (typeof object[key] !== "undefined" && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});
const baseUrl = "https://shevchenko-js.tooleks.com";
const config = {
  website: {
    url: baseUrl,
    email: "tooleks@gmail.com"
  },
  library: {
    name: "shevchenko",
    releaseYear: 2017,
    npmUrl: "https://www.npmjs.com/package/shevchenko",
    gitHubUrl: "https://github.com/tooleks/shevchenko-js",
    gitHubStatsUrl: "https://api.github.com/repos/tooleks/shevchenko-js",
    issuesUrl: "https://github.com/tooleks/shevchenko-js/issues",
    licenseUrl: "https://github.com/tooleks/shevchenko-js/blob/master/LICENSE",
    runKitUrl: "https://runkit.com/tooleks/shevchenko",
    cdnUrl: "https://unpkg.com/shevchenko"
  }
};
const cfg0 = defineAppConfig(config);
const inlineConfig = {};
const __appConfig = defuFn(cfg0, inlineConfig);
const components = {};
const _nuxt_components_plugin_mjs_KR1HBZs4kY = defineNuxtPlugin((nuxtApp) => {
  for (const name in components) {
    nuxtApp.vueApp.component(name, components[name]);
    nuxtApp.vueApp.component("Lazy" + name, components[name]);
  }
});
function createHead(initHeadObject) {
  const unhead = createHead$1();
  const legacyHead = {
    unhead,
    install(app) {
      if (app.config.globalProperties)
        app.config.globalProperties.$head = unhead;
      app.provide("usehead", unhead);
    },
    resolveTags() {
      return unhead.resolveTags();
    },
    headEntries() {
      return unhead.headEntries();
    },
    headTags() {
      return unhead.resolveTags();
    },
    push(input, options) {
      return unhead.push(input, options);
    },
    addEntry(input, options) {
      return unhead.push(input, options);
    },
    addHeadObjs(input, options) {
      return unhead.push(input, options);
    },
    addReactiveEntry(input, options) {
      const api = useHead(input, options);
      if (typeof api !== "undefined")
        return api.dispose;
      return () => {
      };
    },
    removeHeadObjs() {
    },
    updateDOM(document2, force) {
      if (force)
        renderDOMHead(unhead, { document: document2 });
      else
        debouncedRenderDOMHead(unhead, { delayFn: (fn) => setTimeout(() => fn(), 50), document: document2 });
    },
    internalHooks: unhead.hooks,
    hooks: {
      "before:dom": [],
      "resolved:tags": [],
      "resolved:entries": []
    }
  };
  unhead.addHeadObjs = legacyHead.addHeadObjs;
  unhead.updateDOM = legacyHead.updateDOM;
  unhead.hooks.hook("dom:beforeRender", (ctx) => {
    for (const hook of legacyHead.hooks["before:dom"]) {
      if (hook() === false)
        ctx.shouldRender = false;
    }
  });
  if (initHeadObject)
    legacyHead.addHeadObjs(initHeadObject);
  return legacyHead;
}
version.startsWith("2.");
const appHead = { "meta": [{ "charset": "utf-8" }, { "name": "viewport", "content": "width=device-width, initial-scale=1" }, { "name": "msapplication-TileColor", "content": "#ffffff" }, { "name": "msapplication-TileImage", "content": "https://shevchenko-js.tooleks.com/ms-icon-144x144.png" }, { "name": "theme-color", "content": "#ffffff" }], "link": [{ "rel": "apple-touch-icon", "sizes": "57x57", "href": "https://shevchenko-js.tooleks.com/apple-icon-57x57.png" }, { "rel": "apple-touch-icon", "sizes": "60x60", "href": "https://shevchenko-js.tooleks.com/apple-icon-60x60.png" }, { "rel": "apple-touch-icon", "sizes": "72x72", "href": "https://shevchenko-js.tooleks.com/apple-icon-72x72.png" }, { "rel": "apple-touch-icon", "sizes": "76x76", "href": "https://shevchenko-js.tooleks.com/apple-icon-76x76.png" }, { "rel": "apple-touch-icon", "sizes": "114x114", "href": "https://shevchenko-js.tooleks.com/apple-icon-114x114.png" }, { "rel": "apple-touch-icon", "sizes": "120x120", "href": "https://shevchenko-js.tooleks.com/apple-icon-120x120.png" }, { "rel": "apple-touch-icon", "sizes": "144x144", "href": "https://shevchenko-js.tooleks.com/apple-icon-144x144.png" }, { "rel": "apple-touch-icon", "sizes": "152x152", "href": "https://shevchenko-js.tooleks.com/apple-icon-152x152.png" }, { "rel": "apple-touch-icon", "sizes": "180x180", "href": "https://shevchenko-js.tooleks.com/apple-icon-180x180.png" }, { "rel": "icon", "type": "image/png", "sizes": "192x192", "href": "https://shevchenko-js.tooleks.com/android-icon-192x192.png" }, { "rel": "icon", "type": "image/png", "sizes": "32x32", "href": "https://shevchenko-js.tooleks.com/favicon-32x32.png" }, { "rel": "icon", "type": "image/png", "sizes": "96x96", "href": "https://shevchenko-js.tooleks.com/favicon-96x96.png" }, { "rel": "icon", "type": "image/png", "sizes": "16x16", "href": "https://shevchenko-js.tooleks.com/favicon-16x16.png" }, { "rel": "manifest", "href": "https://shevchenko-js.tooleks.com/manifest.json" }, { "rel": "stylesheet", "href": "https://cdn.jsdelivr.net/npm/bootstrap@4.2.1/dist/css/bootstrap.min.css", "integrity": "sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS", "crossorigin": "anonymous" }], "style": [], "script": [{ "src": "https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.26.0/polyfill.min.js" }, { "src": "https://use.fontawesome.com/2c801adbe2.js" }, { "src": "https://code.jquery.com/jquery-3.3.1.slim.min.js", "integrity": "sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo", "crossorigin": "anonymous" }, { "src": "https://cdn.jsdelivr.net/npm/popper.js@1.14.6/dist/umd/popper.min.js", "integrity": "sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut", "crossorigin": "anonymous" }, { "src": "https://cdn.jsdelivr.net/npm/bootstrap@4.2.1/dist/js/bootstrap.min.js", "integrity": "sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k", "crossorigin": "anonymous" }], "noscript": [], "charset": "utf-8" };
const appLayoutTransition = false;
const appPageTransition = false;
const appKeepalive = false;
const node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_D7WGfuP1A0 = defineNuxtPlugin((nuxtApp) => {
  const head = createHead();
  head.push(appHead);
  nuxtApp.vueApp.use(head);
  nuxtApp._useHead = useHead;
  {
    nuxtApp.ssrContext.renderMeta = async () => {
      const { renderSSRHead } = await import('file:///home/tooleks/Projects/shevchenko-js/site/node_modules/@unhead/ssr/dist/index.mjs');
      const meta = await renderSSRHead(head.unhead);
      return {
        ...meta,
        bodyScriptsPrepend: meta.bodyTagsOpen,
        bodyScripts: meta.bodyTags
      };
    };
  }
});
const __nuxt_page_meta$1 = {
  alias: ["/en", "/en.html"]
};
const __nuxt_page_meta = {};
const _routes = [
  {
    name: (_a = __nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.name) != null ? _a : "en-US",
    path: (_b = __nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.path) != null ? _b : "/en-US",
    file: "/home/tooleks/Projects/shevchenko-js/site/pages/en-US/index.vue",
    children: [],
    meta: __nuxt_page_meta$1,
    alias: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.alias) || [],
    redirect: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.redirect) || void 0,
    component: () => import('./_nuxt/index.2a6aade5.mjs').then((m) => m.default || m)
  },
  {
    name: (_c = __nuxt_page_meta == null ? void 0 : __nuxt_page_meta.name) != null ? _c : "index",
    path: (_d = __nuxt_page_meta == null ? void 0 : __nuxt_page_meta.path) != null ? _d : "/",
    file: "/home/tooleks/Projects/shevchenko-js/site/pages/index.vue",
    children: [],
    meta: __nuxt_page_meta,
    alias: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.alias) || [],
    redirect: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.redirect) || void 0,
    component: () => import('./_nuxt/index.2e215246.mjs').then((n) => n.i).then((m) => m.default || m)
  }
];
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    let position = savedPosition || void 0;
    if (!position && from && to && to.meta.scrollToTop !== false && _isDifferentRoute(from, to)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
      }
    }
    const hasTransition = (route) => {
      var _a2;
      return !!((_a2 = route.meta.pageTransition) != null ? _a2 : appPageTransition);
    };
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await nextTick();
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
        }
        resolve(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = document.querySelector(selector);
    if (elem) {
      return parseFloat(getComputedStyle(elem).scrollMarginTop);
    }
  } catch {
  }
  return 0;
}
function _isDifferentRoute(a, b) {
  const samePageComponent = a.matched[0] === b.matched[0];
  if (!samePageComponent) {
    return true;
  }
  if (samePageComponent && JSON.stringify(a.params) !== JSON.stringify(b.params)) {
    return true;
  }
  return false;
}
const configRouterOptions = {};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = defineNuxtRouteMiddleware(async (to) => {
  var _a2;
  let __temp, __restore;
  if (!((_a2 = to.meta) == null ? void 0 : _a2.validate)) {
    return;
  }
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (typeof result === "boolean") {
    return result;
  }
  return createError(result);
});
const globalMiddleware = [
  validate
];
const namedMiddleware = {};
const node_modules_nuxt_dist_pages_runtime_router_mjs_qNv5Ky2ZmB = defineNuxtPlugin(async (nuxtApp) => {
  var _a2, _b2, _c2, _d2;
  let __temp, __restore;
  let routerBase = useRuntimeConfig().app.baseURL;
  if (routerOptions.hashMode && !routerBase.includes("#")) {
    routerBase += "#";
  }
  const history = (_b2 = (_a2 = routerOptions.history) == null ? void 0 : _a2.call(routerOptions, routerBase)) != null ? _b2 : createMemoryHistory(routerBase);
  const routes = (_d2 = (_c2 = routerOptions.routes) == null ? void 0 : _c2.call(routerOptions, _routes)) != null ? _d2 : _routes;
  const initialURL = nuxtApp.ssrContext.url;
  const router = createRouter({
    ...routerOptions,
    history,
    routes
  });
  nuxtApp.vueApp.use(router);
  const previousRoute = shallowRef(router.currentRoute.value);
  router.afterEach((_to, from) => {
    previousRoute.value = from;
  });
  Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
    get: () => previousRoute.value
  });
  const _route = shallowRef(router.resolve(initialURL));
  const syncCurrentRoute = () => {
    _route.value = router.currentRoute.value;
  };
  nuxtApp.hook("page:finish", syncCurrentRoute);
  router.afterEach((to, from) => {
    var _a3, _b3, _c3, _d3;
    if (((_b3 = (_a3 = to.matched[0]) == null ? void 0 : _a3.components) == null ? void 0 : _b3.default) === ((_d3 = (_c3 = from.matched[0]) == null ? void 0 : _c3.components) == null ? void 0 : _d3.default)) {
      syncCurrentRoute();
    }
  });
  const route = {};
  for (const key in _route.value) {
    route[key] = computed(() => _route.value[key]);
  }
  nuxtApp._route = reactive(route);
  nuxtApp._middleware = nuxtApp._middleware || {
    global: [],
    named: {}
  };
  useError();
  try {
    if (true) {
      ;
      [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
      ;
    }
    ;
    [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
    ;
  } catch (error2) {
    callWithNuxt(nuxtApp, showError, [error2]);
  }
  const initialLayout = useState("_layout");
  router.beforeEach(async (to, from) => {
    var _a3, _b3;
    to.meta = reactive(to.meta);
    if (nuxtApp.isHydrating) {
      to.meta.layout = (_a3 = initialLayout.value) != null ? _a3 : to.meta.layout;
    }
    nuxtApp._processingMiddleware = true;
    const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
    for (const component of to.matched) {
      const componentMiddleware = component.meta.middleware;
      if (!componentMiddleware) {
        continue;
      }
      if (Array.isArray(componentMiddleware)) {
        for (const entry2 of componentMiddleware) {
          middlewareEntries.add(entry2);
        }
      } else {
        middlewareEntries.add(componentMiddleware);
      }
    }
    for (const entry2 of middlewareEntries) {
      const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b3 = namedMiddleware[entry2]) == null ? void 0 : _b3.call(namedMiddleware).then((r) => r.default || r)) : entry2;
      if (!middleware) {
        throw new Error(`Unknown route middleware: '${entry2}'.`);
      }
      const result = await callWithNuxt(nuxtApp, middleware, [to, from]);
      {
        if (result === false || result instanceof Error) {
          const error2 = result || createError$1({
            statusCode: 404,
            statusMessage: `Page Not Found: ${initialURL}`
          });
          await callWithNuxt(nuxtApp, showError, [error2]);
          return false;
        }
      }
      if (result || result === false) {
        return result;
      }
    }
  });
  router.afterEach(async (to) => {
    delete nuxtApp._processingMiddleware;
    if (to.matched.length === 0) {
      callWithNuxt(nuxtApp, showError, [createError$1({
        statusCode: 404,
        fatal: false,
        statusMessage: `Page not found: ${to.fullPath}`
      })]);
    } else {
      const currentURL = to.fullPath || "/";
      if (!isEqual(currentURL, initialURL)) {
        await callWithNuxt(nuxtApp, navigateTo, [currentURL]);
      }
    }
  });
  nuxtApp.hooks.hookOnce("app:created", async () => {
    try {
      await router.replace({
        ...router.resolve(initialURL),
        name: void 0,
        force: true
      });
    } catch (error2) {
      callWithNuxt(nuxtApp, showError, [error2]);
    }
  });
  return { provide: { router } };
});
const browser$1 = "Browser";
const demo$1 = "Demo";
const documentation$1 = "Documentation";
const feedback$1 = "Feedback";
const foundBug$1 = "Found a bug?";
const gender$1 = "Gender";
const grammaticalCase$1 = "Grammatical Case";
const howItWorks$1 = "How It Works?";
const installation$1 = "Installation";
const issueReport$1 = "Issue Report";
const language$1 = "Language";
const license$1 = "License";
const links$1 = "Links";
const usageExample$1 = "Usage Example";
const enUS = {
  "action.close": "Close",
  "action.copy": "Copy",
  "action.write": "Write",
  "action.inflect": "Inflect",
  "action.inflect.inAblativeCase": "Inflect in ablative grammatical case",
  "action.inflect.inAccusativeCase": "Inflect in accusative grammatical case",
  "action.inflect.inDativeCase": "Inflect in dative grammatical case",
  "action.inflect.inGenitiveCase": "Inflect in genitive grammatical case",
  "action.inflect.inLocativeCase": "Inflect in locative grammatical case",
  "action.inflect.inNominativeCase": "Inflect in nominative grammatical case",
  "action.inflect.inVocativeCase": "Inflect in vocative grammatical case",
  "action.send": "Send",
  "action.share.onFacebook": "Share on Facebook",
  "action.share.onLinkedIn": "Share on LinkedIn",
  "action.share.onTwitter": "Share on Twitter",
  "action.tryItOut": "Try it out",
  "anthroponym.firstName": "First Name",
  "anthroponym.lastName": "Last Name",
  "anthroponym.middleName": "Middle (Patronymic) Name",
  "app.name": "JavaScript library for declension of Ukrainian anthroponyms",
  browser: browser$1,
  "action.contactMe": "Contact Me",
  "contactMe.recipientEmail": "Email address",
  "contactMe.modalTitle": "Contact Me",
  "contactMe.modalMessage": "Please feel free to contact me via email if you have any questions or suggestions.",
  "contactMe.messageSubject": "shevchenko - Contact Me",
  demo: demo$1,
  "demo.message": "of declension of Ukrainian first names, last names, and middle (patronymic) names",
  documentation: documentation$1,
  feedback: feedback$1,
  foundBug: foundBug$1,
  gender: gender$1,
  "gender.message.autoDetection": "Automatic grammatical gender detection by first name or patronymic name.",
  "gender.message.detectionFailed": "Failed to detect grammatical gender by first name or patronymic name. Select grammatical gender manually.",
  "gender.undefined": "Auto",
  "gender.female": "Feminine",
  "gender.male": "Masculine",
  grammaticalCase: grammaticalCase$1,
  "grammaticalCase.ablative": "Ablative",
  "grammaticalCase.accusative": "Accusative",
  "grammaticalCase.dative": "Dative",
  "grammaticalCase.genitive": "Genitive",
  "grammaticalCase.locative": "Locative",
  "grammaticalCase.nominative": "Nominative",
  "grammaticalCase.vocative": "Vocative",
  howItWorks: howItWorks$1,
  "declensionForm.instructionMessage": "Fill in the name of the person in a nominative case.",
  "declensionForm.copyMessage": "Use the buttons below to copy the declension results.",
  installation: installation$1,
  issueReport: issueReport$1,
  language: language$1,
  license: license$1,
  links: links$1,
  "locale.en-US": "English",
  "locale.uk-UA": "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430",
  usageExample: usageExample$1,
  "error404.pageTitle": "404 Error",
  "error404.instructionMessage": "The requested page was not found",
  "action.backToHome": "Navigate to home page",
  "declension.anthroponym": "Declension {lastName} {firstName} {middleName}",
  "action.copyLink": "Copy link address"
};
const browser = "\u0411\u0440\u0430\u0443\u0437\u0435\u0440";
const demo = "\u0414\u0435\u043C\u043E\u043D\u0441\u0442\u0440\u0430\u0446\u0456\u044F";
const documentation = "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u0446\u0456\u044F";
const feedback = "\u0417\u0432\u043E\u0440\u043E\u0442\u043D\u0456\u0439 \u0437\u0432'\u044F\u0437\u043E\u043A";
const foundBug = "\u0417\u043D\u0430\u0439\u0448\u043B\u0438 \u043F\u043E\u043C\u0438\u043B\u043A\u0443?";
const gender = "\u0413\u0440\u0430\u043C\u0430\u0442\u0438\u0447\u043D\u0438\u0439 \u0440\u0456\u0434";
const grammaticalCase = "\u0413\u0440\u0430\u043C\u0430\u0442\u0438\u0447\u043D\u0438\u0439 \u0432\u0456\u0434\u043C\u0456\u043D\u043E\u043A";
const howItWorks = "\u041F\u0440\u0438\u043D\u0446\u0438\u043F \u0440\u043E\u0431\u043E\u0442\u0438";
const installation = "\u0412\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F";
const issueReport = "\u0417\u0432\u0456\u0442 \u043F\u0440\u043E \u043F\u043E\u043C\u0438\u043B\u043A\u0443";
const language = "\u041C\u043E\u0432\u0430";
const license = "\u041B\u0456\u0446\u0435\u043D\u0437\u0456\u044F";
const links = "\u041F\u043E\u0441\u0438\u043B\u0430\u043D\u043D\u044F";
const usageExample = "\u041F\u0440\u0438\u043A\u043B\u0430\u0434 \u0432\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u0430\u043D\u043D\u044F";
const ukUA = {
  "action.close": "\u0417\u0430\u043A\u0440\u0438\u0442\u0438",
  "action.copy": "\u0421\u043A\u043E\u043F\u0456\u044E\u0432\u0430\u0442\u0438",
  "action.write": "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u0438",
  "action.inflect": "\u041F\u0440\u043E\u0432\u0456\u0434\u043C\u0456\u043D\u044F\u0442\u0438",
  "action.inflect.inAblativeCase": "\u041F\u0440\u043E\u0432\u0456\u0434\u043C\u0456\u043D\u044F\u0442\u0438 \u0432 \u043E\u0440\u0443\u0434\u043D\u043E\u043C\u0443 \u0432\u0456\u0434\u043C\u0456\u043D\u043A\u0443",
  "action.inflect.inAccusativeCase": "\u041F\u0440\u043E\u0432\u0456\u0434\u043C\u0456\u043D\u044F\u0442\u0438 \u0432 \u0437\u043D\u0430\u0445\u0456\u0434\u043D\u043E\u043C\u0443 \u0432\u0456\u0434\u043C\u0456\u043D\u043A\u0443",
  "action.inflect.inDativeCase": "\u041F\u0440\u043E\u0432\u0456\u0434\u043C\u0456\u043D\u044F\u0442\u0438 \u0432 \u0434\u0430\u0432\u0430\u043B\u044C\u043D\u043E\u043C\u0443 \u0432\u0456\u0434\u043C\u0456\u043D\u043A\u0443",
  "action.inflect.inGenitiveCase": "\u041F\u0440\u043E\u0432\u0456\u0434\u043C\u0456\u043D\u044F\u0442\u0438 \u0432 \u0440\u043E\u0434\u043E\u0432\u043E\u043C\u0443 \u0432\u0456\u0434\u043C\u0456\u043D\u043A\u0443",
  "action.inflect.inLocativeCase": "\u041F\u0440\u043E\u0432\u0456\u0434\u043C\u0456\u043D\u044F\u0442\u0438 \u0432 \u043C\u0456\u0441\u0446\u0435\u0432\u043E\u043C\u0443 \u0432\u0456\u0434\u043C\u0456\u043D\u043A\u0443",
  "action.inflect.inNominativeCase": "\u041F\u0440\u043E\u0432\u0456\u0434\u043C\u0456\u043D\u044F\u0442\u0438 \u0432 \u043D\u0430\u0437\u0438\u0432\u043D\u043E\u043C\u0443 \u0432\u0456\u0434\u043C\u0456\u043D\u043A\u0443",
  "action.inflect.inVocativeCase": "\u041F\u0440\u043E\u0432\u0456\u0434\u043C\u0456\u043D\u044F\u0442\u0438 \u0432 \u043A\u043B\u0438\u0447\u043D\u043E\u043C\u0443 \u0432\u0456\u0434\u043C\u0456\u043D\u043A\u0443",
  "action.send": "\u041D\u0430\u0434\u0456\u0441\u043B\u0430\u0442\u0438",
  "action.share.onFacebook": "\u041F\u043E\u0434\u0456\u043B\u0438\u0442\u0438\u0441\u044F \u0447\u0435\u0440\u0435\u0437 Facebook",
  "action.share.onLinkedIn": "\u041F\u043E\u0434\u0456\u043B\u0438\u0442\u0438\u0441\u044F \u0447\u0435\u0440\u0435\u0437 LinkedIn",
  "action.share.onTwitter": "\u041F\u043E\u0434\u0456\u043B\u0438\u0442\u0438\u0441\u044F \u0447\u0435\u0440\u0435\u0437 Twitter",
  "action.tryItOut": "\u0421\u043F\u0440\u043E\u0431\u0443\u0432\u0430\u0442\u0438",
  "anthroponym.firstName": "\u0406\u043C'\u044F",
  "anthroponym.lastName": "\u041F\u0440\u0456\u0437\u0432\u0438\u0449\u0435",
  "anthroponym.middleName": "\u041F\u043E \u0431\u0430\u0442\u044C\u043A\u043E\u0432\u0456",
  "app.name": "JavaScript \u0431\u0456\u0431\u043B\u0456\u043E\u0442\u0435\u043A\u0430 \u0434\u043B\u044F \u0432\u0456\u0434\u043C\u0456\u043D\u044E\u0432\u0430\u043D\u043D\u044F \u0443\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0438\u0445 \u0430\u043D\u0442\u0440\u043E\u043F\u043E\u043D\u0456\u043C\u0456\u0432",
  browser,
  "action.contactMe": "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u0438 \u0430\u0432\u0442\u043E\u0440\u0443",
  "about.modalTitle": "\u041F\u0440\u043E {appName}",
  "about.modalMessage": "\u0421\u043F\u0456\u043B\u044C\u043D\u0430 \u0440\u043E\u0437\u0440\u043E\u0431\u043A\u0430 \u0422\u043E\u043B\u043E\u0447\u043A\u0430 \u041E\u043B\u0435\u043A\u0441\u0430\u043D\u0434\u0440\u0430 \u0412\u0430\u043B\u0435\u0440\u0456\u0439\u043E\u0432\u0438\u0447\u0430 \u0442\u0430 \u0443\u0447\u0438\u0442\u0435\u043B\u044C\u043A\u0438 \u0443\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u043E\u0457 \u043C\u043E\u0432\u0438 \u0442\u0430 \u043B\u0456\u0442\u0435\u0440\u0430\u0442\u0443\u0440\u0438 \u0422\u043E\u043B\u043E\u0447\u043A\u043E \u0422\u0435\u0442\u044F\u043D\u0438 \u0413\u0440\u0438\u0433\u043E\u0440\u0456\u0432\u043D\u0438.",
  "contactMe.modalTitle": "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u0438 \u0430\u0432\u0442\u043E\u0440\u0443",
  "contactMe.recipientEmail": "\u0415\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0430 \u043F\u043E\u0448\u0442\u0430",
  "contactMe.modalMessage": "\u0417\u0432'\u044F\u0436\u0456\u0442\u044C\u0441\u044F \u0437\u0456 \u043C\u043D\u043E\u044E \u0437\u0430 \u0434\u043E\u043F\u043E\u043C\u043E\u0433\u043E\u044E email, \u044F\u043A\u0449\u043E \u0443 \u0432\u0430\u0441 \u0432\u0438\u043D\u0438\u043A\u043B\u0438 \u0431\u0443\u0434\u044C-\u044F\u043A\u0456 \u043F\u0438\u0442\u0430\u043D\u043D\u044F \u0447\u0438 \u043F\u0440\u043E\u043F\u043E\u0437\u0438\u0446\u0456\u0457.",
  "contactMe.messageSubject": "shevchenko - \u0417\u0432\u043E\u0440\u043E\u0442\u043D\u0456\u0439 \u0437\u0432'\u044F\u0437\u043E\u043A",
  demo,
  "demo.message": "\u0432\u0456\u0434\u043C\u0456\u043D\u044E\u0432\u0430\u043D\u043D\u044F \u0443\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0438\u0445 \u043F\u0440\u0456\u0437\u0432\u0438\u0449, \u0456\u043C\u0435\u043D \u0442\u0430 \u043F\u043E \u0431\u0430\u0442\u044C\u043A\u043E\u0432\u0456",
  documentation,
  feedback,
  foundBug,
  "gender.message.autoDetection": "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u043D\u0435 \u0432\u0438\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F \u0433\u0440\u0430\u043C\u0430\u0442\u0438\u0447\u043D\u043E\u0433\u043E \u0440\u043E\u0434\u0443 \u0432\u0456\u0434\u0431\u0443\u0432\u0430\u0454\u0442\u044C\u0441\u044F \u0437\u0430 \u0456\u043C'\u044F\u043C \u0430\u0431\u043E \u043F\u043E \u0431\u0430\u0442\u044C\u043A\u043E\u0432\u0456.",
  "gender.message.detectionFailed": "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0432\u0438\u0437\u043D\u0430\u0447\u0438\u0442\u0438 \u0433\u0440\u0430\u043C\u0430\u0442\u0438\u0447\u043D\u0438\u0439 \u0440\u0456\u0434 \u0437\u0430 \u0456\u043C'\u044F\u043C \u0430\u0431\u043E \u043F\u043E \u0431\u0430\u0442\u044C\u043A\u043E\u0432\u0456. \u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044C \u0433\u0440\u0430\u043C\u0430\u0442\u0438\u0447\u043D\u0438\u0439 \u0440\u0456\u0434 \u0432\u0440\u0443\u0447\u043D\u0443.",
  gender,
  "gender.undefined": "\u0410\u0432\u0442\u043E",
  "gender.female": "\u0416\u0456\u043D\u043E\u0447\u0438\u0439",
  "gender.male": "\u0427\u043E\u043B\u043E\u0432\u0456\u0447\u0438\u0439",
  grammaticalCase,
  "grammaticalCase.ablative": "\u041E\u0440\u0443\u0434\u043D\u0438\u0439 (\u043A\u0438\u043C/\u0447\u0438\u043C?)",
  "grammaticalCase.accusative": "\u0417\u043D\u0430\u0445\u0456\u0434\u043D\u0438\u0439 (\u043A\u043E\u0433\u043E/\u0449\u043E?)",
  "grammaticalCase.dative": "\u0414\u0430\u0432\u0430\u043B\u044C\u043D\u0438\u0439 (\u043A\u043E\u043C\u0443/\u0447\u043E\u043C\u0443?)",
  "grammaticalCase.genitive": "\u0420\u043E\u0434\u043E\u0432\u0438\u0439 (\u043A\u043E\u0433\u043E/\u0447\u043E\u0433\u043E?)",
  "grammaticalCase.locative": "\u041C\u0456\u0441\u0446\u0435\u0432\u0438\u0439 (\u043F\u0440\u0438 \u043A\u043E\u043C\u0443/\u0447\u043E\u043C\u0443?)",
  "grammaticalCase.nominative": "\u041D\u0430\u0437\u0438\u0432\u043D\u0438\u0439 (\u0445\u0442\u043E/\u0449\u043E?)",
  "grammaticalCase.vocative": "\u041A\u043B\u0438\u0447\u043D\u0438\u0439",
  howItWorks,
  "declensionForm.instructionMessage": "\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u0433\u0440\u0430\u043C\u0430\u0442\u0438\u0447\u043D\u0438\u0439 \u0440\u0456\u0434, \u043F\u0440\u0456\u0437\u0432\u0438\u0449\u0435, \u0456\u043C'\u044F \u0442\u0430 \u043F\u043E \u0431\u0430\u0442\u044C\u043A\u043E\u0432\u0456 \u043E\u0441\u043E\u0431\u0438 \u0432 \u043D\u0430\u0437\u0438\u0432\u043D\u043E\u043C\u0443 \u0432\u0456\u0434\u043C\u0456\u043D\u043A\u0443 \u043E\u0434\u043D\u0438\u043D\u0438.",
  "declensionForm.copyMessage": "\u0412\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u0439\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0438 \u043D\u0438\u0436\u0447\u0435, \u0449\u043E\u0431 \u0441\u043A\u043E\u043F\u0456\u044E\u0432\u0430\u0442\u0438 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0438 \u0432\u0456\u0434\u043C\u0456\u043D\u044E\u0432\u0430\u043D\u043D\u044F.",
  installation,
  issueReport,
  language,
  license,
  links,
  "locale.en-US": "English",
  "locale.uk-UA": "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430",
  usageExample,
  "error404.pageTitle": "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 404",
  "error404.instructionMessage": "\u0421\u0442\u043E\u0440\u0456\u043D\u043A\u0438 \u0437\u0430 \u0437\u0430\u0434\u0430\u043D\u043E\u044E \u0430\u0434\u0440\u0435\u0441\u043E\u044E \u043D\u0435 \u0456\u0441\u043D\u0443\u0454",
  "action.backToHome": "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043D\u0430 \u0433\u043E\u043B\u043E\u0432\u043D\u0443 \u0441\u0442\u043E\u0440\u0456\u043D\u043A\u0443",
  "declension.anthroponym": "\u0412\u0456\u0434\u043C\u0456\u043D\u044E\u0432\u0430\u043D\u043D\u044F {lastName} {firstName} {middleName}",
  "action.copyLink": "\u0421\u043A\u043E\u043F\u0456\u044E\u0432\u0430\u0442\u0438 \u0430\u0434\u0440\u0435\u0441\u0443 \u043F\u043E\u0441\u0438\u043B\u0430\u043D\u043D\u044F"
};
const defaultLocale = "uk-UA";
const fallbackLocale = "en-US";
const plugins_i18n_ts_VfGcjrvSkj = defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    messageResolver: (messages, path) => {
      const message = messages[path];
      return message != null ? message : null;
    },
    locale: defaultLocale,
    fallbackLocale,
    messages: { "en-US": enUS, "uk-UA": ukUA }
  });
  vueApp.use(i18n);
});
const _plugins = [
  _nuxt_components_plugin_mjs_KR1HBZs4kY,
  node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_D7WGfuP1A0,
  node_modules_nuxt_dist_pages_runtime_router_mjs_qNv5Ky2ZmB,
  plugins_i18n_ts_VfGcjrvSkj
];
const Fragment = defineComponent({
  setup(_props, { slots }) {
    return () => {
      var _a2;
      return (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
    };
  }
});
const _wrapIf = (component, props, slots) => {
  return { default: () => props ? h(component, props === true ? {} : props, slots) : h(Fragment, {}, slots) };
};
const layouts = {
  default: () => import('./_nuxt/default.7c6fe3b4.mjs').then((m) => m.default || m)
};
const LayoutLoader = defineComponent({
  props: {
    name: String,
    ...{}
  },
  async setup(props, context) {
    const LayoutComponent = await layouts[props.name]().then((r) => r.default || r);
    return () => {
      return h(LayoutComponent, {}, context.slots);
    };
  }
});
const __nuxt_component_0 = defineComponent({
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    }
  },
  setup(props, context) {
    const injectedRoute = inject("_route");
    const route = injectedRoute === useRoute() ? useRoute$1() : injectedRoute;
    const layout = computed(() => {
      var _a2, _b2;
      return (_b2 = (_a2 = unref(props.name)) != null ? _a2 : route.meta.layout) != null ? _b2 : "default";
    });
    return () => {
      var _a2;
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = (_a2 = route.meta.layoutTransition) != null ? _a2 : appLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => _wrapIf(LayoutLoader, hasLayout && { key: layout.value, name: layout.value, hasTransition: void 0 }, context.slots).default()
      }).default();
    };
  }
});
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a2;
    return ((_a2 = route.params[r.slice(1)]) == null ? void 0 : _a2.toString()) || "";
  });
};
const generateRouteKey = (override, routeProps) => {
  var _a2;
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a3;
    return ((_a3 = m.components) == null ? void 0 : _a3.default) === routeProps.Component.type;
  });
  const source = (_a2 = override != null ? override : matchedRoute == null ? void 0 : matchedRoute.meta.key) != null ? _a2 : matchedRoute && interpolatePath(routeProps.route, matchedRoute);
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const __nuxt_component_1 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs }) {
    const nuxtApp = useNuxtApp();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          var _a2, _b2, _c2, _d2;
          if (!routeProps.Component) {
            return;
          }
          const key = generateRouteKey(props.pageKey, routeProps);
          const done = nuxtApp.deferHydration();
          const hasTransition = !!((_b2 = (_a2 = props.transition) != null ? _a2 : routeProps.route.meta.pageTransition) != null ? _b2 : appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          return _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              (_d2 = (_c2 = props.keepalive) != null ? _c2 : routeProps.route.meta.keepalive) != null ? _d2 : appKeepalive,
              h(Suspense, {
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).finally(done));
                }
              }, { default: () => h(Component, { key, routeProps, pageKey: key, hasTransition }) })
            )
          ).default();
        }
      });
    };
  }
});
function _toArray(val) {
  return Array.isArray(val) ? val : val ? [val] : [];
}
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: _toArray(prop.onAfterLeave)
  }));
  return defu(..._props);
}
const Component = defineComponent({
  props: ["routeProps", "pageKey", "hasTransition"],
  setup(props) {
    const previousKey = props.pageKey;
    const previousRoute = props.routeProps.route;
    const route = {};
    for (const key in props.routeProps.route) {
      route[key] = computed(() => previousKey === props.pageKey ? props.routeProps.route[key] : previousRoute[key]);
    }
    provide("_route", reactive(route));
    return () => {
      return h(props.routeProps.Component);
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLayout = __nuxt_component_0;
  const _component_NuxtPage = __nuxt_component_1;
  _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_NuxtPage)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const ErrorComponent = defineAsyncComponent(() => import('./_nuxt/error-component.aacc77ac.mjs').then((r) => r.default || r));
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    provide("_route", useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        callWithNuxt(nuxtApp, showError, [err]);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent));
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
let entry;
const plugins = normalizePlugins(_plugins);
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);

export { _export_sfc as _, __nuxt_component_0$1 as a, __nuxt_component_0 as b, createError as c, __appConfig as d, entry$1 as default, config as e, useRoute as f, useRouter as g, useNuxtApp as u };
//# sourceMappingURL=server.mjs.map
