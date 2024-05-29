<template>
  <section id="demo" class="my-4">
    <div class="row mb-3">
      <div class="col-12">
        <h2 class="mb-0">
          {{ $t('liveDemo') }}
          <small class="d-block h6 text-muted mt-2 mb-0 sentence-capitalize">
            {{ $t('liveDemo.message') }}
          </small>
        </h2>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-5 mb-2 mb-lg-0 d-flex">
        <DeclensionForm v-bind="$attrs" />
      </div>

      <div class="col-lg-7 d-flex">
        <div class="card flex-grow-1 flex-fill">
          <div class="card-body d-flex flex-column justify-content-between">
            <DeclensionResults class="mb-3" />

            <div class="alert alert-light mb-0" role="alert">
              <div
                class="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-md-between"
              >
                {{ $t('declension.shareResult') }}
                <ShareLinks buttons-class="mt-1 mt-md-0 me-md-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.sentence-capitalize:first-letter {
  text-transform: capitalize;
}
</style>
