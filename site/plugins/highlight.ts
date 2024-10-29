import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('javascript', javascript);

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.directive('source-code', {
    deep: true,
    beforeMount(element: HTMLElement, binding) {
      if (process.client) {
        const targets = element.querySelectorAll('code');
        targets.forEach((target) => {
          if (binding.value) {
            target.textContent = binding.value;
          }
          hljs.highlightElement(target);
        });
      }
    },
    updated(element: HTMLElement, binding) {
      if (process.client) {
        const targets = element.querySelectorAll('code');
        targets.forEach((target) => {
          if (binding.value) {
            target.textContent = binding.value;
            hljs.highlightElement(target);
          }
        });
      }
    },
  });
});
