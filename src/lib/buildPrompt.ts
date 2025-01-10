// src/lib/buildPrompt.ts
import { DOCUMENT_PROMPTS } from './prompts';

/**
 * 5. HELPER: BUILD PROMPT
 * Based on the document type, return the appropriate prompt with the file content appended.
 */
export function getPromptForDocumentType(
  documentType: keyof typeof DOCUMENT_PROMPTS,
  fileContent: string
): string {
  const prompt = DOCUMENT_PROMPTS[documentType];
  return `${prompt}

    RULES:
    1. ALL numbers must be actual numbers (1000000), not strings ("1000000")
    2. ALL dates must be in YYYY-MM-DD format
    3. Use null for unknown values
    4. Keep EXACTLY this structure
    5. Include AT LEAST company_name and fiscal_year
    6. NO additional fields
    7. NO markdown
    8. NO explanations
    9. ONLY the JSON object

    For CSV/XLSX files:
    - First row often contains headers
    - Look for columns that match financial metrics
    - Convert any currency values to numbers
    - Remove any currency symbols or commas
    - Dates must be YYYY-MM-DD

    For PDF files:
    - The data may be unstructured text, do your best to find the relevant financial info
    - Follow the same rules above

    Content to analyze:
    ${fileContent}
  `;
}
