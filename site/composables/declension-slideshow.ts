import * as shevchenko from 'shevchenko';

type InflectFunction<T extends shevchenko.DeclensionInput> = (
  input: T,
) => Promise<shevchenko.DeclensionOutput<T>>;

export function useDeclensionSlideshow<T extends shevchenko.DeclensionInput>(
  inputs: T[],
  inflect: InflectFunction<T>,
): Ref<shevchenko.DeclensionOutput<shevchenko.DeclensionInput>> {
  const result = ref();

  const defaultInput = inputs[0];

  // Shuffle the array of anthroponyms before the preview.
  inputs.sort(() => (Math.random() > 0.5 ? 1 : -1));

  let previewInputIndex = 0;
  async function updatePreview(): Promise<void> {
    previewInputIndex = previewInputIndex + 1;
    if (previewInputIndex > inputs.length - 1) {
      previewInputIndex = 0;
    }
    result.value = await inflect(inputs[previewInputIndex]);
  }

  onMounted(async () => {
    result.value = await inflect(defaultInput);
  });

  useIntervalFn(updatePreview, 5_000);

  return result;
}
