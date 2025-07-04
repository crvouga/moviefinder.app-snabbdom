import { createNamespace } from "../../../@/msg";
import { View, Worker } from "../../../@/program/program";
import { TextField } from "../../../@/ui/text-field";
import { CurrentScreen } from "../../frontend/current-screen";
import { FormLayout } from "./ui";

export type $State = {
  "send-code/phone": string;
  "send-code/result": boolean;
};

const createMsg = createNamespace("send-code");
const Msg = {
  SubmittedForm: createMsg("submitted-form"),
  InputtedPhone: createMsg<string>("inputted-phone"),
};

const worker: Worker = ({ msgs, state }) => {
  msgs.takeEvery(Msg.InputtedPhone.is, (msg) => {
    state.write({ "send-code/phone": msg.payload });
    state.write({ "send-code/result": true });
  });

  msgs.takeEvery(Msg.SubmittedForm.is, () => {
    const s = state.read();
    const phone = s["send-code/phone"] ?? "";
    msgs.put(
      CurrentScreen.Push({ t: "login", c: { t: "verify-code", phone } })
    );
  });
};

const view: View = (input) => {
  const { msgs, state } = input;
  return FormLayout({
    title: "Send Code",
    onSubmit: () => msgs.put(Msg.SubmittedForm()),
    onBack: () => msgs.put(CurrentScreen.Push({ t: "account" })),
    children: [
      TextField({
        id: "phone",
        label: "Phone",
        value: state["send-code/phone"] || "",
        onChange: (phone) => msgs.put(Msg.InputtedPhone(phone)),
      }),
    ],
  });
};

export const SendCodeScreen = {
  view,
  worker,
};
