<template>
  <section id="demo" class="my-4">
    <div class="row mb-3">
      <div class="col-12 col-lg-9">
        <h2 class="mb-0">
          {{ $t('demo') }}
          <small class="d-block h6 text-muted mt-2 mb-0">
            {{ $t('demo.message') }}
          </small>
        </h2>
      </div>

      <div class="col-12 col-lg-3">
        <div class="d-flex">
          <ShareLinks buttons-class="ml-auto" />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-5 mb-2 mb-lg-0">
        <DeclensionForm v-bind="$attrs" />
      </div>

      <div class="col-lg-7">
        <div class="card mb-2">
          <DeclensionResults />
        </div>
      </div>
    </div>
  </section>
</template>
