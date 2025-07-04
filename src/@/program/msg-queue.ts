type Predicate<T> = (msg: unknown) => msg is T;

export type MsgQueue = {
  put: (msg: unknown) => void;
  take: <T>(predicate: Predicate<T>) => Promise<T>;
  takeEvery: <T>(predicate: Predicate<T>, onMsg: (msg: T) => void) => void;
};

export const MsgQueue = (): MsgQueue => {
  const queue: unknown[] = [];
  const subscribers: Array<{
    predicate: Predicate<unknown>;
    callback: (msg: unknown) => void;
  }> = [];
  const waiters: Array<{
    predicate: Predicate<unknown>;
    resolve: (msg: unknown) => void;
  }> = [];

  const put = (msg: unknown): void => {
    // First check subscribers
    subscribers.forEach((sub) => {
      if (sub.predicate(msg)) {
        sub.callback(msg);
      }
    });

    // Then check waiters
    const waiterIndex = waiters.findIndex((w) => w.predicate(msg));
    if (waiterIndex !== -1) {
      const [waiter] = waiters.splice(waiterIndex, 1);
      waiter.resolve(msg);
      return;
    }

    queue.push(msg);
  };

  const take = <T>(predicate: Predicate<T>): Promise<T> => {
    const msgIndex = queue.findIndex(predicate);
    if (msgIndex !== -1) {
      const [msg] = queue.splice(msgIndex, 1);
      return Promise.resolve(msg as T);
    }
    return new Promise((resolve) => {
      waiters.push({ predicate, resolve: resolve as (msg: unknown) => void });
    });
  };

  const takeEvery = <T>(
    predicate: Predicate<T>,
    onMsg: (msg: T) => void
  ): void => {
    subscribers.push({
      predicate,
      callback: onMsg as (msg: unknown) => void,
    });
  };

  return {
    put,
    take,
    takeEvery,
  };
};
