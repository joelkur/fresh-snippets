import inquirer from "inquirer";
import fs from "fs";
import { __dirname } from "./utils.mjs";
import path from "path";
import details from "../templates/details.json" assert { type: "json" };

// TODO: Refactor

inquirer
  .prompt([
    {
      name: "identifier",
      message: "Identifier of the snippet",
      type: "input",
      validate: (a) => {
        if (!a.length) return "Identifier can not be empty";
        if (Object.keys(details).includes(a.toLowerCase()))
          return "Identifier already exists";
        return true;
      },
    },
    {
      name: "name",
      message: "Display name of the snippet (optional)",
      type: "input",
    },
    {
      name: "description",
      message: "Description (optional)",
      type: "input",
    },
    {
      name: "prefix",
      message: "Prefixes for the snippet separated by comma (,)",
      type: "input",
      validate: (a) => {
        if (!a.split(",").filter(Boolean).length)
          return "Prefixes can not be empty";
        const existingPrefixes = [
          ...Object.values(details)
            .map((v) => v.prefix)
            .flat(),
        ];
        for (const prefix of a.split(",")) {
          if (existingPrefixes.includes(a))
            return `Prefix "${prefix}" is already in use`;
        }
        return true;
      },
    },
  ])
  .then((answers) => {
    let { identifier, name, description, prefix } = answers;
    if (!name) name = identifier.charAt(0).toUpperCase() + identifier.slice(1);
    prefix = prefix.split(",");
    details[identifier] = { name, description, prefix };

    fs.writeFileSync(
      path.join(__dirname(), "..", "templates", "details.json"),
      JSON.stringify(details, null, 2)
    );
  });
