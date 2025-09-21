import { readdir, mkdir, copyFile } from 'node:fs/promises';
import * as path from 'node:path';

export const copyPaste = async (source, target) => {
  try {
    await readdir(source, { withFileTypes: true })
      .then(mkdir(target, { recursive: true }))
      .then(async data => {
        data.forEach(el => {
          let sourceDir = path.join(source, el.name);
          let targetDir = path.join(target, el.name);

          if (el.isDirectory()) {
            copyPaste(sourceDir, targetDir);
          } else {
            copyFile(sourceDir, targetDir.replace(`${source}`, ''));
          }
        });
      });
  } catch (error) {
    console.error(error.message);
  }
};
