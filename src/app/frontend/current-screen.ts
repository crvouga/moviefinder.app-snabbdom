import { QueryParam } from "../../@/browser/query-param";
import { Worker } from "../../@/program/program";
import { Screen } from "../@/screen";

export type $State = {
  "screen/current-screen": Screen | null;
};

export type $Msg = {
  t: "screen/push";
  c: Screen;
};

const worker: Worker = async (input) => {
  const { state, msgs } = input;

  const screenQueryParam = QueryParam("screen");

  state.write({
    "screen/current-screen": Screen.decode(screenQueryParam.get()),
  });

  screenQueryParam.subscribe((value) => {
    state.write({ "screen/current-screen": Screen.decode(value) });
  });

  msgs.takeEvery(
    (msg) => msg.t === "screen/push",
    (msg) => {
      state.write({ "screen/current-screen": msg.c });
      screenQueryParam.set(Screen.encode(msg.c));
    }
  );
};

export const CurrentScreen = {
  worker,
};
