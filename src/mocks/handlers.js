import { rest } from "msw";
import { db } from "./db";

const ACCESS_TOKEN = "fake_access_token";

export const handlers = [
  //Autorzations
  rest.post("oauth2/token", (req, res, ctx) => {
    const { username, password } = req.body;

    if (username === "testuser" && password === "password") {
      return res(
        ctx.status(200),
        ctx.json({
          access_token: ACCESS_TOKEN,
          token_type: "Bearer",
          expires_in: 3600,
        })
      );
    }

    return res(ctx.status(401), ctx.json({ error: "Invalid credentials" }));
  }),

  rest.get("/api/experiences", (req, res, ctx) => {
    const token = req.headers.get("Authorization");

    if (!token || token !== `Bearer ${ACCESS_TOKEN}`) {
      return res(ctx.status(401), ctx.json({ error: "Unauthorized" }));
    }

    const experiences = db.experience.getAll();
    return res(ctx.status(200), ctx.json(experiences));
  }),

  //Experiences
  rest.get("/api/experiences", (req, res, ctx) => {
    console.log("CHEGOU AQUI!!!!!");
    const experiences = db.experience.getAll();
    console.log("return: ", experiences);
    return res(ctx.status(200), ctx.json(experiences));
  }),
];
