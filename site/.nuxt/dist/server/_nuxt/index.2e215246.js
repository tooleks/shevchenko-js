import { d as useIntervalFn, e as useAppConfig, f as useClipboard, c as useRouteUtils, g as createSharedComposable, h as useToggle, i as _sfc_main$f, j as _sfc_main$g, u as usePageMeta, a as useHead, k as buildPageUrl, _ as __nuxt_component_1, b as _sfc_main$h } from "./page-meta.5c83eea4.js";
import { defineComponent, ref, mergeProps, useSSRContext, unref, withCtx, createTextVNode, toDisplayString, toRefs, computed, reactive } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseEqual, ssrRenderStyle } from "vue/server-renderer";
import * as shevchenko from "shevchenko";
import { Gender, inNominative, inGenitive, inDative, inAccusative, inAblative, inLocative, inVocative } from "shevchenko";
import { _ as _export_sfc, a as __nuxt_component_0$2, f as useRoute, g as useRouter } from "../server.mjs";
import "destr";
import { useI18n } from "vue-i18n";
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "declension-preview",
  __ssrInlineRender: true,
  setup(__props) {
    const anthroponyms = [
      {
        gender: shevchenko.Gender.Male,
        lastName: "\u0428\u0435\u0432\u0447\u0435\u043D\u043A\u043E",
        firstName: "\u0422\u0430\u0440\u0430\u0441",
        middleName: "\u0413\u0440\u0438\u0433\u043E\u0440\u043E\u0432\u0438\u0447"
      },
      {
        gender: shevchenko.Gender.Male,
        lastName: "\u0424\u0440\u0430\u043D\u043A\u043E",
        firstName: "\u0406\u0432\u0430\u043D",
        middleName: "\u042F\u043A\u043E\u0432\u0438\u0447"
      },
      {
        gender: shevchenko.Gender.Male,
        lastName: "\u041D\u0435\u0447\u0443\u0439-\u041B\u0435\u0432\u0438\u0446\u044C\u043A\u0438\u0439",
        firstName: "\u0406\u0432\u0430\u043D",
        middleName: "\u0421\u0435\u043C\u0435\u043D\u043E\u0432\u0438\u0447"
      },
      {
        gender: shevchenko.Gender.Male,
        lastName: "\u0420\u0443\u0434\u0447\u0435\u043D\u043A\u043E",
        firstName: "\u041F\u0430\u043D\u0430\u0441",
        middleName: "\u042F\u043A\u043E\u0432\u0438\u0447"
      },
      {
        gender: shevchenko.Gender.Male,
        lastName: "\u0420\u0443\u0434\u0447\u0435\u043D\u043A\u043E",
        firstName: "\u0406\u0432\u0430\u043D",
        middleName: "\u042F\u043A\u043E\u0432\u0438\u0447"
      },
      {
        gender: shevchenko.Gender.Male,
        lastName: "\u041B\u043E\u0437\u043E\u0432'\u044F\u0433\u0430",
        firstName: "\u0406\u0432\u0430\u043D",
        middleName: "\u041F\u0430\u0432\u043B\u043E\u0432\u0438\u0447"
      },
      {
        gender: shevchenko.Gender.Male,
        lastName: "\u041A\u043E\u0442\u043B\u044F\u0440\u0435\u0432\u0441\u044C\u043A\u0438\u0439",
        firstName: "\u0406\u0432\u0430\u043D",
        middleName: "\u041F\u0435\u0442\u0440\u043E\u0432\u0438\u0447"
      },
      {
        gender: shevchenko.Gender.Male,
        lastName: "\u0421\u043E\u0441\u044E\u0440\u0430",
        firstName: "\u0412\u043E\u043B\u043E\u0434\u0438\u043C\u0438\u0440",
        middleName: "\u041C\u0438\u043A\u043E\u043B\u0430\u0439\u043E\u0432\u0438\u0447"
      },
      {
        gender: shevchenko.Gender.Male,
        lastName: "\u0422\u0438\u0447\u0438\u043D\u0430",
        firstName: "\u041F\u0430\u0432\u043B\u043E",
        middleName: "\u0413\u0440\u0438\u0433\u043E\u0440\u043E\u0432\u0438\u0447"
      },
      {
        gender: shevchenko.Gender.Male,
        lastName: "\u0421\u0438\u043C\u043E\u043D\u0435\u043D\u043A\u043E",
        firstName: "\u0412\u0430\u0441\u0438\u043B\u044C",
        middleName: "\u0410\u043D\u0434\u0440\u0456\u0439\u043E\u0432\u0438\u0447"
      },
      {
        gender: shevchenko.Gender.Male,
        lastName: "\u0424\u0456\u0442\u0456\u043B\u044C\u043E\u0432",
        firstName: "\u041C\u0438\u043A\u043E\u043B\u0430",
        middleName: "\u0413\u0440\u0438\u0433\u043E\u0440\u043E\u0432\u0438\u0447"
      },
      {
        gender: shevchenko.Gender.Male,
        lastName: "\u041A\u043E\u0446\u044E\u0431\u0438\u043D\u0441\u044C\u043A\u0438\u0439",
        firstName: "\u041C\u0438\u0445\u0430\u0439\u043B\u043E",
        middleName: "\u041C\u0438\u0445\u0430\u0439\u043B\u043E\u0432\u0438\u0447"
      },
      {
        gender: shevchenko.Gender.Male,
        lastName: "\u0421\u043A\u043E\u0432\u043E\u0440\u043E\u0434\u0430",
        firstName: "\u0413\u0440\u0438\u0433\u043E\u0440\u0456\u0439",
        middleName: "\u0421\u0430\u0432\u0438\u0447"
      },
      {
        gender: shevchenko.Gender.Male,
        lastName: "\u041A\u0443\u043B\u0456\u0448",
        firstName: "\u041F\u0430\u043D\u0442\u0435\u043B\u0435\u0439\u043C\u043E\u043D",
        middleName: "\u041E\u043B\u0435\u043A\u0441\u0430\u043D\u0434\u0440\u043E\u0432\u0438\u0447"
      },
      {
        gender: shevchenko.Gender.Male,
        lastName: "\u0413\u043B\u0456\u0431\u043E\u0432",
        firstName: "\u041B\u0435\u043E\u043D\u0456\u0434",
        middleName: "\u0406\u0432\u0430\u043D\u043E\u0432\u0438\u0447"
      },
      {
        gender: shevchenko.Gender.Male,
        lastName: "\u0413\u043E\u043D\u0447\u0430\u0440",
        firstName: "\u041E\u043B\u0435\u043A\u0441\u0430\u043D\u0434\u0440",
        middleName: "\u0422\u0435\u0440\u0435\u043D\u0442\u0456\u0439\u043E\u0432\u0438\u0447"
      },
      {
        gender: shevchenko.Gender.Male,
        lastName: "\u0414\u043E\u0432\u0436\u0435\u043D\u043A\u043E",
        firstName: "\u041E\u043B\u0435\u043A\u0441\u0430\u043D\u0434\u0440",
        middleName: "\u041F\u0435\u0442\u0440\u043E\u0432\u0438\u0447"
      },
      {
        gender: shevchenko.Gender.Female,
        lastName: "\u041A\u043E\u0441\u0430\u0447-\u041A\u0432\u0456\u0442\u043A\u0430",
        firstName: "\u041B\u0430\u0440\u0438\u0441\u0430",
        middleName: "\u041F\u0435\u0442\u0440\u0456\u0432\u043D\u0430"
      },
      {
        gender: shevchenko.Gender.Female,
        lastName: "\u041A\u043E\u0441\u0430\u0447",
        firstName: "\u041E\u043B\u044C\u0433\u0430",
        middleName: "\u041F\u0435\u0442\u0440\u0456\u0432\u043D\u0430"
      },
      {
        gender: shevchenko.Gender.Female,
        lastName: "\u0412\u0456\u043B\u0456\u043D\u0441\u044C\u043A\u0430",
        firstName: "\u041C\u0430\u0440\u0456\u044F",
        middleName: "\u041E\u043B\u0435\u043A\u0441\u0430\u043D\u0434\u0440\u0456\u0432\u043D\u0430"
      },
      {
        gender: shevchenko.Gender.Female,
        lastName: "\u041A\u043E\u0431\u0438\u043B\u044F\u043D\u0441\u044C\u043A\u0430",
        firstName: "\u041E\u043B\u044C\u0433\u0430",
        middleName: "\u042E\u043B\u0456\u0430\u043D\u0456\u0432\u043D\u0430"
      }
    ];
    const anthroponym = ref(shevchenko.inVocative(anthroponyms[0]));
    anthroponyms.sort(() => Math.random() > 0.5 ? 1 : -1);
    let index2 = 0;
    function previewNextAnthroponym() {
      index2 = index2 + 1;
      if (index2 > anthroponyms.length - 1) {
        index2 = 0;
      }
      anthroponym.value = shevchenko.inVocative(anthroponyms[index2]);
    }
    useIntervalFn(previewNextAnthroponym, 5e3);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        key: `${anthroponym.value.firstName}${anthroponym.value.middleName}${anthroponym.value.lastName}`
      }, _attrs))} data-v-c185803b>${ssrInterpolate(anthroponym.value.firstName)} ${ssrInterpolate(anthroponym.value.middleName)} ${ssrInterpolate(anthroponym.value.lastName)}</span>`);
    };
  }
});
const declensionPreview_vue_vue_type_style_index_0_scoped_c185803b_lang = "";
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/declension-preview.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-c185803b"]]);
const _sfc_main$d = {
  __name: "preview-banner",
  __ssrInlineRender: true,
  setup(__props) {
    const appConfig = useAppConfig();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DeclensionPreview = __nuxt_component_0$1;
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "preview",
        class: "jumbotron my-3"
      }, _attrs))}><h1 class="text-truncate">${ssrInterpolate(unref(appConfig).library.name)} <span class="d-none d-lg-inline"><small class="text-muted">`);
      _push(ssrRenderComponent(_component_DeclensionPreview, { "aria-hidden": true }, null, _parent));
      _push(`</small></span></h1><p>${ssrInterpolate(_ctx.$t("app.name"))}</p><p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "btn btn-lg btn-primary",
        to: { hash: "#demo" },
        role: "button"
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
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "btn btn-lg btn-link text-decoration-none",
        to: { hash: "#usage-example" },
        role: "button"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("usageExample"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("usageExample")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></section>`);
    };
  }
};
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/preview-banner.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "copy-button",
  __ssrInlineRender: true,
  props: {
    source: { type: String, required: true },
    trim: { type: Boolean, default: true },
    buttonId: { type: String, required: false },
    buttonClass: { type: String, default: "btn btn-btn btn-link py-0 px-1" },
    buttonTitle: { type: String, default: null },
    iconClass: { type: String, default: "fa fa-clipboard" }
  },
  setup(__props) {
    const props = __props;
    const { source, trim } = toRefs(props);
    const modifiedSource = computed(() => {
      return trim.value ? source.value.trim() : source.value;
    });
    const { copy, copied } = useClipboard({
      source: modifiedSource,
      legacy: true
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: "button",
        title: (_a = __props.buttonTitle) != null ? _a : _ctx.$t("action.copy"),
        "aria-label": _ctx.$t("action.copy"),
        id: __props.buttonId,
        class: __props.buttonClass
      }, _attrs))}>`);
      if (unref(copied)) {
        _push(`<i aria-hidden="true" class="fa fa-check"></i>`);
      } else {
        _push(`<i aria-hidden="true" class="${ssrRenderClass(__props.iconClass)}"></i>`);
      }
      _push(`</button>`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/copy-button.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "share-links",
  __ssrInlineRender: true,
  props: {
    buttonsClass: { type: String, default: null }
  },
  setup(__props) {
    const { t: $t } = useI18n();
    const { pageUrl } = useRouteUtils();
    const pageShareLink = computed(() => pageUrl.value);
    const facebookShareLink = computed(() => {
      const shareLink = new URL("https://www.facebook.com");
      shareLink.pathname = "/sharer/sharer.php";
      shareLink.searchParams.set("u", pageShareLink.value);
      return shareLink.toString();
    });
    const twitterShareLink = computed(() => {
      const shareLink = new URL("https://twitter.com");
      shareLink.pathname = "/home";
      shareLink.searchParams.set("status", pageShareLink.value);
      return shareLink.toString();
    });
    const linkedInShareLink = computed(() => {
      const shareLink = new URL("https://www.linkedin.com");
      shareLink.pathname = "/shareArticle";
      shareLink.searchParams.set("mini", true.toString());
      shareLink.searchParams.set("url", pageShareLink.value);
      shareLink.searchParams.set("title", "");
      shareLink.searchParams.set("summary", $t("app.name").toString());
      shareLink.searchParams.set("source", "");
      return shareLink.toString();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CopyButton = _sfc_main$c;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["btn-group", __props.buttonsClass],
        role: "menubar"
      }, _attrs))} data-v-9248a566>`);
      _push(ssrRenderComponent(_component_CopyButton, {
        source: unref(pageShareLink),
        "button-class": "btn btn-lg btn-link btn--share",
        "button-title": unref($t)("action.copyLink"),
        "icon-class": "fa fa-link"
      }, null, _parent));
      _push(`<a class="btn btn-lg btn-link btn--share"${ssrRenderAttr("href", unref(facebookShareLink))}${ssrRenderAttr("title", unref($t)("action.share.onFacebook"))} target="_blank" role="menuitem" data-v-9248a566><i class="fa fa-facebook fa-facebook--branded" aria-hidden="true" data-v-9248a566></i></a><a class="btn btn-lg btn-link btn--share"${ssrRenderAttr("href", unref(twitterShareLink))}${ssrRenderAttr("title", unref($t)("action.share.onTwitter"))} target="_blank" role="menuitem" data-v-9248a566><i class="fa fa-twitter fa-twitter--branded" aria-hidden="true" data-v-9248a566></i></a><a class="btn btn-lg btn-link btn--share"${ssrRenderAttr("href", unref(linkedInShareLink))}${ssrRenderAttr("title", unref($t)("action.share.onLinkedIn"))} target="_blank" role="menuitem" data-v-9248a566><i class="fa fa-linkedin fa-linkedin--branded" aria-hidden="true" data-v-9248a566></i></a></div>`);
    };
  }
});
const shareLinks_vue_vue_type_style_index_0_scoped_9248a566_lang = "";
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/share-links.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-9248a566"]]);
const maleFirstNames = [
  "\u0430\u0432\u0433\u0443\u0441\u0442\u0438\u043D",
  "\u0430\u0432\u043A\u0441\u0435\u043D\u0442\u0456\u0439",
  "\u0430\u0432\u0440\u0435\u043B\u0456\u0439",
  "\u0430\u0432\u0442\u043E\u043D\u043E\u043C",
  "\u0430\u0434\u0430\u043C",
  "\u0430\u0434\u0440\u0456\u044F\u043D",
  "\u0430\u0434\u0440\u0456\u0430\u043D",
  "\u0430\u0437\u0430\u0440",
  "\u0430\u0437\u0430\u0440\u0456\u0439",
  "\u0430\u043B\u0435\u0432\u0442\u0438\u043D",
  "\u0430\u043B\u044C\u0431\u0435\u0440\u0442",
  "\u0430\u043C\u0432\u0440\u043E\u0441\u0456\u0439",
  "\u0430\u043D\u0430\u0441\u0442\u0430\u0441",
  "\u0430\u043D\u0430\u0441\u0442\u0430\u0441\u0456\u0439",
  "\u0430\u043D\u0430\u0442\u043E\u043B\u0456\u0439",
  "\u0430\u043D\u0434\u0440\u043E\u043D",
  "\u0430\u043D\u0434\u0440\u0456\u0439",
  "\u043E\u043D\u0434\u0440\u0456\u0439",
  "\u0430\u043D\u0442\u043E\u043D",
  "\u0430\u043D\u0442\u043E\u043D\u0456\u0439",
  "\u043E\u043D\u0442\u0456\u043D",
  "\u0430\u043D\u0456\u0441\u0456\u0439",
  "\u043E\u043D\u0456\u0441\u0456\u0439",
  "\u0430\u0440\u043A\u0430\u0434\u0456\u0439",
  "\u0430\u0440\u0441\u0435\u043D",
  "\u0430\u0440\u0441\u0435\u043D\u0456\u0439",
  "\u0430\u0440\u0442\u0435\u043C",
  "\u0430\u0440\u0442\u0443\u0440",
  "\u043E\u0440\u0445\u0438\u043F",
  "\u0430\u0442\u0430\u043D\u0430\u0441",
  "\u043E\u043F\u0430\u043D\u0430\u0441",
  "\u0430\u0444\u0430\u043D\u0430\u0441\u0456\u0439",
  "\u0430\u0441\u043A\u043E\u043B\u044C\u0434",
  "\u043E\u0441\u043A\u043E\u043B\u044C\u0434",
  "\u0430\u0442\u0440\u0435\u0439",
  "\u0431\u0430\u0436\u0430\u043D",
  "\u0431\u0430\u0442\u043A\u043E",
  "\u0431\u0456\u043B\u043E\u0432\u0438\u0434",
  "\u0431\u0456\u043B\u043E\u0433\u043E\u0441\u0442",
  "\u0431\u0456\u043B\u043E\u043C\u0438\u0440",
  "\u0431\u0456\u043B\u043E\u0441\u043B\u0430\u0432",
  "\u0431\u0456\u043B\u043E\u0442\u0443\u0440",
  "\u0431\u0456\u043B\u044F\u043D",
  "\u0431\u043B\u0430\u0433\u043E\u0432\u0438\u0434",
  "\u0431\u043B\u0430\u0433\u043E\u0432\u0456\u0441\u0442",
  "\u0431\u043B\u0430\u0433\u043E\u0434\u0430\u0440",
  "\u0431\u043E\u0433\u0434\u0430\u043D",
  "\u0431\u043E\u0433\u0443\u0441\u043B\u0430\u0432",
  "\u0431\u043E\u0436\u0430\u043D",
  "\u0431\u043E\u0436\u0435\u0434\u0430\u0440",
  "\u0431\u043E\u0436\u0435\u0439\u043A\u043E",
  "\u0431\u043E\u0436\u0435\u043C\u0438\u0440",
  "\u0431\u043E\u0436\u0435\u043D",
  "\u0431\u043E\u0436\u043A\u043E",
  "\u0431\u043E\u0439\u043A\u043E",
  "\u0431\u043E\u043B\u0435\u0441\u043B\u0430\u0432",
  "\u0431\u043E\u0440\u0438\u043C\u0438\u0440",
  "\u0431\u043E\u0440\u0438\u043C\u0438\u0441\u043B",
  "\u0431\u043E\u0440\u0438\u0441",
  "\u0431\u043E\u0440\u0438\u0441\u043B\u0430\u0432",
  "\u0431\u043E\u044F\u043D",
  "\u0431\u0440\u0430\u0442\u0438\u0432\u043E\u0439",
  "\u0431\u0440\u0430\u0442\u0438\u043C\u0438\u0440",
  "\u0431\u0440\u0430\u0442\u0438\u0441\u043B\u0430\u0432",
  "\u0431\u0440\u0430\u0442\u043A\u043E",
  "\u0431\u0440\u0430\u0442\u043E\u043C\u0438\u043B",
  "\u0431\u0440\u0430\u0442\u043E\u0441\u043B\u0430\u0432",
  "\u0431\u0440\u044F\u0447\u0438\u0441\u043B\u0430\u0432",
  "\u0431\u043E\u0440\u043E\u043D\u0438\u0441\u043B\u0430\u0432",
  "\u0431\u0443\u0434\u0438\u0432\u0438\u0434",
  "\u0431\u0443\u0434\u0438\u0432\u043E\u0439",
  "\u0431\u0443\u0434\u0438\u043C\u0438\u043B",
  "\u0431\u0443\u0434\u0438\u043C\u0438\u0440",
  "\u0431\u0443\u0434\u0438\u0441\u043B\u0430\u0432",
  "\u0431\u0443\u0439\u043C\u0438\u0440",
  "\u0431\u0443\u0439\u0442\u0443\u0440",
  "\u0431\u0443\u0440\u0435\u0432\u0456\u0439",
  "\u0431\u0443\u0440\u0435\u0432\u0456\u0441\u0442",
  "\u0432\u0430\u043B\u0435\u043D\u0442\u0438\u043D",
  "\u0432\u0430\u043B\u0435\u0440\u0456\u0439",
  "\u0432\u0430\u0440\u0444\u043E\u043B\u043E\u043C\u0456\u0439",
  "\u0432\u0430\u0441\u0438\u043B\u044C",
  "\u0432\u0430\u0434\u0438\u043C",
  "\u0432\u0435\u0434\u0430\u043D",
  "\u0432\u0435\u043B\u0435\u043C\u0438\u0440",
  "\u0432\u0435\u043B\u0435\u043C\u0443\u0434\u0440",
  "\u0432\u0435\u043B\u0435\u0442",
  "\u0432\u0435\u043B\u0438\u0447\u0430\u0440",
  "\u0432\u0435\u043B\u0438\u0447\u043A\u043E",
  "\u0432\u0435\u0440\u0431\u0430\u043D",
  "\u0432\u0435\u0440\u0435\u043C\u0456\u0439",
  "\u0432\u0435\u0440\u043D\u0438\u0434\u0443\u0431",
  "\u0432\u0435\u0440\u043D\u0438\u0441\u043B\u0430\u0432",
  "\u0432\u0435\u0441\u0435\u043B\u0430\u043D",
  "\u0432\u0438\u0442\u043E\u043C\u0438\u0440",
  "\u0432\u0438\u0448\u0430\u0442\u0430",
  "\u0432\u0438\u0448\u0435\u0437\u043E\u0440",
  "\u0432\u0438\u0448\u0435\u0441\u043B\u0430\u0432",
  "\u0432\u0456\u043A\u0442\u043E\u0440",
  "\u0432\u0456\u0440",
  "\u0432\u0456\u0440\u043E\u0434\u0430\u043D",
  "\u0432\u0456\u0440\u043E\u0434\u0430\u0440",
  "\u0432\u0456\u0440\u043E\u0441\u043B\u0430\u0432",
  "\u0432\u0456\u0441\u0442",
  "\u0432\u0456\u0441\u0442\u0430\u043D",
  "\u0432\u0456\u0442\u0430\u043B\u0456\u0439",
  "\u0432\u0456\u0442\u0430\u043D",
  "\u0432\u0456\u0442\u043E\u043C\u0438\u0440",
  "\u0432\u0456\u0442\u0440\u044F\u043D",
  "\u0432\u043B\u0430\u0434",
  "\u0432\u043B\u0430\u0434\u0438\u0441\u043B\u0430\u0432",
  "\u0432\u043B\u0430\u0441\u0442",
  "\u0432\u043E\u0433\u043D\u0435\u0434\u0430\u0440",
  "\u0432\u043E\u0433\u043D\u044F\u043D",
  "\u0432\u043E\u0434\u043E\u0433\u0440\u0430\u0439",
  "\u0432\u043E\u0434\u043E\u0442\u0440\u0430\u0432",
  "\u0432\u043E\u0457\u0441\u043B\u0430\u0432",
  "\u0432\u043E\u043B\u0435\u043B\u044E\u0431",
  "\u0432\u043E\u043B\u043E\u0434\u0430\u0440",
  "\u0432\u043E\u043B\u043E\u0434\u0438\u043C\u0438\u0440",
  "\u0432\u043E\u043B\u043E\u0434\u0438\u0441\u043B\u0430\u0432",
  "\u0432\u043E\u043B\u044F",
  "\u0432\u043E\u0440\u043E\u0442\u0438\u0441\u043B\u0430\u0432",
  "\u0432\u0440\u0430\u0442\u0438\u0441\u043B\u0430\u0432",
  "\u0432\u0440\u0430\u0442\u0430\u043D",
  "\u0432\u0441\u0435\u0432\u043B\u0430\u0434",
  "\u0432\u0441\u0435\u0432\u043E\u043B\u043E\u0434",
  "\u0432\u0441\u0435\u043B\u044E\u0431",
  "\u0432\u0441\u0435\u043B\u044E\u0434",
  "\u0432\u0441\u0435\u0441\u043B\u0430\u0432",
  "\u0432\u0443\u043A\u043E\u043B",
  "\u0432\u0430\u043A\u0443\u043B\u0430",
  "\u0432'\u044F\u0447\u0435\u0441\u043B\u0430\u0432",
  "\u0433\u0430\u0432\u0440\u0438\u043B\u043E",
  "\u0433\u0430\u0440\u043D\u043E\u0441\u043B\u0430\u0432",
  "\u0433\u0430\u0442\u0443\u0441\u0438\u043B",
  "\u0433\u0430\u0442\u0443\u0441\u043B\u0430\u0432",
  "\u0433\u0435\u043D\u043D\u0430\u0434\u0456\u0439",
  "\u0433\u0435\u043E\u0440\u0433\u0456\u0439",
  "\u0433\u0435\u0440\u0430\u0441\u0438\u043C",
  "\u0433\u0435\u0440\u0432\u0430\u0441\u0456\u0439",
  "\u0433\u043B\u0430\u0434\u043A\u043E",
  "\u0433\u043B\u0456\u0431",
  "\u0433\u043D\u0430\u0442",
  "\u0433\u043E\u0434\u043E\u043C\u0438\u0440",
  "\u0433\u043E\u043B\u0443\u0431\u043A\u043E",
  "\u0433\u043E\u0440\u0443\u043D",
  "\u0433\u043E\u0440\u0434\u0456\u0439",
  "\u0433\u043E\u0440\u0434\u0438\u0441\u043B\u0430\u0432",
  "\u0433\u043E\u0440\u0434\u043E\u0433\u043E\u0441\u0442",
  "\u0433\u043E\u0440\u0434\u043E\u0434\u0443\u043C",
  "\u0433\u043E\u0440\u0434\u043E\u043C\u0438\u0441\u043B",
  "\u0433\u043E\u0440\u0434\u043E\u0441\u043B\u0430\u0432",
  "\u0433\u043E\u0440\u0434\u044F\u0442\u0430",
  "\u0433\u043E\u0440\u0438\u0433\u043B\u044F\u0434",
  "\u0433\u043E\u0440\u0438\u043C\u0438\u0440",
  "\u0433\u043E\u0440\u0438\u043C\u0438\u0441\u043B",
  "\u0433\u043E\u0440\u0438\u0441\u0432\u0456\u0442",
  "\u0433\u043E\u0440\u0438\u0441\u043B\u0430\u0432",
  "\u0433\u043E\u0440\u0438\u0446\u0432\u0456\u0442",
  "\u0433\u043E\u0441\u0442\u043E\u043C\u0438\u0441\u043B",
  "\u0433\u043E\u0441\u0442\u0440\u043E\u0437\u0456\u0440",
  "\u0433\u043E\u0441\u0442\u044F\u0442\u0430",
  "\u0433\u0440\u0430\u0434\u0438\u043C\u0438\u0440",
  "\u0433\u0440\u0430\u0434\u0438\u0441\u043B\u0430\u0432",
  "\u0433\u0440\u0430\u043D\u0438\u0441\u043B\u0430\u0432",
  "\u0433\u0440\u0438\u0432\u0430",
  "\u0433\u0440\u0438\u0433\u043E\u0440\u0456\u0439",
  "\u0433\u0440\u0435\u043C\u0438\u0441\u043B\u0430\u0432",
  "\u0433\u0440\u043E\u0437\u0430\u043D",
  "\u0433\u0440\u043E\u043C\u043E\u0432\u0438\u043A",
  "\u0433\u0443\u043B\u044F\u0439\u0432\u0456\u0442\u0435\u0440",
  "\u0433\u0443\u0441\u0442\u043E\u043C\u0438\u0441\u043B",
  "\u0434\u0430\u0432\u0438\u0434",
  "\u0434\u0430\u043B\u0435\u043C\u0438\u043B",
  "\u0434\u0430\u043B\u0435\u043C\u0438\u0440",
  "\u0434\u0430\u043B\u0456\u0431\u043E\u0440",
  "\u0434\u0430\u043D",
  "\u0434\u0430\u043D\u0438\u043B\u043E",
  "\u0434\u0430\u043D\u043A\u043E",
  "\u0434\u0430\u043D\u0442\u0443\u0440",
  "\u0434\u0430\u0440",
  "\u0434\u0430\u0440\u0456\u0439",
  "\u0434\u0430\u0440\u0438\u0431\u043E\u0433",
  "\u0434\u0430\u0440\u043E\u043C\u0438\u0440",
  "\u0434\u0435\u043D\u0438\u0441",
  "\u0434\u0435\u043C\u0438\u0434",
  "\u0434\u0435\u043C'\u044F\u043D",
  "\u0434\u0435\u0440\u0436\u0438\u043A\u0440\u0430\u0439",
  "\u0434\u0435\u0440\u0436\u0438\u0441\u043B\u0430\u0432",
  "\u0434\u0438\u0431\u0430\u0447",
  "\u0434\u0438\u0432\u043E\u0437\u0456\u0440",
  "\u0434\u0456\u0439",
  "\u0434\u043C\u0438\u0442\u0440\u043E",
  "\u0434\u043E\u0431\u0440\u0438\u0431\u0456\u0439",
  "\u0434\u043E\u0431\u0440\u0438\u0432\u043E\u0434",
  "\u0434\u043E\u0431\u0440\u0438\u043A",
  "\u0434\u043E\u0431\u0440\u0438\u043B\u043E",
  "\u0434\u043E\u0431\u0440\u0438\u043D\u044F",
  "\u0434\u043E\u0431\u0440\u0438\u0441\u0432\u0456\u0442",
  "\u0434\u043E\u0431\u0440\u043E\u0432\u0456\u0441\u0442",
  "\u0434\u043E\u0431\u0440\u043E\u0433\u043E\u0441\u0442",
  "\u0434\u043E\u0431\u0440\u043E\u0434\u0443\u043C",
  "\u0434\u043E\u0431\u0440\u043E\u043B\u0438\u043A",
  "\u0434\u043E\u0431\u0440\u043E\u043B\u044E\u0431",
  "\u0434\u043E\u0431\u0440\u043E\u043C\u0438\u0440",
  "\u0434\u043E\u0431\u0440\u043E\u043C\u0438\u0441\u043B",
  "\u0434\u043E\u0431\u0440\u043E\u0441\u043B\u0430\u0432",
  "\u0434\u043E\u043C\u043E\u0440\u0430\u0434",
  "\u0434\u043E\u043C\u043E\u0441\u043B\u0430\u0432",
  "\u0434\u043E\u0440\u043E\u0433\u043E\u0431\u0443\u0433",
  "\u0434\u043E\u0440\u043E\u0433\u043E\u043C\u0438\u0440",
  "\u0434\u043E\u0440\u043E\u0433\u043E\u043C\u0438\u0441\u043B",
  "\u0434\u043E\u0440\u043E\u0433\u043E\u0441\u0438\u043B",
  "\u0434\u043E\u0440\u043E\u0433\u043E\u0447\u0438\u043D",
  "\u0434\u043E\u0440\u043E\u0444\u0456\u0439",
  "\u0434\u043E\u043C\u0456\u043D\u0456\u043A",
  "\u0434\u0440\u0430\u0433\u0430\u043D",
  "\u0434\u0440\u0430\u0433\u043E\u043C\u0438\u0440",
  "\u0454\u0432\u0433\u0435\u043D",
  "\u0454\u0432\u0433\u0435\u043D\u0456\u0439",
  "\u0454\u0432\u043B\u0430\u043C\u043F\u0456\u0439",
  "\u0454\u0440\u0435\u043C\u0456\u0439",
  "\u0454\u0432\u0441\u0442\u0430\u0444\u0456\u0439",
  "\u0454\u0433\u043E\u0440",
  "\u0436\u0430\u0434\u0430\u043D",
  "\u0436\u0434\u0430\u043D",
  "\u0436\u0438\u0432\u043E\u0440\u0456\u0434",
  "\u0436\u0438\u0432\u043E\u0441\u0438\u043B",
  "\u0436\u0438\u0432\u043E\u0441\u043B\u0430\u0432",
  "\u0436\u0438\u0442\u043E\u043C\u0438\u0440",
  "\u0436\u0438\u0442\u0442\u0454\u043B\u044E\u0431",
  "\u0436\u0438\u0442\u043E",
  "\u0437\u0430\u0445\u0430\u0440",
  "\u0437\u0430\u0445\u0430\u0440\u0456\u0439",
  "\u0437\u0431\u043E\u0457\u0441\u043B\u0430\u0432",
  "\u0437\u0431\u043E\u0440\u0438\u0441\u043B\u0430\u0432",
  "\u0437\u0432\u0435\u043D\u0438\u0433\u043E\u0440",
  "\u0437\u0432\u0435\u043D\u0438\u043C\u0438\u0440",
  "\u0437\u0432\u0435\u043D\u0438\u0441\u043B\u0430\u0432",
  "\u0437\u0434\u043E\u0440\u043E\u0432\u0435\u0433\u0430",
  "\u0437\u0435\u043C\u0438\u0441\u043B\u0430\u0432",
  "\u0437\u0456\u043D\u043E\u0432\u0456\u0439",
  "\u0437\u0438\u043D\u043E\u0432\u0456\u0439",
  "\u0437\u043B\u0430\u0442",
  "\u0437\u043B\u0430\u0442\u043E\u043C\u0438\u0440",
  "\u0437\u043B\u0430\u0442\u043E\u0443\u0441",
  "\u0437\u043B\u0430\u0442\u043E\u0434\u0430\u043D",
  "\u0437\u043B\u043E\u0442\u0430\u043D",
  "\u0437\u043B\u043E\u0442\u043E\u0434\u0430\u043D",
  "\u0437\u043E\u0440\u0435\u0433\u043B\u044F\u0434",
  "\u0437\u043E\u0440\u0435\u043C\u0438\u0440",
  "\u0437\u043E\u0440\u0435\u043F\u0430\u0434",
  "\u0437\u043E\u0440\u0435\u0441\u043B\u0430\u0432",
  "\u0437\u043E\u0440\u044F\u043D",
  "\u0456\u0432\u0430\u043D",
  "\u0456\u0432\u0430\u043D\u0442\u043E\u0441\u043B\u0430\u0432",
  "\u0456\u0433\u043E\u0440",
  "\u0456\u0437\u044F\u0441\u043B\u0430\u0432",
  "\u0456\u043B\u0430\u0440\u0456\u043E\u043D",
  "\u0456\u043B\u043B\u044F",
  "\u0456\u043E\u0430\u043D\u043D",
  "\u043A\u0430\u043B\u0435\u043D\u0438\u043A",
  "\u043A\u0432\u0456\u0442\u0430\u043D",
  "\u043A\u0438\u0454\u0441\u043B\u0430\u0432",
  "\u043A\u0438\u0439",
  "\u043A\u0438\u0440\u0438\u043B\u043E",
  "\u043A\u0438\u044F\u043D",
  "\u043A\u0456\u043D\u0434\u0440\u0430\u0442",
  "\u043A\u043D\u044F\u0436\u043E\u0441\u043B\u0430\u0432",
  "\u043A\u043E\u043D\u043E\u043D",
  "\u043A\u043E\u0440\u043D\u0456\u0439",
  "\u043A\u043E\u0440\u043D\u0438\u043B\u043E",
  "\u043A\u043E\u0440\u043D\u0438\u043B\u0456\u0439",
  "\u043A\u043E\u0440\u043D\u0435\u043B\u0456\u0439",
  "\u043A\u043E\u043B\u043E\u0434\u0430\u0440",
  "\u043A\u043E\u043B\u043E\u0434\u0456\u0439",
  "\u043A\u0440\u0430\u0441\u0443\u043D",
  "\u043A\u0440\u0438\u043B\u0430\u0447",
  "\u043A\u0443\u0439\u0431\u0456\u0434\u0430",
  "\u043A\u0443\u0440\u0438\u043B\u043E",
  "\u043A\u043E\u0441\u0442\u044F\u043D\u0442\u0438\u043D",
  "\u043A\u0443\u0437\u044C\u043C\u0430",
  "\u043B\u0430\u0432\u0440\u0456\u043D",
  "\u043B\u0430\u0432\u0440\u0435\u043D\u0442\u0456\u0439",
  "\u043B\u0430\u0434",
  "\u043B\u0430\u0434\u043E",
  "\u043B\u0430\u0434\u0438\u043C\u0438\u0440",
  "\u043B\u0430\u0434\u0438\u0441\u043B\u0430\u0432",
  "\u043B\u0430\u0434\u043E\u043B\u044E\u0431",
  "\u043B\u0430\u0434\u043E\u043C\u0438\u0440",
  "\u043B\u0435\u0432",
  "\u043B\u0435\u0432\u043A\u043E",
  "\u043B\u0435\u043E\u043D\u0456\u0434",
  "\u043B\u0438\u0441\u0442\u0432\u0438\u0447",
  "\u043B\u0456\u043F\u043E\u0441\u043B\u0430\u0432",
  "\u043B\u043E\u043B\u0456\u0442",
  "\u043B\u0443\u043A'\u044F\u043D",
  "\u043B\u044E\u0431\u0438\u043C",
  "\u043B\u044E\u0431\u043E\u0432\u0438\u0440",
  "\u043B\u044E\u0431\u043E\u0434\u0430\u0440",
  "\u043B\u044E\u0431\u043E\u0437\u0430\u0440",
  "\u043B\u044E\u0431\u043E\u043C\u0438\u043B",
  "\u043B\u044E\u0431\u043E\u043C\u0438\u0440",
  "\u043B\u044E\u0431\u043E\u043C\u0438\u0441\u043B",
  "\u043B\u044E\u0431\u043E\u043C\u0443\u0434\u0440",
  "\u043B\u044E\u0431\u043E\u0441\u043B\u0430\u0432",
  "\u043B\u044E\u0434\u043E\u043C\u0438\u043B",
  "\u043B\u044E\u0434\u0438\u0441\u043B\u0430\u0432",
  "\u043B\u044E\u0442\u043E\u0431\u043E\u0440",
  "\u043B\u044E\u0442\u043E\u043C\u0438\u0441\u043B",
  "\u043B\u0443\u043A\u0430",
  "\u043C\u0430\u0432\u0440\u0438\u043A\u0456\u0439",
  "\u043C\u0430\u0433\u0430\u0434\u0430\u0440",
  "\u043C\u0430\u0433\u0430\u043C\u0438\u0440",
  "\u043C\u0430\u0433\u0430\u0441\u043B\u0430\u0432",
  "\u043C\u0430\u0440\u043A\u0456\u044F\u043D",
  "\u043C\u0430\u0439",
  "\u043C\u0430\u043A\u0430\u0440",
  "\u043C\u0430\u043A\u0441\u0438\u043C",
  "\u043C\u0430\u043B\u0438\u043A",
  "\u043C\u0430\u043B\u043E\u043C\u0438\u0440",
  "\u043C\u0430\u0440\u043A\u043E",
  "\u043C\u0430\u0440\u0442\u0438\u043D",
  "\u043C\u0430\u0440'\u044F\u043D",
  "\u043C\u0430\u0442\u0432\u0456\u0439",
  "\u043C\u0435\u0434\u043E\u043C\u0438\u0440",
  "\u043C\u0435\u0436\u0430\u043C\u0438\u0440",
  "\u043C\u0435\u0447\u0438\u0441\u043B\u0430\u0432",
  "\u043C\u0438\u0437\u0430\u043C\u0438\u0440",
  "\u043C\u0438\u043A\u0438\u0442\u0430",
  "\u043C\u0438\u043A\u043E\u043B\u0430",
  "\u043C\u0438\u043B\u0430\u043D",
  "\u043C\u0438\u043B\u043E\u0432\u0430\u043D",
  "\u043C\u0438\u043B\u043E\u0434\u0430\u0440",
  "\u043C\u0438\u043B\u043E\u0434\u0443\u0445",
  "\u043C\u0438\u043B\u043E\u0441\u043B\u0430\u0432",
  "\u043C\u0438\u0440",
  "\u043C\u0438\u0440\u043E\u0431\u043E\u0433",
  "\u043C\u0438\u0440\u043E\u0433\u043E\u0441\u0442",
  "\u043C\u0438\u0440\u043E\u043B\u044E\u0431",
  "\u043C\u0438\u0440\u043E\u043D",
  "\u043C\u0438\u0440\u043E\u0441\u043B\u0430\u0432",
  "\u043C\u0438\u0445\u0430\u0439\u043B\u043E",
  "\u043C\u043E\u0432\u0447\u0430\u043D",
  "\u043C\u043E\u043B\u0438\u0431\u043E\u0433",
  "\u043C\u0441\u0442\u0438\u0431\u043E\u0433",
  "\u043C\u0441\u0442\u0438\u0432\u043E\u0439",
  "\u043C\u0441\u0442\u0438\u0441\u043B\u0430\u0432",
  "\u043C\u0443\u0434\u0440\u043E\u043B\u044E\u0431",
  "\u043C\u0443\u0441\u0456\u0439",
  "\u043C\u0443\u0445\u043E\u0432\u0456\u0441\u0442",
  "\u043D\u0430\u0433\u043D\u0438\u0431\u0456\u0434\u0430",
  "\u043D\u0430\u0434\u0456\u0439",
  "\u043D\u0430\u0439\u0434\u0435\u043D",
  "\u043D\u0430\u0441\u043B\u0430\u0432",
  "\u043D\u0435\u0434\u0430\u043D",
  "\u043D\u0435\u043C\u0438\u0440",
  "\u043D\u0435\u0441\u0442\u043E\u0440",
  "\u043D\u0435\u043F\u043E\u0431\u043E\u0440",
  "\u043D\u0456\u0433\u043E\u0441\u043B\u0430\u0432",
  "\u043D\u0430\u0437\u0430\u0440\u0456\u0439",
  "\u043D\u0438\u043A\u0438\u0444\u043E\u0440",
  "\u043D\u0438\u0447\u0438\u043F\u0456\u0440",
  "\u043D\u0438\u043A\u043E\u0434\u0438\u043C",
  "\u043E\u0441\u0442\u0440\u043E\u043C\u0438\u0441\u043B",
  "\u043E\u0434\u0438\u043D\u0435\u0446\u044C",
  "\u043E\u043B\u0435\u0433",
  "\u043E\u043B\u0435\u043A\u0441\u0430\u043D\u0434\u0440",
  "\u043E\u043B\u0435\u043A\u0441\u0456\u0439",
  "\u043E\u043B\u0435\u0441\u044C",
  "\u043E\u043B\u0435\u043B\u044C\u043A\u043E",
  "\u043E\u043C\u0435\u043B\u044F\u043D",
  "\u043E\u043D\u0443\u0444\u0440\u0456\u0439",
  "\u043E\u0440\u0435\u0441\u0442",
  "\u043E\u0441\u0435\u043C\u0440\u0438\u0442",
  "\u043E\u0440\u0435\u043C\u0456\u0432",
  "\u043E\u0440\u0438\u043C\u0438\u0440",
  "\u043E\u0441\u043C\u043E\u043C\u0438\u0441\u043B",
  "\u043E\u0441\u0442\u0430\u043F",
  "\u043E\u0441\u0442\u0440\u043E\u0437\u043E\u0440",
  "\u043E\u0441\u0442\u0440\u043E\u043C\u0438\u0440",
  "\u043E\u0441\u0442\u0440\u043E\u043C\u043E\u0432",
  "\u043E\u0445\u0440\u0456\u043C",
  "\u043E\u043B\u0435\u043A\u0441\u0430",
  "\u043F\u0430\u0432\u043B\u043E",
  "\u043F\u0430\u043D\u0442\u0435\u043B\u0435\u0439\u043C\u043E\u043D",
  "\u043F\u0430\u043D\u0430\u0441",
  "\u043F\u0435\u0440\u0432\u0443\u0448\u043A\u043E",
  "\u043F\u0435\u0440\u0435\u043B\u044E\u0431",
  "\u043F\u0435\u0440\u0435\u043C\u0438\u043B",
  "\u043F\u0435\u0440\u0435\u043C\u0438\u0441\u043B",
  "\u043F\u0435\u0440\u0435\u0441\u0432\u0456\u0442",
  "\u043F\u0435\u0440\u0435\u044F\u0441\u043B\u0430\u0432",
  "\u043F\u0435\u0440\u0448\u0438\u043A",
  "\u043F\u0435\u0442\u0440\u043E",
  "\u043F\u0438\u043B\u0438\u043F",
  "\u043F\u0438\u043C\u0435\u043D",
  "\u043F\u0438\u043C\u0456\u043D",
  "\u043F\u0438\u043C\u043E\u043D",
  "\u043F\u043E\u0434\u043E\u043B\u044F\u043D",
  "\u043F\u043E\u0437\u0432\u0456\u0437\u0434",
  "\u043F\u043E\u043B\u0435\u043B\u044C",
  "\u043F\u043E\u043B\u044F\u043D",
  "\u043F\u043E\u0440\u0444\u0438\u0440",
  "\u043F\u043E\u0442\u0430\u043F",
  "\u043F\u0440\u0435\u0431\u0438\u0441\u043B\u0430\u0432",
  "\u043F\u0440\u0435\u0434\u0438\u0441\u043B\u0430\u0432",
  "\u043F\u043E\u0440",
  "\u043F\u0430\u043B\u0430\u0446",
  "\u043F'\u0454\u0440",
  "\u0440\u0430\u0432\u0430",
  "\u0440\u0430\u0434",
  "\u0440\u0430\u0434\u0430\u043D",
  "\u0440\u0430\u0434\u0435\u0447\u043A\u043E",
  "\u0440\u0430\u0434\u0438\u0432\u043E\u0439",
  "\u0440\u0430\u0434\u0438\u043B\u043E",
  "\u0440\u0430\u0434\u0438\u043C",
  "\u0440\u0430\u0434\u0438\u043C\u0438\u0440",
  "\u0440\u0430\u0434\u043E\u0441\u043B\u0430\u0432",
  "\u0440\u0430\u0434\u043A\u043E",
  "\u0440\u0430\u0434\u043E\u0432\u0430\u043D",
  "\u0440\u0430\u0434\u043E\u0433\u043E\u0441\u0442",
  "\u0440\u0430\u0434\u043E\u043C\u0438\u0440",
  "\u0440\u0430\u0434\u043E\u043C\u0438\u0441\u043B",
  "\u0440\u0430\u0434\u043E\u0441\u043B\u0430\u0432",
  "\u0440\u0430\u0442\u0438\u0431\u043E\u0440",
  "\u0440\u0430\u0442\u0438\u043C\u0438\u0440",
  "\u0440\u0430\u0442\u0438\u0441\u043B\u0430\u0432",
  "\u0440\u0430\u0444\u0430\u0457\u043B",
  "\u0440\u0435\u0432\u0443\u043D",
  "\u0440\u0456\u0434",
  "\u0440\u043E\u0433\u0432\u043E\u043B\u043E\u0434",
  "\u0440\u043E\u0434\u0430\u043D",
  "\u0440\u043E\u0434\u0456\u043E\u043D",
  "\u0440\u043E\u0434\u043E\u0441\u043B\u0430\u0432",
  "\u0440\u043E\u0436\u0434\u0435\u043D",
  "\u0440\u043E\u043A\u0441\u043E\u043B\u0430\u043D",
  "\u0440\u043E\u043C\u0430\u043D",
  "\u0440\u043E\u0441\u0442\u0438\u0441\u043B\u0430\u0432",
  "\u0440\u043E\u0441\u0442\u0438\u0447\u0430\u0440",
  "\u0440\u043E\u0441\u0442\u0443\u043D",
  "\u0440\u0443\u0434\u0430\u043D",
  "\u0440\u0443\u0441",
  "\u0440\u0443\u0441\u0430\u043D",
  "\u0440\u0443\u0441\u043B\u0430\u043D",
  "\u0440\u0443\u0441\u0443\u0434\u0430\u043D",
  "\u0441\u0430\u0440\u043C\u0430\u0442",
  "\u0441\u0432\u0430\u0440\u0433",
  "\u0441\u0432\u0438\u0440\u0438\u0434",
  "\u0441\u0432\u0456\u0442",
  "\u0441\u0432\u0456\u0442\u0430\u043D",
  "\u0441\u0432\u0456\u0442\u043B\u0430\u043D",
  "\u0441\u0432\u0456\u0442\u043B\u043E\u0433\u043E\u0440",
  "\u0441\u0432\u0456\u0442\u043E\u0433\u043E\u0440",
  "\u0441\u0432\u0456\u0442\u043E\u0432\u0438\u0434",
  "\u0441\u0432\u0456\u0442\u043E\u0434\u0430\u0440",
  "\u0441\u0432\u0456\u0442\u043E\u0437\u0430\u0440",
  "\u0441\u0432\u0456\u0442\u043E\u043A\u043E\u043B",
  "\u0441\u0432\u0456\u0442\u043E\u043B\u0438\u043A",
  "\u0441\u0432\u0456\u0442\u043E\u043B\u044E\u0431",
  "\u0441\u0432\u0456\u0442\u043E\u043C\u0438\u0440",
  "\u0441\u0432\u0456\u0442\u043E\u0441\u043B\u0430\u0432",
  "\u0441\u0432\u0456\u0442\u043E\u044F\u0440",
  "\u0441\u0432\u043E\u0431\u043E\u0434\u0430\u043D",
  "\u0441\u0432\u044F\u0442\u043E\u0432\u0438\u0434",
  "\u0441\u0432\u044F\u0442\u043E\u0433\u043E\u0440",
  "\u0441\u0432\u044F\u0442\u043E\u043B\u044E\u0431",
  "\u0441\u0432\u044F\u0442\u043E\u043F\u043E\u043B\u043A",
  "\u0441\u0432\u044F\u0442\u043E\u0441\u043B\u0430\u0432",
  "\u0441\u0432\u044F\u0442\u043E\u044F\u0440",
  "\u0441\u0435\u0432\u0435\u0440\u0438\u043D",
  "\u0441\u0435\u043C\u0435\u043D",
  "\u0441\u0435\u043C\u0438\u0431\u043E\u0440",
  "\u0441\u0435\u043C\u0438\u0440\u0430\u0434",
  "\u0441\u0435\u0440\u0430\u0444\u0438\u043C",
  "\u0441\u0435\u0440\u0433\u0456\u0439",
  "\u0441\u0435\u0440\u0434\u0438\u0442\u043A\u043E",
  "\u0441\u0438\u043B\u0430",
  "\u0441\u0438\u043B\u0430\u043D",
  "\u0441\u0438\u043B\u043E\u043B\u044E\u0431",
  "\u0441\u0438\u043B\u043E\u0441\u043B\u0430\u0432",
  "\u0441\u0438\u043D\u044C\u043E\u043E\u043A",
  "\u0441\u043A\u043E\u043B",
  "\u0441\u043B\u0430\u0432\u0430",
  "\u0441\u043B\u0430\u0432\u043E\u0431\u043E\u0440",
  "\u0441\u043B\u0430\u0432\u043E\u043B\u044E\u0431",
  "\u0441\u043B\u0430\u0432\u043E\u043C\u0438\u0440",
  "\u0441\u043B\u0430\u0432\u0443\u0442\u0430",
  "\u0441\u043D\u0430\u0433\u0430",
  "\u0441\u043D\u0456\u0436\u0430\u043D",
  "\u0441\u043D\u043E\u0432\u0438\u0434",
  "\u0441\u043D\u043E\u0437\u0456\u0440",
  "\u0441\u043E\u0431\u0456\u0431\u043E\u0440",
  "\u0441\u043E\u0431\u0456\u043C\u0438\u0440",
  "\u0441\u043E\u0431\u0456\u0441\u043B\u0430\u0432",
  "\u0441\u043E\u043A\u0456\u043B",
  "\u0441\u043E\u043B\u043E\u0432\u0435\u0439",
  "\u0441\u043E\u043B\u043E\u0433\u0443\u0431",
  "\u0441\u043E\u043B\u043E\u043F\u0456\u0439",
  "\u0441\u043E\u043D\u0446\u0435\u0432\u0438\u0434",
  "\u0441\u043E\u043D\u0446\u0435\u0434\u0430\u0440",
  "\u0441\u043E\u043D\u0446\u0435\u043B\u0438\u043A",
  "\u0441\u043F\u0430\u0441",
  "\u0441\u0442\u0430\u043D\u0438\u043C\u0438\u0440",
  "\u0441\u0442\u0430\u043D\u0438\u0441\u043B\u0430\u0432",
  "\u0441\u0442\u0430\u0440\u043E\u0434\u0443\u043C",
  "\u0441\u0442\u0435\u043F\u0430\u043D",
  "\u0441\u0442\u0435\u0444\u0430\u043D\u0456\u0439",
  "\u0441\u0442\u043E\u0436\u0430\u0440",
  "\u0441\u0442\u043E\u0439\u043C\u0438\u0440",
  "\u0441\u0442\u043E\u044F\u043D",
  "\u0441\u0443\u0434\u0438\u0432\u043E\u0439",
  "\u0441\u0443\u0434\u0438\u043C\u0438\u0440",
  "\u0441\u0443\u0434\u0438\u0441\u043B\u0430\u0432",
  "\u0441\u0443\u0440\u043C\u0430",
  "\u0442\u0430\u0440\u0430\u0441",
  "\u0442\u0430\u0442\u043E\u043C\u0438\u0440",
  "\u0442\u0430\u0440\u043E\u0441\u043B\u0430\u0432",
  "\u0442\u0430\u0440\u043E\u0441\u0438\u043A",
  "\u0442\u0432\u0435\u0440\u0434\u0438\u0433\u043E\u0441\u0442",
  "\u0442\u0432\u0435\u0440\u0434\u0438\u0441\u043B\u0430\u0432",
  "\u0442\u0432\u043E\u0440\u0438\u043B\u0430\u0434",
  "\u0442\u0432\u043E\u0440\u0438\u043C\u0438\u0440",
  "\u0442\u0432\u043E\u0440\u0438\u0441\u043B\u0430\u0432",
  "\u0442\u0435\u043E\u0434\u043E\u0437\u0456\u0439",
  "\u0442\u0435\u0440\u0435\u043D\u0442\u0456\u0439",
  "\u0442\u0456\u043C\u043E\u0445",
  "\u0442\u0438\u043C\u043E\u0444\u0456\u0439",
  "\u0442\u0438\u043C\u0456\u0448",
  "\u0442\u0438\u043C\u0443\u0440",
  "\u0442\u0438\u0445\u043E\u043C\u0438\u0440",
  "\u0442\u0438\u0445\u043E\u043D",
  "\u0442\u043E\u0434\u043E\u0441\u044C",
  "\u0442\u043E\u043B\u0438\u0433\u043D\u0456\u0432",
  "\u0442\u043E\u043B\u0438\u0441\u043B\u0430\u0432",
  "\u0442\u0440\u0438\u0433\u043E\u0441\u0442",
  "\u0442\u0440\u043E\u044F\u043D",
  "\u0442\u0440\u0438\u0440\u0456\u0433",
  "\u0442\u0443\u0440",
  "\u0442\u0443\u0440\u0431\u043E\u0433",
  "\u0442\u0443\u0440\u0431\u0440\u0456\u0434",
  "\u0443\u043B\u0430\u0441",
  "\u0443\u043B\u0438\u0447\u0430\u043D",
  "\u0443\u0441",
  "\u0443\u0441\u0442\u0438\u043C",
  "\u0444\u043B\u043E\u0440",
  "\u0444\u0440\u043E\u043B",
  "\u0444\u0435\u0434\u0456\u0440",
  "\u0444\u0430\u0443\u0441\u0442",
  "\u0445\u0432\u0430\u043B\u0430",
  "\u0445\u0432\u0430\u043B\u0438\u0431\u043E\u0433",
  "\u0445\u0432\u0430\u043B\u0438\u043C\u0438\u0440",
  "\u0445\u043E\u0434\u043E\u0442\u0430",
  "\u0445\u043E\u0440\u0438\u0432",
  "\u0445\u043E\u0440\u043E\u0448\u043A\u043E",
  "\u0445\u043E\u0442\u0438\u0431\u043E\u0440",
  "\u0445\u043E\u0442\u0438\u043C\u0438\u0440",
  "\u0445\u043E\u0442\u044F\u043D",
  "\u0445\u0440\u0430\u043D\u0438\u043C\u0438\u0440",
  "\u0445\u0440\u0438\u0441\u0442\u043E\u0444\u043E\u0440",
  "\u0445\u0443\u0434\u0430\u043D",
  "\u0446\u0430\u0440\u043A\u043E",
  "\u0446\u0432\u0456\u0442\u0430\u043D",
  "\u0446\u0430\u0440\u0443\u043A",
  "\u0447\u0430\u0440\u0430",
  "\u0447\u0435\u0440\u043D\u0438\u043D",
  "\u0447\u0435\u0441\u043B\u0430\u0432",
  "\u0447\u0435\u0441\u043C\u0438\u043B",
  "\u0447\u0435\u0441\u0442\u0438\u0441\u043B\u0430\u0432",
  "\u0449\u0430\u0441\u0442\u0438\u0431\u043E\u0433",
  "\u0449\u0430\u0441\u0442\u0438\u0441\u043B\u0430\u0432",
  "\u0449\u0435\u0434\u0440\u043E\u0433\u043E\u0441\u0442",
  "\u0449\u0435\u043A",
  "\u044E\u043B\u0456\u0430\u043D",
  "\u044E\u043B\u0456\u0439",
  "\u044E\u0440\u0456\u0439",
  "\u044E\u0445\u0438\u043C",
  "\u044F\u0432\u0456\u0440",
  "\u044F\u0432\u043E\u043B\u043E\u0434",
  "\u044F\u043A\u0456\u0432",
  "\u044F\u043D",
  "\u044F\u0440",
  "\u044F\u0440\u0435\u043C\u0430",
  "\u044F\u0440\u0438\u043B\u043E",
  "\u044F\u0440\u043E\u0432\u0438\u0434",
  "\u044F\u0440\u043E\u0432\u0438\u0442",
  "\u044F\u0440\u043E\u043C\u0438\u043B",
  "\u044F\u0440\u043E\u043C\u0438\u0440",
  "\u044F\u0440\u043E\u043C\u0438\u0441\u043B",
  "\u044F\u0440\u043E\u043F\u043E\u043B\u043A",
  "\u044F\u0440\u043E\u0441\u0432\u0456\u0442",
  "\u044F\u0440\u043E\u0441\u043B\u0430\u0432",
  "\u044F\u0440\u043E\u0448",
  "\u044F\u0440\u0442\u0443\u0440",
  "\u044F\u0440\u0447\u0438\u043A",
  "\u044F\u0441\u0435\u043D",
  "\u044F\u0441\u043D\u043E\u0432\u0438\u0434",
  "\u044F\u0441\u043D\u043E\u0433\u043E\u0440",
  "\u044F\u0441\u043D\u043E\u0437\u0456\u0440",
  "\u044F\u0441\u043D\u043E\u043B\u0438\u043A"
];
const femaleFirstNames = [
  "\u0430\u0432\u0433\u0443\u0441\u0442\u0430",
  "\u0430\u0432\u0440\u0435\u043B\u0456\u044F",
  "\u0430\u0432\u0440\u043E\u0440\u0430",
  "\u0430\u0433\u0430\u043F\u0456\u044F",
  "\u0430\u0433\u0430\u0442\u0430",
  "\u0430\u0433\u0430\u0444\u0456\u044F",
  "\u0430\u0433\u0430\u0444\u043E\u043D\u0438\u043A\u0430",
  "\u0430\u0433\u043B\u0430\u0457\u0434\u0430",
  "\u0430\u0433\u043B\u0430\u044F",
  "\u0430\u0433\u043D\u0435\u0441\u0430",
  "\u0430\u0433\u043D\u0456\u044F",
  "\u0430\u0433\u0440\u0438\u043F\u0438\u043D\u0430",
  "\u0430\u0434\u0430",
  "\u0430\u0434\u0435\u043B\u0430\u0457\u0434\u0430",
  "\u0430\u0434\u0435\u043B\u0456\u043D\u0430",
  "\u0430\u0434\u0440\u0456\u0430\u043D\u0430",
  "\u0430\u0435\u043B\u0456\u0442\u0430",
  "\u0430\u0437\u0430",
  "\u0430\u0437\u0430\u043B\u0456\u044F",
  "\u0430\u0457\u0434\u0430",
  "\u0430\u043A\u0438\u043B\u0438\u043D\u0430",
  "\u0430\u043B\u0435\u0432\u0442\u0438\u043D\u0430",
  "\u0430\u043B\u0456\u043D\u0430",
  "\u0430\u043B\u0456\u0441\u0430",
  "\u0430\u043B\u043B\u0430",
  "\u0430\u043B\u044C\u0431\u0435\u0440\u0442\u0438\u043D\u0430",
  "\u0430\u043B\u044C\u0431\u0456\u043D\u0430",
  "\u0430\u043B\u044C\u0432\u0456\u043D\u0430",
  "\u0430\u043B\u044C\u0444\u0440\u0435\u0434\u0430",
  "\u0430\u043D\u0430\u0441\u0442\u0430\u0441\u0456\u044F",
  "\u0430\u043D\u0430\u0442\u043E\u043B\u0456\u044F",
  "\u0430\u043D\u0433\u0435\u043B\u0456\u043D\u0430",
  "\u0430\u043D\u0436\u0435\u043B\u0430",
  "\u0430\u043D\u0436\u0435\u043B\u0456\u043A\u0430",
  "\u0430\u043D\u043D\u0430",
  "\u0430\u043D\u0442\u043E\u043D\u0438\u0434\u0430",
  "\u0430\u043D\u0442\u043E\u043D\u0456\u043D\u0430",
  "\u0430\u043D\u0442\u043E\u043D\u0456\u044F",
  "\u0430\u043D\u0444\u0456\u0441\u0430",
  "\u0430\u043F\u043E\u043B\u043B\u0456\u043D\u0430\u0440\u0456\u044F",
  "\u0430\u043F\u043E\u043B\u043B\u043E\u043D\u0456\u044F",
  "\u0430\u0440\u0456\u0430\u0434\u043D\u0430",
  "\u0430\u0440\u043A\u0430\u0434\u0456\u044F",
  "\u0430\u0440\u0441\u0435\u043D\u0430",
  "\u0430\u0440\u0441\u0435\u043D\u0456\u044F",
  "\u0430\u0440\u0442\u0435\u043C\u0456\u0437\u0456\u044F",
  "\u0430\u0440\u0442\u0435\u043C\u0456\u0437\u0430",
  "\u0430\u0440\u0442\u0435\u043C\u0456\u0441\u0456\u044F",
  "\u0430\u0440\u0442\u0435\u043C\u0456\u0441\u0430",
  "\u0430\u0440\u0442\u0435\u043C\u0456\u044F",
  "\u0430\u0441\u043A\u043B\u0456\u043F\u0456\u044F",
  "\u0430\u0441\u044F",
  "\u0430\u0443\u0440\u0438\u043A\u0430",
  "\u0430\u0444\u0430\u043D\u0430\u0441\u0456\u044F",
  "\u0430\u0444\u0456\u043D\u0430",
  "\u0430\u0442\u0435\u043D\u0430",
  "\u0430\u0444\u0440\u043E\u0434\u0456\u0442\u0430",
  "\u0431\u0430\u0436\u0430\u043D\u0430",
  "\u0431\u0430\u0440\u0431\u0430\u0440\u0430",
  "\u0431\u0435\u0430\u0442\u0440\u0438\u0441\u0430",
  "\u0431\u0435\u043B\u043B\u0430",
  "\u0431\u0435\u0440\u0442\u0430",
  "\u0431\u043E\u0433\u0434\u0430\u043D\u0430",
  "\u0431\u043E\u0433\u0443\u0441\u043B\u0430\u0432\u0430",
  "\u0431\u043E\u0436\u0435\u043D\u0430",
  "\u0431\u043E\u043B\u0435\u0441\u043B\u0430\u0432\u0430",
  "\u0431\u043E\u0440\u0438\u0441\u043B\u0430\u0432\u0430",
  "\u0431\u0440\u043E\u043D\u0456\u0441\u043B\u0430\u0432\u0430",
  "\u0432\u0430\u043B\u0435\u043D\u0442\u0438\u043D\u0430",
  "\u0432\u0430\u043B\u0435\u0440\u0456\u044F",
  "\u0432\u0430\u043D\u0434\u0430",
  "\u0432\u0430\u0440\u0432\u0430\u0440\u0430",
  "\u0432\u0430\u0441\u0438\u043B\u0438\u043D\u0430",
  "\u0432\u0430\u0441\u0441\u0430",
  "\u0432\u0435\u043A\u043B\u0430",
  "\u0432\u0435\u043D\u0435\u0440\u0430",
  "\u0432\u0435\u0440\u043E\u043D\u0456\u043A\u0430",
  "\u0432\u0456\u0432\u0434\u044F",
  "\u0432\u0456\u043A\u0442\u043E\u0440\u0438\u043D\u0430",
  "\u0432\u0456\u043A\u0442\u043E\u0440\u0456\u044F",
  "\u0432\u0456\u043B\u0435\u043D\u0430",
  "\u0432\u0456\u043B\u0435\u043D\u0456\u043D\u0430",
  "\u0432\u0456\u043B\u0456\u043D\u0430",
  "\u0432\u0456\u043E\u043B\u0430",
  "\u0432\u0456\u043E\u043B\u0435\u0442\u0442\u0430",
  "\u0432\u0456\u0440\u0430",
  "\u0432\u0456\u0440\u0433\u0456\u043D\u0456\u044F",
  "\u0432\u0456\u0440\u0438\u043D\u0435\u044F",
  "\u0432\u0456\u0440\u043E\u0441\u043B\u0430\u0432\u0430",
  "\u0432\u0456\u0442\u0430",
  "\u0432\u0456\u0442\u0430\u043B\u0456\u043D\u0430",
  "\u0432\u0456\u0442\u0430\u043B\u0456\u044F",
  "\u0432\u043B\u0430\u0434\u0430",
  "\u0432\u043B\u0430\u0434\u0438\u043B\u0435\u043D\u0430",
  "\u0432\u043B\u0430\u0434\u0438\u0441\u043B\u0430\u0432\u0430",
  "\u0432\u043B\u0430\u0434\u043B\u0435\u043D\u0430",
  "\u0432\u043B\u0430\u0441\u0442\u0430",
  "\u0432\u043E\u043B\u043E\u0434\u0438\u043C\u0438\u0440\u0430",
  "\u0432\u043E\u043B\u044F",
  "\u0432\u0441\u0435\u0441\u043B\u0430\u0432\u0430",
  "\u0432'\u044F\u0447\u0435\u0441\u043B\u0430\u0432\u0430",
  "\u0433\u0430\u0457\u043D\u0430",
  "\u0433\u0430\u043B\u0438\u043D\u0430",
  "\u0433\u0430\u043D\u043D\u0430",
  "\u0430\u043D\u043D\u0430",
  "\u0433\u0430\u0444\u0456\u044F",
  "\u0433\u0435\u043B\u0435\u043D\u0430",
  "\u0433\u0435\u043E\u0440\u0433\u0456\u043D\u0430",
  "\u0433\u0435\u0440\u0442\u0440\u0443\u0434\u0430",
  "\u0433\u043B\u0430\u0444\u0456\u0440\u0430",
  "\u0433\u043B\u0430\u0444\u0438\u0440\u0430",
  "\u0433\u043B\u0438\u043A\u0435\u0440\u0456\u044F",
  "\u043B\u0438\u043A\u0435\u0440\u0456\u044F",
  "\u043B\u0438\u043A\u0435\u0440\u0430",
  "\u0433\u043E\u0440\u043F\u0438\u043D\u0430",
  "\u0433\u0443\u0441\u0442\u0430\u0432\u0430",
  "\u0434\u0430\u043D\u0430",
  "\u0434\u0430\u0440\u0438\u043D\u0430",
  "\u043E\u0434\u0430\u0440\u0438\u043D\u0430",
  "\u043E\u0434\u0430\u0440\u043A\u0430",
  "\u0434\u0430\u0440\u0456\u044F",
  "\u0434\u0437\u0432\u0435\u043D\u0438\u043C\u0438\u0440\u0430",
  "\u0434\u0437\u0432\u0435\u043D\u0438\u0441\u043B\u0430\u0432\u0430",
  "\u0434\u0437\u0432\u0456\u043D\u043A\u0430",
  "\u0434\u0456\u0430\u043D\u0430",
  "\u0434\u0456\u043D\u0430",
  "\u0434\u043E\u043C\u043D\u0430",
  "\u0434\u043E\u043C\u0430\u0445\u0430",
  "\u0434\u043E\u043D\u043D\u0430",
  "\u0434\u043E\u0440\u043E\u0442\u0435\u044F",
  "\u0434\u043E\u0440\u043E\u0444\u0435\u044F",
  "\u0435\u0432\u0435\u043B\u0456\u043D\u0430",
  "\u0435\u0434\u0456\u0442\u0430",
  "\u0435\u043B\u0435\u043E\u043D\u043E\u0440\u0430",
  "\u0435\u043B\u043B\u0430",
  "\u0435\u043B\u0432\u0456\u043D\u0430",
  "\u0435\u043B\u044C\u0432\u0456\u0440\u0430",
  "\u0435\u043C\u043C\u0430",
  "\u0435\u043C\u043C\u0430\u043D\u0443\u0435\u043B\u044C",
  "\u0435\u043C\u043C\u0430\u043D\u0443\u0457\u043B\u0430",
  "\u0435\u043C\u0456\u043B\u0456\u044F",
  "\u0435\u0440\u0456\u043A\u0430",
  "\u0435\u0441\u043C\u0435\u0440\u0430\u043B\u044C\u0434\u0430",
  "\u0435\u0441\u0442\u0435\u0440",
  "\u0435\u0441\u0444\u0456\u0440",
  "\u0454\u0432\u0430",
  "\u0454\u0432\u0433\u0435\u043D\u0456\u044F",
  "\u0457\u0432\u0433\u0430",
  "\u044E\u0433\u0438\u043D\u0430",
  "\u0454\u0432\u0434\u043E\u043A\u0456\u044F",
  "\u0432\u0456\u0432\u0434\u044F",
  "\u0434\u043E\u043A\u0456\u044F",
  "\u044F\u0432\u0434\u043E\u0445\u0430",
  "\u0454\u0432\u0444\u0440\u043E\u0441\u0438\u043D\u0456\u044F",
  "\u0454\u0444\u0440\u043E\u0441\u0438\u043D\u0456\u044F",
  "\u0454\u043A\u0430\u0442\u0435\u0440\u0438\u043D\u0430",
  "\u0454\u043B\u0438\u0437\u0430\u0432\u0435\u0442\u0430",
  "\u043B\u0438\u0437\u0430\u0432\u0435\u0442\u0430",
  "\u043B\u0438\u0441\u0430\u0432\u0435\u0442\u0430",
  "\u0433\u0430\u043B\u044C\u0448\u043A\u0430",
  "\u0454\u043F\u0438\u0441\u0442\u0438\u043C\u0456\u044F",
  "\u0454\u043F\u0438\u0441\u0442\u0438\u043C\u0430",
  "\u0436\u0430\u0434\u0430\u043D\u0430",
  "\u0436\u0430\u043D\u043D\u0430",
  "\u0436\u0434\u0430\u043D\u0430",
  "\u0436\u043E\u0437\u0435\u0444\u0456\u043D\u0430",
  "\u0437\u0430\u0431\u0430\u0432\u0430",
  "\u0437\u0432\u0435\u043D\u0438\u0433\u043E\u0440\u0430",
  "\u0437\u0432\u0435\u043D\u0438\u0441\u043B\u0430\u0432\u0430",
  "\u0437\u0432\u043E\u043D\u0438\u043C\u0438\u0440\u0430",
  "\u0437\u0435\u043C\u0444\u0456\u0440\u0430",
  "\u0437\u0456\u0440\u043A\u0430",
  "\u0437\u0456\u043D\u0430\u0457\u0434\u0430",
  "\u0437\u043B\u0430\u0442\u0430",
  "\u0437\u043B\u0430\u0442\u043E\u043C\u0438\u0440\u0430",
  "\u0437\u043B\u0430\u0442\u043E\u0443\u0441\u0442\u0430",
  "\u0437\u043E\u043B\u043E\u0442\u043E\u0434\u0430\u043D\u0430",
  "\u0437\u043E\u0440\u0435\u0433\u043B\u044F\u0434\u0430",
  "\u0437\u043E\u0440\u0435\u0441\u043B\u0430\u0432\u0430",
  "\u0437\u043E\u0440\u0438\u043D\u0430",
  "\u0437\u043E\u0440\u044F\u043D\u0430",
  "\u0437\u043E\u0440\u044F",
  "\u0437\u043E\u044F",
  "\u0456\u0432\u0430\u043D\u043D\u0430",
  "\u0456\u0433\u043E\u0440\u0438\u043D\u0430",
  "\u0456\u043B\u043E\u043D\u0430",
  "\u0456\u043D\u0433\u0430",
  "\u0456\u043D\u043D\u0430",
  "\u0456\u043D\u0435\u0441\u0430",
  "\u0456\u0440\u0438\u043D\u0430",
  "\u0456\u0440\u043C\u0430",
  "\u0456\u043B\u0430\u0440\u0456\u044F",
  "\u0456\u0441\u0438\u0434\u043E\u0440\u0430",
  "\u0456\u044F",
  "\u0457\u0432\u0433\u0430",
  "\u0439\u043E\u0432\u0456\u043B\u043B\u0430",
  "\u0439\u043E\u0441\u0438\u043F\u0430",
  "\u043E\u0441\u0438\u043F\u0430",
  "\u0439\u043E\u0441\u0438\u0444\u0430\u0442\u0430",
  "\u043A\u0430\u0437\u0438\u043C\u0438\u0440\u0430",
  "\u043A\u0430\u0437\u043A\u0430",
  "\u043A\u0430\u043B\u0438\u043D\u0430",
  "\u043A\u0430\u043F\u0456\u0442\u043E\u043B\u0456\u043D\u0430",
  "\u043A\u0430\u043F\u0438\u0442\u043E\u043B\u0438\u043D\u0430",
  "\u043A\u0430\u043F\u0438\u0442\u043E\u043B\u0456\u043D\u0430",
  "\u043A\u0430\u0440\u0438\u043D\u0430",
  "\u043A\u0430\u0440\u043E\u043B\u0456\u043D\u0430",
  "\u043A\u0430\u0441\u0441\u0430\u043D\u0434\u0440\u0430",
  "\u043A\u0430\u0442\u0435\u0440\u0438\u043D\u0430",
  "\u0454\u043A\u0430\u0442\u0435\u0440\u0438\u043D\u0430",
  "\u043A\u0430\u0442\u0440\u044F",
  "\u043A\u0432\u0456\u0442\u043A\u0430",
  "\u043A\u0432\u0456\u0442\u043E\u0441\u043B\u0430\u0432\u0430",
  "\u043A\u0438\u043A\u0438\u043B\u0456\u044F",
  "\u0446\u0435\u0446\u0438\u043B\u0456\u044F",
  "\u043A\u0438\u043B\u0438\u043D\u0430",
  "\u043A\u0456\u0440\u0430",
  "\u043A\u043B\u0430\u0432\u0434\u0456\u044F",
  "\u043A\u043B\u0430\u0440\u0430",
  "\u043A\u043B\u0435\u043E\u043F\u0430\u0442\u0440\u0430",
  "\u043A\u043E\u043B\u043E\u0434\u0430\u0440\u0430",
  "\u043A\u043E\u043D\u0441\u0442\u0430\u043D\u0446\u0456\u044F",
  "\u043A\u043E\u0440\u0438\u043D\u0430",
  "\u043A\u043E\u0440\u0430",
  "\u043A\u043E\u0440\u043D\u0435\u043B\u0456\u044F",
  "\u043A\u0440\u0430\u0441\u0438\u043C\u0438\u0440\u0430",
  "\u043A\u0440\u0430\u0441\u043D\u043E\u0432\u0438\u0434\u0430",
  "\u043A\u0440\u0430\u0441\u043D\u043E\u043B\u0438\u043A\u0430",
  "\u043A\u0440\u0430\u0441\u0443\u043D\u044F",
  "\u043A\u0441\u0435\u043D\u0456\u044F",
  "\u0430\u043A\u0441\u0435\u043D\u0456\u044F",
  "\u043E\u043A\u0441\u0435\u043D\u0456\u044F",
  "\u043E\u043A\u0441\u0430\u043D\u0430",
  "\u043A\u0443\u043F\u0430\u0432\u0430",
  "\u043B\u0430\u0434\u0430",
  "\u043B\u0430\u0434\u0438\u0441\u043B\u0430\u0432\u0430",
  "\u043B\u0430\u0434\u043E\u043C\u0438\u043B\u0430",
  "\u043B\u0430\u0434\u043E\u043C\u0438\u0440\u0430",
  "\u043B\u0430\u0440\u0438\u0441\u0430",
  "\u043B\u0435\u0432\u0438\u043D\u0430",
  "\u043B\u0435\u043B\u044F",
  "\u043B\u0435\u0441\u044F",
  "\u043B\u0438\u0431\u0456\u0434\u044C",
  "\u043B\u0456\u0434\u0456\u044F",
  "\u043B\u0456\u043B\u0456\u044F",
  "\u043B\u0456\u043B\u0435\u044F",
  "\u043B\u0456\u043D\u0430",
  "\u043B\u043E\u043B\u0430",
  "\u043B\u043E\u043B\u0456\u0442\u0430",
  "\u043B\u0443\u043A\u0456\u044F",
  "\u043B\u0443\u043A\u0438\u043D\u0430",
  "\u043B\u0443\u043A\u0440\u0435\u0446\u0456\u044F",
  "\u043B\u044E\u0431\u0430\u0432\u0430",
  "\u043B\u044E\u0431\u0430\u043D\u044F",
  "\u043B\u044E\u0431\u0438\u0441\u043B\u0430\u0432\u0430",
  "\u043B\u044E\u0431\u043E\u0432",
  "\u043B\u044E\u0431\u043E\u043C\u0438\u043B\u0430",
  "\u043B\u044E\u0431\u043E\u043C\u0438\u0440\u0430",
  "\u043B\u044E\u0431\u043E\u0440\u0430\u0434\u0430",
  "\u043B\u044E\u0434\u043C\u0438\u043B\u0430",
  "\u043B\u044E\u0434\u043E\u043C\u0438\u043B\u0430",
  "\u043B\u044E\u0431\u043E\u0441\u043B\u0430\u0432\u0430",
  "\u043B\u044C\u043E\u043B\u044F",
  "\u043B\u0456\u0442\u0432\u0456\u043D\u0430",
  "\u043C\u0430\u0432\u043A\u0430",
  "\u043C\u0430\u0433\u0430\u0434\u0430\u0440\u0430",
  "\u043C\u0430\u0433\u0434\u0430\u043B\u0438\u043D\u0430",
  "\u043C\u0430\u0433\u0434\u0430\u043B\u0435\u043D\u0430",
  "\u043C\u0430\u0433\u0434\u0430",
  "\u043C\u0430\u0457\u043D\u0430",
  "\u043C\u0430\u0439\u044F",
  "\u043C\u0430\u043A\u0456\u0432\u043A\u0430",
  "\u043C\u0430\u043B\u0443\u043D\u044F",
  "\u043C\u0430\u043B\u0443\u0448\u0430",
  "\u043C\u0430\u043B\u044C\u0432\u0430",
  "\u043C\u0430\u043B\u044C\u0432\u0456\u043D\u0430",
  "\u043C\u0430\u0440\u0433\u0430\u0440\u0438\u0442\u0430",
  "\u043C\u0430\u0440\u0442\u0430",
  "\u043C\u0430\u0440\u0444\u0430",
  "\u043C\u0430\u0440\u0443\u0442\u0430",
  "\u043C\u0430\u0440\u0456\u044F",
  "\u043C\u0430\u0440'\u044F",
  "\u043C\u0430\u0440\u0456\u0447\u043A\u0430",
  "\u043C\u0430\u0440\u0438\u043D\u0430",
  "\u043C\u0430\u0440\u0442\u0438\u043D\u0430",
  "\u043C\u0430\u0440'\u044F\u043D\u0430",
  "\u043C\u0430\u0440\u0456\u0430\u043D\u043D\u0430",
  "\u043C\u0430\u0440\u0456\u0430\u043C\u043D\u0430",
  "\u043C\u0435\u0434\u043E\u0440\u0430\u0434\u0430",
  "\u043C\u0435\u043B\u0430\u043D\u0456\u044F",
  "\u043C\u0435\u043B\u0456\u0442\u0438\u043D\u0430",
  "\u043C\u0435\u0447\u0438\u0441\u043B\u0430\u0432\u0430",
  "\u043C\u0438\u043B\u0430\u043D\u0430",
  "\u043C\u0438\u043B\u043E\u0432\u0430\u043D\u0430",
  "\u043C\u0438\u043B\u043E\u0432\u0438\u0434\u0430",
  "\u043C\u0438\u043B\u043E\u0434\u0430\u0440\u0430",
  "\u043C\u0438\u043B\u043E\u0441\u043B\u0430\u0432\u0430",
  "\u043C\u0438\u0440\u0430\u043D\u0430",
  "\u043C\u0438\u0440\u043E\u0431\u043E\u0433\u0430",
  "\u043C\u0438\u0440\u043E\u043B\u044E\u0431\u0430",
  "\u043C\u0438\u0440\u043E\u0441\u043B\u0430\u0432\u0430",
  "\u043C\u0438\u0445\u0430\u0439\u043B\u0438\u043D\u0430",
  "\u043C\u043B\u0430\u0434\u0430",
  "\u043C\u043E\u043A\u0440\u0438\u043D\u0430",
  "\u043C\u0430\u043A\u0440\u0438\u043D\u0430",
  "\u043C\u043E\u043D\u0456\u043A\u0430",
  "\u043C\u043E\u0442\u0440\u044F",
  "\u043C\u0441\u0442\u0438\u0441\u043B\u0430\u0432\u0430",
  "\u043C\u0443\u0434\u0440\u043E\u043B\u044E\u0431\u0430",
  "\u043D\u0430\u0434\u0456\u044F",
  "\u043D\u0430\u0434\u0456\u0441\u043B\u0430\u0432\u0430",
  "\u043D\u0430\u0439\u0434\u0430",
  "\u043D\u0430\u0439\u0434\u0435\u043D\u0430",
  "\u043D\u0430\u0441\u043B\u0430\u0432\u0430",
  "\u043D\u0430\u0441\u0442\u0430\u0441\u0456\u044F",
  "\u043D\u0430\u0441\u0442\u044F",
  "\u043D\u0430\u0442\u0430\u043B\u0456\u044F",
  "\u043D\u0430\u0442\u0430\u043B\u044F",
  "\u043D\u0430\u0442\u0430\u043B\u043A\u0430",
  "\u043D\u0435\u043B\u044F",
  "\u043D\u0435\u043C\u0438\u0440\u0430",
  "\u043D\u0456\u0433\u043E\u0441\u043B\u0430\u0432\u0430",
  "\u043D\u0435\u0437\u0430\u0431\u0443\u0434\u043A\u0430",
  "\u043D\u0456\u043A\u0430",
  "\u043D\u0456\u043D\u0430",
  "\u043D\u0456\u043D\u0435\u043B\u044C",
  "\u043D\u043E\u043D\u043D\u0430",
  "\u043E\u0433\u043D\u044F\u043D\u0430",
  "\u043E\u0434\u0430\u0440\u043A\u0430",
  "\u043E\u043A\u0441\u0430\u043D\u0430",
  "\u043E\u043A\u0442\u0430\u0432\u0456\u044F",
  "\u043E\u043B\u0435\u043A\u0441\u0430\u043D\u0434\u0440\u0430",
  "\u043E\u043B\u0435\u043D\u0430",
  "\u043E\u043B\u0435\u0441\u044F",
  "\u043E\u043B\u0456\u0432\u0456\u044F",
  "\u043E\u043B\u0456\u043C\u043F\u0456\u0430\u0434\u0430",
  "\u043E\u043B\u0456\u043C\u043F\u0456\u044F",
  "\u043E\u043B\u044C\u0433\u0430",
  "\u043E\u0440\u0435\u0441\u0442\u0430",
  "\u043E\u0440\u0438\u043C\u0438\u0440\u0430",
  "\u043E\u0440\u0438\u043D\u0430",
  "\u043E\u0440\u0438\u0441\u043B\u0430\u0432\u0430",
  "\u043E\u0440\u0438\u0441\u044F",
  "\u043E\u0440\u0456\u044F\u043D\u0430",
  "\u043E\u0440\u0456\u044F\u043D\u043A\u0430",
  "\u043E\u0440\u043E\u0433\u043E\u0441\u0442\u0430",
  "\u043E\u0441\u0438\u043F\u0430",
  "\u043E\u0441\u0442\u0440\u043E\u0437\u043E\u0440\u0430",
  "\u043E\u0441\u0442\u0440\u043E\u043C\u0438\u0440\u0430",
  "\u043E\u0441\u043C\u043E\u043C\u0438\u0441\u043B\u0430",
  "\u043E\u0441\u0442\u0440\u043E\u043C\u043E\u0432\u0430",
  "\u043F\u0430\u0432\u0430",
  "\u043F\u0430\u0432\u043B\u0430",
  "\u043F\u0430\u0432\u043B\u0438\u043D\u0430",
  "\u043F\u0435\u043B\u0430\u0433\u0456\u044F",
  "\u043F\u0435\u043B\u0430\u0433\u0435\u044F",
  "\u043F\u0430\u043B\u0430\u0433\u043D\u0430",
  "\u043F\u0430\u043B\u0430\u0437\u0433\u0430",
  "\u043F\u0430\u0440\u0430\u0441\u043A\u0435\u0432\u0430",
  "\u043F\u0430\u0440\u0430\u0441\u043A\u0435\u0432\u0456\u044F",
  "\u043F\u0430\u0440\u0430\u0441\u043A\u043E\u0432\u0456\u044F",
  "\u043F\u0435\u0440\u0435\u043B\u044E\u0431\u0430",
  "\u043F\u0435\u0440\u0435\u043C\u0438\u043B\u0430",
  "\u043F\u0435\u0440\u0435\u043C\u0438\u0441\u043B\u0430",
  "\u043F\u0438\u0441\u0442\u0438\u043D\u0430",
  "\u043F\u0456\u0432\u043E\u043D\u0456\u044F",
  "\u043F\u043E\u043B\u0456\u043D\u0430",
  "\u043F\u043E\u0437\u0432\u0456\u0437\u0434\u0430",
  "\u043F\u043E\u043B\u0435\u0437\u0430",
  "\u043F\u043E\u043B\u044F\u043D\u0430",
  "\u043F\u043E\u0442\u0456\u0448\u0430\u043D\u0430",
  "\u043F\u0440\u0435\u0434\u0441\u043B\u0430\u0432\u0430",
  "\u043F\u0440\u0456\u0441\u044C\u043A\u0430",
  "\u043F\u0443\u043B\u044C\u0445\u0435\u0440\u0456\u044F",
  "\u043F\u0443\u043B\u044C\u0445\u0435\u0440\u0430",
  "\u0440\u0430\u0434\u0430",
  "\u0440\u0430\u0434\u0430\u043D\u0430",
  "\u0440\u0430\u0434\u0438\u043C\u0438\u0440\u0430",
  "\u0440\u0430\u0434\u043C\u0438\u043B\u0430",
  "\u0440\u0430\u0434\u043E\u0433\u043E\u0441\u0442\u0430",
  "\u0440\u0430\u0434\u043E\u043C\u0438\u0440\u0430",
  "\u0440\u0430\u0434\u043E\u0441\u043B\u0430\u0432\u0430",
  "\u0440\u0430\u0457\u043D\u0430",
  "\u0440\u0430\u0457\u0441\u0430",
  "\u0440\u0435\u0432\u0435\u043A\u0430",
  "\u0440\u0435\u0431\u0435\u043A\u043A\u0430",
  "\u0440\u0435\u0433\u0456\u043D\u0430",
  "\u0440\u0435\u043D\u0430\u0442\u0430",
  "\u0440\u0438\u043C\u043C\u0430",
  "\u0440\u0438\u043D\u0430",
  "\u0440\u0456\u0430\u043D\u0430",
  "\u0440\u0456\u0430\u043D\u043D\u0430",
  "\u0440\u0456\u0434\u043D\u0430",
  "\u0440\u043E\u0433\u0432\u043E\u043B\u043E\u0434\u0430",
  "\u0440\u043E\u0433\u043D\u0456\u0434\u0430",
  "\u0440\u043E\u0434\u043E\u0441\u043B\u0430\u0432\u0430",
  "\u0440\u043E\u0436\u0430\u043D\u0430",
  "\u0440\u043E\u0437\u0430",
  "\u0440\u043E\u0437\u0430\u043B\u0456\u044F",
  "\u0440\u0443\u0437\u0430\u043B\u0456\u044F",
  "\u0440\u043E\u043A\u0441\u0430\u043D\u0430",
  "\u0440\u043E\u043A\u0441\u043E\u043B\u0430\u043D\u0430",
  "\u0440\u043E\u043C\u0430\u0448\u043A\u0430",
  "\u0440\u043E\u043C\u0430\u043D\u0430",
  "\u0440\u043E\u043C\u0435\u043D\u0430",
  "\u0440\u043E\u0441\u0430\u0432\u0430",
  "\u0440\u043E\u0441\u0438\u043D\u0430",
  "\u0440\u043E\u0441\u0442\u0438\u0441\u043B\u0430\u0432\u0430",
  "\u0440\u043E\u0441\u0442\u0438\u0447\u0430\u0440\u0430",
  "\u0440\u043E\u0441\u0442\u0443\u043D\u044F",
  "\u0440\u0443\u0434\u0430\u043D\u0430",
  "\u0440\u043E\u043D\u0430\u043B\u0456\u043D\u0430",
  "\u0440\u043E\u0448\u0435\u043B\u044C",
  "\u0440\u0443\u0441\u0430\u043D\u0430",
  "\u0440\u0443\u0441\u043B\u0430\u043D\u0430",
  "\u0440\u0443\u0441\u0443\u0434\u0430\u043D\u0430",
  "\u0440\u0443\u0441\u044F\u0432\u0430",
  "\u0440\u0443\u0441\u044F\u0432\u043A\u0430",
  "\u0440\u0443\u0442",
  "\u0440\u0443\u0444",
  "\u0440\u0443\u0444\u0456\u043D\u0430",
  "\u0440\u0443\u0444\u0438\u043D\u0430",
  "\u0441\u0430\u0431\u0440\u0456\u043D\u0430",
  "\u0441\u0430\u043D\u0442\u0430",
  "\u0441\u0430\u0440\u0430",
  "\u0441\u0430\u0440\u0440\u0430",
  "\u0441\u0432\u0456\u0442\u043B\u0430\u043D\u0430",
  "\u0441\u0432\u0456\u0442\u043E\u0432\u0438\u0434\u0430",
  "\u0441\u0432\u0456\u0442\u043E\u0433\u043E\u0440\u0430",
  "\u0441\u0432\u0456\u0442\u043E\u0434\u0430\u0440\u0430",
  "\u0441\u0432\u0456\u0442\u043E\u0437\u0430\u0440\u0430",
  "\u0441\u0432\u0456\u0442\u043E\u043B\u0438\u043A\u0430",
  "\u0441\u0432\u0456\u0442\u043E\u043B\u044E\u0431\u0430",
  "\u0441\u0432\u0456\u0442\u043E\u0441\u043B\u0430\u0432\u0430",
  "\u0441\u0432\u0456\u0442\u043E\u044F\u0440\u0430",
  "\u0441\u0432\u043E\u0431\u043E\u0434\u0430\u043D\u0430",
  "\u0441\u0432\u044F\u0442\u043E\u0433\u043E\u0440\u0430",
  "\u0441\u0432\u044F\u0442\u043E\u043B\u044E\u0431\u0430",
  "\u0441\u0432\u044F\u0442\u043E\u0441\u043B\u0430\u0432\u0430",
  "\u0441\u0435\u0432\u0430\u0441\u0442\u0456\u0430\u043D\u0430",
  "\u0441\u0435\u0432\u0435\u0440\u0438\u043D\u0430",
  "\u0441\u0435\u043A\u043B\u0435\u0442\u0430",
  "\u0441\u0435\u043A\u043B\u0435\u0442\u0438\u043D\u0430",
  "\u0441\u0435\u0440\u0430\u0444\u0438\u043C\u0430",
  "\u0441\u0438\u043B\u0430\u0442\u0430",
  "\u0441\u0438\u043B\u043E\u043B\u044E\u0431\u0430",
  "\u0441\u0438\u043B\u043E\u0441\u043B\u0430\u0432\u0430",
  "\u0441\u0438\u043D\u0435\u0437\u043E\u0440\u0430",
  "\u0441\u0438\u043D\u044C\u043E\u043E\u043A\u0430",
  "\u0441\u0456\u043B\u044C\u0432\u0456\u044F",
  "\u0441\u0456\u043C\u043E\u043D\u0430",
  "\u0441\u043B\u0430\u0432\u0430",
  "\u0441\u043B\u0430\u0432\u0438\u043D\u0430",
  "\u0441\u043B\u0430\u0432\u043E\u043B\u044E\u0431\u0430",
  "\u0441\u043B\u0430\u0432\u043E\u043C\u0438\u043B\u0430",
  "\u0441\u043C\u0456\u044F\u043D\u0430",
  "\u0441\u043D\u0456\u0436\u0430\u043D\u0430",
  "\u0441\u043D\u0456\u0436\u0438\u043D\u043A\u0430",
  "\u0441\u043E\u0431\u0456\u0441\u043B\u0430\u0432\u0430",
  "\u0441\u043E\u043B\u043E\u043C\u0456\u044F",
  "\u0441\u043E\u043B\u043E\u043C\u043E\u043D\u0456\u044F",
  "\u0441\u043E\u043B\u043E\u0433\u0443\u0431\u0430",
  "\u0441\u043E\u043D\u0446\u0435\u0432\u0438\u0434\u0430",
  "\u0441\u043E\u043D\u0446\u0435\u0434\u0430\u0440\u0430",
  "\u0441\u043E\u043D\u0446\u0435\u043B\u0438\u043A\u0430",
  "\u0441\u043E\u043D\u0446\u0435\u0441\u043B\u0430\u0432\u0430",
  "\u0441\u043E\u043D\u044F",
  "\u0441\u043E\u0444\u0456\u044F",
  "\u0441\u0442\u0430\u043D\u0438\u043C\u0438\u0440\u0430",
  "\u0441\u0442\u0430\u043D\u0456\u0441\u043B\u0430\u0432\u0430",
  "\u0441\u0442\u0435\u043B\u043B\u0430",
  "\u0441\u0442\u0435\u0444\u0430\u043D\u0438\u0434\u0430",
  "\u0441\u0442\u0435\u0444\u0430\u043D\u0456\u044F",
  "\u0441\u0443\u0441\u0430\u043D\u043D\u0430",
  "\u0441\u043E\u0441\u0430\u043D\u043D\u0430",
  "\u0441\u0443\u0434\u0438\u043C\u0438\u0440\u0430",
  "\u0441\u0443\u0434\u0438\u0441\u043B\u0430\u0432\u0430",
  "\u0441\u044E\u0437\u0430\u043D\u043D\u0430",
  "\u0442\u0430\u0432\u0430",
  "\u0442\u0430\u0457\u0441\u0456\u044F",
  "\u0442\u0430\u0457\u0441\u0430",
  "\u0442\u0430\u043C\u0430\u0440\u0430",
  "\u0442\u0430\u0442\u043E\u043B\u044E\u0431\u0430",
  "\u0442\u0432\u0435\u0440\u0434\u0438\u0441\u043B\u0430\u0432\u0430",
  "\u0442\u0432\u0435\u0440\u0434\u043E\u0433\u043E\u0441\u0442\u0430",
  "\u0442\u0432\u043E\u0440\u0438\u043C\u0438\u0440\u0430",
  "\u0442\u0432\u043E\u0440\u0438\u0441\u043B\u0430\u0432\u0430",
  "\u0442\u0435\u043A\u043B\u044F",
  "\u0442\u0435\u0440\u0435\u0437\u0430",
  "\u0442\u0435\u0442\u044F\u043D\u0430",
  "\u0442\u0456\u043D\u0430",
  "\u0442\u043E\u043B\u0438\u0433\u043D\u0456\u0432\u0430",
  "\u0442\u043E\u043D\u043A\u043E\u0441\u0442\u0430\u043D\u0430",
  "\u0442\u0440\u043E\u044F\u043D\u0430",
  "\u0443\u043B\u0438\u0442\u0430",
  "\u0443\u043B\u044F\u043D\u0430",
  "\u0443\u0441\u0442\u0438\u043D\u0430",
  "\u0444\u0430\u0457\u043D\u0430",
  "\u0444\u0435\u0432\u0440\u043E\u043D\u0456\u044F",
  "\u0444\u0435\u0432\u0440\u043E\u0441\u0456\u044F",
  "\u0445\u0456\u0432\u0440\u044F",
  "\u0444\u0435\u043A\u043B\u0430",
  "\u0444\u0435\u043B\u0456\u0446\u0456\u044F",
  "\u0444\u0435\u043B\u0456\u043A\u0441\u0430",
  "\u0444\u0438\u043B\u0456\u043A\u0438\u0442\u0430\u0442\u0430",
  "\u0444\u0438\u043B\u0456\u0446\u0438\u0442\u0430\u0442\u0430",
  "\u0444\u0438\u043B\u0456\u0446\u0430\u0442\u0430",
  "\u0444\u0435\u043E\u0434\u043E\u0440\u0430",
  "\u0444\u0435\u0434\u043E\u0440\u0430",
  "\u0442\u043E\u0434\u043E\u0440\u0430",
  "\u0444\u0435\u0434\u043E\u0441\u0456\u044F",
  "\u0444\u0435\u043E\u0434\u043E\u0441\u0456\u044F",
  "\u0442\u0435\u043E\u0434\u043E\u0437\u0456\u044F",
  "\u0444\u043E\u0442\u0438\u043D\u0430",
  "\u0444\u043E\u0442\u0438\u043D\u0456\u044F",
  "\u0444\u043E\u0442\u0430",
  "\u0445\u043E\u0442\u0438\u043D\u0430",
  "\u0444\u0440\u043E\u0441\u0438\u043D\u0430",
  "\u0445\u0430\u0440\u0438\u0442\u0430",
  "\u0445\u0430\u0440\u0438\u0442\u0438\u043D\u0430",
  "\u0445\u0430\u0440\u0438\u0442\u044F",
  "\u0445\u0456\u0432\u0440\u044F",
  "\u0445\u0440\u0438\u0441\u0430",
  "\u0445\u0440\u0438\u0441\u0442\u0438\u043D\u0430",
  "\u0445\u0440\u0438\u0441\u0442\u044F",
  "\u0446\u0435\u0446\u0456\u043B\u0456\u044F",
  "\u0446\u0432\u0456\u0442\u0430\u043D\u0430",
  "\u0447\u0435\u0441\u043B\u0430\u0432\u0430",
  "\u0447\u0443\u0445\u0440\u0456\u044F",
  "\u044E\u0433\u0438\u043D\u0430",
  "\u044E\u0434\u0438\u0442",
  "\u044E\u0434\u0438\u0444",
  "\u044E\u0434\u0438\u0445\u0432\u0430",
  "\u044E\u0437\u0435\u0444\u0430",
  "\u044E\u043B\u0456\u044F",
  "\u044E\u043B\u0438\u043D\u0430",
  "\u044E\u043B\u0456\u0430\u043D\u0456\u044F",
  "\u044E\u043B\u0456\u0430\u043D\u043D\u0430",
  "\u044E\u043B\u0456\u0430\u043D\u0430",
  "\u044E\u043D\u0456\u044F",
  "\u044E\u0441\u0442\u0438\u043D\u0430",
  "\u044E\u0445\u0438\u043C\u0456\u044F",
  "\u044E\u0445\u0438\u043C\u0430",
  "\u044E\u0445\u0438\u043C\u0438\u043D\u0430",
  "\u0454\u0432\u0444\u0438\u043Ci\u044F",
  "\u0454\u0444\u0438\u043C\u0456\u044F",
  "\u0445\u0438\u043C\u0430",
  "\u044F\u0432\u0434\u043E\u0445\u0430",
  "\u044F\u0434\u0432\u0456\u0433\u0430",
  "\u044F\u043D\u0430",
  "\u044F\u043D\u0456\u043D\u0430",
  "\u044F\u0440\u0438\u043D\u0430",
  "\u044F\u0440\u043E\u043C\u0438\u0440\u0430",
  "\u044F\u0440\u043E\u0441\u043B\u0430\u0432\u0430"
];
const shevchenkoAnthroponym = {
  gender: Gender.Male,
  lastName: "\u0428\u0435\u0432\u0447\u0435\u043D\u043A\u043E",
  firstName: "\u0422\u0430\u0440\u0430\u0441",
  middleName: "\u0413\u0440\u0438\u0433\u043E\u0440\u043E\u0432\u0438\u0447"
};
function isDefinedAnthroponym(anthroponym) {
  return Boolean(
    anthroponym.gender && Object.values(Gender).includes(anthroponym.gender) && (anthroponym.firstName || anthroponym.middleName || anthroponym.lastName)
  );
}
const useDeclension = createSharedComposable((predefinedAnthroponym) => {
  let anthroponym = reactive({
    gender: Gender.Male,
    lastName: "",
    firstName: "",
    middleName: ""
  });
  let initialAnthroponym = reactive(shevchenkoAnthroponym);
  if (isDefinedAnthroponym(predefinedAnthroponym)) {
    initialAnthroponym = reactive(predefinedAnthroponym);
    anthroponym = reactive(predefinedAnthroponym);
  }
  const declensionResults = reactive({
    nominativeCase: inNominative(initialAnthroponym),
    genitiveCase: inGenitive(initialAnthroponym),
    dativeCase: inDative(initialAnthroponym),
    accusativeCase: inAccusative(initialAnthroponym),
    ablativeCase: inAblative(initialAnthroponym),
    locativeCase: inLocative(initialAnthroponym),
    vocativeCase: inVocative(initialAnthroponym)
  });
  function setAnthroponym(source) {
    anthroponym.gender = source.gender;
    anthroponym.lastName = source.lastName;
    anthroponym.firstName = source.firstName;
    anthroponym.middleName = source.middleName;
  }
  function inflect(source) {
    setAnthroponym(source);
    declensionResults.nominativeCase = inNominative(anthroponym);
    declensionResults.genitiveCase = inGenitive(anthroponym);
    declensionResults.dativeCase = inDative(anthroponym);
    declensionResults.accusativeCase = inAccusative(anthroponym);
    declensionResults.ablativeCase = inAblative(anthroponym);
    declensionResults.locativeCase = inLocative(anthroponym);
    declensionResults.vocativeCase = inVocative(anthroponym);
  }
  function detectGender(anthroponym2) {
    if (anthroponym2.middleName) {
      const middleName = anthroponym2.middleName.replace(/[`"]/g, "'").toLocaleLowerCase();
      if (/(и|і)ч$/.test(middleName)) {
        return Gender.Male;
      } else if (/на$/.test(middleName)) {
        return Gender.Female;
      }
    }
    if (anthroponym2.firstName) {
      const firstName = anthroponym2.firstName.replace(/[`"]/g, "'").toLocaleLowerCase();
      if (maleFirstNames.includes(firstName)) {
        return Gender.Male;
      } else if (femaleFirstNames.includes(firstName)) {
        return Gender.Female;
      }
    }
    return null;
  }
  return { anthroponym, declensionResults, inflect, detectGender };
});
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "declension-form",
  __ssrInlineRender: true,
  props: {
    initialAnthroponym: { type: Object, default: () => ({}) }
  },
  emits: ["declension"],
  setup(__props, { emit }) {
    const props = __props;
    const { initialAnthroponym } = toRefs(props);
    const { anthroponym, detectGender, inflect } = useDeclension(initialAnthroponym.value);
    const [isGenderError, showGenderError] = useToggle(false);
    const AutoGender = void 0;
    const genderOptions = [AutoGender, ...Object.values(Gender)];
    const formData = {
      gender: AutoGender,
      firstName: "",
      lastName: "",
      middleName: ""
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ContactMeButton = _sfc_main$f;
      _push(`<form${ssrRenderAttrs(mergeProps({ id: "declension-form" }, _attrs))}><div class="card"><div class="card-body"><div class="alert alert-info" role="alert">${ssrInterpolate(_ctx.$t("declensionForm.instructionMessage"))}</div><div class="form-group"><!--[-->`);
      ssrRenderList(genderOptions, (genderOption) => {
        _push(`<label class="radio-inline mr-2"${ssrRenderAttr("title", _ctx.$t("gender.message.autoDetection"))}><input${ssrIncludeBooleanAttr(ssrLooseEqual(formData.gender, genderOption)) ? " checked" : ""} type="radio" name="gender"${ssrRenderAttr("value", genderOption)}> ${ssrInterpolate(_ctx.$t(`gender.${genderOption}`))} `);
        if (genderOption === unref(AutoGender)) {
          _push(`<span> (${ssrInterpolate(_ctx.$t(`gender.${unref(anthroponym).gender}`))}) </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</label>`);
      });
      _push(`<!--]-->`);
      if (unref(isGenderError)) {
        _push(`<small style="${ssrRenderStyle(formData.gender === unref(AutoGender) ? null : { display: "none" })}" class="form-text text-danger">${ssrInterpolate(_ctx.$t("gender.message.detectionFailed"))}</small>`);
      } else {
        _push(`<small class="form-text text-muted">${ssrInterpolate(_ctx.$t("gender.message.autoDetection"))}</small>`);
      }
      _push(`</div><div class="form-group"><label for="last-name">${ssrInterpolate(_ctx.$t("anthroponym.lastName"))}</label><input${ssrRenderAttr("value", formData.lastName)} type="text" class="form-control" name="last-name" id="last-name"${ssrRenderAttr("placeholder", unref(shevchenkoAnthroponym).lastName)}></div><div class="form-group"><label for="first-name">${ssrInterpolate(_ctx.$t("anthroponym.firstName"))}</label><input${ssrRenderAttr("value", formData.firstName)} type="text" class="form-control" name="first-name" id="first-name"${ssrRenderAttr("placeholder", unref(shevchenkoAnthroponym).firstName)}></div><div class="form-group"><label for="middle-name">${ssrInterpolate(_ctx.$t("anthroponym.middleName"))}</label><input${ssrRenderAttr("value", formData.middleName)} type="text" class="form-control" name="middle-name" id="middle-name"${ssrRenderAttr("placeholder", unref(shevchenkoAnthroponym).middleName)}></div></div><div class="card-footer"><button type="submit" class="btn btn-primary">${ssrInterpolate(_ctx.$t("action.inflect"))}</button>`);
      _push(ssrRenderComponent(_component_ContactMeButton, { "button-class": "btn btn-link pull-right" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("foundBug"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("foundBug")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></form>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/declension-form.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "declension-results",
  __ssrInlineRender: true,
  setup(__props) {
    const { declensionResults } = useDeclension();
    function convertAnthroponymToString(anthroponym) {
      let output = [];
      if (anthroponym.lastName) {
        output.push(anthroponym.lastName);
      }
      if (anthroponym.firstName) {
        output.push(anthroponym.firstName);
      }
      if (anthroponym.middleName) {
        output.push(anthroponym.middleName);
      }
      return output.join(" ");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CopyButton = _sfc_main$c;
      _push(`<table${ssrRenderAttrs(mergeProps({ class: "table table-responsive-md m-0" }, _attrs))}><tr class="bg-light"><th class="border-top-0">${ssrInterpolate(_ctx.$t("grammaticalCase"))}</th><th class="border-top-0">${ssrInterpolate(_ctx.$t("anthroponym.lastName"))}</th><th class="border-top-0">${ssrInterpolate(_ctx.$t("anthroponym.firstName"))}</th><th class="border-top-0">${ssrInterpolate(_ctx.$t("anthroponym.middleName"))}</th><th class="border-top-0"><span class="py-0 px-1"><i class="fa fa-info-circle"${ssrRenderAttr("title", _ctx.$t("declensionForm.copyMessage"))}${ssrRenderAttr("aria-label", _ctx.$t("declensionForm.copyMessage"))}></i></span></th></tr><tr><th>${ssrInterpolate(_ctx.$t("grammaticalCase.nominative"))}</th><td>${ssrInterpolate(unref(declensionResults).nominativeCase.lastName)}</td><td>${ssrInterpolate(unref(declensionResults).nominativeCase.firstName)}</td><td>${ssrInterpolate(unref(declensionResults).nominativeCase.middleName)}</td><td>`);
      _push(ssrRenderComponent(_component_CopyButton, {
        "button-id": "copy-nominative-case-button",
        source: convertAnthroponymToString(unref(declensionResults).nominativeCase)
      }, null, _parent));
      _push(`</td></tr><tr><th>${ssrInterpolate(_ctx.$t("grammaticalCase.genitive"))}</th><td>${ssrInterpolate(unref(declensionResults).genitiveCase.lastName)}</td><td>${ssrInterpolate(unref(declensionResults).genitiveCase.firstName)}</td><td>${ssrInterpolate(unref(declensionResults).genitiveCase.middleName)}</td><td>`);
      _push(ssrRenderComponent(_component_CopyButton, {
        "button-id": "copy-genitive-case-button",
        source: convertAnthroponymToString(unref(declensionResults).genitiveCase)
      }, null, _parent));
      _push(`</td></tr><tr><th>${ssrInterpolate(_ctx.$t("grammaticalCase.dative"))}</th><td>${ssrInterpolate(unref(declensionResults).dativeCase.lastName)}</td><td>${ssrInterpolate(unref(declensionResults).dativeCase.firstName)}</td><td>${ssrInterpolate(unref(declensionResults).dativeCase.middleName)}</td><td>`);
      _push(ssrRenderComponent(_component_CopyButton, {
        "button-id": "copy-dative-case-button",
        source: convertAnthroponymToString(unref(declensionResults).dativeCase)
      }, null, _parent));
      _push(`</td></tr><tr><th>${ssrInterpolate(_ctx.$t("grammaticalCase.accusative"))}</th><td>${ssrInterpolate(unref(declensionResults).accusativeCase.lastName)}</td><td>${ssrInterpolate(unref(declensionResults).accusativeCase.firstName)}</td><td>${ssrInterpolate(unref(declensionResults).accusativeCase.middleName)}</td><td>`);
      _push(ssrRenderComponent(_component_CopyButton, {
        "button-id": "copy-accusative-case-button",
        source: convertAnthroponymToString(unref(declensionResults).accusativeCase)
      }, null, _parent));
      _push(`</td></tr><tr><th>${ssrInterpolate(_ctx.$t("grammaticalCase.ablative"))}</th><td>${ssrInterpolate(unref(declensionResults).ablativeCase.lastName)}</td><td>${ssrInterpolate(unref(declensionResults).ablativeCase.firstName)}</td><td>${ssrInterpolate(unref(declensionResults).ablativeCase.middleName)}</td><td>`);
      _push(ssrRenderComponent(_component_CopyButton, {
        "button-id": "copy-ablative-case-button",
        source: convertAnthroponymToString(unref(declensionResults).ablativeCase)
      }, null, _parent));
      _push(`</td></tr><tr><th>${ssrInterpolate(_ctx.$t("grammaticalCase.locative"))}</th><td>${ssrInterpolate(unref(declensionResults).locativeCase.lastName)}</td><td>${ssrInterpolate(unref(declensionResults).locativeCase.firstName)}</td><td>${ssrInterpolate(unref(declensionResults).locativeCase.middleName)}</td><td>`);
      _push(ssrRenderComponent(_component_CopyButton, {
        "button-id": "copy-locative-case-button",
        source: convertAnthroponymToString(unref(declensionResults).locativeCase)
      }, null, _parent));
      _push(`</td></tr><tr><th>${ssrInterpolate(_ctx.$t("grammaticalCase.vocative"))}</th><td>${ssrInterpolate(unref(declensionResults).vocativeCase.lastName)}</td><td>${ssrInterpolate(unref(declensionResults).vocativeCase.firstName)}</td><td>${ssrInterpolate(unref(declensionResults).vocativeCase.middleName)}</td><td>`);
      _push(ssrRenderComponent(_component_CopyButton, {
        "button-id": "copy-vocative-case-button",
        source: convertAnthroponymToString(unref(declensionResults).vocativeCase)
      }, null, _parent));
      _push(`</td></tr></table>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/declension-results.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const declensionDemo_vue_vue_type_style_index_0_scoped_89692532_lang = "";
const _sfc_main$8 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  const _component_ShareLinks = __nuxt_component_0;
  const _component_DeclensionForm = _sfc_main$a;
  const _component_DeclensionResults = _sfc_main$9;
  _push(`<section${ssrRenderAttrs(mergeProps({
    id: "demo",
    class: "my-4"
  }, _attrs))} data-v-89692532><div class="row mb-3" data-v-89692532><div class="col-12 col-lg-9" data-v-89692532><h2 class="mb-0" data-v-89692532>${ssrInterpolate(_ctx.$t("demo"))} <small class="d-block h6 text-muted mt-2 mb-0 sentence-capitalize" data-v-89692532>${ssrInterpolate(_ctx.$t("demo.message"))}</small></h2></div><div class="col-12 col-lg-3" data-v-89692532><div class="d-flex" data-v-89692532>`);
  _push(ssrRenderComponent(_component_ShareLinks, { "buttons-class": "ml-auto" }, null, _parent));
  _push(`</div></div></div><div class="row" data-v-89692532><div class="col-lg-5 mb-2 mb-lg-0" data-v-89692532>`);
  _push(ssrRenderComponent(_component_DeclensionForm, _ctx.$attrs, null, _parent));
  _push(`</div><div class="col-lg-7" data-v-89692532><div class="card mb-2" data-v-89692532>`);
  _push(ssrRenderComponent(_component_DeclensionResults, null, null, _parent));
  _push(`</div></div></div></section>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/declension-demo.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-89692532"]]);
const _sfc_main$7 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  if (_ctx.$i18n.locale === "uk-UA") {
    _push(`<section${ssrRenderAttrs(mergeProps({
      id: "how-it-works",
      class: "my-4"
    }, _attrs))}><div class="row"><div class="col"><h2>${ssrInterpolate(_ctx.$t("howItWorks"))}</h2></div></div><div class="row"><div class="col"><div class="mt-3"><p> \u0411\u0456\u0431\u043B\u0456\u043E\u0442\u0435\u043A\u0430 \u0432\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u0454 \u0431\u0456\u043B\u044C\u0448\u0435 \u0432\u0456\u0441\u0456\u043C\u0434\u0435\u0441\u044F\u0442\u0438 \u043F\u0440\u0430\u0432\u0438\u043B \u0434\u043B\u044F \u0432\u0456\u0434\u043C\u0456\u043D\u044E\u0432\u0430\u043D\u043D\u044F \u043F\u0440\u0456\u0437\u0432\u0438\u0449, \u0456\u043C\u0435\u043D \u0442\u0430 \u043F\u043E \u0431\u0430\u0442\u044C\u043A\u043E\u0432\u0456. \u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u0444\u0456\u043B\u044C\u0442\u0440\u0443\u044E\u0442\u044C\u0441\u044F \u0437\u0430 \u0440\u043E\u0434\u043E\u043C, \u0437\u0430\u043A\u0456\u043D\u0447\u0435\u043D\u043D\u044F\u043C, \u0447\u0430\u0441\u0442\u0438\u043D\u043E\u044E \u043C\u043E\u0432\u0438, \u0441\u0444\u0435\u0440\u043E\u044E \u0437\u0430\u0441\u0442\u043E\u0441\u0443\u0432\u0430\u043D\u043D\u044F \u0442\u0430 \u0441\u043E\u0440\u0442\u0443\u044E\u0442\u044C\u0441\u044F \u0437\u0430 \u043F\u0440\u0456\u043E\u0440\u0438\u0442\u0435\u0442\u043E\u043C. </p><p> \u041F\u0440\u0438 \u0432\u0456\u0434\u043C\u0456\u043D\u044E\u0432\u0430\u043D\u043D\u0456 \u0436\u0456\u043D\u043E\u0447\u0438\u0445 \u043F\u0440\u0456\u0437\u0432\u0438\u0449 \u0456\u0437 \u0437\u0430\u043A\u0456\u043D\u0447\u0435\u043D\u043D\u044F\u043C\u0438 \u043D\u0430 -\u0430, -\u044F \u0442\u0430 \u0447\u043E\u043B\u043E\u0432\u0456\u0447\u0438\u0445 \u043F\u0440\u0456\u0437\u0432\u0438\u0449 \u0456\u0437 \u0437\u0430\u043A\u0456\u043D\u0447\u0435\u043D\u043D\u044F\u043C\u0438 \u043D\u0430 -\u043E\u0439, -\u0456\u0439, -\u0438\u0439, -\u0438\u0445 \u0434\u043B\u044F \u0432\u0438\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F \u0447\u0430\u0441\u0442\u0438\u043D\u0438 \u043C\u043E\u0432\u0438 \u0441\u043B\u043E\u0432\u0430 \u0432\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u044E\u0442\u044C\u0441\u044F \u043D\u0435\u0439\u0440\u043E\u043D\u043D\u0456 \u043C\u0435\u0440\u0435\u0436\u0456, \u043D\u0430\u0432\u0447\u0435\u043D\u0456 \u043D\u0430 \u0431\u0456\u043B\u044C\u0448 \u044F\u043A \u0441\u043E\u0440\u043E\u043A\u0430 \u0442\u0438\u0441\u044F\u0447\u0430\u0445 \u043F\u0440\u0456\u0437\u0432\u0438\u0449\u0430\u0445. \u0422\u043E\u043C\u0443 \u043F\u0440\u0456\u0437\u0432\u0438\u0449\u0430 \u0456\u043C\u0435\u043D\u043D\u0438\u043A\u043E\u0432\u043E\u0433\u043E \u0442\u0430 \u043F\u0440\u0438\u043A\u043C\u0435\u0442\u043D\u0438\u043A\u043E\u0432\u043E\u0433\u043E \u043F\u043E\u0445\u043E\u0434\u0436\u0435\u043D\u044C \u0432\u0456\u0434\u043C\u0456\u043D\u044E\u044E\u0442\u044C\u0441\u044F \u044F\u043A \u0456\u043C\u0435\u043D\u043D\u0438\u043A\u0438 \u0442\u0430 \u043F\u0440\u0438\u043A\u043C\u0435\u0442\u043D\u0438\u043A\u0438 \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u043D\u043E, \u043D\u0430\u043F\u0440\u0438\u043A\u043B\u0430\u0434, \u0414\u0438\u043D\u044F (\u043D\u0430\u0437\u0438\u0432\u043D\u0438\u0439) \u2192 \u0414\u0438\u043D\u0456 (\u0440\u043E\u0434\u043E\u0432\u0438\u0439), \u0421\u0438\u043D\u044F (\u043D\u0430\u0437\u0438\u0432\u043D\u0438\u0439) \u2192 \u0421\u0438\u043D\u044C\u043E\u0457 (\u0440\u043E\u0434\u043E\u0432\u0438\u0439), \u0420\u0438\u0439 (\u043D\u0430\u0437\u0438\u0432\u043D\u0438\u0439) \u2192 \u0420\u0438\u044F (\u0440\u043E\u0434\u043E\u0432\u0438\u0439), \u0411\u0443\u0440\u0438\u0439 (\u043D\u0430\u0437\u0438\u0432\u043D\u0438\u0439) \u2192 \u0411\u0443\u0440\u043E\u0433\u043E (\u0440\u043E\u0434\u043E\u0432\u0438\u0439). </p><p> \u041F\u0440\u0438 \u0432\u0456\u0434\u043C\u0456\u043D\u044E\u0432\u0430\u043D\u043D\u0456 \u0432\u0456\u0434\u0431\u0443\u0432\u0430\u044E\u0442\u044C\u0441\u044F \u0437\u043C\u0456\u043D\u0438 \u0433\u043E\u043B\u043E\u0441\u043D\u0438\u0445 \u0442\u0430 \u043F\u0440\u0438\u0433\u043E\u043B\u043E\u0441\u043D\u0438\u0445 \u0437\u0432\u0443\u043A\u0456\u0432 \u0437\u0433\u0456\u0434\u043D\u043E \u0437 \u043F\u0440\u0430\u0432\u0438\u043B\u0430\u043C\u0438 \u0443\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u043E\u0457 \u043C\u043E\u0432\u0438, \u043D\u0430\u043F\u0440\u0438\u043A\u043B\u0430\u0434, \u0421\u0438\u0432\u043E\u043A\u0456\u043D\u044C (\u043D\u0430\u0437\u0438\u0432\u043D\u0438\u0439) \u2192 \u0421\u0438\u0432\u043E\u043A\u043E\u043D\u044F (\u0440\u043E\u0434\u043E\u0432\u0438\u0439), \u0413\u0438\u0447\u043A\u0430 (\u043D\u0430\u0437\u0438\u0432\u043D\u0438\u0439) \u2192 \u0413\u0438\u0447\u0446\u0456 (\u0434\u0430\u0432\u0430\u043B\u044C\u043D\u0438\u0439), \u0430\u043B\u0435 \u0427\u043C\u0456\u043B\u044C (\u043D\u0430\u0437\u0438\u0432\u043D\u0438\u0439) \u2192 \u0427\u043C\u0456\u043B\u044F (\u0440\u043E\u0434\u043E\u0432\u0438\u0439). </p><p> \u0421\u043A\u043B\u0430\u0434\u0435\u043D\u0456 \u043F\u0440\u0456\u0437\u0432\u0438\u0449\u0430, \u0443\u0442\u0432\u043E\u0440\u0435\u043D\u0456 \u043F\u043E\u0454\u0434\u043D\u0430\u043D\u043D\u044F\u043C \u0434\u0432\u043E\u0445 \u0441\u0430\u043C\u043E\u0441\u0442\u0456\u0439\u043D\u0438\u0445 \u043F\u0440\u0456\u0437\u0432\u0438\u0449 \u0432\u0456\u0434\u043C\u0456\u043D\u044E\u044E\u0442\u044C\u0441\u044F \u0437\u0430 \u043F\u0440\u0430\u0432\u0438\u043B\u0430\u043C\u0438 \u0432\u0456\u0434\u043C\u0456\u043D\u044E\u0432\u0430\u043D\u043D\u044F \u043A\u043E\u0436\u043D\u043E\u0457 \u0441\u043A\u043B\u0430\u0434\u043E\u0432\u043E\u0457 \u0447\u0430\u0441\u0442\u0438\u043D\u0438, \u043D\u0430\u043F\u0440\u0438\u043A\u043B\u0430\u0434, \u041D\u0435\u0447\u0443\u0439-\u041B\u0435\u0432\u0438\u0446\u044C\u043A\u0438\u0439 (\u043D\u0430\u0437\u0438\u0432\u043D\u0438\u0439) - \u041D\u0435\u0447\u0443\u044F-\u041B\u0435\u0432\u0438\u0446\u044C\u043A\u043E\u0433\u043E (\u0440\u043E\u0434\u043E\u0432\u0438\u0439), \u0430\u043B\u0435 \u0414\u0440\u0430\u0439-\u0425\u043C\u0430\u0440\u0430 (\u043D\u0430\u0437\u0438\u0432\u043D\u0438\u0439) \u2014 \u0414\u0440\u0430\u0439-\u0425\u043C\u0430\u0440\u0438 (\u0440\u043E\u0434\u043E\u0432\u0438\u0439), \u0431\u043E \u043F\u0435\u0440\u0448\u0430 \u043A\u043E\u0440\u043E\u0442\u043A\u0430 \u0447\u0430\u0441\u0442\u0438\u043D\u0430 \u0441\u043A\u043B\u0430\u0434\u0435\u043D\u043E\u0433\u043E \u043F\u0440\u0456\u0437\u0432\u0438\u0449\u0430 \u0454 \u043E\u0434\u043D\u043E\u0441\u043A\u043B\u0430\u0434\u043E\u0432\u043E\u044E \u0442\u0430 \u0441\u043F\u0440\u0438\u0439\u043C\u0430\u0454\u0442\u044C\u0441\u044F \u043D\u0435 \u044F\u043A \u0441\u0430\u043C\u043E\u0441\u0442\u0456\u0439\u043D\u0435 \u043F\u0440\u0456\u0437\u0432\u0438\u0449\u0435, \u0430 \u044F\u043A \u043F\u0440\u0438\u0441\u0442\u0430\u0432\u043A\u0430 \u0434\u043E \u0434\u0440\u0443\u0433\u043E\u0433\u043E \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u0430. </p><p> \u0421\u043A\u043B\u0430\u0434\u0435\u043D\u0456 \u0456\u043C\u0435\u043D\u0430, \u0443\u0442\u0432\u043E\u0440\u0435\u043D\u0456 \u043F\u043E\u0454\u0434\u043D\u0430\u043D\u043D\u044F\u043C \u0434\u0432\u043E\u0445 \u0441\u0430\u043C\u043E\u0441\u0442\u0456\u0439\u043D\u0438\u0445 \u0456\u043C\u0435\u043D \u0432\u0456\u0434\u043C\u0456\u043D\u044E\u044E\u0442\u044C\u0441\u044F \u0437\u0433\u0456\u0434\u043D\u043E \u0437 \u043F\u0440\u0430\u0432\u0438\u043B\u0430\u043C\u0438 \u0432\u0456\u0434\u043C\u0456\u043D\u044E\u0432\u0430\u043D\u043D\u044F \u043A\u043E\u0436\u043D\u043E\u0457 \u0441\u043A\u043B\u0430\u0434\u043E\u0432\u043E\u0457 \u0447\u0430\u0441\u0442\u0438\u043D\u0438, \u043D\u0430\u043F\u0440\u0438\u043A\u043B\u0430\u0434, \u0410\u043D\u043D\u0430-\u041C\u0430\u0440\u0456\u044F (\u043D\u0430\u0437\u0438\u0432\u043D\u0438\u0439) - \u0410\u043D\u043D\u0438-\u041C\u0430\u0440\u0456\u0457 (\u0440\u043E\u0434\u043E\u0432\u0438\u0439). </p></div></div></div></section>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/how-it-works.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "installation-instructions",
  __ssrInlineRender: true,
  setup(__props) {
    const appConfig = useAppConfig();
    const npmInstallCommand = `npm install --save ${appConfig.library.name}`;
    const nodeRequireCode = `const ${appConfig.library.name} = require("${appConfig.library.name}");`;
    const browserScriptCode = `<\u200Dscript type="text/javascript" src="${appConfig.library.cdnUrl}"><\u200D/script>`;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CopyButton = _sfc_main$c;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "installation",
        class: "card my-3"
      }, _attrs))}><div class="card-body"><h5 class="card-title mb-3">${ssrInterpolate(_ctx.$t("installation"))}</h5><h6 class="card-subtitle mb-2 text-muted">npm</h6><div class="d-flex align-items-center mb-3"><pre class="mb-0">${ssrInterpolate(npmInstallCommand)}</pre>`);
      _push(ssrRenderComponent(_component_CopyButton, { source: npmInstallCommand }, null, _parent));
      _push(`</div><h6 class="card-subtitle mb-2 text-muted">Node.js</h6><div class="d-flex align-items-center mb-3"><pre class="mb-0">${ssrInterpolate(nodeRequireCode)}</pre>`);
      _push(ssrRenderComponent(_component_CopyButton, { source: nodeRequireCode }, null, _parent));
      _push(`</div><h6 class="card-subtitle mb-2 text-muted">${ssrInterpolate(_ctx.$t("browser"))}</h6><div class="d-flex align-items-center mb-3"><pre class="mb-0">${ssrInterpolate(browserScriptCode)}</pre>`);
      _push(ssrRenderComponent(_component_CopyButton, { source: browserScriptCode }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/installation-instructions.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "usage-example",
  __ssrInlineRender: true,
  setup(__props) {
    const appConfig = useAppConfig();
    const usageExample = `
const anthroponym = {
  gender: 'male', // or 'female'
  firstName: '\u0422\u0430\u0440\u0430\u0441',
  middleName: '\u0413\u0440\u0438\u0433\u043E\u0440\u043E\u0432\u0438\u0447',
  lastName: '\u0428\u0435\u0432\u0447\u0435\u043D\u043A\u043E'
};

const result = shevchenko.inVocative(anthroponym);

console.log(result); // { gender: "male", firstName: "\u0422\u0430\u0440\u0430\u0441\u0435", middleName: "\u0413\u0440\u0438\u0433\u043E\u0440\u043E\u0432\u0438\u0447\u0443", lastName: "\u0428\u0435\u0432\u0447\u0435\u043D\u043A\u0443" }
`;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "usage-example",
        class: "card my-3"
      }, _attrs))}><div class="card-body"><h5 class="card-title mb-3">${ssrInterpolate(_ctx.$t("usageExample"))} <small><a${ssrRenderAttr("href", unref(appConfig).library.runKitUrl)} target="_blank">${ssrInterpolate(_ctx.$t("action.tryItOut"))}</a></small></h5><pre class="mb-0">${ssrInterpolate(usageExample.trim())}</pre></div></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/usage-example.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "api-spec",
  __ssrInlineRender: true,
  setup(__props) {
    const { t: $t } = useI18n();
    let apiSpec = `
shevchenko.inNominative(anthroponym: Anthroponym): Anthroponym; // ${$t("action.inflect.inNominativeCase")}
shevchenko.inGenitive(anthroponym: Anthroponym): Anthroponym;   // ${$t("action.inflect.inGenitiveCase")}
shevchenko.inDative(anthroponym: Anthroponym): Anthroponym;     // ${$t("action.inflect.inDativeCase")}
shevchenko.inAccusative(anthroponym: Anthroponym): Anthroponym; // ${$t("action.inflect.inAccusativeCase")}
shevchenko.inAblative(anthroponym: Anthroponym): Anthroponym;   // ${$t("action.inflect.inAblativeCase")}
shevchenko.inLocative(anthroponym: Anthroponym): Anthroponym;   // ${$t("action.inflect.inLocativeCase")}
shevchenko.inVocative(anthroponym: Anthroponym): Anthroponym;   // ${$t("action.inflect.inVocativeCase")}
`;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "api-spec",
        class: "card my-3"
      }, _attrs))}><div class="card-body"><h5 class="card-title mb-3">API</h5><pre class="mb-0">${ssrInterpolate(unref(apiSpec).trim())}</pre></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/api-spec.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_InstallationInstructions = _sfc_main$6;
  const _component_UsageExample = _sfc_main$5;
  const _component_ApiSpec = _sfc_main$4;
  _push(`<section${ssrRenderAttrs(mergeProps({
    id: "documentation",
    class: "my-4"
  }, _attrs))}><div class="row"><div class="col"><h2>${ssrInterpolate(_ctx.$t("documentation"))}</h2></div></div><div class="row"><div class="col">`);
  _push(ssrRenderComponent(_component_InstallationInstructions, null, null, _parent));
  _push(`</div></div><div class="row"><div class="col">`);
  _push(ssrRenderComponent(_component_UsageExample, null, null, _parent));
  _push(`</div></div><div class="row"><div class="col">`);
  _push(ssrRenderComponent(_component_ApiSpec, null, null, _parent));
  _push(`</div></div></section>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/library-docs.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "contact-me-modal",
  __ssrInlineRender: true,
  setup(__props) {
    const appConfig = useAppConfig();
    const { t: $t } = useI18n();
    const mailtoUrl = computed(() => {
      const url = new URL(`mailto:${appConfig.website.email}`);
      url.searchParams.set("subject", $t("contactMe.messageSubject").toString());
      return url.toString();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "contact-me-modal",
        class: "modal fade",
        tabindex: "-1",
        role: "dialog",
        "aria-labelledby": "contact-me-label"
      }, _attrs))}><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h4 id="contact-me-label" class="modal-title">${ssrInterpolate(unref($t)("contactMe.modalTitle"))}</h4><button type="button" class="close" data-dismiss="modal"${ssrRenderAttr("aria-label", unref($t)("action.close"))}><span aria-hidden="true">\xD7</span></button></div><div class="modal-body"><p>${ssrInterpolate(unref($t)("contactMe.modalMessage"))}</p><div class="input-group mb-3"><input${ssrRenderAttr("value", unref(appConfig).website.email)} readonly type="email" class="form-control"${ssrRenderAttr("aria-label", unref($t)("contactMe.recipientEmail"))}></div></div><div class="modal-footer"><button type="button" class="btn btn-outline-secondary" data-dismiss="modal">${ssrInterpolate(unref($t)("action.close"))}</button><a target="_blank"${ssrRenderAttr("href", unref(mailtoUrl))} class="btn btn-primary"><i aria-hidden="true" class="fa fa-paper-plane"></i> ${ssrInterpolate(unref($t)("action.write"))}</a></div></div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/contact-me-modal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "about-modal",
  __ssrInlineRender: true,
  setup(__props) {
    const appConfig = useAppConfig();
    useRoute();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageCopyright = _sfc_main$g;
      const _component_ContactMeButton = _sfc_main$f;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "about-modal",
        class: "modal fade",
        tabindex: "-1",
        role: "dialog",
        "aria-labelledby": "about-label"
      }, _attrs))}><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h4 id="about-label" class="modal-title">${ssrInterpolate(_ctx.$t("about.modalTitle", { appName: unref(appConfig).library.name }))}</h4><button type="button" class="close" data-dismiss="modal"${ssrRenderAttr("aria-label", _ctx.$t("action.close"))}><span aria-hidden="true">\xD7</span></button></div><div class="modal-body"><p>${ssrInterpolate(_ctx.$t("about.modalMessage"))}</p></div><div class="modal-footer"><nav><ul class="list-unstyled mb-0" role="menubar"><p class="d-inline mr-2 mb-0">`);
      _push(ssrRenderComponent(_component_PageCopyright, null, null, _parent));
      _push(`</p><p class="d-inline mr-2 mb-0">`);
      _push(ssrRenderComponent(_component_ContactMeButton, {
        "data-dismiss": "modal",
        "button-class": "btn btn-link p-0"
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
      _push(`</p></ul></nav></div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/about-modal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const usePageI18n = (options) => {
  const { locale } = useI18n();
  locale.value = options.locale;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    usePageI18n({
      locale: "uk-UA"
    });
    const appConfig = useAppConfig();
    const { t: $t } = useI18n();
    useRoute();
    const { pageUrl } = useRouteUtils();
    const router = useRouter();
    const { buildPageTitle } = usePageMeta();
    const defaultPageTitle = computed(() => {
      const title = $t("app.name").toString();
      return buildPageTitle(title);
    });
    const pageTitle = ref(defaultPageTitle.value);
    useHead({
      title: pageTitle,
      link: [
        { rel: "canonical", href: buildPageUrl("/") }
      ],
      meta: [
        { property: "og:image", content: buildPageUrl("/preview-608x608.jpg") },
        { property: "og:image:width", content: "608" },
        { property: "og:image:height", content: "608" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: pageUrl },
        { property: "og:site_name", content: appConfig.library.name },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: pageTitle },
        { name: "twitter:image", content: buildPageUrl("/preview-608x608.jpg") },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: pageTitle }
      ]
    });
    async function updatePageTitle(anthroponym) {
      await router.replace({ query: {} });
      await router.replace({ query: { ...anthroponym } });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageHeader = __nuxt_component_1;
      const _component_PreviewBanner = _sfc_main$d;
      const _component_DeclensionDemo = __nuxt_component_2;
      const _component_HowItWorks = __nuxt_component_3;
      const _component_LibraryDocs = __nuxt_component_4;
      const _component_PageFooter = _sfc_main$h;
      const _component_ContactMeModal = _sfc_main$2;
      const _component_AboutModal = _sfc_main$1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_PageHeader, null, null, _parent));
      _push(ssrRenderComponent(_component_PreviewBanner, null, null, _parent));
      _push(ssrRenderComponent(_component_DeclensionDemo, {
        "initial-anthroponym": _ctx.$route.query,
        onDeclension: updatePageTitle
      }, null, _parent));
      _push(ssrRenderComponent(_component_HowItWorks, null, null, _parent));
      _push(ssrRenderComponent(_component_LibraryDocs, null, null, _parent));
      _push(ssrRenderComponent(_component_PageFooter, null, null, _parent));
      _push(ssrRenderComponent(_component_ContactMeModal, null, null, _parent));
      _push(ssrRenderComponent(_component_AboutModal, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main
}, Symbol.toStringTag, { value: "Module" }));
export {
  _sfc_main as _,
  index as i,
  usePageI18n as u
};
//# sourceMappingURL=index.2e215246.js.map
