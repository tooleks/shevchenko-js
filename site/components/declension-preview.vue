<script setup lang="ts">
import { ref } from 'vue';
import { useIntervalFn } from '@vueuse/core';
import * as shevchenko from 'shevchenko';

const anthroponyms: shevchenko.Anthroponym[] = [
  {
    gender: shevchenko.Gender.Male,
    lastName: 'Шевченко',
    firstName: 'Тарас',
    middleName: 'Григорович',
  },
  {
    gender: shevchenko.Gender.Male,
    lastName: 'Франко',
    firstName: 'Іван',
    middleName: 'Якович',
  },
  {
    gender: shevchenko.Gender.Male,
    lastName: 'Нечуй-Левицький',
    firstName: 'Іван',
    middleName: 'Семенович',
  },
  {
    gender: shevchenko.Gender.Male,
    lastName: 'Рудченко',
    firstName: 'Панас',
    middleName: 'Якович',
  },
  {
    gender: shevchenko.Gender.Male,
    lastName: 'Рудченко',
    firstName: 'Іван',
    middleName: 'Якович',
  },
  {
    gender: shevchenko.Gender.Male,
    lastName: "Лозов'яга",
    firstName: 'Іван',
    middleName: 'Павлович',
  },
  {
    gender: shevchenko.Gender.Male,
    lastName: 'Котляревський',
    firstName: 'Іван',
    middleName: 'Петрович',
  },
  {
    gender: shevchenko.Gender.Male,
    lastName: 'Сосюра',
    firstName: 'Володимир',
    middleName: 'Миколайович',
  },
  {
    gender: shevchenko.Gender.Male,
    lastName: 'Тичина',
    firstName: 'Павло',
    middleName: 'Григорович',
  },
  {
    gender: shevchenko.Gender.Male,
    lastName: 'Симоненко',
    firstName: 'Василь',
    middleName: 'Андрійович',
  },
  {
    gender: shevchenko.Gender.Male,
    lastName: 'Фітільов',
    firstName: 'Микола',
    middleName: 'Григорович',
  },
  {
    gender: shevchenko.Gender.Male,
    lastName: 'Коцюбинський',
    firstName: 'Михайло',
    middleName: 'Михайлович',
  },
  {
    gender: shevchenko.Gender.Male,
    lastName: 'Сковорода',
    firstName: 'Григорій',
    middleName: 'Савич',
  },
  {
    gender: shevchenko.Gender.Male,
    lastName: 'Куліш',
    firstName: 'Пантелеймон',
    middleName: 'Олександрович',
  },
  {
    gender: shevchenko.Gender.Male,
    lastName: 'Глібов',
    firstName: 'Леонід',
    middleName: 'Іванович',
  },
  {
    gender: shevchenko.Gender.Male,
    lastName: 'Гончар',
    firstName: 'Олександр',
    middleName: 'Терентійович',
  },
  {
    gender: shevchenko.Gender.Male,
    lastName: 'Довженко',
    firstName: 'Олександр',
    middleName: 'Петрович',
  },
  {
    gender: shevchenko.Gender.Female,
    lastName: 'Косач-Квітка',
    firstName: 'Лариса',
    middleName: 'Петрівна',
  },
  {
    gender: shevchenko.Gender.Female,
    lastName: 'Косач',
    firstName: 'Ольга',
    middleName: 'Петрівна',
  },
  {
    gender: shevchenko.Gender.Female,
    lastName: 'Вілінська',
    firstName: 'Марія',
    middleName: 'Олександрівна',
  },
  {
    gender: shevchenko.Gender.Female,
    lastName: 'Кобилянська',
    firstName: 'Ольга',
    middleName: 'Юліанівна',
  },
];

const anthroponym = ref(shevchenko.inVocative(anthroponyms[0]));

// Shuffle the array of anthroponyms before the preview.
anthroponyms.sort(() => (Math.random() > 0.5 ? 1 : -1));

let index = 0;
function previewNextAnthroponym(): void {
  index = index + 1;
  if (index > anthroponyms.length - 1) {
    index = 0;
  }
  anthroponym.value = shevchenko.inVocative(anthroponyms[index]);
}

useIntervalFn(previewNextAnthroponym, 5_000);
</script>

<template>
  <transition name="preview" mode="out-in">
    <span :key="`${anthroponym.firstName}${anthroponym.middleName}${anthroponym.lastName}`">
      {{ anthroponym.firstName }} {{ anthroponym.middleName }} {{ anthroponym.lastName }}
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
