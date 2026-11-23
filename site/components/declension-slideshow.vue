<script setup lang="ts">
import { computed, ref, shallowRef, watch, type PropType } from 'vue';
import * as shevchenko from 'shevchenko';

export type SlideshowField = Exclude<keyof shevchenko.DeclensionInput, 'gender'>;

const props = defineProps({
  inputs: { type: Array as PropType<shevchenko.DeclensionInput[]>, required: true },
  grammaticalCase: { type: String as PropType<shevchenko.GrammaticalCase>, required: true },
  fields: { type: Array as PropType<SlideshowField[]>, required: true },
});

const SLIDE_DURATION = 10_000;
const slideDurationCss = `${SLIDE_DURATION}ms`;

const inflectors: Record<shevchenko.GrammaticalCase, typeof shevchenko.inNominative> = {
  [shevchenko.GrammaticalCase.NOMINATIVE]: shevchenko.inNominative,
  [shevchenko.GrammaticalCase.GENITIVE]: shevchenko.inGenitive,
  [shevchenko.GrammaticalCase.DATIVE]: shevchenko.inDative,
  [shevchenko.GrammaticalCase.ACCUSATIVE]: shevchenko.inAccusative,
  [shevchenko.GrammaticalCase.ABLATIVE]: shevchenko.inAblative,
  [shevchenko.GrammaticalCase.LOCATIVE]: shevchenko.inLocative,
  [shevchenko.GrammaticalCase.VOCATIVE]: shevchenko.inVocative,
};

const inflectorName = computed(
  () => `in${props.grammaticalCase[0].toUpperCase()}${props.grammaticalCase.slice(1)}`,
);

function shuffleAfterFirst<T>(items: T[]): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 1; index--) {
    const randomIndex = 1 + Math.floor(Math.random() * index);
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }
  return result;
}

function getText(declension: Partial<Record<SlideshowField, string>>): string {
  return props.fields
    .map((field) => declension[field])
    .filter(Boolean)
    .join(' ');
}

const slides = shuffleAfterFirst(props.inputs);

type Slide = { nominative: string; inflected: string };

const slide = shallowRef<Slide>();
const slideKey = computed(() => slide.value?.nominative);
const progressCycle = ref(0);
let slideIndex = 0;

async function showSlide(index: number): Promise<void> {
  const input = slides[index];
  const output = await inflectors[props.grammaticalCase](input);
  slide.value = { nominative: getText(input), inflected: getText(output) };
  progressCycle.value++;
}

const { pause, resume } = useIntervalFn(
  () => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
  },
  SLIDE_DURATION,
  { immediate: false },
);

const isMounted = useMounted();
const preferredMotion = usePreferredReducedMotion();
const isReducedMotion = computed(() => isMounted.value && preferredMotion.value === 'reduce');
const isPaused = ref(false);
const isHovered = ref(false);
const documentVisibility = useDocumentVisibility();
const isWindowFocused = useWindowFocus();
const isPlaying = computed(
  () =>
    isMounted.value &&
    !isPaused.value &&
    !isHovered.value &&
    documentVisibility.value === 'visible' &&
    isWindowFocused.value,
);

function setHovered(event: PointerEvent, hovered: boolean): void {
  if (event.pointerType === 'mouse') {
    isHovered.value = hovered;
  }
}

watch(isReducedMotion, (reduced) => {
  isPaused.value = reduced;
});

watch(isPlaying, (playing) => {
  if (playing) {
    progressCycle.value++;
    resume();
  } else {
    pause();
  }
});

await showSlide(slideIndex);
</script>

<template>
  <div
    class="slideshow"
    @pointerenter="setHovered($event, true)"
    @pointerleave="setHovered($event, false)"
  >
    <div class="slideshow-window">
      <div class="slideshow-header">
        <span class="slideshow-dots" aria-hidden="true"
          ><span></span><span></span><span></span
        ></span>
        <!-- prettier-ignore -->
        <code class="slideshow-call" aria-hidden="true">shevchenko.<span class="slideshow-function">{{ inflectorName }}</span>(input)</code>

        <button
          type="button"
          class="slideshow-toggle"
          :aria-label="isPaused ? $t('slideshow.play') : $t('slideshow.pause')"
          :title="isPaused ? $t('slideshow.play') : $t('slideshow.pause')"
          @click="isPaused = !isPaused"
        >
          <i :class="isPaused ? 'fa-solid fa-play' : 'fa-solid fa-pause'" aria-hidden="true"></i>
        </button>

        <span
          v-if="isMounted && !isPaused"
          :key="progressCycle"
          class="slideshow-progress"
          :class="{ 'slideshow-progress-paused': !isPlaying }"
          aria-hidden="true"
        ></span>
      </div>

      <transition name="slideshow" mode="out-in">
        <div v-if="slide" :key="slideKey" class="slideshow-body" aria-hidden="true">
          <div class="slideshow-label">{{ $t('grammaticalCase.nominative') }}</div>
          <p class="slideshow-name slideshow-name-input" lang="uk">{{ slide.nominative }}</p>

          <div class="slideshow-arrow">
            <i class="fa-solid fa-arrow-down"></i>
          </div>

          <div class="slideshow-label">{{ $t(`grammaticalCase.${grammaticalCase}`) }}</div>
          <p class="slideshow-name slideshow-name-output" lang="uk">
            <DeclinedText :base="slide.nominative" :text="slide.inflected" />
          </p>
        </div>
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.slideshow {
  position: relative;
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    inset: -1.5rem;
    z-index: -1;
    background: radial-gradient(
        circle at 20% 15%,
        rgba(var(--site-blue-rgb), 0.35),
        transparent 55%
      ),
      radial-gradient(circle at 85% 90%, rgba(var(--site-yellow-rgb), 0.45), transparent 55%);
    filter: blur(28px);
  }
}

.slideshow-window {
  position: relative;
  overflow: hidden;
  border-radius: var(--site-radius-xl);
  background: #0f172a;
  box-shadow: 0 30px 60px -24px rgba(15, 23, 42, 0.55), 0 0 0 1px rgba(15, 23, 42, 0.08);
  color: #e2e8f0;
}

.slideshow-header {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.slideshow-dots {
  display: inline-flex;
  gap: 0.375rem;

  span {
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.16);
  }
}

.slideshow-call {
  overflow: hidden;
  color: #94a3b8;
  font-size: 0.8125rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.slideshow-function {
  color: #d2a8ff;
}

.slideshow-toggle {
  display: grid;
  flex: none;
  place-items: center;
  width: 1.75rem;
  height: 1.75rem;
  margin-left: auto;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: #64748b;
  font-size: 0.6875rem;
  cursor: pointer;
  transition: color 0.15s, background-color 0.15s;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    color: #e2e8f0;
  }

  &:focus-visible {
    outline: 2px solid #60a5fa;
    outline-offset: 2px;
  }
}

.slideshow-body {
  min-height: 17.5rem;
  padding: 1.75rem 1.5rem 2rem;

  @media (min-width: 576px) {
    padding-inline: 2rem;
  }
}

.slideshow-label {
  color: #8392a8;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.slideshow-name {
  margin: 0.375rem 0 0;
  font-size: clamp(1.25rem, 1.05rem + 0.8vw, 1.625rem);
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.015em;
}

.slideshow-name-input {
  color: #cbd5e1;
  font-weight: 500;
}

.slideshow-name-output {
  color: #fff;

  :deep(mark) {
    background: none;
    color: var(--site-yellow);
  }
}

.slideshow-arrow {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  margin: 1.125rem 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  color: #94a3b8;
  font-size: 0.875rem;
}

.slideshow-progress {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.2);
  transform-origin: left;
  animation: slideshow-progress v-bind(slideDurationCss) linear forwards;
}

.slideshow-progress-paused {
  animation-play-state: paused;
}

@keyframes slideshow-progress {
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
}

.slideshow-enter-active,
.slideshow-leave-active {
  transition: opacity 0.45s ease, transform 0.45s ease;
}

.slideshow-enter-from {
  opacity: 0;
  transform: translateY(4px);
}

.slideshow-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (prefers-reduced-motion: reduce) {
  .slideshow-enter-active,
  .slideshow-leave-active {
    transition: opacity 0.45s ease;
  }

  .slideshow-enter-from,
  .slideshow-leave-to {
    transform: none;
  }

  .slideshow-progress {
    display: none;
  }
}
</style>
