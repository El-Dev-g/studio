'use server';

import { suggestDomainNames } from '@/ai/flows/suggest-domain-names';
import type { SuggestDomainNamesOutput } from '@/ai/flows/suggest-domain-names';
import { generateWebsite } from '@/ai/flows/generate-website';
import type { GenerateWebsiteOutput } from '@/ai/flows/generate-website';
import { editWebsite } from '@/ai/flows/edit-website';
import type { EditWebsiteInput, EditWebsiteOutput } from '@/ai/flows/edit-website';
import { generateBlogPost } from '@/ai/flows/generate-blog-post';
import type { GenerateBlogPostOutput } from '@/ai/flows/generate-blog-post';


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

export async function editWebsiteAction(
  input: EditWebsiteInput
): Promise<EditWebsiteOutput | { error: string }> {
  if (!input.instruction || input.instruction.trim().length < 5) {
    return { error: 'Please provide a more detailed instruction.' };
  }
  if (!input.currentFiles || input.currentFiles.length === 0) {
    return { error: 'There are no files to edit.' };
  }

  try {
    const result = await editWebsite(input);
    return result;
  } catch (e) {
    console.error(e);
    return { error: 'Failed to edit website. Please try again later.' };
  }
}

export async function generateBlogPostAction(
  topic: string
): Promise<GenerateBlogPostOutput | { error: string }> {
  if (!topic || topic.trim().length < 5) {
    return { error: 'Please provide a more detailed topic.' };
  }

  try {
    const result = await generateBlogPost({ topic });
    return result;
  } catch (e) {
    console.error(e);
    return { error: 'Failed to generate blog post. Please try again later.' };
  }
}
