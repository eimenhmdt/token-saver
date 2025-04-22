const TokenSaver = require('./index');
const assert = require('assert');

// Basic test
const tokenSaver = new TokenSaver();
const result = tokenSaver.process("Please help me. Thank you!");
assert.strictEqual(result.cleaned, "Help me.");
console.log('Basic test passed!');

// Test with politeness disabled
const noPolitenessSaver = new TokenSaver({ removePoliteness: false });
const result2 = noPolitenessSaver.process("Please help me. Thank you!");
assert.strictEqual(result2.cleaned, "Please help me. Thank you!");
console.log('Configuration test passed!');

console.log('All tests passed!');