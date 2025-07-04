import { h } from "snabbdom";

export const TextField = (input: {
  type?: "text" | "password" | "email" | "number" | "search" | "tel" | "url";
  autoFocus?: boolean;
  id: string;
  label: string;
  value: string | number;
  error?: boolean;
  helperText?: string | null;
  min?: number;
  max?: number;
  step?: number;
  onClear?: () => void;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
}) => {
  return h("label.flex.w-full.flex-col.gap-1", [
    h(
      "label",
      {
        attrs: {
          for: input.id,
        },
        class: {
          "text-base": true,
          "text-red-500": !!input.error,
        },
      },
      input.label
    ),

    h(
      "div",
      {
        class: {
          flex: true,
          "h-fit": true,
          "w-full": true,
          "flex-row": true,
          "overflow-hidden": true,
          "rounded-md": true,
          "border-2": true,
          "bg-neutral-800": true,
          "border-red-500": !!input.error,
          "text-red-500": !!input.error,
          "ring-blue-600": !input.error,
          "focus-within:ring-2": !input.error,
          "cursor-not-allowed": !!input.disabled,
          "opacity-50": !!input.disabled,
        },
      },
      [
        h(
          "input",
          {
            attrs: {
              role: "textbox",
              "aria-label": input.label,
              id: input.id,
              type: input.type || "text",
              ...(input.min !== undefined && { min: input.min }),
              ...(input.max !== undefined && { max: input.max }),
              autocomplete: "off",
              autocapitalize: "off",
              autocorrect: "off",
              autosave: "off",
              ...(input.step !== undefined && { step: input.step }),
              ...(input.required !== undefined && { required: input.required }),
              disabled: !!input.disabled,
              value: input.value,
            },
            class: {
              flex: true,
              "flex-1": true,
              "appearance-none": true,
              "items-center": true,
              "gap-2": true,
              "bg-transparent": true,
              "p-3": true,
              "py-4": true,
              "text-xl": true,
              "outline-none": true,
              "cursor-not-allowed": !!input.disabled,
            },
            style: {
              background: "transparent !important",
            },
            on: {
              input: (e: Event) => {
                e.preventDefault();
                if (!input.disabled) {
                  const target = e.target as HTMLInputElement;
                  input.onChange(target.value);
                }
              },
            },
          },
          []
        ),

        input.onClear &&
        input.value &&
        input.value.toString().length > 0 &&
        !input.disabled
          ? h(
              "button",
              {
                class: {
                  "rounded-md": true,
                  "px-3": true,
                  "ring-blue-600": true,
                  "outline-none": true,
                  "focus:ring-2": true,
                },
                attrs: {
                  "aria-label": "Clear input",
                  type: "button",
                },
                on: {
                  click: (e: MouseEvent) => {
                    e.preventDefault();
                    const self = document.getElementById(input.id);
                    if (self instanceof HTMLInputElement) {
                      self.focus();
                      self.value = "";
                    }
                    input.onClear?.();
                  },
                },
              },
              [h("span.size-6", "×")]
            )
          : null,
      ]
    ),

    input.helperText
      ? h(
          "div",
          {
            class: {
              "text-sm": true,
              "text-red-500": !!input.error,
            },
          },
          input.helperText
        )
      : null,
  ]);
};
