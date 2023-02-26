import * as tf from '@tensorflow/tfjs';
import modelBundle from './artifacts/model.bundle.json';

type ModelMetadata = Omit<tf.io.ModelJSON, 'modelTopology' | 'weightsManifest'>;

// Use Buffer on Node.js instead of Blob/atob/btoa
const useNodeBuffer =
  typeof Buffer !== 'undefined' &&
  (typeof Blob === 'undefined' || typeof atob === 'undefined' || typeof btoa === 'undefined');

/**
 * Decodes a base64 string as an ArrayBuffer.
 */
export function base64StringToArrayBuffer(str: string): ArrayBuffer {
  if (useNodeBuffer) {
    const buf = Buffer.from(str, 'base64');
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  }

  const s = atob(str);
  const buffer = new Uint8Array(s.length);
  for (let i = 0; i < s.length; ++i) {
    buffer.set([s.charCodeAt(i)], i);
  }
  return buffer.buffer;
}

/**
 * @see {@link https://github.com/tensorflow/tfjs/blob/57e0f212f7fc3643ec1f70130725c7d3c716ef7a/tfjs-core/src/io/local_storage.ts}
 */
// eslint-disable-next-line import/namespace
export class ModelBundleLoader implements tf.io.IOHandler {
  /**
   * Saves the model artifacts from the artifacts directory in JSON format.
   */
  async load(): Promise<tf.io.ModelArtifacts> {
    if (modelBundle.modelInfo.modelTopologyType !== 'JSON') {
      throw new Error(
        `${this.constructor.name} does not support loading non-JSON model topology yet.`,
      );
    }

    const out: tf.io.ModelArtifacts = {};

    out.modelTopology = modelBundle.modelTopology;
    out.weightSpecs = modelBundle.weightSpecs as tf.io.WeightsManifestEntry[];
    out.weightData = base64StringToArrayBuffer(modelBundle.weightData);

    if (modelBundle.modelMetadata != null) {
      const metadata = modelBundle.modelMetadata as ModelMetadata;
      out.format = metadata.format;
      out.generatedBy = metadata.generatedBy;
      out.convertedBy = metadata.convertedBy;
      if (metadata.signature != null) {
        out.signature = metadata.signature;
      }
      if (metadata.userDefinedMetadata != null) {
        out.userDefinedMetadata = metadata.userDefinedMetadata;
      }
      if (metadata.modelInitializer != null) {
        out.modelInitializer = metadata.modelInitializer;
      }
      if (metadata.initializerSignature != null) {
        out.initializerSignature = metadata.initializerSignature;
      }
      if (metadata.trainingConfig != null) {
        out.trainingConfig = metadata.trainingConfig;
      }
    }

    return out;
  }
}
