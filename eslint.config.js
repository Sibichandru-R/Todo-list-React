import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
        {'react/prop-types':false}
      ],
    },
  },
]




// {
//     "search.exclude": {
//       "**/node_modules": true,
//       "**/bower_components": true,
//       "**/*.code-search": true
//     },
//     "search.useIgnoreFiles": false,
//     "explorer.openEditors.visible": 1,
//     "editor.linkedEditing": true,
//     "editor.snippetSuggestions": "top",
//     "emmet.showAbbreviationSuggestions":true,
//     "editor.multiCursorModifier": "ctrlCmd",
//     "editor.formatOnPaste": true,
//     "workbench.colorTheme": "Just Black",
//     "workbench.iconTheme": "vscode-icons",
//     "editor.fontLigatures": true,
//     "terminal.integrated.fontSize": 20,
//     "editor.fontFamily": "Anonymous Pro",
//     "markdown.preview.fontSize": 20,
//     "editor.tabSize": 2,
//     "editor.detectIndentation": true,
//     "editor.formatOnSave": true,
//     "emmet.includeLanguages": {
//       "javascript": "javascriptreact"
//     },
//     "eslint.enable": true,
//     "eslint.validate": ["vue", "react", "typescript", "html", "javascript"],
//     "workbench.startupEditor": "newUntitledFile",
//     "editor.suggestSelection": "first",
//     "[javascript]": {
//       "editor.defaultFormatter": "esbenp.prettier-vscode"
//     },
//     "[json]": {
//       "editor.defaultFormatter": "esbenp.prettier-vscode"
//     },
//     "[html]": {
//       "editor.defaultFormatter": "esbenp.prettier-vscode"
//     },
//     "[css]": {
//       "editor.defaultFormatter": "esbenp.prettier-vscode"
//     },
//     "[vue]": {
//       "editor.defaultFormatter": "Vue.volar"
//     },
//     "diffEditor.ignoreTrimWhitespace": false,
//     "[typescriptreact]": {
//       "editor.defaultFormatter": "esbenp.prettier-vscode"
//     },
//     "[typescript]": {
//       "editor.defaultFormatter": "esbenp.prettier-vscode"
//     },
//     "workbench.colorCustomizations": {},
//     "[scss]": {
//       "editor.defaultFormatter": "esbenp.prettier-vscode"
//     },
//     "[javascriptreact]": {
//       "editor.defaultFormatter": "esbenp.prettier-vscode"
//     },
//     "[jsonc]": {
//       "editor.defaultFormatter": "esbenp.prettier-vscode"
//     },
//     "editor.tokenColorCustomizations": {
//       "textMateRules": [
//         {
//           "scope": [
//             "comment",
//             "comment.block",
//           ],
//           "settings": {
//             "fontStyle": "italic",
//             "foreground": "#ff1493"
//           }
//         },
//         {
//           "scope": [
//             "keyword.operator.logical",
//             "keyword.operator.arithmetic",
//             "keyword.operator.assignment",
//             "keyword.operator.bitwise"
//           ],
//           "settings": {
//             "fontStyle": ""
//           }
//         },
//         {
//           "scope": [
//             "comment",
//             "comment.block"
//           ],
//           "settings": {
//             "fontStyle": "italic",
//             "foreground": "#ff1493"
//           }
//         },
//         {
//           "scope": [
//             "keyword.operator.logical",
//             "keyword.operator.arithmetic",
//             "keyword.operator.assignment",
//             "keyword.operator.bitwise"
//           ],
//           "settings": {
//             "fontStyle": ""
//           }
//         },
//         {
//           "scope": [
//             "comment",
//             "comment.block"
//           ],
//           "settings": {
//             "fontStyle": "italic",
//             "foreground": "#ff1493"
//           }
//         },
//         {
//           "scope": [
//             "keyword.operator.logical",
//             "keyword.operator.arithmetic",
//             "keyword.operator.assignment",
//             "keyword.operator.bitwise"
//           ],
//           "settings": {
//             "fontStyle": ""
//           }
//         },
//         {
//           "scope": [
//             "comment",
//             "comment.block"
//           ],
//           "settings": {
//             "fontStyle": "italic",
//             "foreground": "#ff1493"
//           }
//         },
//         {
//           "scope": [
//             "keyword.operator.logical",
//             "keyword.operator.arithmetic",
//             "keyword.operator.assignment",
//             "keyword.operator.bitwise"
//           ],
//           "settings": {
//             "fontStyle": ""
//           }
//         },
//         {
//           "name": "envKeys",
//           "scope": "string.quoted.double.env,source.env,constant.numeric.env",
//           "settings": {
//             "foreground": "#19354900"
//           }
//         }
//       ]
//     },
//     "git.autofetch": true,
//     "editor.lineHeight": 0,
//     "editor.fontSize": 20,
//     "vsicons.dontShowNewVersionMessage": true,
//     "extensions.ignoreRecommendations": true,
//     "terminal.integrated.fontFamily": "monospace",
//     "files.eol": "\n",
//     "liveServer.settings.donotShowInfoMsg": true,
//     "explorer.confirmDelete": false,
//     "quokka.syncSettings": false,
//     "quokka.suppressGlyphMarginNotifications": false,
//     "quokka.suppressExpirationNotifications": true,
//     "terminal.integrated.defaultProfile.windows": "PowerShell",
//     "explorer.confirmDragAndDrop": false,
//     "security.workspace.trust.untrustedFiles": "open",
//     "javascript.updateImportsOnFileMove.enabled": "always",
//     "typescript.updateImportsOnFileMove.enabled": "always",
//     "editor.minimap.size": "fit",
//     "editor.minimap.enabled": true,
//     "editor.fontVariations": false,
//     "files.autoSave": "afterDelay",
//     "window.zoomLevel": 1,
//     "http.proxyAuthorization": null,
//     "http.proxySupport": "on",
//     "redhat.telemetry.enabled": false,
    
//   }
