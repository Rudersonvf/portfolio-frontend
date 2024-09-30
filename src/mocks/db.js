import { factory } from "@mswjs/data";
import { models } from "./models";
import { faker } from "@faker-js/faker";

export const db = factory(models);

export const generateFakerExperience = (overrides = {}) => ({
  id: faker.number.int(),
  position: faker.person.jobTitle(),
  company: faker.company.name(),
  description: faker.lorem.paragraph(3),
  startDate: faker.date.past(),
  endDate: faker.date.future(),
  ...overrides,
});

for (let i = 0; i < 2; i++) {
  db.experience.create(generateFakerExperience());
}
