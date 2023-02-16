import { writeFile } from 'fs/promises';
import * as path from 'path';
import * as tf from '@tensorflow/tfjs';

const MODEL_BUNDLE_FILEPATH = path.join(__dirname, 'artifacts/model.bundle.json');

type ModelMetadata = Omit<tf.io.ModelJSON, 'modelTopology' | 'weightsManifest'>;

interface ModelBundle {
  modelInfo: tf.io.ModelArtifactsInfo;
  modelTopology: Record<string, unknown>;
  weightSpecs: tf.io.WeightsManifestEntry[];
  weightData: string;
  modelMetadata: ModelMetadata;
}

// Use Buffer on Node.js instead of Blob/atob/btoa
const useNodeBuffer =
  typeof Buffer !== 'undefined' &&
  (typeof Blob === 'undefined' || typeof atob === 'undefined' || typeof btoa === 'undefined');

/**
 * Encodes an ArrayBuffer as a base64 encoded string.
 */
export function arrayBufferToBase64String(buffer: ArrayBuffer): string {
  if (useNodeBuffer) {
    return Buffer.from(buffer).toString('base64');
  }

  const buf = new Uint8Array(buffer);
  let s = '';
  for (let i = 0, l = buf.length; i < l; i++) {
    s += String.fromCharCode(buf[i]);
  }
  return btoa(s);
}

// eslint-disable-next-line import/namespace
export class WordClassModelSaver implements tf.io.IOHandler {
  /**
   * Saves the model artifacts to the artifacts directory in JSON format.
   */
  async save(modelArtifacts: tf.io.ModelArtifacts): Promise<tf.io.SaveResult> {
    if (modelArtifacts.modelTopology instanceof ArrayBuffer) {
      throw new Error(
        `${this.constructor.name} does not support saving non-JSON model topology yet.`,
      );
    }

    const modelBundle: Partial<ModelBundle> = {};

    // Save model info.
    const modelArtifactsInfo: tf.io.ModelArtifactsInfo =
      tf.io.getModelArtifactsInfoForJSON(modelArtifacts);
    modelBundle.modelInfo = modelArtifactsInfo;

    // Save topology.
    if (modelArtifacts.modelTopology == null) {
      throw new Error(`The topology is missing.`);
    }
    modelBundle.modelTopology = modelArtifacts.modelTopology;

    // Save weight specs.
    if (modelArtifacts.weightSpecs == null) {
      throw new Error(`The weight specs are missing.`);
    }
    modelBundle.weightSpecs = modelArtifacts.weightSpecs;

    // Save weight data.
    if (modelArtifacts.weightData == null) {
      throw new Error(`The binary weight values are missing.`);
    }
    modelBundle.weightData = arrayBufferToBase64String(modelArtifacts.weightData);

    // Load meta-data fields.
    // Note that JSON.stringify doesn't write out keys that have undefined
    // values, so for some keys, we set undefined instead of a null-ish value.
    const metadata: ModelMetadata = {
      format: modelArtifacts.format,
      generatedBy: modelArtifacts.generatedBy,
      convertedBy: modelArtifacts.convertedBy,
      signature: modelArtifacts.signature != null ? modelArtifacts.signature : undefined,
      userDefinedMetadata:
        modelArtifacts.userDefinedMetadata != null ? modelArtifacts.userDefinedMetadata : undefined,
      modelInitializer:
        modelArtifacts.modelInitializer != null ? modelArtifacts.modelInitializer : undefined,
      initializerSignature:
        modelArtifacts.initializerSignature != null
          ? modelArtifacts.initializerSignature
          : undefined,
      trainingConfig:
        modelArtifacts.trainingConfig != null ? modelArtifacts.trainingConfig : undefined,
    };

    modelBundle.modelMetadata = metadata;

    await writeFile(
      path.join(MODEL_BUNDLE_FILEPATH, 'model.bundle.json'),
      JSON.stringify(modelBundle, null, 2),
      'utf-8',
    );

    return { modelArtifactsInfo };
  }
}
