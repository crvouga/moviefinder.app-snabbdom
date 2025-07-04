import { h } from "snabbdom";
import { Msgs } from "../../../../@/program/program";
import { Button } from "../../../../@/ui/button";
import { IconDoorOpenSolid } from "../../../../@/ui/icon";

const view = (input: { msgs: Msgs }) => {
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
          input.msgs.put({
            t: "screen/push",
            c: { t: "login", c: { t: "send-code" } },
          });
        },
      }),
    ]
  );
};

export const LoginCta = {
  view,
};
