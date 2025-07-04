import { h } from "snabbdom";
import { View } from "../../@/program/program";
import { AppBottomButtons } from "../@/ui/app-bottom-buttons";

export type $State = {};

const view: View = (input) => {
  return h("div.w-full.h-full.flex.items-center.justify-center.flex-col", [
    h("div.text-2xl.flex-1", "Home"),
    AppBottomButtons.view(input),
  ]);
};

export const HomeScreen = {
  view,
};
