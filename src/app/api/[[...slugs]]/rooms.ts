import { redis } from "@/lib/redis";
import Elysia from "elysia";
import { nanoid } from "nanoid";

const ROOM_TTL_SECONDS = 60 * 10;

export const rooms = new Elysia({ prefix: "/rooms" }).post(
  "/create",
  async () => {
    const roomId = nanoid();

    await redis.hset(`meta:${roomId}`, {
      connected: [],
      createdAt: Date.now(),
    });

    await redis.expire(`meta:${roomId}`, ROOM_TTL_SECONDS);

    return { roomId };
  },
);
