import { factory } from "@mswjs/data";
import { models } from "./models";
import { faker } from "@faker-js/faker";

export const db = factory(models);

const skillIds = [];
const categoryIds = [];
const categories = [];

// Create data
export const generatedFakerExperience = (overrides = {}) => ({
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
export const generatedFakerCategories = (overrides = {}) => {
  const categories = [
    {
      id: 1,
      catName: "Frontend",
    },
    {
      id: 2,
      catName: "Backend",
    },
    {
      id: 3,
      catName: "Full Stack",
    },
    {
      id: 4,
      catName: "DevOps",
    },
  ];

  return categories.map((category) => ({
    id: category.id,
    name: category.catName,
    ...overrides,
  }));
};

// Generate fixed categories and store their IDs
generatedFakerCategories().forEach((category) => {
  const createdCategory = db.category.create(category);
  categoryIds.push(createdCategory.id);
});

export const generatedFakerProjectDto = (overrides = {}) => {
  const randomCategories = faker.helpers.arrayElements(
    generatedFakerCategories(),
    {
      min: 1,
      max: 3,
    }
  );

  return {
    id: faker.number.int(),
    projectName: faker.commerce.productName(),
    description: faker.lorem.paragraph(3),
    gitUrl: faker.internet.url(),
    liveUrl: faker.internet.url(),
    categories: randomCategories,
    technologies: Array.from({ length: 4 }, () => generatedFakerSkill()),
    images: Array.from({ length: 3 }, () => faker.image.url()),
    ...overrides,
  };
};

// Generate experience, projects and education data
for (let i = 0; i < 2; i++) {
  db.experience.create(generatedFakerExperience());
  db.education.create(generatedFakerEducation());
  db.project.create(generatedFakerProjects());
  db.projectDto.create(generatedFakerProjectDto());
}

// Generate skill data
for (let i = 0; i < 6; i++) {
  const skill = db.skill.create(generatedFakerSkill());
  skillIds.push(skill.id);
  categories.push(skill);
}
