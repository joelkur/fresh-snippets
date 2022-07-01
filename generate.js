const path = require("path");
const fs = require("fs");
const templates = require("./templates/details.json");

const TEMPLATES_DIRECTORY = path.join(__dirname, "templates");
const OUTPUT_PATH = path.join(__dirname, "snippets", "snippets.code-snippets");

function generateSnippet(file) {
  const fileBasename = path.basename(file, ".template");
  const { name, ...details } = templates[fileBasename];

  const fileContents = fs.readFileSync(
    path.join(TEMPLATES_DIRECTORY, file),
    "utf8",
  );

  const body = fileContents.split("\n");
  return [name, { ...details, body }];
}

function main() {
  const output = {};

  fs.readdirSync(TEMPLATES_DIRECTORY)
    .filter((file) => file.endsWith(".template"))
    .filter((file) =>
      Object.keys(templates).includes(path.basename(file, ".template"))
    )
    .forEach((file) => {
      const [name, details] = generateSnippet(file);
      output[name] = details;
    });

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
}

if (require.main === module) {
  main();
}
