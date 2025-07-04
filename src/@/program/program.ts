import {
  attributesModule,
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
  attributesModule,
]);

export type Worker = (input: {
  state: {
    read: () => Partial<$State>;
    write: (
      update: Partial<$State> | ((state: Partial<$State>) => Partial<$State>)
    ) => void;
  };
  msgs: MsgQueue;
}) => Promise<void>;

export type View = (input: { state: Partial<$State>; msgs: MsgQueue }) => VNode;

export function Program(config: { worker: Worker; view: View }) {
  let state: Partial<$State> = {};
  let vnode: VNode | HTMLElement = document.getElementById("app")!;
  const msgs = MsgQueue();
  msgs.takeEvery(
    (m): m is unknown => Boolean(m),
    (m) => {
      console.log("msg", m);
    }
  );
  function read() {
    return state;
  }
  function render() {
    vnode = patch(vnode, config.view({ state, msgs }));
  }
  function write(
    patchState: Partial<$State> | ((state: Partial<$State>) => Partial<$State>)
  ) {
    if (typeof patchState === "function") {
      state = { ...state, ...patchState(state) };
    } else {
      state = { ...state, ...patchState };
    }
    console.log("write", state, patchState);
    render();
  }

  function start() {
    render();

    config.worker({
      state: { read, write },
      msgs,
    });
  }

  return {
    start,
  };
}
