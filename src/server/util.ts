import fetch from "node-fetch";

/**
 * Check if MongoDB is running locally. Stops application from continuing if false.
 */
export const checkIfMongoDBIsRunning = async (): Promise<any> =>
  new Promise(async (resolve, reject) => {
    try {
      if (!process.env.MONGODB_URL) throw new Error("No MONGODB_URL");

      /* NEW LINE */
      const response = await fetch(
        process.env.MONGODB_URL.replace(/mongodb:\/\//gm, "http://")
      );
      if (response.status !== 200) return resolve(false);
      return resolve(true);
    } catch (error) {
      resolve(false);
    }
  });

export const createSearchURL = (
  page: number,
  description: string | any,
  full_time: string | any,
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
