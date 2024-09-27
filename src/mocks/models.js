import { primaryKey } from "@mswjs/data";

export const models = {
  experience: {
    id: primaryKey(String),
    position: String,
    company: String,
    description: String,
    startDate: String,
    endDate: String,
  },
  education: {
    id: primaryKey(String),
    courseName: String,
    institution: String,
    description: String,
    workload: Number,
    certificateUrl: String,
    startDate: String,
    endDate: String,
  },
};
