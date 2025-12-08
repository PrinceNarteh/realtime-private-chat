import { Elysia } from "elysia";
import { rooms } from "./rooms";

const app = new Elysia({ prefix: "/api" }).use(rooms);

export type App = typeof app;
export const GET = app.fetch;
export const POST = app.fetch;
