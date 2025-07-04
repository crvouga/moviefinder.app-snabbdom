import { h, VNode } from "snabbdom";
import { createMsg } from "../@/msg";
import { Program, View, Worker } from "../@/program/program";
import { CurrentScreen } from "./frontend/current-screen";
import { HomeScreen } from "./home/home-screen";
import { AccountScreen } from "./user/account-screen";
import { SendCodeScreen } from "./user/login/send-code-screen";
import { VerifyCodeScreen } from "./user/login/verify-code-screen";

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
  const screen = input.state["current-screen/current-screen"];
  switch (screen?.t) {
    case "home":
      return HomeScreen.view(input);
    case "account":
      return AccountScreen.view(input);
    case "login":
      switch (screen.c.t) {
        case "send-code":
          return SendCodeScreen.view(input);
        case "verify-code":
          return VerifyCodeScreen.view(input);
      }
    default:
      return HomeScreen.view(input);
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
