type Predicate<T> = (msg: unknown) => msg is T;

export type MsgQueue = {
  put: (msg: unknown) => void;
  take: <T>(predicate: Predicate<T>) => Promise<T>;
  takeEvery: <T>(
    predicate: Predicate<T>,
    onMsg: (msg: T) => void
  ) => Promise<void>;
};

export const MsgQueue = (): MsgQueue => {
  const queue: unknown[] = [];
  const waiters: Array<{
    predicate: Predicate<unknown>;
    resolve: (msg: unknown) => void;
  }> = [];

  const put = (msg: unknown): void => {
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

  const takeEvery = async <T>(
    predicate: Predicate<T>,
    onMsg: (msg: T) => void
  ) => {
    while (true) {
      const msg = await take(predicate);
      onMsg(msg);
    }
  };

  return {
    put,
    take,
    takeEvery,
  };
};
