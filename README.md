# fresh-snippets

Visual Studio Code snippets for Fresh web framework

## Features

Currently has the following snippets:

| Prefix | Description |
| --- | --- |
| `api`, `api-route` | Outputs an [API route](https://fresh.deno.dev/docs/concepts/routes) |
| `comp`, `component` | Outputs snippet that can be used for [page](https://fresh.deno.dev/docs/getting-started/create-a-route) or [island](https://fresh.deno.dev/docs/concepts/islands) component |
| `page`, `page-handler`  | Outputs a page component that also has a custom API handler |

## Adding snippets

1. Create a template for the snippet under `templates` directory
    - The file name must end with `.template`
2. Add details of the snippet as a new entry to `templates/details.json` using the below format:
    ```json
    {
      "name": "Name of the snippet",
      "prefix": ["prefixes", "for", "this", "snippet"],
      "description": "Description of the snippet"
    }
    ```
3. Run `npm run generate`
    - This generates a new `snippets/snippets.code-snippets` file from the template files and `details.json`
4. Commit the changes
