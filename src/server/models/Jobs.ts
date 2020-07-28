import mongoose from "mongoose";

import { JobsDocument } from "../types";

const jobsSchema = new mongoose.Schema(
  {
    entries: {
      type: [
        {
          company: String,
          company_logo: String,
          company_url: String,
          created_at: String,
          description: String,
          how_to_apply: String,
          id: String,
          location: String,
          title: String,
          type: { type: String },
          url: String,
        },
      ],
      required: [true, "Jobs field is required."],
    },
  },
  { timestamps: true }
);

function contentToJSON(): void {
  const jobsObj = this.toObject();

  return jobsObj;
}

jobsSchema.methods.toJSON = contentToJSON;

const Jobs = mongoose.model<JobsDocument>("Jobs", jobsSchema);

export default Jobs;
