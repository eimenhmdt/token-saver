# TokenSaver

A lightweight library to save tokens in AI prompts by removing unnecessary politeness markers, fillers, and redundant phrases.

## Installation

```bash
npm install token-saver
```

## Usage

```javascript
const TokenSaver = require("token-saver");

// Initialize with default options
const tokenSaver = new TokenSaver();

// Process a prompt
const result = tokenSaver.process(
  "Please generate a poem about cats. Thank you!"
);
console.log(result.cleaned); // "Generate a poem about cats."
console.log(result.estimatedTokensSaved); // Number of tokens saved

// Initialize with custom options
const customSaver = new TokenSaver({
  removePoliteness: true,
  removeFillers: false,
  removeRedundantIntros: true,
});
```

## Configuration Options

- `removePoliteness`: Remove please, thank you, etc. (default: true)
- `removeFillers`: Remove um, uh, well, etc. (default: true)
- `removeRedundantIntros`: Remove "I was wondering if you could" (default: true)

## API

- `clean(prompt)`: Cleans a prompt by removing unnecessary tokens based on configuration.
- `tokensSaved(original, cleaned)`: Calculates an estimate of tokens saved.
- `process(prompt)`: Processes a prompt and returns an object with:

- `original`: Original prompt
- `cleaned`: Cleaned prompt
- `originalLength`: Length of original
- `cleanedLength`: Length after cleaning
- `charsSaved`: Characters saved
- `estimatedTokensSaved`: Estimated tokens saved

## License

MIT
