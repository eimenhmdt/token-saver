/**
 * TokenSaver – remove polite fluff to save tokens.
 */
class TokenSaver {
    static DEFAULT_CONFIG = {
      removePoliteness: true,
      removeFillers: true,
      removeRedundantIntros: true,
      tokenCharRatio: 4 // chars per token estimate
    };
  
    // Combined patterns. Each match also eats any trailing punctuation + spaces.
    static PATTERNS = {
      politeness:
        /\b(?:please|kindly)\b[,.!?]?\s*|\b(?:thank(?:\s*you)?|thanks)\b[,.!?]?\s*|\b(?:if you don['’]t mind|if you could|if possible)\b[,.!?]?\s*|\bappreciate\s*(?:it|your help)\b[,.!?]?\s*/gi,
      fillers:
        /\b(?:um|uh|er|hmm|like|you know|actually|basically|literally|so|well|anyway|anyhow)\b[,.!?]?\s*/gi,
      redundantIntros:
        /^(?:i (?:was (?:wondering|hoping|thinking) if you (?:could|would|can)|(?:am|'m) (?:trying|looking|hoping) to)|can you|could you|would you be able to|(?:i'd|i would) like you to|i want you to|i need you to|i'm looking for|i'm trying to find|could i get|can i get)\s+/i
    };
  
    constructor(options = {}) {
      this.config = { ...TokenSaver.DEFAULT_CONFIG, ...options };
    }
  
    clean(prompt = '') {
      let txt = `${prompt}`;
  
      if (this.config.removePoliteness) txt = txt.replace(TokenSaver.PATTERNS.politeness, ' ');
      if (this.config.removeFillers) txt = txt.replace(TokenSaver.PATTERNS.fillers, ' ');
      if (this.config.removeRedundantIntros) txt = txt.replace(TokenSaver.PATTERNS.redundantIntros, '');
  
      // trim / collapse whitespace
      txt = txt.trim().replace(/\s+/g, ' ');
      // fix spacing before punctuation
      txt = txt.replace(/\s([.,!?;:])/g, '$1');
      // ✂️  orphan “ ! ” or “ ? ” that was left after deleting a word,
      // but keep legit punctuation (no preceding space → keep it).
      txt = txt.replace(/\s[!?]+$/, '');
  
      if (txt) txt = txt[0].toUpperCase() + txt.slice(1);
      return txt;
    }
  
    _tokens(str) {
      return Math.ceil(str.length / this.config.tokenCharRatio);
    }
  
    process(prompt) {
      const cleaned = this.clean(prompt);
      return {
        original: prompt,
        cleaned,
        charsSaved: prompt.length - cleaned.length,
        estimatedTokensSaved: this._tokens(prompt) - this._tokens(cleaned)
      };
    }
  }
  
  export default TokenSaver;  