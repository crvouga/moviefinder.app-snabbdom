import { h, VNode } from "snabbdom";

const view = (props: { children: VNode[]; onClick: () => void }) => {
  return h(
    "button",
    {
      class: {
        "px-4": true,
        "py-2": true,
        "bg-blue-600": true,
        "text-white": true,
        "font-bold": true,
        rounded: true,
        "hover:bg-blue-700": true,
        "active:bg-blue-800": true,
        "disabled:opacity-50": true,
        "transition-colors": true,
        "cursor-pointer": true,
      },
      on: {
        click: props.onClick,
      },
    },
    props.children
  );
};

export const Button = {
  view,
};
