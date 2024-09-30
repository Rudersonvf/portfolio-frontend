import { rest } from "msw";
import { db } from "./db";

export const handlers = [
  rest.get("/api/experiences", (req, res, ctx) => {
    console.log("CHEGOU AQUI!!!!!");
    const experiences = db.experience.getAll();
    console.log("return: ", experiences);
    return res(ctx.status(200), ctx.json(experiences));
  }),
];
