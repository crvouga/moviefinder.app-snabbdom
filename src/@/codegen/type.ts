import { Glob } from "bun";
import { watch } from "fs/promises";
import * as path from "path";

export const codeGenType = (config: {
  srcDir: string;
  stateFile: string;
  generatorFile: string;
  typeName: string;
  joiner: "|" | "&";
}) => {
  async function findStateTypes() {
    const glob = new Glob("**/*.ts");
    const files = await Array.fromAsync(glob.scan({ cwd: config.srcDir }));
    const stateTypes: string[] = [];

    for (const file of files) {
      const filePath = path.join(config.srcDir, file);

      // Skip the generated state file and the generator file itself
      if (
        path.resolve(filePath) === path.resolve(config.stateFile) ||
        path.resolve(filePath) === path.resolve(config.generatorFile)
      ) {
        continue;
      }

      const content = await Bun.file(filePath).text();

      if (
        content.includes(`export type ${config.typeName} =`) &&
        !content.includes("@codegen-ignore")
      ) {
        const importPath = path
          .relative(path.dirname(config.stateFile), filePath)
          .replace(/\.ts$/, "")
          .replace(/\\/g, "/");
        if (!importPath.startsWith(".")) {
          stateTypes.push(`./${importPath}`);
        } else {
          stateTypes.push(importPath);
        }
      }
    }

    return stateTypes;
  }

  async function generateFile(imports: string[]) {
    const importStatements = imports
      .map(
        (path, i) =>
          `import { ${config.typeName} as ${config.typeName}${i} } from "${path}";`
      )
      .join("\n");

    const unionType =
      imports.length > 0
        ? imports
            .map((_, i) => `${config.typeName}${i}`)
            .join(` ${config.joiner} `)
        : "{}";

    const content = `// @codegen-ignore
// Auto-generated file - DO NOT EDIT
${importStatements}
    
export type ${config.typeName} = ${unionType};
    `;

    await Bun.write(config.stateFile, content);
  }

  async function main() {
    // Initial generation
    const imports = await findStateTypes();
    await generateFile(imports);

    // Watch for changes
    const watcher = watch(config.srcDir, { recursive: true });
    console.log(`Watching ${config.srcDir} for changes...`);

    for await (const event of watcher) {
      if (event.filename?.endsWith(".ts")) {
        const changedFile = path.join(config.srcDir, event.filename);
        if (path.resolve(changedFile) === path.resolve(config.stateFile)) {
          continue;
        }

        console.log(`Change detected in ${event.filename}`);
        const imports = await findStateTypes();
        await generateFile(imports);
        console.log("State types regenerated");
      }
    }
  }

  return main();
};
