<script setup lang="ts">
import * as shevchenko from 'shevchenko';
import { useDeclensionSlideshow } from '~/composables/declension-slideshow';

const anthroponyms: shevchenko.DeclensionInput[] = [
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    militaryRank: 'солдат',
    militaryAppointment: 'помічник гранатометника',
  },
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    militaryRank: 'старший солдат',
    militaryAppointment: 'старший вогнеметник',
  },
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    militaryRank: 'старший солдат',
    militaryAppointment: 'механік-водій',
  },
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    militaryRank: 'молодший сержант',
    militaryAppointment: 'бойовий медик взводу',
  },
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    militaryRank: 'сержант',
    militaryAppointment: 'командир відділення',
  },
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    militaryRank: 'штаб-сержант',
    militaryAppointment: 'льотчик',
  },
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    militaryRank: 'штаб-старшина',
    militaryAppointment: 'командир десантного катера',
  },
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    militaryRank: 'головний старшина',
    militaryAppointment: 'командир морського катера',
  },
];

const anthroponym = useDeclensionSlideshow(anthroponyms, shevchenko.inAccusative);
</script>

<template>
  <transition name="preview" mode="out-in">
    <span v-if="anthroponym" :key="`${anthroponym.militaryRank}${anthroponym.militaryAppointment}`">
      {{ anthroponym.militaryRank }} - {{ anthroponym.militaryAppointment }}
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
