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
  <form
    id="declension-form"
    class="card flex-grow-1 flex-fill"
    @submit.prevent="handleInflectAction"
  >
    <div class="card-body d-flex flex-column justify-content-between">
      <div class="mb-4">
        <div class="alert alert-info" role="alert">
          {{ $t('declension.instruction') }}
        </div>

        <div class="mb-3">
          <div class="mb-2">
            <label
              v-for="genderOption in genderOptions"
              :key="genderOption"
              class="radio-inline me-2"
            >
              <input v-model="formData.gender" type="radio" name="gender" :value="genderOption" />
              {{ $t(`grammaticalGender.${genderOption}`) }}
              <span v-if="genderOption === AUTO_GENDER_OPTION">
                ({{ $t(`grammaticalGender.${declensionInput.gender}`) }})
              </span>
            </label>
          </div>

          <div v-if="isGenderError" class="alert alert-danger">
            {{ $t('grammaticalGender.detectionFailed') }}
          </div>

          <small
            v-else-if="formData.gender === AUTO_GENDER_OPTION"
            class="d-block form-text text-muted"
          >
            {{ $t('grammaticalGender.autoDetection') }}
          </small>
        </div>

        <div class="mb-3">
          <label class="form-label" for="family-name">
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

        <div class="mb-3">
          <label class="form-label" for="given-name">
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

        <div class="mb-0">
          <label class="form-label" for="patronymic-name">
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

      <div>
        <button type="submit" class="btn btn-primary">
          {{ $t('declension.inflect') }}
        </button>

        <ModalButton class="btn btn-link pull-right" modal-id="contact-us-modal">
          {{ $t('foundBug') }}
        </ModalButton>
      </div>
    </div>
  </form>
</template>
