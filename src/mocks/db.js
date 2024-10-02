import { factory } from "@mswjs/data";
import { models } from "./models";
import { faker } from "@faker-js/faker";

export const db = factory(models);

// Create data
export const generateFakerExperience = (overrides = {}) => ({
  id: faker.number.int(),
  position: faker.person.jobTitle(),
  company: faker.company.name(),
  description: faker.lorem.paragraph(3),
  startDate: faker.date.past(),
  endDate: faker.date.future(),
  ...overrides,
});

export const generatedFakerEducation = (overrides = {}) => ({
  id: faker.number.int(),
  courseName: faker.person.jobTitle(),
  institution: faker.company.name(),
  description: faker.lorem.paragraph(3),
  workload: faker.number.int({ min: 10, max: 200 }),
  certificateUrl: faker.internet.url(),
  startDate: faker.date.past(),
  endDate: faker.date.future(),
  ...overrides,
});

export const generatedFakerSkill = (overrides = {}) => ({
  id: faker.number.int(),
  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  name: "Java Script",
  docUrl: faker.internet.url(),
  level: faker.number.int({ min: 1, max: 100 }),
  ...overrides,
});

//Generated quantity
for (let i = 0; i < 2; i++) {
  db.experience.create(generateFakerExperience());
  db.education.create(generatedFakerEducation());
}

for (let i = 0; i < 6; i++) {
  db.skill.create(generatedFakerSkill());
}
