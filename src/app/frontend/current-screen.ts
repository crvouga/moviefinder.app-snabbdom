import { QueryParam } from "../../@/browser/query-param";
import { createNamespace } from "../../@/msg";
import { Worker } from "../../@/program/program";
import { Screen } from "../@/screen";

export type $State = {
  "current-screen/current-screen": Screen | null;
};

const createMsg = createNamespace("current-screen");
const Push = createMsg<Screen>("push");

const worker: Worker = async (input) => {
  const { state, msgs } = input;

  const screenQueryParam = QueryParam("screen");

  state.write({
    "current-screen/current-screen": Screen.decode(screenQueryParam.get()),
  });

  screenQueryParam.subscribe((value) => {
    state.write({ "current-screen/current-screen": Screen.decode(value) });
  });

  msgs.takeEvery(Push.is, (msg) => {
    state.write({ "current-screen/current-screen": msg.payload });
    screenQueryParam.set(Screen.encode(msg.payload));
  });
};

export const CurrentScreen = {
  worker,
  Push,
};
