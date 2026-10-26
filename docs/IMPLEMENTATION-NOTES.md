# Implementation and validation notes

## Local-only runtime

The application contains no API integration, analytics SDK, remote logging, font fetching, or prompt persistence. Text functions are imported from `src/lib/compression.ts` and run in the browser process. Downloads use browser Blob/object URLs, and clipboard access uses the Clipboard API with a local fallback.

## Safe transformation scope

Whitespace cleanup is deliberately conservative and recognizes Markdown fences. Valid JSON is parsed then serialized; invalid JSON produces a visible warning and retains the text for other configured cleanup rules. The app intentionally does not attempt universal multi-language comment/docstring removal, which cannot be done safely with simple regular expressions.

## Validation status

Source syntax was checked by transpiling the 8 TypeScript/TSX/config/test files with the installed TypeScript transpiler. Ten focused checks of the core compression and calculator module passed. Full `npm install`, Vitest execution, and production build have not been verified in this environment because package installation timed out before dependencies were available.
