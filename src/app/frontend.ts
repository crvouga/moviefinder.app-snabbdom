import { h, VNode } from "snabbdom";
import { createMsg } from "../@/msg";
import { Program, View, Worker } from "../@/program/program";
import { ChangeScreen } from "./@/screen";
import { Button } from "./@/ui/button";
import { CurrentScreen } from "./frontend/current-screen";

export type $State = {
  "app/clicks": number;
};

const Click = createMsg<{ count: number }>("click");

const worker: Worker = async (input) => {
  CurrentScreen.worker(input);
  while (true) {
    const msg = await input.msgs.take(Click.is);
    input.write((state) => ({
      "app/clicks": (state["app/clicks"] ?? 0) + msg.payload.count,
    }));
  }
};

const view: View = (input) => {
  return viewRoot([
    Button.view({
      children: [h("span", {}, `Click me ${input.state["app/clicks"] ?? 0}`)],
      onClick: () => input.msgs.put(Click({ count: 7 })),
    }),
    Button.view({
      children: [h("span", {}, `Home`)],
      onClick: () => input.msgs.put(ChangeScreen({ screen: { t: "home" } })),
    }),
    Button.view({
      children: [h("span", {}, `About`)],
      onClick: () => input.msgs.put(ChangeScreen({ screen: { t: "account" } })),
    }),
    h("div", {}, input.state["current-screen/current-screen"]?.t),
  ]);
};

const viewRoot = (children: VNode[]) => {
  return h(
    "div.w-[100dvw].h-[100dvh].flex.items-center.justify-center.text-white",
    children
  );
};

const program = Program({
  worker,
  view,
});

program.start();
