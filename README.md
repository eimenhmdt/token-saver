# Token Saver

Cut polite fluff out of your prompts so you spend less on tokens.

> 04/17/2025: Sam Altman admits that saying "Please" and "Thank You" to ChatGPT is wasting millions of dollars in computing power.

Disclaimer: Only works with English as of now.

## Install

```bash
npm i token-saver      # or yarn add token-saver / pnpm add token-saver
```

## Quick start

### ESM

```js
import TokenSaver from "token-saver";

const saver = new TokenSaver();
const out = saver.process("Please summarise this text, thank you!");

console.log(out.cleaned); // "Summarise this text."
console.log(out.estimatedTokensSaved); // 3
```

### CommonJS

```js
const TokenSaver = require("token-saver");
```

## Options

| Option                  | Default | What it does                                       |
| ----------------------- | :-----: | -------------------------------------------------- |
| `removePoliteness`      | `true`  | kill _please_, _thank you_ and similar niceties    |
| `removeFillers`         | `true`  | kill _um_, _uh_, _actually_, _well_ …              |
| `removeRedundantIntros` | `true`  | kill “I was wondering if you could” style prefixes |
| `tokenCharRatio`        |    4    | char‑per‑token estimate for savings calculation    |

Pass a partial options object to the constructor:

```js
new TokenSaver({ removeFillers: false });
```

## API surface

```ts
clean(prompt: string): string
process(prompt: string): {
  original: string;
  cleaned: string;
  charsSaved: number;
  estimatedTokensSaved: number;
}
```

Types are shipped in `index.d.ts`.

## CLI one‑liner

```bash
npx token-saver "Please help me. Thanks!"   # prints "Help me."
```

_(CLI is just `node -e` sugar; no global install needed.)_

## Why bother

- ChatGPT Turbo is ~4 characters per token. Two polite words can cost 1–2 tokens.
- Multiply by millions of prompts. Real money.
- Faster requests, shorter logs.

## Contributing

```bash
git clone https://github.com/eimenhmdt/token-saver
cd token-saver
npm i
npm test
```

## License

MIT
