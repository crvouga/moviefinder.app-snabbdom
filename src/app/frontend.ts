import { h, VNode } from "snabbdom";
import { createMsg } from "../@/msg";
import { Program, View, Worker } from "../@/program/program";
import { Button } from "./@/ui/button";

export type $State = {
  "app/clicks": number;
};

const Click = createMsg<{ count: number }>("click");

const worker: Worker<$State> = async (input) => {
  while (true) {
    const msg = await input.msgs.take(Click.is);
    input.write((state) => ({
      "app/clicks": (state["app/clicks"] ?? 0) + msg.payload.count,
    }));
  }
};

const view: View<$State> = (input) => {
  return viewRoot([
    Button.view({
      children: [h("span", {}, `Click me ${input.state["app/clicks"] ?? 0}`)],
      onClick: () => input.msgs.put(Click({ count: 7 })),
    }),
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
