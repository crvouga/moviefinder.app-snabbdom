import { Err, Ok, Result } from "~/@/result";

export type $RPC = {
  "home/query": (phone: string) => Promise<Result<string, string>>;
};

export const backend: $RPC = {
  "home/query": async (_phone) => {
    if (Math.random() > 0.5) {
      return Err("Failed to send code");
    }
    return Ok("Code sent");
  },
};
