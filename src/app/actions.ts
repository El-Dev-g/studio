'use server';

import { suggestDomainNames } from '@/ai/flows/suggest-domain-names';
import type { SuggestDomainNamesOutput } from '@/ai/flows/suggest-domain-names';
import { generateWebsite } from '@/ai/flows/generate-website';
import type { GenerateWebsiteOutput } from '@/ai/flows/generate-website';

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


export async function generateWebsiteAction(
  description: string
): Promise<GenerateWebsiteOutput | { error: string }> {
  if (!description || description.trim().length < 10) {
    return { error: 'Please provide a more detailed website description.' };
  }

  try {
    const result = await generateWebsite({ description });
    return result;
  } catch (e) {
    console.error(e);
    return { error: 'Failed to generate website. Please try again later.' };
  }
}
