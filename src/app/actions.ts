'use server';

import { suggestDomainNames } from '@/ai/flows/suggest-domain-names';
import type { SuggestDomainNamesOutput } from '@/ai/flows/suggest-domain-names';

export async function getDomainSuggestions(
  businessDescription: string
): Promise<SuggestDomainNamesOutput | { error: string }> {
  if (!businessDescription || businessDescription.trim().length < 10) {
    return { error: 'Please provide a more detailed business description.' };
  }

  try {
    const result = await suggestDomainNames({ businessDescription });
    return result;
  } catch (e) {
    console.error(e);
    return { error: 'Failed to get suggestions. Please try again later.' };
  }
}
