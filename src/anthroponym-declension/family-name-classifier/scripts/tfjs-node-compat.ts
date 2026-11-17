import util from 'node:util';

// @tensorflow/tfjs-node@4.22.0 calls util.isNullOrUndefined() and util.isArray(). Node.js 23
// removed util.isNullOrUndefined(), so every op on the tensorflow backend throws
// "util_1.isNullOrUndefined is not a function". tfjs-node looks the helpers up on the shared
// `util` module object at call time, so restoring them here is enough.
const legacyUtil = util as unknown as {
  isNullOrUndefined?: (value: unknown) => value is null | undefined;
  isArray?: (value: unknown) => value is unknown[];
};
legacyUtil.isNullOrUndefined ??= (value: unknown): value is null | undefined =>
  value === null || value === undefined;
legacyUtil.isArray ??= Array.isArray;

export * from '@tensorflow/tfjs-node';
