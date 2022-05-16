const poll = <T = any>({
  api,
  interval = 2000,
  until,
  retries = 100,
}: {
  api: () => Promise<T>;
  interval?: number;
  until?: (data: T) => boolean;
  retries?: number;
}): Promise<T> => {
  return new Promise(async (resolve, rej) => {
    let response: any;
    let count = 0;
    let timeout: NodeJS.Timeout;

    const continuePolling = () => {
      timeout = setTimeout(async () => {
        response = await api();
        count++;

        if (until?.(response) || count > retries) {
          resolve(response);
          clearTimeout(timeout);
        } else {
          continuePolling();
        }
      }, interval);
    };

    continuePolling();
  });
};

export const RestUtils = {
  poll,
};
