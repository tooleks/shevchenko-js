<script setup lang="ts">
import { reactive } from 'vue';
import * as shevchenko from 'shevchenko';
import { isEqual } from 'lodash-es';

const demoDeclensionInput: shevchenko.DeclensionInput = {
  gender: shevchenko.GrammaticalGender.MASCULINE,
  familyName: 'Шевченко',
  givenName: 'Тарас',
  patronymicName: 'Григорович',
};

function isDemoDeclensionInput(
  declensionInput: Partial<shevchenko.DeclensionInput>,
): declensionInput is shevchenko.DeclensionInput {
  return isEqual(declensionInput, demoDeclensionInput);
}

const router = useRouter();
const route = useRoute();

const GENDER_AUTO_DETECT = undefined;
const genderOptions = [GENDER_AUTO_DETECT, ...Object.values(shevchenko.GrammaticalGender)];
const [hasGenderDetectionError, showGenderDetectionError] = useToggle(false);

type FormData = {
  gender: shevchenko.GrammaticalGender | typeof GENDER_AUTO_DETECT;
  autoDetectedGender: shevchenko.GrammaticalGender;
  familyName?: string;
  givenName?: string;
  patronymicName?: string;
};

const formData = reactive<FormData>({
  gender: GENDER_AUTO_DETECT,
  autoDetectedGender: demoDeclensionInput.gender,
  familyName: '',
  givenName: '',
  patronymicName: '',
});

function fillFormData(formDataChange: FormData): void {
  formData.gender = formDataChange.gender;
  formData.autoDetectedGender = formDataChange.autoDetectedGender;
  formData.familyName = formDataChange.familyName;
  formData.givenName = formDataChange.givenName;
  formData.patronymicName = formDataChange.patronymicName;
}

function isValidFormData(formData: Partial<FormData>): formData is FormData {
  return Boolean(
    (formData.gender === GENDER_AUTO_DETECT ||
      Object.values(shevchenko.GrammaticalGender).includes(formData.gender)) &&
      (formData.familyName || formData.givenName || formData.patronymicName),
  );
}

async function handleFormSubmit(): Promise<void> {
  showGenderDetectionError(false);

  let gender: FormData['gender'] | null;
  let familyName: FormData['familyName'];
  let givenName: FormData['givenName'];
  let patronymicName: FormData['patronymicName'];

  if (isValidFormData(formData)) {
    gender = formData.gender;
    familyName = formData.familyName;
    givenName = formData.givenName;
    patronymicName = formData.patronymicName;
  } else {
    gender = demoDeclensionInput.gender;
    familyName = demoDeclensionInput.familyName;
    givenName = demoDeclensionInput.givenName;
    patronymicName = demoDeclensionInput.patronymicName;
  }

  gender ??= await shevchenko.detectGender({ familyName, givenName, patronymicName });
  if (gender == null) {
    showGenderDetectionError(true);
    return;
  }

  formData.autoDetectedGender = gender;

  const declensionInput: shevchenko.DeclensionInput = {
    gender,
    familyName,
    givenName,
    patronymicName,
  };

  await inflect(declensionInput);

  // Store the declension input in query params for autofill.
  await router.replace({ query: { ...declensionInput } });
}

async function handlePatronymicNameCorrection(correctedPatronymicName: string): Promise<void> {
  fillFormData({ ...formData, patronymicName: correctedPatronymicName });
  await handleFormSubmit();
}

type DeclensionResults = {
  [key in shevchenko.GrammaticalCase]: shevchenko.DeclensionOutput | null;
};

const declensionResults = reactive<DeclensionResults>({
  nominative: null,
  genitive: null,
  dative: null,
  accusative: null,
  ablative: null,
  locative: null,
  vocative: null,
});

/**
 * Inflects the given declension input and stores the declension results for the display.
 */
async function inflect(declensionInput: shevchenko.DeclensionInput): Promise<void> {
  const [
    nominativeCaseResult,
    genitiveCaseResult,
    dativeCaseResult,
    accusativeCaseResult,
    ablativeCaseResult,
    locativeCaseResult,
    vocativeCaseResult,
  ] = await Promise.all([
    shevchenko.inNominative(declensionInput),
    shevchenko.inGenitive(declensionInput),
    shevchenko.inDative(declensionInput),
    shevchenko.inAccusative(declensionInput),
    shevchenko.inAblative(declensionInput),
    shevchenko.inLocative(declensionInput),
    shevchenko.inVocative(declensionInput),
  ]);

  declensionResults.nominative = nominativeCaseResult;
  declensionResults.genitive = genitiveCaseResult;
  declensionResults.dative = dativeCaseResult;
  declensionResults.accusative = accusativeCaseResult;
  declensionResults.ablative = ablativeCaseResult;
  declensionResults.locative = locativeCaseResult;
  declensionResults.vocative = vocativeCaseResult;
}

/**
 * Converts the given declension result into plain text ready to be copied.
 */
function getDeclensionResultString(declensionResult: shevchenko.DeclensionOutput): string {
  const resultParts: string[] = [];

  if (declensionResult.familyName) {
    resultParts.push(declensionResult.familyName);
  }

  if (declensionResult.givenName) {
    resultParts.push(declensionResult.givenName);
  }

  if (declensionResult.patronymicName) {
    resultParts.push(declensionResult.patronymicName);
  }

  return resultParts.join(' ');
}

onMounted(async () => {
  // Autofill the form using the query params.
  if (isValidFormData(route.query) && !isDemoDeclensionInput(route.query)) {
    fillFormData(route.query);
    await handleFormSubmit();
  }
});

await inflect(demoDeclensionInput);
</script>

<template>
  <section id="demo" class="my-4">
    <div class="row mb-3">
      <div class="col-12">
        <h2 class="mb-0">
          {{ $t('liveDemo') }}
          <small class="d-block h6 text-muted mt-2 mb-0 sentence-capitalize">
            {{ $t('liveDemo.message') }}
          </small>
        </h2>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-5 mb-2 mb-lg-0 d-flex">
        <form
          id="declension-form"
          class="card flex-grow-1 flex-fill"
          @submit.prevent="handleFormSubmit"
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
                    <input
                      v-model="formData.gender"
                      type="radio"
                      name="gender"
                      :value="genderOption"
                    />
                    {{ $t(`grammaticalGender.${genderOption}`) }}
                    <span v-if="genderOption === GENDER_AUTO_DETECT">
                      ({{ $t(`grammaticalGender.${formData.autoDetectedGender}`) }})
                    </span>
                  </label>
                </div>

                <div v-if="hasGenderDetectionError" class="alert alert-danger">
                  {{ $t('grammaticalGender.detectionFailed') }}
                </div>

                <small
                  v-else-if="formData.gender === GENDER_AUTO_DETECT"
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
                  :placeholder="demoDeclensionInput.familyName"
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
                  :placeholder="demoDeclensionInput.givenName"
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
                  :placeholder="demoDeclensionInput.patronymicName"
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
      </div>

      <div class="col-lg-7 d-flex">
        <div class="card flex-grow-1 flex-fill">
          <div class="card-body d-flex flex-column justify-content-between">
            <div class="table-responsive mb-3">
              <table class="table">
                <tbody>
                  <tr>
                    <th class="border-top-0 rounded text-nowrap">{{ $t('grammaticalCase') }}</th>
                    <th class="border-top-0 w-100">{{ $t('declension.results') }}</th>
                    <th class="border-top-0 text-end">
                      <span class="py-0 px-1">
                        <i
                          class="fa fa-info-circle"
                          :title="$t('declension.copyResult')"
                          :aria-label="$t('declension.copyResult')"
                        ></i>
                      </span>
                    </th>
                  </tr>

                  <tr v-for="grammaticalCase in shevchenko.GrammaticalCase" :key="grammaticalCase">
                    <th class="text-nowrap">{{ $t(`grammaticalCase.${grammaticalCase}`) }}</th>

                    <td class="w-100">
                      <span
                        v-if="
                          declensionResults[grammaticalCase]?.militaryRank ||
                          declensionResults[grammaticalCase]?.militaryAppointment
                        "
                        class="text-nowrap"
                      >
                        {{ declensionResults[grammaticalCase]?.militaryRank }}
                        {{ declensionResults[grammaticalCase]?.militaryAppointment }}<br />
                      </span>

                      <span class="text-nowrap">
                        {{ declensionResults[grammaticalCase]?.familyName }}
                        {{ declensionResults[grammaticalCase]?.givenName }}
                        {{ declensionResults[grammaticalCase]?.patronymicName }}
                      </span>
                    </td>

                    <td class="text-end">
                      <CopyButton
                        v-if="declensionResults[grammaticalCase]"
                        :button-id="`copy-${grammaticalCase}-case-button`"
                        :source="getDeclensionResultString(declensionResults[grammaticalCase])"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="alert alert-light mb-0" role="alert">
              <div
                class="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-md-between"
              >
                {{ $t('declension.shareResult') }}
                <ShareLinks buttons-class="mt-1 mt-md-0 me-md-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.sentence-capitalize:first-letter {
  text-transform: capitalize;
}
</style>
