import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-target-blank": "off",
      "react-hooks/exhaustive-deps": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Regras de importação
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // Módulos do Node.js
            "external", // Dependências externas
            "internal", // Módulos internos
            "parent", // Arquivos de pastas acima
            "sibling", // Arquivos na mesma pasta
            "index", // Arquivos index.js ou index.ts
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "builtin",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always", // Linha em branco entre os grupos
          alphabetize: { order: "asc", caseInsensitive: true }, // Ordenação alfabética
        },
      ],
    },
  },
];
