import { codeGenType } from "../codegen/type";

codeGenType({
  srcDir: "./src",
  stateFile: "./src/@/program/$state.ts",
  generatorFile: "./src/@/program/gen.ts",
  typeName: "$State",
  joiner: "&",
}).catch(console.error);

codeGenType({
  srcDir: "./src",
  stateFile: "./src/@/program/$rpc.ts",
  generatorFile: "./src/@/program/gen.ts",
  typeName: "$RPC",
  joiner: "&",
}).catch(console.error);

codeGenType({
  srcDir: "./src",
  stateFile: "./src/@/program/$msg.ts",
  generatorFile: "./src/@/program/gen.ts",
  typeName: "$Msg",
  joiner: "|",
}).catch(console.error);
