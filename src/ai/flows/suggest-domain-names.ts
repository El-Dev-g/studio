'use server';

/**
 * @fileOverview An AI agent to suggest domain names based on a business description.
 *
 * - suggestDomainNames - A function that handles the domain name suggestion process.
 * - SuggestDomainNamesInput - The input type for the suggestDomainNames function.
 * - SuggestDomainNamesOutput - The return type for the suggestDomainNames function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDomainNamesInputSchema = z.object({
  businessDescription: z
    .string()
    .describe('A description of the business or website idea.'),
});
export type SuggestDomainNamesInput = z.infer<typeof SuggestDomainNamesInputSchema>;

const SuggestDomainNamesOutputSchema = z.object({
  domainSuggestions: z
    .array(z.string())
    .describe('An array of suggested domain names.'),
});
export type SuggestDomainNamesOutput = z.infer<typeof SuggestDomainNamesOutputSchema>;

export async function suggestDomainNames(
  input: SuggestDomainNamesInput
): Promise<SuggestDomainNamesOutput> {
  return suggestDomainNamesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDomainNamesPrompt',
  input: {schema: SuggestDomainNamesInputSchema},
  output: {schema: SuggestDomainNamesOutputSchema},
  prompt: `You are a domain name suggestion expert.

  Given a description of a business or website idea, you will suggest a list of available domain names that are relevant and catchy.

  Business Description: {{{businessDescription}}}

  Please provide at least 5 suggestions.
  Do not include domains that are trademarked by other companies.`,
});

const suggestDomainNamesFlow = ai.defineFlow(
  {
    name: 'suggestDomainNamesFlow',
    inputSchema: SuggestDomainNamesInputSchema,
    outputSchema: SuggestDomainNamesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
