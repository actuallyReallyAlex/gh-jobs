import mongoose from "mongoose";

import { JobDocument } from "../types";

const jobSchema = new mongoose.Schema(
  {
    company: {
      required: [true, "Field 'company' is required."],
      type: String,
    },
    company_logo: {
      required: false,
      type: String,
    },
    company_url: {
      required: false,
      type: String,
    },
    created_at: {
      required: [true, "Field 'created_at' is required."],
      type: String,
    },
    description: {
      required: [true, "Field 'description' is required."],
      type: String,
    },
    how_to_apply: {
      required: [true, "Field 'how_to_apply' is required."],
      type: String,
    },
    id: {
      required: [true, "Field 'id' is required."],
      type: String,
    },
    location: {
      required: [true, "Field 'location' is required."],
      type: String,
    },
    title: {
      required: [true, "Field 'title' is required."],
      type: String,
    },
    url: {
      required: [true, "Field 'url' is required."],
      type: String,
    },
  },
  { timestamps: true }
);

function contentToJSON(): void {
  const jobsObj = this.toObject();

  return jobsObj;
}

jobSchema.methods.toJSON = contentToJSON;

const Job = mongoose.model<JobDocument>("Job", jobSchema);

export default Job;
