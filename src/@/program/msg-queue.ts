type Predicate<TMsg, T extends TMsg> = (msg: TMsg) => msg is T;

export type MsgQueue<TMsg> = {
  put: (msg: TMsg) => void;
  take: <TB extends TMsg>(predicate: Predicate<TMsg, TB>) => Promise<TB>;
  takeEvery: <TB extends TMsg>(
    predicate: Predicate<TMsg, TB>,
    onMsg: (msg: TB) => void
  ) => void;
};

export const MsgQueue = <TMsg = unknown>(): MsgQueue<TMsg> => {
  const queue: unknown[] = [];
  const subscribers: Array<{
    predicate: Predicate<TMsg, TMsg>;
    callback: (msg: unknown) => void;
  }> = [];
  const waiters: Array<{
    predicate: Predicate<TMsg, TMsg>;
    resolve: (msg: unknown) => void;
  }> = [];

  const put = (msg: TMsg): void => {
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

  const take = <T extends TMsg>(predicate: Predicate<TMsg, T>): Promise<T> => {
    const msgIndex = queue.findIndex((msg) => predicate(msg as TMsg));
    if (msgIndex !== -1) {
      const [msg] = queue.splice(msgIndex, 1);
      return Promise.resolve(msg as T);
    }
    return new Promise((resolve) => {
      waiters.push({
        predicate,
        resolve: resolve as (msg: unknown) => void,
      });
    });
  };

  const takeEvery = <T extends TMsg>(
    predicate: Predicate<TMsg, T>,
    onMsg: (msg: T) => void
  ): void => {
    subscribers.push({
      predicate,
      callback: (msg) => {
        if (predicate(msg as TMsg)) {
          onMsg(msg as T);
        }
      },
    });
  };

  return {
    put,
    take,
    takeEvery,
  };
};
