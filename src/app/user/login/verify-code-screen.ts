import { View, Worker } from "../../../@/program/program";
import { TextField } from "../../../@/ui/text-field";
import { FormLayout } from "./ui";

export type $State = {
  "verify-code/code": string;
  "verify-code/result": boolean;
};

export type $Msg =
  | {
      t: "verify-code/submitted-form";
    }
  | {
      t: "verify-code/inputted-code";
      code: string;
    };

const worker: Worker = (input) => {
  const { msgs, state } = input;
  msgs.takeEvery(
    (m) => m.t === "verify-code/inputted-code",
    (m) => {
      state.write({ "verify-code/code": m.code });
    }
  );
  // workerVerifyCode(input);
};

// const workerVerifyCode: Worker = async ({ msgs, state, rpc }) => {
//   while (true) {
//     // await msgs.take((m) => m.t === "verify-code/submitted-form");
//     // const code = state.read()["verify-code/code"] ?? "";
//     // state.write({ "verify-code/result": true });
//     // const result = await rpc["send-code/send-code"](code);
//     // state.write({ "verify-code/result": result.ok });
//     // if (result.isErr()) {
//     //   msgs.put({ t: "toaster/show", c: { t: "error", text: result.error } });
//     //   return;
//     // }
//     // msgs.put({ t: "screen/push", c: { t: "home" } });
//     // msgs.put({ t: "toaster/show", c: { t: "error", text: "Logged in" } });
//     // msgs.put({
//     //   t: "db/patch",
//     //   c: { users: { [result.value.userId]: result.value } },
//     // });
//   }
// };

const view: View = (input) => {
  const { msgs, state } = input;
  return FormLayout({
    title: "Verify Code",
    onSubmit: () => msgs.put({ t: "verify-code/submitted-form" }),
    onBack: () => msgs.put({ t: "screen/push", c: { t: "account" } }),
    children: [
      TextField({
        id: "code",
        label: "Code",
        type: "text",
        value: state["verify-code/code"] || "",
        onChange: (code) => msgs.put({ t: "verify-code/inputted-code", code }),
      }),
    ],
  });
};

export const VerifyCodeScreen = {
  view,
  worker,
};
