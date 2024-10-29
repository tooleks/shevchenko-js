<script setup lang="ts">
import * as shevchenko from 'shevchenko';
import { useDeclensionSlideshow } from '~/composables/declension-slideshow';

const anthroponyms: shevchenko.DeclensionInput[] = [
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    familyName: 'Шевченко',
    givenName: 'Тарас',
    patronymicName: 'Григорович',
  },
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    familyName: 'Франко',
    givenName: 'Іван',
    patronymicName: 'Якович',
  },
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    familyName: 'Нечуй-Левицький',
    givenName: 'Іван',
    patronymicName: 'Семенович',
  },
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    familyName: 'Рудченко',
    givenName: 'Панас',
    patronymicName: 'Якович',
  },
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    familyName: 'Рудченко',
    givenName: 'Іван',
    patronymicName: 'Якович',
  },
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    familyName: "Лозов'яга",
    givenName: 'Іван',
    patronymicName: 'Павлович',
  },
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    familyName: 'Котляревський',
    givenName: 'Іван',
    patronymicName: 'Петрович',
  },
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    familyName: 'Сосюра',
    givenName: 'Володимир',
    patronymicName: 'Миколайович',
  },
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    familyName: 'Тичина',
    givenName: 'Павло',
    patronymicName: 'Григорович',
  },
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    familyName: 'Симоненко',
    givenName: 'Василь',
    patronymicName: 'Андрійович',
  },
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    familyName: 'Фітільов',
    givenName: 'Микола',
    patronymicName: 'Григорович',
  },
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    familyName: 'Коцюбинський',
    givenName: 'Михайло',
    patronymicName: 'Михайлович',
  },
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    familyName: 'Сковорода',
    givenName: 'Григорій',
    patronymicName: 'Савич',
  },
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    familyName: 'Куліш',
    givenName: 'Пантелеймон',
    patronymicName: 'Олександрович',
  },
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    familyName: 'Глібов',
    givenName: 'Леонід',
    patronymicName: 'Іванович',
  },
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    familyName: 'Гончар',
    givenName: 'Олександр',
    patronymicName: 'Терентійович',
  },
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    familyName: 'Довженко',
    givenName: 'Олександр',
    patronymicName: 'Петрович',
  },
  {
    gender: shevchenko.GrammaticalGender.FEMININE,
    familyName: 'Косач-Квітка',
    givenName: 'Лариса',
    patronymicName: 'Петрівна',
  },
  {
    gender: shevchenko.GrammaticalGender.FEMININE,
    familyName: 'Косач',
    givenName: 'Ольга',
    patronymicName: 'Петрівна',
  },
  {
    gender: shevchenko.GrammaticalGender.FEMININE,
    familyName: 'Вілінська',
    givenName: 'Марія',
    patronymicName: 'Олександрівна',
  },
  {
    gender: shevchenko.GrammaticalGender.FEMININE,
    familyName: 'Кобилянська',
    givenName: 'Ольга',
    patronymicName: 'Юліанівна',
  },
];

const anthroponym = useDeclensionSlideshow(anthroponyms, shevchenko.inVocative);
</script>

<template>
  <transition name="preview" mode="out-in">
    <span
      v-if="anthroponym"
      :key="`${anthroponym.givenName}${anthroponym.patronymicName}${anthroponym.familyName}`"
    >
      {{ anthroponym.givenName }} {{ anthroponym.patronymicName }} {{ anthroponym.familyName }}
    </span>
  </transition>
</template>

<style scoped>
.preview-enter-active,
.preview-leave-active {
  transition: opacity 0.4s;
}

.preview-enter,
.preview-leave-active {
  opacity: 0;
}
</style>
