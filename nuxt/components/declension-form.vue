<script setup lang="ts">
import { useToggle } from '@vueuse/core';
import { Anthroponym, Gender } from 'shevchenko';
import { onMounted, PropType, toRefs } from 'vue';
import {
  shevchenkoAnthroponym,
  useDeclension,
  isShevchenkoAnthroponym,
} from '~/composables/declension';

const props = defineProps({
  initialAnthroponym: { type: Object as PropType<Anthroponym>, default: () => ({}) },
});

const { initialAnthroponym } = toRefs(props);

const emit = defineEmits(['declension']);

const { anthroponym, detectGender, inflect } = useDeclension(initialAnthroponym.value);
const [isGenderError, showGenderError] = useToggle(false);

const AutoGender = undefined;
const genderOptions = [AutoGender, ...Object.values(Gender)];

interface FormData {
  gender: Gender | typeof AutoGender;
  firstName?: string;
  lastName?: string;
  middleName?: string;
}

const formData: FormData = {
  gender: AutoGender,
  firstName: '',
  lastName: '',
  middleName: '',
};

function setFormData(data: FormData): void {
  formData.gender = data.gender;
  formData.firstName = data.firstName;
  formData.lastName = data.lastName;
  formData.middleName = data.middleName;
}

onMounted(() => {
  if (!isShevchenkoAnthroponym(initialAnthroponym.value)) {
    setFormData(initialAnthroponym.value);
  }
});

function onInflect(): void {
  let { gender, firstName, lastName, middleName } = formData;

  if (gender == null) {
    gender = detectGender({ firstName, lastName, middleName }) ?? AutoGender;
    if (gender == null) {
      showGenderError(true);
      return;
    }
  }

  showGenderError(false);
  inflect({ gender, firstName, lastName, middleName });
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
            <span v-if="genderOption === AutoGender">
              ({{ $t(`gender.${anthroponym.gender}`) }})
            </span>
          </label>
          <small
            v-if="isGenderError"
            v-show="formData.gender === AutoGender"
            class="form-text text-danger"
          >
            {{ $t('gender.message.detectionFailed') }}
          </small>
        </div>

        <div class="form-group">
          <label for="last-name">
            {{ $t('anthroponym.lastName') }}
          </label>
          <input
            v-model.trim="formData.lastName"
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
            v-model.trim="formData.firstName"
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
            v-model.trim="formData.middleName"
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
