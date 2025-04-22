const TokenSaver = require('./index');

// Example usage
const tokenSaver = new TokenSaver();

const examples = [
  "Please generate a poem about technology and nature. Thank you!",
  "I was wondering if you could help me write a Python script that sorts a list efficiently?",
  "I appreciate your help with designing a logo for my website, if you don't mind."
];

examples.forEach(example => {
  const result = tokenSaver.process(example);
  console.log(`Original: "${result.original}"`);
  console.log(`Cleaned: "${result.cleaned}"`);
  console.log(`Tokens saved: ${result.estimatedTokensSaved}`);
  console.log('---');
});