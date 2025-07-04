import { h, VNode } from "snabbdom";
import { createMsg } from "../@/msg";
import { Program, View, Worker } from "../@/program/program";
import { CurrentScreen } from "./frontend/current-screen";
import { Home } from "./home/home";
import { Account } from "./user/account";

export type $State = {
  "app/clicks": number;
};

const Click = createMsg<{ count: number }>("click");

const worker: Worker = async (input) => {
  CurrentScreen.worker(input);

  input.msgs.takeEvery(Click.is, (msg) => {
    input.state.write((state) => ({
      "app/clicks": (state["app/clicks"] ?? 0) + msg.payload.count,
    }));
  });
};

const view: View = (input) => {
  return viewRoot([viewScreen(input)]);
};

const viewScreen: View = (input) => {
  switch (input.state["current-screen/current-screen"]?.t) {
    case "home":
      return Home.view(input);
    case "account":
      return Account.view(input);
    default:
      return Home.view(input);
  }
};

const viewRoot = (children: VNode[]) => {
  return h(
    "div.w-[100dvw].h-[100dvh].flex.items-center.justify-center.text-white",
    h(
      "div.flex.h-full.max-h-[900px].w-full.max-w-[600px].flex-col.items-center.justify-center.rounded.min-[600px]:border",
      children
    )
  );
};

const program = Program({
  worker,
  view,
});

program.start();
