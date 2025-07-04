import { codeGenType } from "../codegen/type";

const SRC_DIR = "./src";
const STATE_FILE = "./src/@/program/$state.ts";
const GENERATOR_FILE = "./src/@/program/gen.ts";

codeGenType({
  srcDir: SRC_DIR,
  stateFile: STATE_FILE,
  generatorFile: GENERATOR_FILE,
  typeName: "$State",
  joiner: "&",
}).catch(console.error);
