<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useIntervalFn } from '@vueuse/core';
import { GrammaticalGender,DeclensionInput, inVocative } from 'shevchenko';

const anthroponyms: DeclensionInput[] = [
  {
    gender: GrammaticalGender.MASCULINE,
    familyName: 'Шевченко',
    givenName: 'Тарас',
    patronymicName: 'Григорович',
  },
  {
    gender: GrammaticalGender.MASCULINE,
    familyName: 'Франко',
    givenName: 'Іван',
    patronymicName: 'Якович',
  },
  {
    gender: GrammaticalGender.MASCULINE,
    familyName: 'Нечуй-Левицький',
    givenName: 'Іван',
    patronymicName: 'Семенович',
  },
  {
    gender: GrammaticalGender.MASCULINE,
    familyName: 'Рудченко',
    givenName: 'Панас',
    patronymicName: 'Якович',
  },
  {
    gender: GrammaticalGender.MASCULINE,
    familyName: 'Рудченко',
    givenName: 'Іван',
    patronymicName: 'Якович',
  },
  {
    gender: GrammaticalGender.MASCULINE,
    familyName: "Лозов'яга",
    givenName: 'Іван',
    patronymicName: 'Павлович',
  },
  {
    gender: GrammaticalGender.MASCULINE,
    familyName: 'Котляревський',
    givenName: 'Іван',
    patronymicName: 'Петрович',
  },
  {
    gender: GrammaticalGender.MASCULINE,
    familyName: 'Сосюра',
    givenName: 'Володимир',
    patronymicName: 'Миколайович',
  },
  {
    gender: GrammaticalGender.MASCULINE,
    familyName: 'Тичина',
    givenName: 'Павло',
    patronymicName: 'Григорович',
  },
  {
    gender: GrammaticalGender.MASCULINE,
    familyName: 'Симоненко',
    givenName: 'Василь',
    patronymicName: 'Андрійович',
  },
  {
    gender: GrammaticalGender.MASCULINE,
    familyName: 'Фітільов',
    givenName: 'Микола',
    patronymicName: 'Григорович',
  },
  {
    gender: GrammaticalGender.MASCULINE,
    familyName: 'Коцюбинський',
    givenName: 'Михайло',
    patronymicName: 'Михайлович',
  },
  {
    gender: GrammaticalGender.MASCULINE,
    familyName: 'Сковорода',
    givenName: 'Григорій',
    patronymicName: 'Савич',
  },
  {
    gender: GrammaticalGender.MASCULINE,
    familyName: 'Куліш',
    givenName: 'Пантелеймон',
    patronymicName: 'Олександрович',
  },
  {
    gender: GrammaticalGender.MASCULINE,
    familyName: 'Глібов',
    givenName: 'Леонід',
    patronymicName: 'Іванович',
  },
  {
    gender: GrammaticalGender.MASCULINE,
    familyName: 'Гончар',
    givenName: 'Олександр',
    patronymicName: 'Терентійович',
  },
  {
    gender: GrammaticalGender.MASCULINE,
    familyName: 'Довженко',
    givenName: 'Олександр',
    patronymicName: 'Петрович',
  },
  {
    gender: GrammaticalGender.FEMININE,
    familyName: 'Косач-Квітка',
    givenName: 'Лариса',
    patronymicName: 'Петрівна',
  },
  {
    gender: GrammaticalGender.FEMININE,
    familyName: 'Косач',
    givenName: 'Ольга',
    patronymicName: 'Петрівна',
  },
  {
    gender: GrammaticalGender.FEMININE,
    familyName: 'Вілінська',
    givenName: 'Марія',
    patronymicName: 'Олександрівна',
  },
  {
    gender: GrammaticalGender.FEMININE,
    familyName: 'Кобилянська',
    givenName: 'Ольга',
    patronymicName: 'Юліанівна',
  },
];

const shevchenkoAnthroponym = anthroponyms[0];

const anthroponym = ref();

// Shuffle the array of anthroponyms before the preview.
anthroponyms.sort(() => (Math.random() > 0.5 ? 1 : -1));

let index = 0;
async function previewNextAnthroponym(): Promise<void> {
  index = index + 1;
  if (index > anthroponyms.length - 1) {
    index = 0;
  }
  anthroponym.value = await inVocative(anthroponyms[index]);
}

onMounted(async () => {
  anthroponym.value = await inVocative(shevchenkoAnthroponym);
});

useIntervalFn(previewNextAnthroponym, 5_000);
</script>

<template>
  <transition name="preview" mode="out-in">
    <span v-if="anthroponym" :key="`${anthroponym.givenName}${anthroponym.patronymicName}${anthroponym.familyName}`">
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
