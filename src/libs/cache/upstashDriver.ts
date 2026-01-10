/** biome-ignore-all lint/correctness/useHookAtTopLevel: <explanation> */
import { Redis } from "@upstash/redis";
import { BaseDriver } from "bentocache/drivers/base_driver";
import type {
  CreateDriverResult,
  DriverCommonOptions,
  L2CacheDriver,
} from "bentocache/types";
import { isString } from "radashi";

type UpstashDriverOptions = DriverCommonOptions & {
  client?: Redis;
};

class UpstashDriver extends BaseDriver implements L2CacheDriver {
  type = "l2" as const;
  private readonly client: Redis;

  constructor(config: UpstashDriverOptions) {
    super(config);
    this.client =
      config.client ?? Redis.fromEnv({ automaticDeserialization: false });
  }

  namespace(namespace: string): UpstashDriver {
    return new UpstashDriver({
      ...this.config,
      client: this.client,
      prefix: this.createNamespacePrefix(namespace),
    });
  }

  async get(key: string): Promise<string | undefined> {
    const result = await this.client.get(this.getItemKey(key));
    return isString(result) ? result : undefined;
  }

  async pull(key: string): Promise<string | undefined> {
    const value = await this.client.getdel(this.getItemKey(key));
    return isString(value) ? value : undefined;
  }

  async set(key: string, value: string, ttl?: number): Promise<boolean> {
    const itemKey = this.getItemKey(key);
    const result = ttl
      ? await this.client.set(itemKey, value, { px: ttl })
      : await this.client.set(itemKey, value);
    return result === "OK";
  }

  async clear(): Promise<void> {
    const match = this.prefix ? `${this.prefix}:*` : "*";
    let cursor = "0";
    const count = 1_000;
    do {
      const [nextCursor, keys] = await this.client.scan(cursor, {
        match,
        count,
      });
      if (keys.length) await this.client.unlink(...keys);
      cursor = nextCursor;
    } while (cursor !== "0");
  }

  async delete(key: string): Promise<boolean> {
    const deletedKeys = await this.client.unlink(this.getItemKey(key));
    return deletedKeys > 0;
  }

  async deleteMany(keys: string[]): Promise<boolean> {
    if (keys.length === 0) return true;

    const pipeline = this.client.pipeline();
    for (const key of keys) pipeline.unlink(this.getItemKey(key));
    await pipeline.exec();

    return true;
  }

  async disconnect(): Promise<void> {
    // no persistent connections to close
  }
}

export function upstashDriver(
  options: UpstashDriverOptions,
): CreateDriverResult<UpstashDriver> {
  return {
    options,
    factory: (config: UpstashDriverOptions) => new UpstashDriver(config),
  };
}
