<div align="center">

# ⚡ LLM Context Window Compressor

### Less context. More signal.

**A colorful, local-first prompt optimization workbench by Himat Technologies.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Open%20Tool-d6ff5f?style=for-the-badge&labelColor=17181d)](https://himat.tech/free-tools/llm-context-window-compressor)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=17181d)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=17181d)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white&labelColor=17181d)](https://vite.dev/)

**Trim noisy context, inspect the changes, and estimate token-budget impact — without sending your prompt anywhere.**

[Try the tool](https://himat.tech/free-tools/llm-context-window-compressor) · [GitHub Repository](https://github.com/himat-technologies/llm-context-window-compressor) · [Himat Technologies](https://himat.co.in)

</div>

---

## 🧩 What is it?

LLM Context Window Compressor is a browser-based developer utility that applies explicit, repeatable cleanup rules to prompts, agent traces, instruction blocks, Markdown notes, and valid JSON payloads. It compares original and transformed content, estimates token and cost differences, and exports Python or TypeScript helpers.

> **Important:** this is deterministic, rule-based compaction—not AI summarization. It does not infer intent or guarantee any compression is semantically safe. Review output before using it in a production prompt.

## ✨ Features

| Feature | What it does |
|---|---|
| 🧹 **Whitespace cleanup** | Reduces redundant blank-line runs and trims line endings while preserving fenced code blocks. |
| 🔁 **Duplicate detection** | Optional repeated-line and repeated-sentence cleanup with removal counts. |
| 💬 **Filler reduction** | Removes a small allowlist of conversational preambles. |
| 🧾 **JSON compaction** | Minifies valid JSON; optional null-property removal preserves false, zero, empty strings, and array positions. |
| 📐 **Token estimates** | Live heuristic estimates, configurable character/token ratio, reduction percentage, and compression ratio. |
| 💸 **Cost calculator** | Editable example input prices, context-window gauge, per-run and monthly estimates. |
| 🔬 **Before/after view** | Compare original and compressed text with character and token estimates. |
| 📦 **Exports** | Copy/download text, download JSON stats, and export Python or TypeScript helper code. |
| 🔒 **Privacy-first** | No API key, login, backend, analytics, or prompt storage required. |

## 🚀 Run locally on Windows

### Prerequisites

- **Node.js 20 LTS or newer** (includes npm): https://nodejs.org/
- **Visual Studio Code**: https://code.visualstudio.com/
- Git is optional if downloading the repository ZIP from GitHub.

Check installation in PowerShell:

```powershell
node --version
npm --version
```

### Get the project

```powershell
git clone https://github.com/himat-technologies/llm-context-window-compressor.git
cd llm-context-window-compressor
code .
```

Or download the project ZIP from GitHub and open its extracted folder through **File → Open Folder** in VS Code.

### Install and start

In VS Code choose **Terminal → New Terminal**, then:

```powershell
npm install
npm run dev
```

Open the URL printed by Vite (normally **http://127.0.0.1:5173**). Leave the terminal open while using the app. Press **Ctrl+C** in that terminal to stop the server.

### Tests and production build

```powershell
npm test
npm run build
npm run preview
```

The production output is written to `dist/`.

## 🧪 Sample contexts

- **FastAPI + RAG documentation** — verbose retrieval notes and repeated grounding rules.
- **Multi-turn agent log** — repeated tool outcomes and duplicated status statements.
- **System instructions** — repeated constraints and verbose preambles.
- **E-commerce JSON context** — valid JSON showing compaction while retaining `false`, `0`, and empty string values.

## 🧠 Token estimation and costs

No provider tokenizer is bundled. Counts use a documented heuristic based on text length and a lexical signal, adjusted with a configurable character/token ratio. Real counts vary with tokenizer, model, language, code, and formatting.

The model selector contains **illustrative, editable input prices**, not live quotes or verified current pricing. The calculator models input-token charges only; it excludes output tokens, caching, tiers, and provider-specific billing terms.

## 🔐 Privacy and local-processing verification

- Compression, estimates, comparisons, and file generation run locally in the browser.
- No AI API is called and prompt text is not sent to a Himat endpoint.
- Prompt content is not written to `localStorage` or `sessionStorage`.
- The app includes no analytics or telemetry scripts.

To inspect runtime traffic, open browser DevTools → **Network**, clear the log, and use the app. Apart from local development-server activity, the tool should not send prompt text to remote services. Review source code before embedding it in another application.

## 🛠️ Stack

| Technology | Purpose |
|---|---|
| React 18 + TypeScript | User interface and types |
| Vite 6 | Local development and production bundling |
| Lucide React | Lightweight icons |
| Vitest + jsdom | Unit tests for core transformations |
| Browser APIs | Clipboard and local file downloads |

## ⚠️ Limitations and safe use

- This is not AI summarization and does not understand the meaning of your context.
- Duplicate-line and duplicate-sentence rules can remove meaningful repetition. Enable only when appropriate.
- The cleaner does not strip arbitrary comments/docstrings from source code. Simple regex comment deletion can corrupt strings, URLs, or syntax.
- Exported Python and TypeScript helpers implement a documented subset of the browser rules.
- Token counts and cost figures are estimates. Verify important prompts and current provider pricing independently.

## 🧑‍💻 About Himat Technologies

**Build systems, not just websites.** Himat Technologies builds web applications, developer tools, AI integrations, and workflow automation.

| Connect | Link |
|---|---|
| 🌐 Website | [himat.co.in](https://himat.co.in) |
| 💻 GitHub | [himat-technologies](https://github.com/himat-technologies) |
| 🔗 LinkedIn | [Himat Technologies](https://www.linkedin.com/in/himat-technologies-14b1051b4) |
| 📸 Instagram | [@himat_technologies](https://www.instagram.com/himat_technologies?stkn=djdmcGxweWtwYWI0) |
| 📘 Facebook | [Himat Technologies](https://www.facebook.com/people/Himat-technologies/61593829197445/) |
| ✉️ Email | [info@himat.co.in](mailto:info@himat.co.in) |
| ☎️ Call / WhatsApp | [+91 94452 34023](https://wa.me/919445234023) |

## 📄 License

MIT — see [LICENSE](./LICENSE).

<div align="center">

**Made with care by [Himat Technologies](https://himat.co.in)**

[🌐 Open Live Demo](https://himat.tech/free-tools/llm-context-window-compressor) · [⭐ View Repository](https://github.com/himat-technologies/llm-context-window-compressor)

</div>
