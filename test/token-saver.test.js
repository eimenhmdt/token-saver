import { describe, it, expect } from 'vitest';
import TokenSaver from '../dist/token-saver.mjs';

describe('TokenSaver', () => {
  it('strips fluff', () => {
    const t = new TokenSaver();
    expect(t.process('Please help me. Thank you!').cleaned).toBe('Help me.');
  });

  it('respects config', () => {
    const t = new TokenSaver({ removePoliteness: false });
    expect(
      t.process('Please help me. Thank you!').cleaned
    ).toBe('Please help me. Thank you!');
  });
});