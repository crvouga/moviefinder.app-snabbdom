import { View, Worker } from "../../../@/program/program";
import { TextField } from "../../../@/ui/text-field";
import { FormLayout } from "./ui";

export type $State = {
  "send-code/phone": string;
  "send-code/result": boolean;
};

export type $Msg =
  | { t: "send-code/submitted-form" }
  | { t: "send-code/inputted-phone"; phone: string };

const worker: Worker = (input) => {
  const { msgs, state } = input;
  msgs.takeEvery(
    (m) => m.t === "send-code/inputted-phone",
    (m) => {
      state.write({ "send-code/phone": m.phone });
    }
  );
  workerSubmitForm(input);
};

const workerSubmitForm: Worker = async ({ msgs, state, rpc }) => {
  while (true) {
    await msgs.take((m) => m.t === "send-code/submitted-form");
    state.write({ "send-code/result": true });
    const phone = state.read()["send-code/phone"] ?? "";
    const sent = await rpc["login/send-code"](phone);
    if (sent.t === "err") {
      return;
    }
    msgs.put({
      t: "screen/push",
      c: { t: "login", c: { t: "verify-code", phone } },
    });
  }
};

const view: View = (input) => {
  const { msgs, state } = input;
  return FormLayout({
    title: "Send Code",
    onSubmit: () => msgs.put({ t: "send-code/submitted-form" }),
    onBack: () => msgs.put({ t: "screen/push", c: { t: "account" } }),
    children: [
      TextField({
        id: "phone",
        label: "Phone",
        type: "tel",
        value: state["send-code/phone"] || "",
        onChange: (phone) => msgs.put({ t: "send-code/inputted-phone", phone }),
      }),
    ],
  });
};

export const SendCodeScreen = {
  view,
  worker,
};
