<script setup lang="ts">
import { computed, nextTick, reactive, ref } from 'vue';
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

const genderDescriptionId = computed(() => {
  if (hasGenderDetectionError.value) {
    return 'gender-detection-error';
  }
  if (formData.gender === GENDER_AUTO_DETECT) {
    return 'gender-auto-detection-hint';
  }
  return undefined;
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
      (formData.militaryAppointment ||
        formData.militaryRank ||
        formData.familyName ||
        formData.givenName ||
        formData.patronymicName),
  );
}

/**
 * Inflects the form data and returns whether the declension results were updated.
 */
async function inflectFormData(): Promise<boolean> {
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
    return false;
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

  return true;
}

const declensionResultsElement = ref<HTMLElement | null>(null);
const declensionResultsTitleElement = ref<HTMLElement | null>(null);
const genderDetectionErrorElement = ref<HTMLElement | null>(null);
const preferredMotion = usePreferredReducedMotion();

async function inflectAndReveal(shouldFocusResults: boolean): Promise<void> {
  const isInflected = await inflectFormData();

  await nextTick();
  const scrollTarget = isInflected
    ? declensionResultsElement.value
    : genderDetectionErrorElement.value;
  scrollTarget?.scrollIntoView({
    behavior: preferredMotion.value === 'reduce' ? 'auto' : 'smooth',
    block: isInflected ? 'start' : 'center',
  });

  if (isInflected && shouldFocusResults) {
    declensionResultsTitleElement.value?.focus({ preventScroll: true });
  }
}

async function handleFormSubmit(): Promise<void> {
  await inflectAndReveal(true);
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
    await inflectAndReveal(false);
  }
});

await inflect(demoDeclensionInput);
</script>

<template>
  <section id="demo" class="site-section site-section-muted">
    <div class="container">
      <SectionHeading :title="$t('liveDemo')" :subtitle="$t('declension.instruction.military')" />

      <div class="demo">
        <form id="declension-form" class="demo-form" @submit.prevent="handleFormSubmit">
          <fieldset class="demo-field">
            <legend class="form-label">{{ $t('grammaticalGender') }}</legend>

            <div class="segmented">
              <div
                v-for="genderOption in genderOptions"
                :key="genderOption ?? 'auto'"
                class="segmented-item"
              >
                <input
                  :id="`gender-${genderOption ?? 'auto'}`"
                  v-model="formData.gender"
                  class="btn-check"
                  type="radio"
                  name="gender"
                  autocomplete="off"
                  :value="genderOption"
                  :aria-describedby="genderDescriptionId"
                />
                <label class="segmented-option" :for="`gender-${genderOption ?? 'auto'}`">
                  {{ $t(`grammaticalGender.${genderOption}`) }}
                  <span v-if="genderOption === GENDER_AUTO_DETECT" class="demo-detected-gender">
                    ({{ $t(`grammaticalGender.${formData.autoDetectedGender}`) }})
                  </span>
                </label>
              </div>
            </div>

            <small
              v-if="hasGenderDetectionError"
              id="gender-detection-error"
              ref="genderDetectionErrorElement"
              class="d-block form-text text-danger"
              role="alert"
            >
              <i class="fa-solid fa-circle-exclamation" aria-hidden="true"></i>
              {{ $t('grammaticalGender.detectionFailed') }}
            </small>

            <small
              v-else-if="formData.gender === GENDER_AUTO_DETECT"
              id="gender-auto-detection-hint"
              class="d-block form-text text-muted"
            >
              {{ $t('grammaticalGender.autoDetection') }}
            </small>
          </fieldset>

          <div class="demo-field">
            <label class="form-label" for="military-appointment">
              {{ $t('anthroponym.militaryAppointment') }}
            </label>

            <input
              id="military-appointment"
              v-model.trim="formData.militaryAppointment"
              type="text"
              lang="uk"
              class="form-control"
              name="military-appointment"
              autocomplete="off"
              :placeholder="
                $t('declension.placeholder', { example: demoDeclensionInput.militaryAppointment })
              "
            />
          </div>

          <div class="demo-field">
            <label class="form-label" for="military-rank">
              {{ $t('anthroponym.militaryRank') }}
            </label>

            <input
              id="military-rank"
              v-model.trim="formData.militaryRank"
              type="text"
              lang="uk"
              class="form-control"
              name="military-rank"
              autocomplete="off"
              :placeholder="
                $t('declension.placeholder', { example: demoDeclensionInput.militaryRank })
              "
            />
          </div>

          <div class="demo-field">
            <label class="form-label" for="family-name">
              {{ $t('anthroponym.familyName') }}
            </label>

            <input
              id="family-name"
              v-model.trim="formData.familyName"
              type="text"
              lang="uk"
              class="form-control"
              name="family-name"
              autocomplete="off"
              :placeholder="
                $t('declension.placeholder', { example: demoDeclensionInput.familyName })
              "
            />
          </div>

          <div class="demo-field">
            <label class="form-label" for="given-name">
              {{ $t('anthroponym.givenName') }}
            </label>

            <input
              id="given-name"
              v-model.trim="formData.givenName"
              type="text"
              lang="uk"
              class="form-control"
              name="given-name"
              autocomplete="off"
              :placeholder="
                $t('declension.placeholder', { example: demoDeclensionInput.givenName })
              "
            />
          </div>

          <div class="demo-field">
            <label class="form-label" for="patronymic-name">
              {{ $t('anthroponym.patronymicName') }}
            </label>

            <input
              id="patronymic-name"
              v-model.trim="formData.patronymicName"
              type="text"
              lang="uk"
              class="form-control"
              name="patronymic-name"
              autocomplete="off"
              :placeholder="
                $t('declension.placeholder', { example: demoDeclensionInput.patronymicName })
              "
            />

            <PatronymicSpellingNotice
              :anthroponym="formData"
              @patronymic-name-correction="handlePatronymicNameCorrection"
            />
          </div>

          <button type="submit" class="btn btn-primary btn-lg demo-submit">
            {{ $t('declension.inflect') }}
          </button>
        </form>

        <div id="declension-results" ref="declensionResultsElement" class="demo-results">
          <h3 ref="declensionResultsTitleElement" class="demo-results-title" tabindex="-1">
            {{ $t('declension.results') }}
          </h3>

          <dl class="case-list">
            <div
              v-for="grammaticalCase in shevchenko.GrammaticalCase"
              :key="grammaticalCase"
              class="case-row"
              :data-grammatical-case="grammaticalCase"
            >
              <dt class="case-name">{{ $t(`grammaticalCase.${grammaticalCase}`) }}</dt>

              <dd class="case-value" lang="uk">
                <template v-if="declensionResults[grammaticalCase]">
                  {{ getDeclensionResultString(declensionResults[grammaticalCase]) }}
                </template>
              </dd>

              <dd v-if="declensionResults[grammaticalCase]" class="case-actions">
                <CopyButton
                  :button-id="`copy-${grammaticalCase}-case-button`"
                  button-class="case-copy"
                  :source="getDeclensionResultString(declensionResults[grammaticalCase])"
                />
              </dd>
            </div>
          </dl>

          <div class="demo-results-footer">
            <p class="demo-disclaimer">{{ $t('declension.disclaimer') }}</p>

            <ModalButton class="demo-bug-link" modal-id="contact-us-modal">
              <i class="fa-solid fa-bug" aria-hidden="true"></i>
              {{ $t('foundBug') }}
            </ModalButton>

            <ShareButton />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.demo {
  display: grid;
  border: 1px solid var(--site-line);
  border-radius: var(--site-radius-xl);
  background: #fff;
  box-shadow: var(--site-shadow-lg);

  @media (min-width: 992px) {
    grid-template-columns: 5fr 7fr;
  }
}

.demo-form,
.demo-results {
  min-width: 0;
  padding: 1.5rem;

  @media (min-width: 768px) {
    padding: 2rem 2.25rem;
  }
}

.demo-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.demo-field {
  min-width: 0;
  margin: 0;
}

.segmented-item {
  display: flex;
  flex: 1 1 0;
  min-width: 0;
}

.demo-detected-gender {
  color: var(--site-muted);
  font-weight: 400;
}

.demo-submit {
  margin-top: auto;

  @media (max-width: 991.98px) {
    width: 100%;
  }

  @media (min-width: 992px) {
    align-self: flex-start;
  }
}

.demo-results {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--site-line);
  border-radius: 0 0 var(--site-radius-xl) var(--site-radius-xl);
  background: linear-gradient(180deg, var(--site-surface), #fff 12rem);

  @media (min-width: 992px) {
    border-top: 0;
    border-left: 1px solid var(--site-line);
    border-radius: 0 var(--site-radius-xl) var(--site-radius-xl) 0;
  }
}

.demo-results-title {
  margin: 0 0 0.5rem;
  color: var(--site-muted);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  &:focus {
    outline: none;
  }
}

.case-list {
  margin: 0;
}

.case-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  grid-template-areas:
    'name copy'
    'value copy';
  align-items: center;
  column-gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--site-line);

  &:last-child {
    border-bottom: 0;
  }

  @media (min-width: 576px) {
    grid-template-columns: 11rem minmax(0, 1fr) auto;
    grid-template-areas: 'name value copy';
    min-height: 3.5rem;
  }
}

.case-name {
  grid-area: name;
  color: var(--site-muted);
  font-size: 0.875rem;
  font-weight: 500;
}

.case-value {
  grid-area: value;
  margin: 0;
  color: var(--site-ink);
  font-size: 1.0625rem;
  font-weight: 600;
  overflow-wrap: anywhere;
}

.case-actions {
  grid-area: copy;
  margin: 0;
}

.case-copy {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  background: transparent;
  color: var(--site-muted);
  cursor: pointer;
  transition: color 0.15s, background-color 0.15s, border-color 0.15s;

  &:hover {
    border-color: var(--site-line);
    background: #fff;
    color: var(--site-ink);
  }

  &:focus-visible {
    outline: 2px solid var(--site-primary);
    outline-offset: 1px;
  }

  :deep(.fa-check) {
    color: #16a34a;
  }
}

.case-row:hover .case-copy {
  color: var(--site-ink);
}

.demo-results-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem 1rem;
  margin-top: auto;
  padding-top: 1.25rem;
}

.demo-disclaimer {
  flex-basis: 100%;
  margin: 0;
  color: var(--site-muted);
  font-size: 0.8125rem;
}

.demo-bug-link {
  color: var(--site-muted);
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;

  i {
    margin-right: 0.25rem;
  }

  &:hover {
    color: var(--site-ink);
  }
}
</style>
