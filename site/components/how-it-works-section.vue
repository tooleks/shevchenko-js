<script setup lang="ts">
const topics = [
  'genderDetection',
  'machineLearning',
  'soundAlternation',
  'vocativeCase',
  'compoundNames',
  'indeclinableFamilyNames',
];
</script>

<template>
  <section id="how-it-works" class="site-section">
    <div class="container">
      <div class="row gy-2 gx-lg-5">
        <div class="col-lg-4">
          <div class="how-it-works-aside">
            <SectionHeading
              :title="$t('home.howItWorks')"
              :subtitle="$t('home.howItWorks.subtitle')"
            />
          </div>
        </div>

        <div class="col-lg-8">
          <ul class="topics">
            <li v-for="topic in topics" :key="topic" class="topic">
              <h3 class="topic-title">{{ $t(`home.howItWorks.${topic}.title`) }}</h3>
              <p class="topic-text">{{ $t(`home.howItWorks.${topic}.text`) }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.how-it-works-aside {
  @media (min-width: 992px) {
    position: sticky;
    top: calc(var(--site-header-height) + 1rem);
  }
}

.topics {
  display: grid;
  gap: 2rem 2.5rem;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.topic {
  padding-top: 1.25rem;
  border-top: 1px solid var(--site-line);
}

.topic-title {
  margin: 0 0 0.5rem;
  color: var(--site-ink);
  font-size: 1.125rem;
  font-weight: 700;
}

.topic-text {
  margin: 0;
  color: var(--site-text);
  line-height: 1.7;
}
</style>
