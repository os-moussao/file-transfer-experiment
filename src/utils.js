import { dirname } from './constants.js';

export function downloadPath(name, ext) {
  return `${dirname}/${name}.${ext}`;
}

export function rethrow(err) {
  if (err) throw err;
}
