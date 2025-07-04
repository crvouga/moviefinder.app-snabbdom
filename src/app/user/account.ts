import { AppBottomButtons } from "../@/ui/app-bottom-buttons";
import { h } from "snabbdom";
import { View } from "../../@/program/program";

export type $State = {};

const view: View = (input) => {
  return h("div.w-full.h-full.flex.items-center.justify-center.flex-col", [
    h("div.text-2xl.flex-1.text-center", "Account"),
    AppBottomButtons.view(input),
  ]);
};

export const Account = {
  view,
};
