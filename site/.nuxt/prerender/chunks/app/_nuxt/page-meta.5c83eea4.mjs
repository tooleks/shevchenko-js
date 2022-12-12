import { u as useNuxtApp, d as __appConfig, e as config, f as useRoute, _ as _export_sfc, a as __nuxt_component_0$1, c as createError } from '../server.mjs';
import { reactive, useSSRContext, computed, defineComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, withAsyncContext, ref, isRef, watch, getCurrentScope, onScopeDispose, effectScope, onServerPrefetch, getCurrentInstance, nextTick } from 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderSlot, ssrRenderList } from 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/vue/server-renderer/index.mjs';
import { hash } from 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/ohash/dist/index.mjs';

const getDefault = () => null;
function useAsyncData(...args) {
  var _a, _b, _c, _d, _e, _f, _g;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  options.server = (_a = options.server) != null ? _a : true;
  options.default = (_b = options.default) != null ? _b : getDefault;
  options.lazy = (_c = options.lazy) != null ? _c : false;
  options.immediate = (_d = options.immediate) != null ? _d : true;
  const nuxt = useNuxtApp();
  const getCachedData = () => nuxt.isHydrating ? nuxt.payload.data[key] : nuxt.static.data[key];
  const hasCachedData = () => getCachedData() !== void 0;
  if (!nuxt._asyncData[key]) {
    nuxt._asyncData[key] = {
      data: ref((_g = (_f = getCachedData()) != null ? _f : (_e = options.default) == null ? void 0 : _e.call(options)) != null ? _g : null),
      pending: ref(!hasCachedData()),
      error: ref(nuxt.payload._errors[key] ? createError(nuxt.payload._errors[key]) : null)
    };
  }
  const asyncData = { ...nuxt._asyncData[key] };
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    if (nuxt._asyncDataPromises[key]) {
      if (opts.dedupe === false) {
        return nuxt._asyncDataPromises[key];
      }
      nuxt._asyncDataPromises[key].cancelled = true;
    }
    if (opts._initial && hasCachedData()) {
      return getCachedData();
    }
    asyncData.pending.value = true;
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxt));
        } catch (err) {
          reject(err);
        }
      }
    ).then((result) => {
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      if (options.transform) {
        result = options.transform(result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      asyncData.data.value = result;
      asyncData.error.value = null;
    }).catch((error) => {
      var _a2, _b2;
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      asyncData.error.value = error;
      asyncData.data.value = unref((_b2 = (_a2 = options.default) == null ? void 0 : _a2.call(options)) != null ? _b2 : null);
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      nuxt.payload.data[key] = asyncData.data.value;
      if (asyncData.error.value) {
        nuxt.payload._errors[key] = createError(asyncData.error.value);
      }
      delete nuxt._asyncDataPromises[key];
    });
    nuxt._asyncDataPromises[key] = promise;
    return nuxt._asyncDataPromises[key];
  };
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxt.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    onServerPrefetch(() => promise);
  }
  const asyncDataPromise = Promise.resolve(nuxt._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function useHead(input, options) {
  return useNuxtApp()._useHead(input, options);
}
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _key = opts.key || hash([autoKey, unref(opts.baseURL), typeof request === "string" ? request : "", unref(opts.params)]);
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useFetch] key must be a string: " + _key);
  }
  if (!request) {
    throw new Error("[nuxt] [useFetch] request is missing.");
  }
  const key = _key === autoKey ? "$f" + _key : _key;
  const _request = computed(() => {
    let r = request;
    if (typeof r === "function") {
      r = r();
    }
    return unref(r);
  });
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    watch: watch2,
    immediate,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    immediate,
    watch: [
      _fetchOptions,
      _request,
      ...watch2 || []
    ]
  };
  let controller;
  const asyncData = useAsyncData(key, () => {
    var _a;
    (_a = controller == null ? void 0 : controller.abort) == null ? void 0 : _a.call(controller);
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    return $fetch(_request.value, { signal: controller.signal, ..._fetchOptions });
  }, _asyncDataOptions);
  return asyncData;
}
function useAppConfig() {
  const nuxtApp = useNuxtApp();
  if (!nuxtApp._appConfig) {
    nuxtApp._appConfig = reactive(__appConfig);
  }
  return nuxtApp._appConfig;
}
const _sfc_main$6 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flag flag--ukraine" }, _attrs))} data-v-06d25804></div>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ukrainian-flag.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-06d25804"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "github-issue-count",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const appConfig = useAppConfig();
    const { data, pending } = ([__temp, __restore] = withAsyncContext(() => useFetch(appConfig.library.gitHubStatsUrl, {
      server: false,
      lazy: true
    }, "$zXgY1EVtZn")), __temp = await __temp, __restore(), __temp);
    const issueCount = computed(() => {
      return data.value ? data.value.open_issues_count : 0;
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (!unref(pending)) {
        _push(`<span${ssrRenderAttrs(mergeProps({ class: "badge badge-info" }, _attrs))}>${ssrInterpolate(unref(issueCount))}</span>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/github-issue-count.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "contact-me-button",
  __ssrInlineRender: true,
  props: {
    buttonClass: { type: String, default: null }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<a${ssrRenderAttrs(mergeProps({
        href: "#",
        "data-toggle": "modal",
        "data-target": "#contact-me-modal",
        class: __props.buttonClass
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</a>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/contact-me-button.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _imports_0 = "data:image/jpeg;base64,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SSSQAAAACSSQCSQAACSSSSQAAAACSSQCSQAACSSSQCQACSQACQACSQCQCQAACQACSQACQACSQCQCQACSSSSSQCSSQCSSSQCSSSSSSSSQCSSQCSSSQCSSSQACQCSSSSSQAAACSQACQACQCSSSSSQAAACSQAACSSSQCSSSQCSSSSQCQACSSSQCSSSQCSSSSQCQCSQCSSQCQCSSSSQCQCSSSQCSSQCQCSSSSQCQCSQACQACSSQCSQCSSQCSSQACQACSSQCSQCSSQCSSSSSSSSQCSSSQCQCQAAACSSSSSQCSSSQCQCQAAAAAAACSSSSSQCSSQCSSQAAAACSSSSSQCSSQCSSQACSSSQCSSSQCQCQCQACQCSSSQCSSSQCQCQCQACSQACSSQCSQCSQCSSSSSSQACSSQCSQCSQCSSSSSQCSQCQACSQCSQCSSSQCQCSQCQACSQCSQCSSSQCQCSSSQACSQCSQACQCQCQCSSSQACSQCSQACQCQCT//EABQRAQAAAAAAAAAAAAAAAAAAAKD/2gAIAQMBAT8QNJ//xAAUEQEAAAAAAAAAAAAAAAAAAACg/9oACAECAQE/EDSf/8QAFBABAAAAAAAAAAAAAAAAAAAAoP/aAAgBAQABPxA0n//Z";
const buildPageUrl = (fullPath = "") => config.website.url + fullPath;
const useRouteUtils = () => {
  const route = useRoute();
  const pageUrl = computed(() => buildPageUrl(route.fullPath));
  return { buildPageUrl, pageUrl };
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "top-nav-bar",
  __ssrInlineRender: true,
  setup(__props) {
    const appConfig = useAppConfig();
    const { buildPageUrl: buildPageUrl2 } = useRouteUtils();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_GithubIssueCount = _sfc_main$5;
      const _component_ContactMeButton = _sfc_main$4;
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "navbar navbar-expand-lg navbar-light bg-light" }, _attrs))} data-v-41cf331d><a class="navbar-brand"${ssrRenderAttr("href", unref(appConfig).website.url)} data-v-41cf331d><img class="navbar-brand__logo"${ssrRenderAttr("src", _imports_0)}${ssrRenderAttr("alt", unref(appConfig).library.name)} data-v-41cf331d><span class="hidden-sm" data-v-41cf331d>${ssrInterpolate(unref(appConfig).library.name)}</span></a><button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-supported-content" aria-controls="navbar-supported-content" aria-expanded="false" aria-label="Toggle navigation" data-v-41cf331d><span class="navbar-toggler-icon" data-v-41cf331d></span></button><div class="collapse navbar-collapse" id="navbar-supported-content" data-v-41cf331d><ul class="navbar-nav mt-2 mt-lg-0 ml-auto" role="menubar" data-v-41cf331d><li class="nav-item" role="presentation" data-v-41cf331d>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "nav-link",
        to: { hash: "#demo" },
        role: "menuitem"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("demo"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("demo")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="nav-item" role="presentation" data-v-41cf331d>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "nav-link",
        to: { hash: "#documentation" },
        role: "menuitem"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("documentation"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("documentation")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="nav-item" role="presentation" data-v-41cf331d><a class="nav-link"${ssrRenderAttr("href", unref(appConfig).library.licenseUrl)} target="_blank" role="menuitem" data-v-41cf331d>${ssrInterpolate(_ctx.$t("license"))}</a></li><li class="nav-item dropdown" role="presentation" data-v-41cf331d><a class="nav-link dropdown-toggle" href="#" id="navbar-dropdown-links" data-toggle="dropdown" role="menuitem" aria-haspopup="true" aria-expanded="false" data-v-41cf331d>${ssrInterpolate(_ctx.$t("links"))}</a><div class="dropdown-menu" aria-labelledby="navbar-dropdown-links" role="menu" data-v-41cf331d><a class="dropdown-item"${ssrRenderAttr("href", unref(appConfig).library.npmUrl)} target="_blank" role="menuitem" data-v-41cf331d> NPM </a><a class="dropdown-item"${ssrRenderAttr("href", unref(appConfig).library.gitHubUrl)} target="_blank" role="menuitem" data-v-41cf331d> GitHub </a><a class="dropdown-item"${ssrRenderAttr("href", unref(appConfig).library.runKitUrl)} target="_blank" role="menuitem" data-v-41cf331d> RunKit </a></div></li><li class="nav-item dropdown" role="presentation" data-v-41cf331d><a class="nav-link dropdown-toggle" href="#" id="navbar-dropdown-feedback" data-toggle="dropdown" role="menuitem" aria-haspopup="true" aria-expanded="false" data-v-41cf331d>${ssrInterpolate(_ctx.$t("feedback"))}</a><div class="dropdown-menu" aria-labelledby="navbar-dropdown-feedback" role="menu" data-v-41cf331d><a class="dropdown-item"${ssrRenderAttr("href", unref(appConfig).library.issuesUrl)} target="_blank" role="menuitem" data-v-41cf331d>${ssrInterpolate(_ctx.$t("issueReport"))} `);
      _push(ssrRenderComponent(_component_GithubIssueCount, null, null, _parent));
      _push(`</a>`);
      _push(ssrRenderComponent(_component_ContactMeButton, {
        "button-class": "dropdown-item",
        role: "menuitem"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("action.contactMe"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("action.contactMe")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></li><li class="nav-item dropdown" role="presentation" data-v-41cf331d><a class="nav-link dropdown-toggle" href="#" id="navbar-dropdown-locale" data-toggle="dropdown" role="menuitem" aria-haspopup="true" aria-expanded="false" data-v-41cf331d><i class="fa fa-globe" aria-hidden="true" data-v-41cf331d></i> ${ssrInterpolate(_ctx.$i18n.locale)}</a><div class="dropdown-menu" aria-labelledby="navbar-dropdown-locale" role="menu" data-v-41cf331d><!--[-->`);
      ssrRenderList(_ctx.$i18n.availableLocales, (locale) => {
        _push(`<a class="dropdown-item"${ssrRenderAttr("href", unref(buildPageUrl2)(locale === "uk-UA" ? "/" : `/${locale}`))} role="menuitem" data-v-41cf331d>${ssrInterpolate(_ctx.$t(`locale.${locale}`))} (${ssrInterpolate(locale)}) </a>`);
      });
      _push(`<!--]--></div></li></ul></div></nav>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/top-nav-bar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-41cf331d"]]);
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_UkrainianFlag = __nuxt_component_0;
  const _component_TopNavBar = __nuxt_component_1$1;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_UkrainianFlag, null, null, _parent));
  _push(ssrRenderComponent(_component_TopNavBar, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/page-header.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const isClient = false;
const isString = (val) => typeof val === "string";
const noop = () => {
};
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function identity(arg) {
  return arg;
}
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function createSharedComposable(composable) {
  let subscribers = 0;
  let state;
  let scope;
  const dispose = () => {
    subscribers -= 1;
    if (scope && subscribers <= 0) {
      scope.stop();
      state = void 0;
      scope = void 0;
    }
  };
  return (...args) => {
    subscribers += 1;
    if (!state) {
      scope = effectScope(true);
      state = scope.run(() => composable(...args));
    }
    tryOnScopeDispose(dispose);
    return state;
  };
}
function tryOnMounted(fn, sync = true) {
  if (getCurrentInstance())
    ;
  else if (sync)
    fn();
  else
    nextTick(fn);
}
function useIntervalFn(cb, interval = 1e3, options = {}) {
  const {
    immediate = true,
    immediateCallback = false
  } = options;
  let timer = null;
  const isActive = ref(false);
  function clean() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
  function pause() {
    isActive.value = false;
    clean();
  }
  function resume() {
    if (unref(interval) <= 0)
      return;
    isActive.value = true;
    if (immediateCallback)
      cb();
    clean();
    timer = setInterval(cb, resolveUnref(interval));
  }
  if (immediate && isClient)
    resume();
  if (isRef(interval)) {
    const stopWatch = watch(interval, () => {
      if (isActive.value && isClient)
        resume();
    });
    tryOnScopeDispose(stopWatch);
  }
  tryOnScopeDispose(pause);
  return {
    isActive,
    pause,
    resume
  };
}
function useTimeoutFn(cb, interval, options = {}) {
  const {
    immediate = true
  } = options;
  const isPending = ref(false);
  let timer = null;
  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function stop() {
    isPending.value = false;
    clear();
  }
  function start(...args) {
    clear();
    isPending.value = true;
    timer = setTimeout(() => {
      isPending.value = false;
      timer = null;
      cb(...args);
    }, resolveUnref(interval));
  }
  if (immediate) {
    isPending.value = true;
  }
  tryOnScopeDispose(stop);
  return {
    isPending,
    start,
    stop
  };
}
function useToggle(initialValue = false, options = {}) {
  const {
    truthyValue = true,
    falsyValue = false
  } = options;
  const valueIsRef = isRef(initialValue);
  const _value = ref(initialValue);
  function toggle(value) {
    if (arguments.length) {
      _value.value = value;
      return _value.value;
    } else {
      const truthy = resolveUnref(truthyValue);
      _value.value = _value.value === truthy ? resolveUnref(falsyValue) : truthy;
      return _value.value;
    }
  }
  if (valueIsRef)
    return toggle;
  else
    return [_value, toggle];
}
function unrefElement(elRef) {
  var _a;
  const plain = resolveUnref(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
const defaultWindow = void 0;
const defaultNavigator = void 0;
function useEventListener(...args) {
  let target;
  let event;
  let listener;
  let options;
  if (isString(args[0])) {
    [event, listener, options] = args;
    target = defaultWindow;
  } else {
    [target, event, listener, options] = args;
  }
  if (!target)
    return noop;
  let cleanup = noop;
  const stopWatch = watch(() => unrefElement(target), (el) => {
    cleanup();
    if (!el)
      return;
    el.addEventListener(event, listener, options);
    cleanup = () => {
      el.removeEventListener(event, listener, options);
      cleanup = noop;
    };
  }, { immediate: true, flush: "post" });
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
function useSupported(callback, sync = false) {
  const isSupported = ref();
  const update = () => isSupported.value = Boolean(callback());
  update();
  tryOnMounted(update, sync);
  return isSupported;
}
function useClipboard(options = {}) {
  const {
    navigator = defaultNavigator,
    read = false,
    source,
    copiedDuring = 1500,
    legacy = false
  } = options;
  const events = ["copy", "cut"];
  const isClipboardApiSupported = useSupported(() => navigator && "clipboard" in navigator);
  const isSupported = computed(() => isClipboardApiSupported.value || legacy);
  const text = ref("");
  const copied = ref(false);
  const timeout = useTimeoutFn(() => copied.value = false, copiedDuring);
  function updateText() {
    if (isClipboardApiSupported.value) {
      navigator.clipboard.readText().then((value) => {
        text.value = value;
      });
    } else {
      text.value = legacyRead();
    }
  }
  if (isSupported.value && read) {
    for (const event of events)
      useEventListener(event, updateText);
  }
  async function copy(value = resolveUnref(source)) {
    if (isSupported.value && value != null) {
      if (isClipboardApiSupported.value)
        await navigator.clipboard.writeText(value);
      else
        legacyCopy(value);
      text.value = value;
      copied.value = true;
      timeout.start();
    }
  }
  function legacyCopy(value) {
    const ta = document.createElement("textarea");
    ta.value = value != null ? value : "";
    ta.style.position = "absolute";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  function legacyRead() {
    var _a, _b, _c;
    return (_c = (_b = (_a = document == null ? void 0 : document.getSelection) == null ? void 0 : _a.call(document)) == null ? void 0 : _b.toString()) != null ? _c : "";
  }
  return {
    isSupported,
    text,
    copied,
    copy
  };
}
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey = "__vueuse_ssr_handlers__";
_global[globalKey] = _global[globalKey] || {};
_global[globalKey];
function useRafFn(fn, options = {}) {
  const {
    immediate = true,
    window: window2 = defaultWindow
  } = options;
  const isActive = ref(false);
  let rafId = null;
  function loop() {
    if (!isActive.value || !window2)
      return;
    fn();
    rafId = window2.requestAnimationFrame(loop);
  }
  function resume() {
    if (!isActive.value && window2) {
      isActive.value = true;
      loop();
    }
  }
  function pause() {
    isActive.value = false;
    if (rafId != null && window2) {
      window2.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }
  if (immediate)
    resume();
  tryOnScopeDispose(pause);
  return {
    isActive,
    pause,
    resume
  };
}
var __defProp$6 = Object.defineProperty;
var __getOwnPropSymbols$6 = Object.getOwnPropertySymbols;
var __hasOwnProp$6 = Object.prototype.hasOwnProperty;
var __propIsEnum$6 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$6 = (obj, key, value) => key in obj ? __defProp$6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$6 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$6.call(b, prop))
      __defNormalProp$6(a, prop, b[prop]);
  if (__getOwnPropSymbols$6)
    for (var prop of __getOwnPropSymbols$6(b)) {
      if (__propIsEnum$6.call(b, prop))
        __defNormalProp$6(a, prop, b[prop]);
    }
  return a;
};
function useNow(options = {}) {
  const {
    controls: exposeControls = false,
    interval = "requestAnimationFrame"
  } = options;
  const now = ref(new Date());
  const update = () => now.value = new Date();
  const controls = interval === "requestAnimationFrame" ? useRafFn(update, { immediate: true }) : useIntervalFn(update, interval, { immediate: true });
  if (exposeControls) {
    return __spreadValues$6({
      now
    }, controls);
  } else {
    return now;
  }
}
var SwipeDirection;
(function(SwipeDirection2) {
  SwipeDirection2["UP"] = "UP";
  SwipeDirection2["RIGHT"] = "RIGHT";
  SwipeDirection2["DOWN"] = "DOWN";
  SwipeDirection2["LEFT"] = "LEFT";
  SwipeDirection2["NONE"] = "NONE";
})(SwipeDirection || (SwipeDirection = {}));
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const _TransitionPresets = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
__spreadValues({
  linear: identity
}, _TransitionPresets);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "page-copyright",
  __ssrInlineRender: true,
  setup(__props) {
    const appConfig = useAppConfig();
    const currentTime = useNow();
    const currentYear = computed(() => currentTime.value.getFullYear());
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(_attrs)}> \xA9 ${ssrInterpolate(unref(appConfig).library.releaseYear)}-${ssrInterpolate(unref(currentYear))} ${ssrInterpolate(unref(appConfig).library.name)}</span>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/page-copyright.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "page-footer",
  __ssrInlineRender: true,
  setup(__props) {
    const appConfig = useAppConfig();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageCopyright = _sfc_main$1;
      const _component_ContactMeButton = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "row" }, _attrs))}><div class="col-12"><hr><nav><ul class="list-unstyled" role="menubar"><p class="d-inline mr-2 mb-0">`);
      _push(ssrRenderComponent(_component_PageCopyright, null, null, _parent));
      _push(`</p><li class="d-inline mr-2" role="presentation"><a${ssrRenderAttr("href", unref(appConfig).library.npmUrl)} target="_blank" role="menuitem">NPM</a></li><li class="d-inline mr-2" role="presentation"><a${ssrRenderAttr("href", unref(appConfig).library.gitHubUrl)} target="_blank" role="menuitem">GitHub</a></li><li class="d-inline mr-2" role="presentation">`);
      _push(ssrRenderComponent(_component_ContactMeButton, { role: "menuitem" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("action.contactMe"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("action.contactMe")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></nav></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/page-footer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const usePageMeta = () => {
  const appConfig = useAppConfig();
  const buildPageTitle = (title) => appConfig.library.name + " - " + title;
  return { buildPageTitle };
};

export { __nuxt_component_1 as _, useRouteUtils as a, useHead as b, useAppConfig as c, buildPageUrl as d, _sfc_main as e, useIntervalFn as f, useClipboard as g, useToggle as h, createSharedComposable as i, _sfc_main$4 as j, _sfc_main$1 as k, usePageMeta as u };
//# sourceMappingURL=page-meta.5c83eea4.mjs.map
