import {
  attributesModule,
  classModule,
  eventListenersModule,
  init,
  propsModule,
  styleModule,
  VNode,
} from "snabbdom";
import { $Msg } from "./$msg";
import { $RPC } from "./$rpc";
import { $State } from "./$state";
import { MsgQueue } from "./msg-queue";

const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  attributesModule,
]);

export type Msgs = MsgQueue<$Msg>;

type StateAtom = {
  read: () => Partial<$State>;
  write: (
    update: Partial<$State> | ((state: Partial<$State>) => Partial<$State>)
  ) => void;
};

export type Worker = (input: {
  state: StateAtom;
  msgs: Msgs;
  rpc: $RPC;
}) => Promise<void> | void;

export type View = (input: { state: Partial<$State>; msgs: Msgs }) => VNode;

export function Program(config: { worker: Worker; view: View; rpc: $RPC }) {
  let state: Partial<$State> = {};
  let vnode: VNode | HTMLElement = document.getElementById("app")!;
  const msgs: Msgs = MsgQueue<$Msg>();

  msgs.takeEvery(
    (m): m is $Msg => Boolean(m),
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

  const stateAtom: StateAtom = { read, write };

  function start() {
    render();

    config.worker({ state: stateAtom, msgs, rpc: config.rpc });
  }

  return {
    start,
  };
}
