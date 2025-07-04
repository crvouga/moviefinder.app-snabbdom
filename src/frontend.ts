import { h, VNode } from "snabbdom";
import { createMsg } from "./@/msg";
import { Program, View, Worker } from "./@/program";

export type State = {
  count?: number;
};

const Click = createMsg<{ count: number }>("click");

const worker: Worker<State> = async (input) => {
  while (true) {
    const msg = await input.msgs.take(Click.is);
    input.write((state) => ({ count: (state.count ?? 0) + msg.payload.count }));
  }
};

const view: View<State> = (input) => {
  return viewRoot([
    h("div", {}, "Hello World"),
    h(
      "button",
      {
        on: {
          click: () => input.msgs.put(Click({ count: 7 })),
        },
      },
      `Click me ${input.state.count ?? 0}`
    ),
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
