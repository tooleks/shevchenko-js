<script>
import IndexPage from '~/pages/index.vue';

export default {
  ...IndexPage,
  setup(_, context) {
    const props = reactive({ locale: 'en-US' });
    return IndexPage.setup.call(this, props, context);
  },
};
</script>
