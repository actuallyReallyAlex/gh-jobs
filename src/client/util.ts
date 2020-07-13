export const groupBy = (arr: any[], key: any): any =>
  arr.reduce(
    (acc, item) => ((acc[item[key]] = [...(acc[item[key]] || []), item]), acc),
    {}
  );

export const unique = (arr: any[]): any[] => [...new Set(arr)];
