import fs from 'fs';
import { createRequire } from 'module';
import path from 'path';
import regenerate from 'regenerate';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);

const VERSION = '15.0.0';
const DEST = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'src',
  'parser',
  'unicode-regex.ts',
);

const idStart = regenerate()
  .add(
    require(
      `@unicode/unicode-${VERSION}/Binary_Property/ID_Start/code-points.js`,
    ),
  )
  .toRegExp();

const idContinue = regenerate()
  .add(
    require(
      `@unicode/unicode-${VERSION}/Binary_Property/ID_Continue/code-points.js`,
    ),
  )
  .toRegExp();

fs.writeFileSync(
  DEST,
  `
/* eslint-disable no-misleading-character-class */
// GENERATED CODE - DO NOT MODIFY BY HAND
// (Generated by 'scripts/unicode-regex-gen.js')
export const unicodeIdStartReg = ${idStart};
export const unicodeIdContinueReg = ${idContinue};
  `.trim(),
);
