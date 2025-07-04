import { Classes, h, VNode } from "snabbdom";

export type BottomButtonProps = {
  label: string;
  icon: (props: { class: Classes }) => VNode;
  selected: boolean;
  onClick: () => void;
};

const view = (props: BottomButtonProps): VNode => {
  return h(
    "button",
    {
      on: {
        pointerdown: props.onClick,
      },
      class: {
        flex: true,
        "h-16": true,
        "flex-1": true,
        "cursor-pointer": true,
        "flex-col": true,
        "items-center": true,
        "justify-center": true,
        "text-blue-500": props.selected,
        "text-neutral-200": !props.selected,
      },
    },
    [
      h("span.text-2xl", [props.icon({ class: { "size-6": true } })]),
      h("span.text-xs", props.label),
    ]
  );
};

export const BottomButton = {
  view,
};
