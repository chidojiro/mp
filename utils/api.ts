const poll = <T = any>({
  api,
  interval = 3000,
  until,
  retries = 5,
}: {
  api: () => Promise<T>;
  interval?: number;
  until?: (data: T) => boolean;
  // pass -1 to poll infinitely
  retries?: number;
}): Promise<T> => {
  return new Promise((resolve, rej) => {
    let response: any;
    let count = 0;

    const _interval = setInterval(async () => {
      response = await api();
      count++;

      if (until?.(response) || (retries >= 0 && count > retries)) {
        clearInterval(_interval);
        resolve(response);
      }
    }, interval);
  });
};

export const ApiUtils = {
  poll,
};
