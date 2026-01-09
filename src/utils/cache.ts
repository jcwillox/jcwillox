import { createStorage, type StorageValue } from "unstorage";
import fsDriver from "unstorage/drivers/fs";
import vercelKVDriver from "unstorage/drivers/vercel-kv";

const storage = createStorage({
  driver: import.meta.env.DEV
    ? fsDriver({ base: "node_modules/.cache/unstorage" })
    : vercelKVDriver({ ttl: 86400, base: "jcwillox-com" }),
});

export const cacheFn = async <T extends StorageValue>(
  key: string,
  fn: () => Promise<T>,
): Promise<T> => {
  const cached = await storage.getItem<T>(key);
  if (cached) return cached;
  const result = await fn();
  await storage.setItem<T>(key, result, { ttl: 86400 });
  return result;
};
