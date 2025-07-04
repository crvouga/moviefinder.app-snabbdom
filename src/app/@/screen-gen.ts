import { codeGenType } from "../../@/codegen/type";

const SRC_DIR = "./src";
const STATE_FILE = "./src/app/@/$screen.ts";
const GENERATOR_FILE = "./src/app/@/screen-gen.ts";

codeGenType({
  srcDir: SRC_DIR,
  stateFile: STATE_FILE,
  generatorFile: GENERATOR_FILE,
  typeName: "$Screen",
  joiner: "&",
}).catch(console.error);
