import rest from "msw";
import { db } from "./db";

export const handlers = [
  rest.get("/api/experiences", (req, res, ctx) => {
    const experiences = db.experience.getAll();
    return res(ctx.status(200), ctx.json(experiences));
  }),
];
