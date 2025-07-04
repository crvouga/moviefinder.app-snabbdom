import z from "zod";
import { createMsg } from "../../@/msg";

const schema = z.discriminatedUnion("t", [
  z.object({ t: z.literal("home") }),
  z.object({ t: z.literal("account") }),
]);
export type Screen = z.infer<typeof schema>;

export const ChangeScreen = createMsg<{ screen: Screen }>("change-screen");

const encode = (screen: Screen): string => {
  try {
    return btoa(JSON.stringify(screen));
  } catch (error) {
    return "";
  }
};

const decode = (screen: string | null): Screen | null => {
  if (!screen) return null;
  try {
    return Screen.schema.parse(JSON.parse(atob(screen)));
  } catch (error) {
    return null;
  }
};

export const Screen = {
  schema,
  encode,
  decode,
};
