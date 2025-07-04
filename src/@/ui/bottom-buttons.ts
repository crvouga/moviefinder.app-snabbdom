import { h, VNode } from "snabbdom";
import { BottomButton, BottomButtonProps } from "./bottom-button";

export type BottomButtonsProps = {
  buttons: BottomButtonProps[];
};

const view = (props: BottomButtonsProps): VNode => {
  return h(
    "div.flex.w-full.justify-around",
    props.buttons.map(BottomButton.view)
  );
};

export const BottomButtons = {
  view,
};
