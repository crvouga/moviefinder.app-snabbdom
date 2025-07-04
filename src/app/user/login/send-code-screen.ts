import { h } from "snabbdom";
import { View, Worker } from "../../../@/program/program";

export type $State = {
  "user.login.send-code/phone": string;
  "user.login.send-code/result": boolean;
};

const worker: Worker = (_input) => {};

const view: View = (_input) => {
  return h("div", "Send Code");
};

export const SendCodeScreen = {
  view,
  worker,
};
