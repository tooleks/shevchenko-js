import { exec } from 'child_process';
import { readFile, writeFile } from 'fs/promises';
import { join as joinPath } from 'path';
import * as tf from '@tensorflow/tfjs';
import { FamilyNameClassifier, ModelBundleLoader } from '../../src/family-name-classifier';

const TFJS_CONFIG_FILENAME = 'custom_tfjs_config.json';
const TFJS_CONFIG_FILEPATH = joinPath(__dirname, TFJS_CONFIG_FILENAME);
const TFJS_BUNDLE_FILEPATH = joinPath(__dirname, 'custom_tfjs.js');

async function detectUsedKernels(): Promise<string[]> {
  const profileInfo = await tf.profile(async () => {
    const modelBundleLoader = new ModelBundleLoader();
    const wordClassRecognizer = new FamilyNameClassifier(modelBundleLoader);
    await wordClassRecognizer.classify('шевченко');
  });

  return profileInfo.kernelNames;
}

async function configureUsedKernels(kernels: string[]): Promise<void> {
  let json = await readFile(TFJS_CONFIG_FILEPATH, 'utf-8');
  const config = JSON.parse(json);
  config.kernels = kernels;
  json = JSON.stringify(config, null, 2);
  await writeFile(TFJS_CONFIG_FILEPATH, json, 'utf-8');
}

function buildCustomBundle(): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(`npx tfjs-custom-module --config ${TFJS_CONFIG_FILENAME}`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else if (stderr) {
        reject(new Error(stderr));
      } else if (stdout) {
        console.log(stdout);
        resolve();
      } else {
        resolve();
      }
    });
  });
}

async function addLayersExport(): Promise<void> {
  const exports = ["export * from '@tensorflow/tfjs-layers';"];
  let code = await readFile(TFJS_BUNDLE_FILEPATH, 'utf-8');
  for (const exportEntry of exports) {
    code += `\n${exportEntry}`;
  }
  await writeFile(TFJS_BUNDLE_FILEPATH, code, 'utf-8');
}

async function main(): Promise<void> {
  const kernels = await detectUsedKernels();
  await configureUsedKernels(kernels);
  await buildCustomBundle();
  await addLayersExport();
}

void main();
