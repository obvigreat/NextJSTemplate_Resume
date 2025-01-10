// src/lib/detectDocumentType.ts
import { DOCUMENT_PROMPTS } from './prompts';

export async function detectDocumentType(
  content: string
): Promise<keyof typeof DOCUMENT_PROMPTS> {
  try {
    const response = await fetch('/api/detect-document-type', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content })
    });

    if (!response.ok) {
      console.error('Error detecting document type, falling back to INCOME_STATEMENT');
      return 'INCOME_STATEMENT';
    }

    const { documentType } = await response.json();
    return documentType;
  } catch (error) {
    console.error('Error detecting document type:', error);
    return 'INCOME_STATEMENT';
  }
}
