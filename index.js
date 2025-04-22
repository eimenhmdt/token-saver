class TokenSaver {
    constructor(options = {}) {
      // Default configuration
      this.config = {
        removePoliteness: true,
        removeFillers: true,
        removeRedundantIntros: true,
        ...options
      };
      
      // Patterns to match and remove
      this.patterns = {
        politeness: [
          /\b(?:please|kindly)\b\s*/gi,
          /\s*\b(?:thank(?:\s*you)?|thanks)\b[,.!]?\s*/gi,
          /\s*[,.!]?\s*\b(?:if you don['']t mind|if you could|if possible)\b\s*/gi,
          /\s*\b(?:appreciate\s*(?:it|your help))\b[,.!]?\s*/gi
        ],
        fillers: [
          /\b(?:um|uh|er|hmm|like|you know|actually|basically|literally)\b\s*/gi,
          /\s*\b(?:so|well|anyway|anyhow)\b\s+/gi
        ],
        redundantIntros: [
          /^(?:I was (?:wondering|hoping|thinking) if you (?:could|would|can)|Can you|Could you|Would you be able to)\s+/gi,
          /^(?:I'd like you to|I want you to|I need you to)\s+/gi,
          /^(?:I'm trying to|I'm looking to|I'm hoping to)\s+/gi,
          /^(?:I'm looking for|I'm trying to find|Could I get|Can I get)\s+/gi
        ]
      };
    }
  
    clean(prompt) {
      let result = prompt;
      
      if (this.config.removePoliteness) {
        for (const pattern of this.patterns.politeness) {
          result = result.replace(pattern, ' ');
        }
      }
      
      if (this.config.removeFillers) {
        for (const pattern of this.patterns.fillers) {
          result = result.replace(pattern, ' ');
        }
      }
      
      if (this.config.removeRedundantIntros) {
        for (const pattern of this.patterns.redundantIntros) {
          const match = result.match(pattern);
          if (match && match.index === 0) {
            result = result.replace(pattern, '');
          }
        }
      }
      
      result = result.trim().replace(/\s+/g, ' ');
      if (result.length > 0) {
        result = result.charAt(0).toUpperCase() + result.slice(1);
      }
      
      return result;
    }
    
    tokensSaved(original, cleaned) {
      const originalTokens = Math.ceil(original.length / 4);
      const cleanedTokens = Math.ceil(cleaned.length / 4);
      return originalTokens - cleanedTokens;
    }
    
    process(prompt) {
      const cleaned = this.clean(prompt);
      const saved = this.tokensSaved(prompt, cleaned);
      
      return {
        original: prompt,
        cleaned: cleaned,
        originalLength: prompt.length,
        cleanedLength: cleaned.length,
        charsSaved: prompt.length - cleaned.length,
        estimatedTokensSaved: saved
      };
    }
  }
  
  // Export for Node.js environments
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = TokenSaver;
  }
  
  // Export for browser environments
  if (typeof window !== 'undefined') {
    window.TokenSaver = TokenSaver;
  }