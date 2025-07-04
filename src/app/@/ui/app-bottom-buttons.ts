import { VNode } from "snabbdom";
import { View } from "../../../@/program/program";
import { BottomButtons } from "../../../@/ui/bottom-buttons";
import { IconHomeSolid, IconUserCircleSolid } from "../../../@/ui/icon";
import { CurrentScreen } from "../../frontend/current-screen";

export const view: View = (input): VNode => {
  return BottomButtons.view({
    buttons: [
      {
        icon: (props) => IconHomeSolid(props),
        label: "Home",
        selected: input.state["current-screen/current-screen"]?.t === "home",
        onClick: () => input.msgs.put(CurrentScreen.Push({ t: "home" })),
      },
      {
        icon: (props) => IconUserCircleSolid(props),
        label: "Account",
        selected: input.state["current-screen/current-screen"]?.t === "account",
        onClick: () => input.msgs.put(CurrentScreen.Push({ t: "account" })),
      },
    ],
  });
};

export const AppBottomButtons = {
  view,
};
