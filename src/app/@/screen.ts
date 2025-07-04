import { createMsg } from "../../@/msg";

export type Screen = { t: "home" } | { t: "account" };

export const ChangeScreen = createMsg<{ screen: Screen }>("change-screen");
