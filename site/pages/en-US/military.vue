<script>
import MilitaryPage from '~/pages/military.vue';

export default {
  ...MilitaryPage,
  setup(_, context) {
    const props = reactive({ locale: 'en-US' });
    return MilitaryPage.setup.call(this, props, context);
  },
};
</script>
