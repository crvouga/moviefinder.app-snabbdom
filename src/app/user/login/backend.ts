import { Err, Ok, Result } from "~/@/result";

export type $RPC = {
  "login/send-code": (phone: string) => Promise<Result<string, string>>;
  "login/verify-code": (
    phone: string,
    code: string
  ) => Promise<Result<string, string>>;
};

export const backend: $RPC = {
  "login/send-code": async (_phone) => {
    if (Math.random() > 0.5) {
      return Err("Failed to send code");
    }
    return Ok("Code sent");
  },
  "login/verify-code": async (_phone, _code) => {
    if (Math.random() > 0.5) {
      return Err("Failed to verify code");
    }
    return Ok("Code verified");
  },
};
