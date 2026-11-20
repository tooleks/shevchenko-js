<script setup lang="ts">
import { reactive } from 'vue';
import * as shevchenko from 'shevchenko';
import { isEqual } from 'lodash-es';

const demoDeclensionInput: shevchenko.DeclensionInput = {
  gender: shevchenko.GrammaticalGender.MASCULINE,
  militaryAppointment: 'помічник гранатометника',
  militaryRank: 'солдат',
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
  militaryAppointment?: string;
  militaryRank?: string;
  familyName?: string;
  givenName?: string;
  patronymicName?: string;
};

const formData = reactive<FormData>({
  gender: GENDER_AUTO_DETECT,
  autoDetectedGender: demoDeclensionInput.gender,
  militaryAppointment: '',
  militaryRank: '',
  familyName: '',
  givenName: '',
  patronymicName: '',
});

function fillFormData(formDataChange: FormData): void {
  formData.gender = formDataChange.gender;
  formData.autoDetectedGender = formDataChange.autoDetectedGender;
  formData.militaryAppointment = formDataChange.militaryAppointment;
  formData.militaryRank = formDataChange.militaryRank;
  formData.familyName = formDataChange.familyName;
  formData.givenName = formDataChange.givenName;
  formData.patronymicName = formDataChange.patronymicName;
}

function isValidFormData(formData: Partial<FormData>): formData is FormData {
  return Boolean(
    (formData.gender === GENDER_AUTO_DETECT ||
      Object.values(shevchenko.GrammaticalGender).includes(formData.gender)) &&
      (formData?.militaryAppointment ||
        formData?.militaryRank ||
        formData.familyName ||
        formData.givenName ||
        formData.patronymicName),
  );
}

async function handleFormSubmit(): Promise<void> {
  showGenderDetectionError(false);

  let gender: FormData['gender'] | null;
  let militaryAppointment: FormData['militaryAppointment'];
  let militaryRank: FormData['militaryRank'];
  let familyName: FormData['familyName'];
  let givenName: FormData['givenName'];
  let patronymicName: FormData['patronymicName'];

  if (isValidFormData(formData)) {
    gender = formData.gender;
    militaryAppointment = formData.militaryAppointment;
    militaryRank = formData.militaryRank;
    familyName = formData.familyName;
    givenName = formData.givenName;
    patronymicName = formData.patronymicName;
  } else {
    gender = demoDeclensionInput.gender;
    militaryAppointment = demoDeclensionInput.militaryAppointment;
    militaryRank = demoDeclensionInput.militaryRank;
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
    militaryAppointment,
    militaryRank,
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

  if (declensionResult.militaryAppointment) {
    resultParts.push(declensionResult.militaryAppointment);
  }

  if (declensionResult.militaryRank) {
    resultParts.push(declensionResult.militaryRank);
  }

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
            {{ $t('liveDemo.message.military') }}
          </small>
        </h2>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="row">
          <form
            id="declension-form"
            class="col-lg-5 pe-lg-4 d-flex flex-column justify-content-between"
            @submit.prevent="handleFormSubmit"
          >
            <div class="mb-4">
              <p class="text-muted">
                {{ $t('declension.instruction') }}
              </p>

              <div class="mb-3">
                <div class="mb-2">
                  <label
                    v-for="genderOption in genderOptions"
                    :key="genderOption"
                    class="form-check form-check-inline"
                  >
                    <input
                      v-model="formData.gender"
                      class="form-check-input"
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

                <small
                  v-if="hasGenderDetectionError"
                  class="d-block form-text text-danger"
                  role="alert"
                >
                  <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                  {{ $t('grammaticalGender.detectionFailed') }}
                </small>

                <small
                  v-else-if="formData.gender === GENDER_AUTO_DETECT"
                  class="d-block form-text text-muted"
                >
                  {{ $t('grammaticalGender.autoDetection') }}
                </small>
              </div>

              <div class="mb-3">
                <label class="form-label" for="military-appointment">
                  {{ $t('anthroponym.militaryAppointment') }}
                </label>

                <input
                  id="military-appointment"
                  v-model.trim="formData.militaryAppointment"
                  type="text"
                  class="form-control"
                  name="military-appointment"
                  :placeholder="
                    $t('declension.placeholder', {
                      example: demoDeclensionInput.militaryAppointment,
                    })
                  "
                />
              </div>

              <div class="mb-3">
                <label class="form-label" for="military-rank">
                  {{ $t('anthroponym.militaryRank') }}
                </label>

                <input
                  id="military-rank"
                  v-model.trim="formData.militaryRank"
                  type="text"
                  class="form-control"
                  name="military-rank"
                  :placeholder="
                    $t('declension.placeholder', { example: demoDeclensionInput.militaryRank })
                  "
                />
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
                  :placeholder="
                    $t('declension.placeholder', { example: demoDeclensionInput.familyName })
                  "
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
                  :placeholder="
                    $t('declension.placeholder', { example: demoDeclensionInput.givenName })
                  "
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
                  :placeholder="
                    $t('declension.placeholder', { example: demoDeclensionInput.patronymicName })
                  "
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
            </div>
          </form>

          <div
            class="col-lg-7 column-divider-lg mt-4 pt-4 mt-lg-0 pt-lg-0 ps-lg-4 d-flex flex-column justify-content-between"
          >
            <div class="table-responsive">
              <table class="table mb-0">
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
                          declensionResults[grammaticalCase]?.militaryAppointment ||
                          declensionResults[grammaticalCase]?.militaryRank
                        "
                        class="text-nowrap"
                      >
                        {{ declensionResults[grammaticalCase]?.militaryAppointment }}
                        {{ declensionResults[grammaticalCase]?.militaryRank }}<br />
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

            <div
              class="d-flex flex-wrap align-items-center justify-content-between column-gap-3 mt-3"
            >
              <ModalButton class="btn btn-link px-0" modal-id="contact-us-modal">
                {{ $t('foundBug') }}
              </ModalButton>

              <ShareLinks>{{ $t('declension.shareResult') }}</ShareLinks>
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
