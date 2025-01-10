// src/lib/detectDocumentType.ts
import { DOCUMENT_PROMPTS } from './prompts';

/**
 * 4. UTILS: DETECT DOCUMENT TYPE
 * We'll look for keywords in the file content to guess the document type.
 */
const KEYWORDS = {
  INCOME_STATEMENT: [
    'revenue',
    'net income',
    'gross profit',
    'operating income',
    'earnings per share',
    'cost of goods sold',
    'operating expenses'
  ],
  BALANCE_SHEET: [
    'assets',
    'liabilities',
    'equity',
    'current assets',
    'total assets',
    'accounts receivable',
    'inventory',
    'accounts payable'
  ],
  CASH_FLOW: [
    'cash flow',
    'operating activities',
    'investing activities',
    'financing activities',
    'cash and cash equivalents',
    'capital expenditures'
  ],
  FDD: [
    'franchise disclosure document',
    'fdd',
    'franchisor',
    'franchisee',
    'franchise fee',
    'royalty fee',
    'territory',
    'initial investment'
  ],
  STATEMENT_OF_SHAREHOLDERS_EQUITY: [
    'shareholders equity',
    'stockholders equity',
    'retained earnings',
    'common stock',
    'preferred stock',
    'treasury stock',
    'comprehensive income',
    'paid in capital'
  ]
};

export function detectDocumentType(
  content: string
): keyof typeof DOCUMENT_PROMPTS {
  const contentLower = content.toLowerCase();
  
  // For each doc type, count how many keywords appear in the content
  const matches = Object.entries(KEYWORDS).map(([type, words]) => {
    const count = words.filter((w) => contentLower.includes(w)).length;
    return { type, count };
  });

  // Sort by highest count
  const best = matches.sort((a, b) => b.count - a.count)[0];

  // If we found a doc type with at least one keyword match, use it
  if (best && best.count > 0 && best.type in DOCUMENT_PROMPTS) {
    return best.type as keyof typeof DOCUMENT_PROMPTS;
  }

  // Default to INCOME_STATEMENT if type cannot be determined
  return 'INCOME_STATEMENT';
}
