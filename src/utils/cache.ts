import { createStorage, type StorageValue } from "unstorage";
import fsDriver from "unstorage/drivers/fs";

const storage = createStorage({
  driver: fsDriver({ base: "node_modules/.cache/unstorage" }),
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
