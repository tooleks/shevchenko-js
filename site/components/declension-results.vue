<script setup lang="ts">
import { Anthroponym } from 'shevchenko';
import { useDeclension } from '~/composables/declension';

const { declensionResults } = await useDeclension();

function concatAnthroponym(anthroponym: Anthroponym): string {
  const output: string[] = [];

  if (anthroponym.familyName) {
    output.push(anthroponym.familyName);
  }

  if (anthroponym.givenName) {
    output.push(anthroponym.givenName);
  }

  if (anthroponym.patronymicName) {
    output.push(anthroponym.patronymicName);
  }

  return output.join(' ');
}
</script>

<template>
  <div class="table-responsive-md">
    <table class="table">
      <tbody>
        <tr>
          <th class="border-top-0 rounded">{{ $t('grammaticalCase') }}</th>
          <th class="border-top-0">{{ $t('anthroponym.familyName') }}</th>
          <th class="border-top-0">{{ $t('anthroponym.givenName') }}</th>
          <th class="border-top-0">{{ $t('anthroponym.patronymicName') }}</th>
          <th class="border-top-0 text-end">
            <span class="py-0 px-1">
              <i
                class="fa fa-info-circle"
                :title="$t('declension.copyResult')"
                :aria-label="$t('declension.copyResult')"
              ></i>
            </span>
          </th>
        </tr>

        <tr>
          <th>{{ $t('grammaticalCase.nominative') }}</th>
          <td>{{ declensionResults.nominativeCase?.familyName }}</td>
          <td>{{ declensionResults.nominativeCase?.givenName }}</td>
          <td>{{ declensionResults.nominativeCase?.patronymicName }}</td>
          <td class="text-end">
            <CopyButton
              v-if="declensionResults.nominativeCase"
              :button-id="'copy-nominative-case-button'"
              :source="concatAnthroponym(declensionResults.nominativeCase)"
            />
          </td>
        </tr>

        <tr>
          <th>{{ $t('grammaticalCase.genitive') }}</th>
          <td>{{ declensionResults.genitiveCase?.familyName }}</td>
          <td>{{ declensionResults.genitiveCase?.givenName }}</td>
          <td>{{ declensionResults.genitiveCase?.patronymicName }}</td>
          <td class="text-end">
            <CopyButton
              v-if="declensionResults.genitiveCase"
              :button-id="'copy-genitive-case-button'"
              :source="concatAnthroponym(declensionResults.genitiveCase)"
            />
          </td>
        </tr>

        <tr>
          <th>{{ $t('grammaticalCase.dative') }}</th>
          <td>{{ declensionResults.dativeCase?.familyName }}</td>
          <td>{{ declensionResults.dativeCase?.givenName }}</td>
          <td>{{ declensionResults.dativeCase?.patronymicName }}</td>
          <td class="text-end">
            <CopyButton
              v-if="declensionResults.dativeCase"
              :button-id="'copy-dative-case-button'"
              :source="concatAnthroponym(declensionResults.dativeCase)"
            />
          </td>
        </tr>

        <tr>
          <th>{{ $t('grammaticalCase.accusative') }}</th>
          <td>{{ declensionResults.accusativeCase?.familyName }}</td>
          <td>{{ declensionResults.accusativeCase?.givenName }}</td>
          <td>{{ declensionResults.accusativeCase?.patronymicName }}</td>
          <td class="text-end">
            <CopyButton
              v-if="declensionResults.accusativeCase"
              :button-id="'copy-accusative-case-button'"
              :source="concatAnthroponym(declensionResults.accusativeCase)"
            />
          </td>
        </tr>

        <tr>
          <th>{{ $t('grammaticalCase.ablative') }}</th>
          <td>{{ declensionResults.ablativeCase?.familyName }}</td>
          <td>{{ declensionResults.ablativeCase?.givenName }}</td>
          <td>{{ declensionResults.ablativeCase?.patronymicName }}</td>
          <td class="text-end">
            <CopyButton
              v-if="declensionResults.ablativeCase"
              :button-id="'copy-ablative-case-button'"
              :source="concatAnthroponym(declensionResults.ablativeCase)"
            />
          </td>
        </tr>

        <tr>
          <th>{{ $t('grammaticalCase.locative') }}</th>
          <td>{{ declensionResults.locativeCase?.familyName }}</td>
          <td>{{ declensionResults.locativeCase?.givenName }}</td>
          <td>{{ declensionResults.locativeCase?.patronymicName }}</td>
          <td class="text-end">
            <CopyButton
              v-if="declensionResults.locativeCase"
              :button-id="'copy-locative-case-button'"
              :source="concatAnthroponym(declensionResults.locativeCase)"
            />
          </td>
        </tr>

        <tr>
          <th class="border-bottom-0">{{ $t('grammaticalCase.vocative') }}</th>
          <td class="border-bottom-0">{{ declensionResults.vocativeCase?.familyName }}</td>
          <td class="border-bottom-0">{{ declensionResults.vocativeCase?.givenName }}</td>
          <td class="border-bottom-0">{{ declensionResults.vocativeCase?.patronymicName }}</td>
          <td class="border-bottom-0 text-end">
            <CopyButton
              v-if="declensionResults.vocativeCase"
              :button-id="'copy-vocative-case-button'"
              :source="concatAnthroponym(declensionResults.vocativeCase)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.table {
  th,
  td {
    padding: 0.75rem 0.5rem;
  }
}
</style>
