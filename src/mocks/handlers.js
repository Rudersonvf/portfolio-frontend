import { rest } from "msw";
import { db } from "./db";
import { MOCK_URL } from "../config";

const ACCESS_TOKEN = "fake_access_token";

export const handlers = [
  //Autorzations
  rest.post(`${MOCK_URL}/oauth2/token`, (req, res, ctx) => {
    const params = new URLSearchParams(req.body);
    const username = params.get("username");
    const password = params.get("password");

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

  //Experiences
  rest.get(`${MOCK_URL}/api/experiences`, (req, res, ctx) => {
    const experiences = db.experience.getAll();
    return res(ctx.status(200), ctx.json(experiences));
  }),

  //Educations
  rest.get(`${MOCK_URL}/api/educations`, (req, res, ctx) => {
    const educations = db.education.getAll();
    return res(ctx.status(200), ctx.json(educations));
  }),

  //Skills
  rest.get(`${MOCK_URL}/api/skills`, (req, res, ctx) => {
    const skills = db.skill.getAll();
    return res(ctx.status(200), ctx.json(skills));
  }),

  //Projects
  rest.get(`${MOCK_URL}/api/projects`, (req, res, ctx) => {
    const projects = db.project.getAll();
    return res(ctx.status(200), ctx.json(projects));
  }),

  //Categories
  rest.get(`${MOCK_URL}/api/categories`, (req, res, ctx) => {
    const categories = db.category.getAll();
    return res(ctx.status(200), ctx.json(categories));
  }),
];
