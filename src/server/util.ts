import nfetch from "node-fetch";

import JobModel from "./models/Job";

import { ErrorResponse, GetJobsSuccessResponse, GitHubJob, Job } from "./types";

/**
 * Check if MongoDB is running locally. Stops application from continuing if false.
 */
export const checkIfMongoDBIsRunning = async (): Promise<boolean> =>
  new Promise(async (resolve) => {
    try {
      if (!process.env.MONGODB_URL) throw new Error("No MONGODB_URL");

      // const response = await fetch(
      //   process.env.MONGODB_URL.replace(/mongodb:\/\//gm, "http://")
      // );
      // if (response.status !== 200) return resolve(false);
      return resolve(true);
    } catch (error) {
      resolve(false);
    }
  });

// TODO - Remove
export const createSearchURL = (
  page: number,
  // eslint-disable-next-line
  description: string | any,
  // eslint-disable-next-line
  full_time: string | any,
  // eslint-disable-next-line
  location: string | any
): string => {
  let url = `https://jobs.github.com/positions.json?page=${page}&`;

  if (full_time === "true") {
    url += `full_time=true&`;
  }
  if (description) {
    url += `description=${description}&`;
  }
  if (location) {
    url += `location=${location}`;
  }

  return url;
};

export const getAllJobsFromAPI = async (): Promise<
  ErrorResponse | GetJobsSuccessResponse
> => {
  const jobs: GitHubJob[] = [];
  let jobsInBatch = null;
  let page = 1;

  // * Can only get 50 jobs at a time
  // * keep going until there are no more jobs
  try {
    while (jobsInBatch !== 0) {
      const response = await nfetch(
        `https://jobs.github.com/positions.json?page=${page}`,
        { headers: { "Content-Type": "application/json" }, method: "GET" }
      );
      const batchJobs: GitHubJob[] = await response.json();
      jobsInBatch = batchJobs.length;
      page++;
      if (jobsInBatch !== 0) {
        jobs.push(...batchJobs);
      }
    }

    return jobs;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const isError = (
  result: ErrorResponse | GetJobsSuccessResponse
): result is ErrorResponse => {
  return (result as ErrorResponse).error !== undefined;
};

// eslint-disable-next-line
export const unique = (arr: any[]): any[] =>
  [...new Set(arr.map((item) => JSON.stringify(item)))].map((item) =>
    JSON.parse(item)
  );

export const rehydrateJobsDB = async (): Promise<ErrorResponse | true> => {
  try {
    const result = await getAllJobsFromAPI();

    if (isError(result)) {
      return result;
    }
    // * Drop the current database of Jobs
    await JobModel.collection.drop();

    // * Create new Job entries
    await Promise.all(
      result.map(async (job: GitHubJob) => {
        const newJobObject: Job = {
          ...job,
          listingDate: job.created_at,
        };
        const newJob = new JobModel(newJobObject);
        await newJob.save();
        return;
      })
    );

    return true;
  } catch (error) {
    console.error(error);
  }
};

// eslint-disable-next-line
const randomItem = (arr: any[]): any => arr[(Math.random() * arr.length) | 0];

const fakeCompanies = [
  "Stokes Group",
  "Dibbert, Schumm and Heathcote",
  "Schneider Group",
  "Goyette-Bailey",
  "Bogisich, Nienow and Berge",
  "Brakus-Wisoky",
  "Kutch and Sons",
  "Kunze-Ratke",
  "Breitenberg LLC",
  "Wolff, Vandervort and Towne",
  "Gutmann-Kub",
  "Schmidt, Stroman and Wehner",
  "Cummerata and Sons",
  "Bernier and Sons",
  "Glover, Corwin and Gislason",
  "Miller, Parker and Jast",
  "Hickle-Cole",
  "Witting Group",
  "Kreiger Group",
  "Emard-Kub",
  "Homenick, Huel and Schmitt",
  "Fahey-Bosco",
  "Bayer-Spinka",
  "Lesch Inc",
  "Kling, Robel and Witting",
  "Schimmel, Abshire and Ward",
  "Bartoletti, Fay and Howe",
  "Eichmann, Barrows and Considine",
  "Fadel Group",
  "D'Amore, Jones and Stroman",
  "Stoltenberg Inc",
  "Bruen, Koss and Sipes",
  "Bernier LLC",
  "Waelchi LLC",
  "Hermiston, Wiza and Reynolds",
  "Huel-Lockman",
  "Schamberger Group",
  "Heller-Spencer",
  "Kuvalis, Pfannerstill and Greenfelder",
  "Bradtke, Herman and Stracke",
  "Romaguera and Sons",
  "Hayes, Runte and Rau",
  "Jakubowski-Smith",
  "Hoeger-Barrows",
  "Zieme, Price and Gleason",
  "Wiegand, Aufderhar and Bode",
  "Herman LLC",
  "Carter, Kassulke and McLaughlin",
  "Beatty-Bashirian",
  "Dickens LLC",
];

const locations = [
  "Buritizeiro",
  "Acopampa",
  "Gorzyce",
  "Radomin",
  "Moutsamoudou",
  "Lebedyn",
  "Huité",
  "Kakhovka",
  "Leonidovo",
  "Rates",
  "Kepuh",
  "Lembursawah",
  "Pasirangin Tiga",
  "Rio Bonito",
  "Al ‘Alamayn",
  "Amvrosiyivka",
  "Bicesse",
  "Consuelo",
  "Ţayyibat al Imām",
  "Curahnongko",
  "Pucyura",
  "Rawa",
  "Limoges",
  "Madrid",
  "Dikwa",
  "Pilar",
  "El Cubolero",
  "Savalou",
  "Latacunga",
  "Malapaubhara",
  "Detroit",
  "Brinkmann",
  "Zaoshi",
  "Nangang",
  "Medan",
  "Salcedo",
  "Kandana",
  "Koniaków",
  "Parys",
  "Mlanggeng",
  "Radlje ob Dravi",
  "Cishan",
  "Babantar",
  "Fāqūs",
  "Kuteynykove",
  "Oravais",
  "Ikšķile",
  "Sanli",
  "Portela",
  "Wuxue Shi",
];

const titles = [
  "Full Stack Developer",
  "Web Developer",
  "Mobile Developer",
  "Software Engineer",
  "UX Lead",
  "UI Lead",
  "Senior Developer",
  "Junior Developer",
];

const types = ["Full Time", "Contract"];

export const generateFakeJob = (index: number): Job => {
  const job = {
    company: randomItem(fakeCompanies),
    company_logo: "https://dummyimage.com/399x399.png/6469ff/ffffff",
    company_url: "https://www.google.com/",
    description:
      "<p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.</p>\n",
    how_to_apply: '<a href="https://www.google.com/"></a>',
    id: index.toString(),
    listingDate: "Thu Jul 4 12:00:00 UTC 1776",
    location: randomItem(locations),
    title: randomItem(titles),
    type: randomItem(types),
    url: "https://www.google.com/",
  };
  return job;
};
