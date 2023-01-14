<script setup lang="ts">
import { Anthroponym, Gender } from 'shevchenko';
import { toRefs, PropType } from 'vue';
import { shevchenkoAnthroponym, useDeclension } from '~/composables/declension';

const props = defineProps({
  initialAnthroponym: { type: Object as PropType<Anthroponym>, default: () => ({}) },
});

const { initialAnthroponym } = toRefs(props);

const emit = defineEmits(['declension']);

const { anthroponym, inflect } = useDeclension(initialAnthroponym.value);

function onInflect(): void {
  inflect();
  emit('declension', anthroponym);
}
</script>

<template>
  <form id="declension-form" @submit.prevent="onInflect">
    <div class="card">
      <div class="card-body">
        <div class="alert alert-info" role="alert">
          {{ $t('declensionForm.instructionMessage') }}
        </div>

        <div class="form-group">
          <label class="radio-inline mr-2" v-for="gender in Gender" :key="gender">
            <input v-model="anthroponym.gender" type="radio" name="gender" :value="gender" />
            {{ $t(`gender.${gender}`) }}
          </label>
        </div>

        <div class="form-group">
          <label for="last-name">
            {{ $t('anthroponym.lastName') }}
          </label>
          <input
            v-model.trim="anthroponym.lastName"
            type="text"
            class="form-control"
            name="last-name"
            id="last-name"
            :placeholder="shevchenkoAnthroponym.lastName"
          />
        </div>

        <div class="form-group">
          <label for="first-name">
            {{ $t('anthroponym.firstName') }}
          </label>
          <input
            v-model.trim="anthroponym.firstName"
            type="text"
            class="form-control"
            name="first-name"
            id="first-name"
            :placeholder="shevchenkoAnthroponym.firstName"
          />
        </div>

        <div class="form-group">
          <label for="middle-name">
            {{ $t('anthroponym.middleName') }}
          </label>
          <input
            v-model.trim="anthroponym.middleName"
            type="text"
            class="form-control"
            name="middle-name"
            id="middle-name"
            :placeholder="shevchenkoAnthroponym.middleName"
          />
        </div>
      </div>

      <div class="card-footer">
        <button type="submit" class="btn btn-primary">
          {{ $t('action.inflect') }}
        </button>

        <ContactMeButton button-class="btn btn-link pull-right">
          {{ $t('foundBug') }}
        </ContactMeButton>
      </div>
    </div>
  </form>
</template>
