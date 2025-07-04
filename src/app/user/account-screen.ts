import { h } from "snabbdom";
import { View } from "../../@/program/program";
import { AppBottomButtons } from "../@/ui/app-bottom-buttons";
import { LoginCta } from "./@/ui/login-cta";

const view: View = (input) => {
  return h("div.w-full.h-full.flex.items-center.justify-center.flex-col", [
    LoginCta.view(input),
    AppBottomButtons.view(input),
  ]);
};

export const AccountScreen = {
  view,
};
