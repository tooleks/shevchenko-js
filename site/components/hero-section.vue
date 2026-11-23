<script setup lang="ts">
import * as shevchenko from 'shevchenko';

const appConfig = useAppConfig();
const npmInstallCommand = `npm install ${appConfig.library.name}`;

const { MASCULINE, FEMININE } = shevchenko.GrammaticalGender;

const anthroponyms: shevchenko.DeclensionInput[] = [
  { gender: MASCULINE, familyName: 'Шевченко', givenName: 'Тарас', patronymicName: 'Григорович' },
  { gender: MASCULINE, familyName: 'Франко', givenName: 'Іван', patronymicName: 'Якович' },
  {
    gender: MASCULINE,
    familyName: 'Нечуй-Левицький',
    givenName: 'Іван',
    patronymicName: 'Семенович',
  },
  { gender: MASCULINE, familyName: 'Рудченко', givenName: 'Панас', patronymicName: 'Якович' },
  { gender: MASCULINE, familyName: 'Рудченко', givenName: 'Іван', patronymicName: 'Якович' },
  { gender: MASCULINE, familyName: "Лозов'яга", givenName: 'Іван', patronymicName: 'Павлович' },
  {
    gender: MASCULINE,
    familyName: 'Котляревський',
    givenName: 'Іван',
    patronymicName: 'Петрович',
  },
  {
    gender: MASCULINE,
    familyName: 'Сосюра',
    givenName: 'Володимир',
    patronymicName: 'Миколайович',
  },
  { gender: MASCULINE, familyName: 'Тичина', givenName: 'Павло', patronymicName: 'Григорович' },
  {
    gender: MASCULINE,
    familyName: 'Симоненко',
    givenName: 'Василь',
    patronymicName: 'Андрійович',
  },
  { gender: MASCULINE, familyName: 'Фітільов', givenName: 'Микола', patronymicName: 'Григорович' },
  {
    gender: MASCULINE,
    familyName: 'Коцюбинський',
    givenName: 'Михайло',
    patronymicName: 'Михайлович',
  },
  { gender: MASCULINE, familyName: 'Сковорода', givenName: 'Григорій', patronymicName: 'Савич' },
  {
    gender: MASCULINE,
    familyName: 'Куліш',
    givenName: 'Пантелеймон',
    patronymicName: 'Олександрович',
  },
  { gender: MASCULINE, familyName: 'Глібов', givenName: 'Леонід', patronymicName: 'Іванович' },
  {
    gender: MASCULINE,
    familyName: 'Гончар',
    givenName: 'Олександр',
    patronymicName: 'Терентійович',
  },
  {
    gender: MASCULINE,
    familyName: 'Довженко',
    givenName: 'Олександр',
    patronymicName: 'Петрович',
  },
  {
    gender: FEMININE,
    familyName: 'Косач-Квітка',
    givenName: 'Лариса',
    patronymicName: 'Петрівна',
  },
  { gender: FEMININE, familyName: 'Косач', givenName: 'Ольга', patronymicName: 'Петрівна' },
  {
    gender: FEMININE,
    familyName: 'Вілінська',
    givenName: 'Марія',
    patronymicName: 'Олександрівна',
  },
  {
    gender: FEMININE,
    familyName: 'Кобилянська',
    givenName: 'Ольга',
    patronymicName: 'Юліанівна',
  },
];
</script>

<template>
  <PageHero
    :title-accent="$t('home.hero.titleAccent')"
    :lead="$t('library.description')"
    :install-command="npmInstallCommand"
  >
    <template #meta>
      <span class="hero-meta-item">
        <i class="fa-solid fa-tag" aria-hidden="true"></i> v{{ appConfig.library.version }}
      </span>

      <a class="hero-meta-item" :href="appConfig.library.licenseUrl" target="_blank">
        <i class="fa-solid fa-scale-balanced" aria-hidden="true"></i>
        {{ $t('library.license') }} <NewTabHint />
      </a>
    </template>

    <template #aside>
      <DeclensionSlideshow
        :inputs="anthroponyms"
        :grammatical-case="shevchenko.GrammaticalCase.VOCATIVE"
        :fields="['givenName', 'patronymicName', 'familyName']"
      />
    </template>
  </PageHero>
</template>
