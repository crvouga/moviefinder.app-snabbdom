import { h, VNode } from "snabbdom";
import { Button } from "../../../@/ui/button";

export const FormLayout = (input: {
  children: VNode[];
  title: string;
  onSubmit: () => void;
  onBack: () => void;
}) => {
  return h(
    "form",
    {
      on: {
        submit: (e) => {
          e.preventDefault();
          input.onSubmit();
        },
      },
    },
    [
      ...input.children,
      Button.view({
        label: "Submit",
        onClick: input.onSubmit,
      }),
    ]
  );
};
