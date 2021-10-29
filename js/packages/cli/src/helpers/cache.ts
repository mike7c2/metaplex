import fs from 'fs';
import path from 'path';
import { CACHE_PATH } from './constants';

export function cachePath(
  env: string,
  cacheName: string,
  cPath: string = CACHE_PATH,
) {
  return path.join(cPath, `${env}-${cacheName}.json`);
}

export function loadCache(
  cacheName: string,
  env: string,
  cPath: string = CACHE_PATH,
) {
  const path = cachePath(env, cacheName, cPath);
  return fs.existsSync(path)
    ? JSON.parse(fs.readFileSync(path).toString())
    : undefined;
}

export function saveCache(
  cacheName: string,
  env: string,
  cacheContent,
  cPath: string = CACHE_PATH,
) {
  cacheContent.env = env;
  cacheContent.cacheName = cacheName;
  fs.writeFileSync(
    cachePath(env, cacheName, cPath),
    JSON.stringify(cacheContent),
  );
}
