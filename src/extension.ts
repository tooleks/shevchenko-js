import { DeclensionInput, DeclensionOutput } from './contracts';
import { GrammaticalCase } from './language';
import { WordInflector } from './word-declension';
import { wordInflector } from './word-declension/bootstrap';

export type FieldName = keyof Omit<DeclensionInput, 'gender'>;

export type AfterInflectHook = <T extends DeclensionInput>(
  grammaticalCase: GrammaticalCase,
  input: T,
) => Promise<DeclensionOutput<T>>;

export type ShevchenkoExtension = {
  fieldNames: FieldName[];
  afterInflect?: AfterInflectHook;
};

export type ExtensionFactory = (context: ExtensionContext) => ShevchenkoExtension;

export type ExtensionContext = {
  wordInflector: WordInflector;
};

const registeredExtensions: ShevchenkoExtension[] = [];

export function registerExtension(extensionFactory: ExtensionFactory): void {
  const extension = extensionFactory({ wordInflector });
  registeredExtensions.push(extension);
}

export function getCustomFieldNames(): FieldName[] {
  const fieldNames: FieldName[] = [];
  for (const extension of registeredExtensions) {
    fieldNames.push(...extension.fieldNames);
  }
  return fieldNames;
}

export async function afterInflect<T extends DeclensionInput>(
  grammaticalCase: GrammaticalCase,
  input: T,
): Promise<DeclensionOutput<T>> {
  const output = {} as DeclensionOutput<T>;
  for (const extension of registeredExtensions) {
    const customOutput = await extension.afterInflect?.(grammaticalCase, input);
    if (customOutput != null) {
      Object.assign(output, customOutput);
    }
  }
  return output;
}
