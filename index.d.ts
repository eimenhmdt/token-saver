declare interface TokenSaverOptions {
    removePoliteness?: boolean;
    removeFillers?: boolean;
    removeRedundantIntros?: boolean;
    tokenCharRatio?: number;
  }
  
  declare class TokenSaver {
    constructor(options?: TokenSaverOptions);
    clean(prompt: string): string;
    process(prompt: string): {
      original: string;
      cleaned: string;
      charsSaved: number;
      estimatedTokensSaved: number;
    };
  }
  
  export = TokenSaver;