<script setup lang="ts">
import * as shevchenko from 'shevchenko';
import { useDeclensionSlideshow } from '~/composables/declension-slideshow';

const anthroponyms: shevchenko.DeclensionInput[] = [
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    militaryAppointment: 'помічник гранатометника',
    militaryRank: 'солдат',
  },
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    militaryAppointment: 'старший вогнеметник',
    militaryRank: 'старший солдат',
  },
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    militaryAppointment: 'механік-водій',
    militaryRank: 'старший солдат',
  },
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    militaryAppointment: 'бойовий медик взводу',
    militaryRank: 'молодший сержант',
  },
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    militaryAppointment: 'командир відділення',
    militaryRank: 'сержант',
  },
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    militaryAppointment: 'льотчик',
    militaryRank: 'штаб-сержант',
  },
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    militaryAppointment: 'командир десантного катера',
    militaryRank: 'штаб-старшина',
  },
  {
    gender: shevchenko.GrammaticalGender.MASCULINE,
    militaryAppointment: 'командир морського катера',
    militaryRank: 'головний старшина',
  },
];

const anthroponym = useDeclensionSlideshow(anthroponyms, shevchenko.inAccusative);
</script>

<template>
  <transition name="preview" mode="out-in">
    <span v-if="anthroponym" :key="`${anthroponym.militaryAppointment}${anthroponym.militaryRank}`">
      {{ anthroponym.militaryAppointment }} - {{ anthroponym.militaryRank }}
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
