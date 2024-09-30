import { primaryKey } from "@mswjs/data";

export const models = {
  experience: {
    id: primaryKey(Number),
    position: String,
    company: String,
    description: String,
    startDate: String,
    endDate: String,
  },
  education: {
    id: primaryKey(Number),
    courseName: String,
    institution: String,
    description: String,
    workload: Number,
    certificateUrl: String,
    startDate: String,
    endDate: String,
  },
};
