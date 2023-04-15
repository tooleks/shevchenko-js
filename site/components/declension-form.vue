<script setup lang="ts">
import { useToggle } from '@vueuse/core';
import { isEqual } from 'lodash';
import { GrammaticalGender, DeclensionInput, detectGender } from 'shevchenko';
import { onMounted, PropType, toRefs, reactive } from 'vue';
import { useDeclension } from '~/composables/declension';

const props = defineProps({
  storedDeclensionInput: { type: Object as PropType<DeclensionInput>, default: () => ({}) },
});

const { storedDeclensionInput } = toRefs(props);

const emit = defineEmits(['declension']);

const defaultDeclensionInput: DeclensionInput = {
  gender: GrammaticalGender.MASCULINE,
  familyName: 'Шевченко',
  givenName: 'Тарас',
  patronymicName: 'Григорович',
};

function isDefaultDeclensionInput(
  declensionInput: Partial<DeclensionInput>,
): declensionInput is DeclensionInput {
  return isEqual(declensionInput, defaultDeclensionInput);
}

function isValidDeclensionInput(
  declensionInput: Partial<DeclensionInput>,
): declensionInput is DeclensionInput {
  return Boolean(
    (declensionInput.gender == null ||
      Object.values(GrammaticalGender).includes(declensionInput.gender)) &&
      (declensionInput.familyName || declensionInput.givenName || declensionInput.patronymicName),
  );
}

const { declensionInput, inflect } = await useDeclension(defaultDeclensionInput);
const [isGenderError, showGenderError] = useToggle(false);
const AUTO_GENDER_OPTION = undefined;
const genderOptions = [AUTO_GENDER_OPTION, ...Object.values(GrammaticalGender)];

interface FormData {
  gender: GrammaticalGender | typeof AUTO_GENDER_OPTION;
  familyName?: string;
  givenName?: string;
  patronymicName?: string;
}

const formData = reactive<FormData>({
  gender: AUTO_GENDER_OPTION,
  familyName: '',
  givenName: '',
  patronymicName: '',
});

function fillFormData(formDataChange: FormData): void {
  formData.gender = formDataChange.gender;
  formData.familyName = formDataChange.familyName;
  formData.givenName = formDataChange.givenName;
  formData.patronymicName = formDataChange.patronymicName;
}

async function handleInflectAction(): Promise<void> {
  let gender: FormData['gender'];
  let familyName: FormData['familyName'];
  let givenName: FormData['givenName'];
  let patronymicName: FormData['patronymicName'];

  if (isValidDeclensionInput(formData)) {
    gender = formData.gender;
    familyName = formData.familyName;
    givenName = formData.givenName;
    patronymicName = formData.patronymicName;
  } else {
    gender = defaultDeclensionInput.gender;
    familyName = defaultDeclensionInput.familyName;
    givenName = defaultDeclensionInput.givenName;
    patronymicName = defaultDeclensionInput.patronymicName;
  }

  if (gender == null) {
    gender = (await detectGender({ familyName, givenName, patronymicName })) ?? AUTO_GENDER_OPTION;
    if (gender == null) {
      showGenderError(true);
      return;
    }
  }

  showGenderError(false);
  await inflect({ gender, familyName, givenName, patronymicName });
  emit('declension', declensionInput);
}

async function handlePatronymicNameCorrection(correctPatronymicName: string): Promise<void> {
  fillFormData({ ...formData, patronymicName: correctPatronymicName });
  await handleInflectAction();
}

onMounted(async () => {
  if (
    isValidDeclensionInput(storedDeclensionInput.value) &&
    !isDefaultDeclensionInput(storedDeclensionInput.value)
  ) {
    fillFormData(storedDeclensionInput.value);
    await handleInflectAction();
  }
});
</script>

<template>
  <form id="declension-form" @submit.prevent="handleInflectAction">
    <div class="card">
      <div class="card-body">
        <div class="alert alert-info" role="alert">
          {{ $t('declensionForm.instructionMessage') }}
        </div>

        <div class="form-group">
          <label
            v-for="genderOption in genderOptions"
            :key="genderOption"
            class="radio-inline mr-2"
          >
            <input v-model="formData.gender" type="radio" name="gender" :value="genderOption" />
            {{ $t(`gender.${genderOption}`) }}
            <span v-if="genderOption === AUTO_GENDER_OPTION">
              ({{ $t(`gender.${declensionInput.gender}`) }})
            </span>
          </label>

          <div v-if="isGenderError" class="alert alert-danger">
            {{ $t('gender.message.detectionFailed') }}
          </div>

          <small v-else-if="formData.gender === AUTO_GENDER_OPTION" class="form-text text-muted">
            {{ $t('gender.message.autoDetection') }}
          </small>
        </div>

        <div class="form-group">
          <label for="family-name">
            {{ $t('anthroponym.familyName') }}
          </label>

          <input
            id="family-name"
            v-model.trim="formData.familyName"
            type="text"
            class="form-control"
            name="family-name"
            :placeholder="defaultDeclensionInput.familyName"
          />
        </div>

        <div class="form-group">
          <label for="given-name">
            {{ $t('anthroponym.givenName') }}
          </label>

          <input
            id="given-name"
            v-model.trim="formData.givenName"
            type="text"
            class="form-control"
            name="given-name"
            :placeholder="defaultDeclensionInput.givenName"
          />
        </div>

        <div class="form-group">
          <label for="patronymic-name">
            {{ $t('anthroponym.patronymicName') }}
          </label>

          <input
            id="patronymic-name"
            v-model.trim="formData.patronymicName"
            type="text"
            class="form-control"
            name="patronymic-name"
            :placeholder="defaultDeclensionInput.patronymicName"
          />

          <DeclensionFormSpellingNotice
            :anthroponym="formData"
            @patronymic-name-correction="handlePatronymicNameCorrection"
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
