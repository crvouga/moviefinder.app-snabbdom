import {
  classModule,
  eventListenersModule,
  init,
  propsModule,
  styleModule,
  VNode,
} from "snabbdom";
import { MsgQueue } from "./msg-queue";

const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
]);

export type Worker<TState extends Record<string, unknown>> = (input: {
  read: () => Partial<TState>;
  write: (fn: (state: Partial<TState>) => Partial<TState>) => void;
  msgs: MsgQueue;
}) => Promise<void>;

export type View<TState extends Record<string, unknown>> = (input: {
  state: Partial<TState>;
  msgs: MsgQueue;
}) => VNode;

export const Program = <TState extends Record<string, unknown>>(config: {
  worker: Worker<TState>;
  view: View<TState>;
}) => {
  let state: Partial<TState> = {};
  let vnode: VNode | HTMLElement = document.getElementById("app")!;
  const msgs = MsgQueue();
  const read = () => state;
  const write = (fn: (state: Partial<TState>) => Partial<TState>) => {
    state = { ...state, ...fn(state) };
    vnode = patch(vnode, config.view({ state, msgs }));
  };

  const start = () => {
    vnode = patch(vnode, config.view({ state, msgs }));
    config.worker({ write, read, msgs });
  };

  return {
    start,
  };
};
