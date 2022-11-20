<template>
  <div class="flag flag--ukraine"></div>
</template>

<style lang="scss" scoped>
$color-sky: #0066cc;
$color-field: #ffcc00;

.flag {
  position: relative;
  display: block;
  width: 100%;
  height: 30px;

  &--ukraine {
    &::before {
      position: absolute;
      top: 0;
      display: block;
      width: 100%;
      height: 50%;
      background-color: $color-sky;
      content: '';
    }

    &::after {
      position: absolute;
      bottom: 0;
      display: block;
      width: 100%;
      height: 50%;
      background-color: $color-field;
      content: '';
    }
  }
}
</style>
