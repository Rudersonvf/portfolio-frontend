import { factory } from "@mswjs/data";
import { models } from "./models";
import { faker } from "@faker-js/faker";

export const db = factory(models);

const skillIds = [];
const categoryIds = [];

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
  name: faker.hacker.noun(),
  docUrl: faker.internet.url(),
  level: faker.number.int({ min: 1, max: 100, multipleOf: 10 }),
  ...overrides,
});

export const generatedFakerProjects = (overrides = {}) => {
  const randomSkills = faker.helpers.arrayElements(skillIds);
  const randomCategories = faker.helpers.arrayElements(categoryIds, {
    min: 1,
    max: 3,
  });

  return {
    id: faker.number.int(),
    projectName: faker.commerce.productName(),
    description: faker.lorem.paragraph(3),
    gitUrl: faker.internet.url(),
    liveUrl: faker.internet.url(),
    categories: randomCategories,
    technologies: randomSkills,
    images: Array.from({ length: 3 }, () => faker.image.url()),
    ...overrides,
  };
};

// Create fixed categories: Frontend, Backend, Full Stack, DevOps
export const generateFakerCategories = (overrides = {}) => {
  const categories = ["Frontend", "Backend", "Full Stack", "DevOps"];
  return categories.map((category) => ({
    id: faker.number.int(),
    name: category,
    ...overrides,
  }));
};

// Generate fixed categories and store their IDs
generateFakerCategories().forEach((category) => {
  const createdCategory = db.category.create(category);
  categoryIds.push(createdCategory.id);
});

// Generate experience, projects and education data
for (let i = 0; i < 2; i++) {
  db.experience.create(generateFakerExperience());
  db.education.create(generatedFakerEducation());
  db.project.create(generatedFakerProjects());
}

// Generate skill data
for (let i = 0; i < 6; i++) {
  const skill = db.skill.create(generatedFakerSkill());
  skillIds.push(skill.id);
}
