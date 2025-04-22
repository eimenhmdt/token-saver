// Save this to a file named test-token-saver.js

// First, paste the TokenSaver class from previous message here
class TokenSaver {
    constructor(options = {}) {
      // Default configuration
      this.config = {
        removePoliteness: true,       // Remove please, thank you, etc.
        removeFillers: true,          // Remove um, uh, well, etc.
        removeRedundantIntros: true,  // Remove "I was wondering if you could"
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
  
  // Now add test code below
  console.log("TokenSaver Test Suite");
  console.log("=====================");
  
  // Initialize the TokenSaver
  const tokenSaver = new TokenSaver();
  
  // Test cases
  const testCases = [
    // Politeness markers
    "Please write me a poem about cats. Thank you!",
    "Could you kindly explain quantum computing to me, if you don't mind?",
    "I appreciate your help with this problem.",
    
    // Filler words
    "Um, actually, I was like wondering about the history of, you know, space exploration.",
    "Well, basically, I need to literally understand how photosynthesis works.",
    
    // Redundant introductions
    "I was wondering if you could explain how blockchain works?",
    "I'd like you to write a summary of War and Peace.",
    "I'm trying to find information about climate change.",
    "Can you tell me about the Renaissance period?",
    
    // Mixed cases
    "Please, I was wondering if you could actually explain, like, how neural networks work? Thank you so much!",
    "I'm looking to create a business plan, if possible. Thanks in advance!",
    
    // Edge cases
    "",  // Empty string
    "Just a simple prompt with no extra words.",
    "Don't remove please if it's part of a please-don't instruction.",
    "The word thankful should not be removed completely."
  ];
  
  // Process and display results for each test case
  testCases.forEach((testCase, index) => {
    console.log(`\nTest Case #${index + 1}:`);
    const result = tokenSaver.process(testCase);
    
    console.log(`Original (${result.originalLength} chars): "${result.original}"`);
    console.log(`Cleaned (${result.cleanedLength} chars): "${result.cleaned}"`);
    console.log(`Chars saved: ${result.charsSaved} (${Math.round(result.charsSaved/result.originalLength*100)}%)`);
    console.log(`Est. tokens saved: ${result.estimatedTokensSaved}`);
  });
  
  // Test with selective features disabled
  console.log("\n\nTesting with selective features disabled:");
  console.log("=========================================");
  
  const politenessOnlyTokenSaver = new TokenSaver({
    removePoliteness: true,
    removeFillers: false,
    removeRedundantIntros: false
  });
  
  const mixedCase = "Please, I was wondering if you could actually help me with this math problem? Thank you!";
  console.log("\nWith only politeness removal enabled:");
  const result1 = politenessOnlyTokenSaver.process(mixedCase);
  console.log(`Original: "${result1.original}"`);
  console.log(`Cleaned: "${result1.cleaned}"`);
  
  // Test with real-world examples that might be sent to ChatGPT
  console.log("\n\nReal-world Examples:");
  console.log("===================");
  
  const realWorldExamples = [
    "Hello ChatGPT, I hope you're doing well today! Could you please help me write a cover letter for a software developer position? Thank you so much for your assistance!",
    
    "I was wondering if you could please help me understand the difference between machine learning and deep learning? I've been trying to learn about AI but I'm finding these concepts a bit confusing. Thanks in advance for your help!",
    
    "Hey there, can you give me some recipe ideas for dinner tonight please? I have chicken, pasta, and some vegetables. Thank you!",
    
    "Could you please translate this sentence to French? 'I would like to order a coffee, please.' Thank you very much!"
  ];
  
  const realWorldSaver = new TokenSaver();
  
  // Calculate total savings
  let totalOriginalChars = 0;
  let totalCleanedChars = 0;
  let totalTokensSaved = 0;
  
  realWorldExamples.forEach((example, index) => {
    console.log(`\nExample #${index + 1}:`);
    const result = realWorldSaver.process(example);
    
    console.log(`Original: "${result.original}"`);
    console.log(`Cleaned: "${result.cleaned}"`);
    console.log(`Tokens saved: ${result.estimatedTokensSaved}`);
    
    totalOriginalChars += result.originalLength;
    totalCleanedChars += result.cleanedLength;
    totalTokensSaved += result.estimatedTokensSaved;
  });
  
  // Show summary statistics
  console.log("\n\nSummary Statistics:");
  console.log("===================");
  console.log(`Total original characters: ${totalOriginalChars}`);
  console.log(`Total cleaned characters: ${totalCleanedChars}`);
  console.log(`Total characters saved: ${totalOriginalChars - totalCleanedChars}`);
  console.log(`Average reduction: ${Math.round((totalOriginalChars - totalCleanedChars) / totalOriginalChars * 100)}%`);
  console.log(`Total estimated tokens saved: ${totalTokensSaved}`);