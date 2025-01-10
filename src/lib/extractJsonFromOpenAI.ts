// src/lib/extractJsonFromOpenAI.ts

/**
 * 6. HELPER: EXTRACT JSON FROM OpenAI
 * We parse the assistant's response to pull out the raw JSON object.
 */
export function extractJsonFromOpenAI(response: string): string {
  let content = response.trim();
  // If it's inside triple-backticks, extract the code fence contents
  if (content.includes('```')) {
    const match = content.match(/```(?:json)?([\s\S]+?)```/);
    if (match) {
      content = match[1].trim();
    }
  }
  // Then isolate the first curly brace block
  const start = content.indexOf('{');
  const end = content.lastIndexOf('}');
  if (start < 0 || end < 0) {
    throw new Error('No JSON object found in OpenAI response');
  }
  return content.substring(start, end + 1);
}
