<script setup lang="ts">
import * as shevchenko from 'shevchenko';

const appConfig = useAppConfig();
const npmInstallCommand = `npm install ${appConfig.library.name} ${appConfig.militaryExtension.name}`;

const { MASCULINE } = shevchenko.GrammaticalGender;

const militaryPositions: shevchenko.DeclensionInput[] = [
  { gender: MASCULINE, militaryAppointment: 'помічник гранатометника', militaryRank: 'солдат' },
  { gender: MASCULINE, militaryAppointment: 'старший вогнеметник', militaryRank: 'старший солдат' },
  { gender: MASCULINE, militaryAppointment: 'механік-водій', militaryRank: 'старший солдат' },
  {
    gender: MASCULINE,
    militaryAppointment: 'бойовий медик взводу',
    militaryRank: 'молодший сержант',
  },
  { gender: MASCULINE, militaryAppointment: 'командир відділення', militaryRank: 'сержант' },
  { gender: MASCULINE, militaryAppointment: 'льотчик', militaryRank: 'штаб-сержант' },
  {
    gender: MASCULINE,
    militaryAppointment: 'командир десантного катера',
    militaryRank: 'штаб-старшина',
  },
  {
    gender: MASCULINE,
    militaryAppointment: 'командир морського катера',
    militaryRank: 'головний старшина',
  },
];
</script>

<template>
  <PageHero
    :title-accent="$t('military.hero.titleAccent')"
    :lead="$t('military.hero.lead')"
    :install-command="npmInstallCommand"
    :badge="$t('beta')"
  >
    <template #meta>
      <a class="hero-meta-item" :href="appConfig.militaryExtension.gitHubUrl" target="_blank">
        <i class="fa-brands fa-github" aria-hidden="true"></i> GitHub <NewTabHint />
      </a>
    </template>

    <template #aside>
      <DeclensionSlideshow
        :inputs="militaryPositions"
        :grammatical-case="shevchenko.GrammaticalCase.ACCUSATIVE"
        :fields="['militaryAppointment', 'militaryRank']"
      />
    </template>
  </PageHero>
</template>
