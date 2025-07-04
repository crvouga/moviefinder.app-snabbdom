import {
  classModule,
  eventListenersModule,
  init,
  propsModule,
  styleModule,
  VNode,
} from "snabbdom";
import { $State } from "./$state";
import { MsgQueue } from "./msg-queue";

const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
]);

export type Worker = (input: {
  read: () => Partial<$State>;
  write: (fn: (state: Partial<$State>) => Partial<$State>) => void;
  msgs: MsgQueue;
}) => Promise<void>;

export type View = (input: { state: Partial<$State>; msgs: MsgQueue }) => VNode;

export const Program = (config: { worker: Worker; view: View }) => {
  let state: Partial<$State> = {};
  let vnode: VNode | HTMLElement = document.getElementById("app")!;
  const msgs = MsgQueue();
  const read = () => state;
  const write = (fn: (state: Partial<$State>) => Partial<$State>) => {
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
