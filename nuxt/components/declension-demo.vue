<script setup lang="ts">
import { reactive } from 'vue';
import * as shevchenko from 'shevchenko';

const shevchenkoAnthroponym: shevchenko.Anthroponym = {
  gender: shevchenko.Gender.Male,
  lastName: 'Шевченко',
  firstName: 'Тарас',
  middleName: 'Григорович',
};

const userAnthroponym: shevchenko.Anthroponym = reactive({
  gender: shevchenko.Gender.Male,
  lastName: '',
  firstName: '',
  middleName: '',
});

const declensionResults = reactive({
  nominativeCase: shevchenko.inNominative(shevchenkoAnthroponym),
  genitiveCase: shevchenko.inGenitive(shevchenkoAnthroponym),
  dativeCase: shevchenko.inDative(shevchenkoAnthroponym),
  accusativeCase: shevchenko.inAccusative(shevchenkoAnthroponym),
  ablativeCase: shevchenko.inAblative(shevchenkoAnthroponym),
  locativeCase: shevchenko.inLocative(shevchenkoAnthroponym),
  vocativeCase: shevchenko.inVocative(shevchenkoAnthroponym),
});

function onInflect(): void {
  declensionResults.nominativeCase = shevchenko.inNominative(userAnthroponym);
  declensionResults.genitiveCase = shevchenko.inGenitive(userAnthroponym);
  declensionResults.dativeCase = shevchenko.inDative(userAnthroponym);
  declensionResults.accusativeCase = shevchenko.inAccusative(userAnthroponym);
  declensionResults.ablativeCase = shevchenko.inAblative(userAnthroponym);
  declensionResults.locativeCase = shevchenko.inLocative(userAnthroponym);
  declensionResults.vocativeCase = shevchenko.inVocative(userAnthroponym);
}
</script>

<template>
  <section id="demo" class="my-4">
    <div class="row mb-3">
      <div class="col-12 col-lg-9">
        <h2 class="mb-0">
          {{ $t('demo') }}
          <small class="d-block h6 text-muted mt-2 mb-0">
            {{ $t('demo.message') }}
          </small>
        </h2>
      </div>

      <div class="col-12 col-lg-3">
        <div class="d-flex">
          <ShareLinks buttons-class="ml-auto" />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-5 mb-2 mb-lg-0">
        <form id="declension-form" @submit.prevent="onInflect">
          <div class="card">
            <div class="card-body">
              <div class="alert alert-info" role="alert">
                {{ $t('declensionForm.instructionMessage') }}
              </div>

              <div class="form-group">
                <label class="radio-inline mr-2">
                  <input
                    v-model="userAnthroponym.gender"
                    type="radio"
                    name="gender"
                    :value="shevchenko.Gender.Male"
                  />
                  {{ $t('gender.male') }}
                </label>
                <label class="radio-inline">
                  <input
                    v-model="userAnthroponym.gender"
                    type="radio"
                    name="gender"
                    :value="shevchenko.Gender.Female"
                  />
                  {{ $t('gender.female') }}
                </label>
              </div>

              <div class="form-group">
                <label for="last-name">
                  {{ $t('anthroponym.lastName') }}
                </label>
                <input
                  v-model="userAnthroponym.lastName"
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
                  v-model="userAnthroponym.firstName"
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
                  v-model="userAnthroponym.middleName"
                  type="text"
                  class="form-control"
                  name="middle-name"
                  id="middle-name"
                  :placeholder="shevchenkoAnthroponym.middleName"
                />
              </div>
            </div>

            <div class="card-footer">
              <button type="submit" @click="onInflect" class="btn btn-primary">
                {{ $t('action.inflect') }}
              </button>

              <ContactMeButton :button-class="'btn btn-link pull-right'">
                {{ $t('foundBug') }}
              </ContactMeButton>
            </div>
          </div>
        </form>
      </div>

      <div class="col-lg-7">
        <div class="card mb-2">
          <DeclensionResultsDisplay :declension-results="declensionResults" />
        </div>
      </div>
    </div>
  </section>
</template>
