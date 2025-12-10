import { redis } from "@/lib/redis";
import Elysia from "elysia";
import { z } from "zod";
import { authMiddleware } from "./auth";

export const messages = new Elysia({ prefix: "/messages" })
  .use(authMiddleware)
  .post(
    "/",
    async ({ auth, body }) => {
      const { sender, text } = body;
      const { roomId } = auth;
      const roomIdWithMeta = `meta:${roomId}`;

      const roomExists = await redis.exists(roomIdWithMeta);
      if (!roomExists) {
        throw new Error("Room does not exists");
      }
    },
    {
      query: z.object({ roomId: z.string() }),
      body: z.object({
        sender: z.string().max(100),
        text: z.string().max(1000),
      }),
    },
  );
