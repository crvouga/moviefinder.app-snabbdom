import { Worker } from "../../@/program/program";
import { ChangeScreen, Screen } from "../@/screen";

export type $State = {
  "current-screen/current-screen": Screen;
};

const worker: Worker = async (input) => {
  input.msgs.takeEvery(ChangeScreen.is, (msg) => {
    input.write(() => ({
      "current-screen/current-screen": msg.payload.screen,
    }));
  });
};

export const CurrentScreen = {
  worker,
};
