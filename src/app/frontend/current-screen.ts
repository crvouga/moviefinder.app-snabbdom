import { createMsg } from "../../@/msg";
import { Worker } from "../../@/program/program";

export type State = {
  "current-screen/current-screen": string;
};

const ScreenChanged = createMsg<{ screen: string }>("screen-changed");

const worker: Worker<State> = async (input) => {
  window.addEventListener("hashchange", () => {
    input.msgs.put(ScreenChanged({ screen: window.location.hash }));
  });
};

export const CurrentScreen = {
  worker,
};
