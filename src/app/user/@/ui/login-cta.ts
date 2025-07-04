import { h } from "snabbdom";
import { MsgQueue } from "../../../../@/program/msg-queue";
import { Button } from "../../../../@/ui/button";
import { IconDoorOpenSolid } from "../../../../@/ui/icon";
import { CurrentScreen } from "../../../frontend/current-screen";

const view = (input: { msgs: MsgQueue }) => {
  return h(
    "div.flex.h-full.w-full.flex-col.items-center.justify-center.gap-4",
    [
      IconDoorOpenSolid({
        class: {
          "text-primary": true,
          "size-20": true,
        },
      }),
      h("p.text-xl.font-bold", "Login to access your account"),
      Button.view({
        label: "Login",
        onClick: () => {
          input.msgs.put(
            CurrentScreen.Push({ t: "login", c: { t: "send-code" } })
          );
        },
      }),
    ]
  );
};

export const LoginCta = {
  view,
};
