import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { redis } from "./lib/redis";

export const proxy = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;

  const roomMatch = pathname.match(/^\/room\/([^/]+)$/);
  if (!roomMatch) return NextResponse.redirect(new URL("/", req.url));

  const roomId = roomMatch[1];
  const roomIdWithMeta = `meta:${roomId}`;

  const meta = await redis.hgetall<{ connected: string[]; createdAt: number }>(
    roomIdWithMeta,
  );
  if (!meta) {
    return NextResponse.redirect(new URL("/?error=room-not-found"));
  }

  // Get user's token
  const existingToken = req.cookies.get("x-auth-token")?.value;

  // USER IS ALLOWED TO JOIN
  if (existingToken && meta.connected.includes(existingToken)) {
    return NextResponse.next();
  }

  // USER IS NOT ALLOWED TO JOIN
  if (meta.connected.length >= 2) {
    return NextResponse.redirect(new URL("/?error=room-full", req.url));
  }

  const token = nanoid();
  const response = NextResponse.next();
  response.cookies.set("x-auth-token", token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  await redis.hset(roomIdWithMeta, {
    connected: [...meta.connected, token],
  });

  return response;
};

export const config = {
  matcher: "/room/:path*",
};
