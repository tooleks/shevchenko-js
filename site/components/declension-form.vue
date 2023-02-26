<script setup lang="ts">
import { useToggle } from '@vueuse/core';
import { GrammaticalGender, DeclensionInput, detectGender } from 'shevchenko';
import { onMounted, PropType, toRefs } from 'vue';
import {
  shevchenkoAnthroponym,
  useDeclension,
  isShevchenkoAnthroponym,
} from '~/composables/declension';

const props = defineProps({
  initialAnthroponym: { type: Object as PropType<DeclensionInput>, default: () => ({}) },
});

const { initialAnthroponym } = toRefs(props);

const emit = defineEmits(['declension']);

const { anthroponym, inflect } = await useDeclension(initialAnthroponym.value);
const [isGenderError, showGenderError] = useToggle(false);

const AUTO_GENDER_OPTION = undefined;
const genderOptions = [AUTO_GENDER_OPTION, ...Object.values(GrammaticalGender)];

interface FormData {
  gender: GrammaticalGender | typeof AUTO_GENDER_OPTION;
  familyName?: string;
  givenName?: string;
  patronymicName?: string;
}

const formData: FormData = {
  gender: AUTO_GENDER_OPTION,
  familyName: '',
  givenName: '',
  patronymicName: '',
};

function setFormData(data: FormData): void {
  formData.gender = data.gender;
  formData.familyName = data.familyName;
  formData.givenName = data.givenName;
  formData.patronymicName = data.patronymicName;
}

onMounted(() => {
  if (!isShevchenkoAnthroponym(initialAnthroponym.value)) {
    setFormData(initialAnthroponym.value);
  }
});

async function onInflect(): Promise<void> {
  let { gender, familyName, givenName, patronymicName } = formData;

  if (gender == null) {
    gender = (await detectGender({ familyName, givenName, patronymicName })) ?? AUTO_GENDER_OPTION;
    if (gender == null) {
      showGenderError(true);
      return;
    }
  }

  showGenderError(false);
  await inflect({ gender, familyName, givenName, patronymicName });
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
          <label
            class="radio-inline mr-2"
            v-for="genderOption in genderOptions"
            :key="genderOption"
            :title="$t('gender.message.autoDetection')"
          >
            <input v-model="formData.gender" type="radio" name="gender" :value="genderOption" />
            {{ $t(`gender.${genderOption}`) }}
            <span v-if="genderOption === AUTO_GENDER_OPTION">
              ({{ $t(`gender.${anthroponym.gender}`) }})
            </span>
          </label>

          <small
            v-if="isGenderError"
            v-show="formData.gender === AUTO_GENDER_OPTION"
            class="form-text text-danger"
          >
            {{ $t('gender.message.detectionFailed') }}
          </small>

          <small v-else class="form-text text-muted">
            {{ $t('gender.message.autoDetection') }}
          </small>
        </div>

        <div class="form-group">
          <label for="family-name">
            {{ $t('anthroponym.familyName') }}
          </label>
          <input
            v-model.trim="formData.familyName"
            type="text"
            class="form-control"
            name="family-name"
            id="family-name"
            :placeholder="shevchenkoAnthroponym.familyName"
          />
        </div>

        <div class="form-group">
          <label for="given-name">
            {{ $t('anthroponym.givenName') }}
          </label>
          <input
            v-model.trim="formData.givenName"
            type="text"
            class="form-control"
            name="given-name"
            id="given-name"
            :placeholder="shevchenkoAnthroponym.givenName"
          />
        </div>

        <div class="form-group">
          <label for="patronymic-name">
            {{ $t('anthroponym.patronymicName') }}
          </label>
          <input
            v-model.trim="formData.patronymicName"
            type="text"
            class="form-control"
            name="patronymic-name"
            id="patronymic-name"
            :placeholder="shevchenkoAnthroponym.patronymicName"
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
