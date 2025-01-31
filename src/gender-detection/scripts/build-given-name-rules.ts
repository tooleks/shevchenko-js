import * as fs from 'node:fs';
import * as path from 'node:path';
import { APOSTROPHE_PATTERN, GrammaticalGender } from '../../language';
import namesData from '../data/given-names-genders.json';

const RULES_FILE = path.join(__dirname, '../artifacts/given-name-rules.json');

const genderGroups: Record<GrammaticalGender, string[]> = {
  masculine: [],
  feminine: [],
};

for (const [name, gender] of Object.entries(namesData)) {
  if (gender in genderGroups) {
    genderGroups[gender as GrammaticalGender].push(name);
  }
}

const endings: Record<GrammaticalGender, Set<string>> = {
  masculine: new Set(),
  feminine: new Set(),
};

let endingLength = 2;
let previousConflicts = new Set<string>();

do {
  const conflicts = new Set<string>();
  // eslint-disable-next-line prefer-const
  for (let [gender, names] of Object.entries(genderGroups)) {
    if (previousConflicts.size > 0) {
      names = names.filter((name) =>
        [...previousConflicts.values()].some((ending) => name.endsWith(ending)),
      );
    }

    for (const name of names) {
      const ending = name.slice(-endingLength);
      endings[gender as GrammaticalGender].add(ending);
      if (endings.masculine.has(ending) && endings.feminine.has(ending)) {
        endings.masculine.delete(ending);
        endings.feminine.delete(ending);
        conflicts.add(ending);
      }
    }
  }

  endingLength += 1;
  previousConflicts = conflicts;
} while (previousConflicts.size > 0);

function buildRegexSource(endings: Set<string>): string {
  return `(${[...endings].join('|')})$`.replace(APOSTROPHE_PATTERN, APOSTROPHE_PATTERN.source);
}

const rules = {
  masculine: buildRegexSource(endings.masculine),
  feminine: buildRegexSource(endings.feminine),
};

fs.writeFileSync(RULES_FILE, JSON.stringify(rules, null, 2), 'utf-8');
