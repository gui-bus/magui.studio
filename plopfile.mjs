export default function (plop) {
  plop.setGenerator("component", {
    description: "Create a new component or section",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name (PascalCase):",
      },
      {
        type: "list",
        name: "type",
        message: "Component type/location:",
        choices: ["common", "ui", "sections"],
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{type}}/{{camelCase name}}.tsx",
        templateFile: "generators/templates/component.tsx.hbs",
      },
      {
        type: "add",
        path: "src/__tests__/{{camelCase name}}.test.tsx",
        templateFile: "generators/templates/test.tsx.hbs",
      },
    ],
  });
}
