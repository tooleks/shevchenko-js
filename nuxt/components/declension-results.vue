<script setup lang="ts">
import { useDeclension } from '~/composables/declension';

const { declensionResults } = useDeclension();
</script>

<template>
  <table class="table table-responsive-md m-0">
    <tr class="bg-light">
      <th class="border-top-0">{{ $t('grammaticalCase') }}</th>
      <th class="border-top-0">{{ $t('anthroponym.lastName') }}</th>
      <th class="border-top-0">{{ $t('anthroponym.firstName') }}</th>
      <th class="border-top-0">{{ $t('anthroponym.middleName') }}</th>
      <th class="border-top-0">
        <span class="py-0 px-1">
          <i
            class="fa fa-info-circle"
            :title="$t('declensionForm.copyMessage')"
            :aria-label="$t('declensionForm.copyMessage')"
          ></i>
        </span>
      </th>
    </tr>

    <tr>
      <th>{{ $t('grammaticalCase.nominative') }}</th>
      <td>{{ declensionResults.nominativeCase.lastName }}</td>
      <td>{{ declensionResults.nominativeCase.firstName }}</td>
      <td>{{ declensionResults.nominativeCase.middleName }}</td>
      <td>
        <CopyButton
          :button-id="'copy-nominative-case-button'"
          :source="`${declensionResults.nominativeCase.lastName} ${declensionResults.nominativeCase.firstName} ${declensionResults.nominativeCase.middleName}`"
        />
      </td>
    </tr>

    <tr>
      <th>{{ $t('grammaticalCase.genitive') }}</th>
      <td>{{ declensionResults.genitiveCase.lastName }}</td>
      <td>{{ declensionResults.genitiveCase.firstName }}</td>
      <td>{{ declensionResults.genitiveCase.middleName }}</td>
      <td>
        <CopyButton
          :button-id="'copy-genitive-case-button'"
          :source="`${declensionResults.genitiveCase.lastName} ${declensionResults.genitiveCase.firstName} ${declensionResults.genitiveCase.middleName}`"
        />
      </td>
    </tr>

    <tr>
      <th>{{ $t('grammaticalCase.dative') }}</th>
      <td>{{ declensionResults.dativeCase.lastName }}</td>
      <td>{{ declensionResults.dativeCase.firstName }}</td>
      <td>{{ declensionResults.dativeCase.middleName }}</td>
      <td>
        <CopyButton
          :button-id="'copy-dative-case-button'"
          :source="`${declensionResults.dativeCase.lastName} ${declensionResults.dativeCase.firstName} ${declensionResults.dativeCase.middleName}`"
        />
      </td>
    </tr>

    <tr>
      <th>{{ $t('grammaticalCase.accusative') }}</th>
      <td>{{ declensionResults.accusativeCase.lastName }}</td>
      <td>{{ declensionResults.accusativeCase.firstName }}</td>
      <td>{{ declensionResults.accusativeCase.middleName }}</td>
      <td>
        <CopyButton
          :button-id="'copy-accusative-case-button'"
          :source="`${declensionResults.accusativeCase.lastName} ${declensionResults.accusativeCase.firstName} ${declensionResults.accusativeCase.middleName}`"
        />
      </td>
    </tr>

    <tr>
      <th>{{ $t('grammaticalCase.ablative') }}</th>
      <td>{{ declensionResults.ablativeCase.lastName }}</td>
      <td>{{ declensionResults.ablativeCase.firstName }}</td>
      <td>{{ declensionResults.ablativeCase.middleName }}</td>
      <td>
        <CopyButton
          :button-id="'copy-ablative-case-button'"
          :source="`${declensionResults.ablativeCase.lastName} ${declensionResults.ablativeCase.firstName} ${declensionResults.ablativeCase.middleName}`"
        />
      </td>
    </tr>

    <tr>
      <th>{{ $t('grammaticalCase.locative') }}</th>
      <td>{{ declensionResults.locativeCase.lastName }}</td>
      <td>{{ declensionResults.locativeCase.firstName }}</td>
      <td>{{ declensionResults.locativeCase.middleName }}</td>
      <td>
        <CopyButton
          :button-id="'copy-locative-case-button'"
          :source="`${declensionResults.locativeCase.lastName} ${declensionResults.locativeCase.firstName} ${declensionResults.locativeCase.middleName}`"
        />
      </td>
    </tr>

    <tr>
      <th>{{ $t('grammaticalCase.vocative') }}</th>
      <td>{{ declensionResults.vocativeCase.lastName }}</td>
      <td>{{ declensionResults.vocativeCase.firstName }}</td>
      <td>{{ declensionResults.vocativeCase.middleName }}</td>
      <td>
        <CopyButton
          :button-id="'copy-vocative-case-button'"
          :source="`${declensionResults.vocativeCase.lastName} ${declensionResults.vocativeCase.firstName} ${declensionResults.vocativeCase.middleName}`"
        />
      </td>
    </tr>
  </table>
</template>
