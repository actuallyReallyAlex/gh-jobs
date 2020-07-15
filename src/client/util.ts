export const groupBy = (arr: any[], key: any): any =>
  arr.reduce(
    (acc, item) => ((acc[item[key]] = [...(acc[item[key]] || []), item]), acc),
    {}
  );

export const unique = (arr: any[]): any[] => [...new Set(arr)];

export const validURL = (str: string): boolean => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};

/**
 * Loads the state of the application from localStorage if present.
 * @returns {object}
 */
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Saves the application state in localStorage.
 * @param {object} state State of the application.
 */
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (error) {
    console.error(error);
  }
};
