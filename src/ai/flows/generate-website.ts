'use server';

/**
 * @fileOverview An AI agent to generate a website based on a description.
 * 
 * - generateWebsite - A function that handles the website generation process.
 * - GenerateWebsiteInput - The input type for the generateWebsite function.
 * - GenerateWebsiteOutput - The return type for the generateWebsite function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateWebsiteInputSchema = z.object({
    description: z.string().describe('A description of the website to build.'),
});
export type GenerateWebsiteInput = z.infer<typeof GenerateWebsiteInputSchema>;

const FeatureSchema = z.object({
    icon: z.string().describe("A relevant icon name from lucide-react, like 'Rocket' or 'ShieldCheck'."),
    title: z.string(),
    description: z.string(),
});

const GenerateWebsiteOutputSchema = z.object({
    palette: z.object({
        primary: z.string().describe('A primary color for the website in HSL format, e.g., "220 80% 55%"'),
        secondary: z.string().describe('A secondary color for the website in HSL format, e.g., "210 40% 96.1%"'),
    }),
    hero: z.object({
        title: z.string().describe('A catchy headline for the website.'),
        subtitle: z.string().describe('A short, engaging subtitle.'),
        cta: z.string().describe('A call-to-action button text, e.g., "Get Started".'),
    }),
    features: z.array(FeatureSchema).describe('A list of 3 key features of the business.'),
    ctaSection: z.object({
        title: z.string().describe('A title for the final call-to-action section.'),
        subtitle: z.string().describe('A subtitle for the final call-to-action section.'),
        cta: z.string().describe('A call-to-action button text for the final section.'),
    }),
});
export type GenerateWebsiteOutput = z.infer<typeof GenerateWebsiteOutputSchema>;

export async function generateWebsite(
    input: GenerateWebsiteInput
): Promise<GenerateWebsiteOutput> {
    return generateWebsiteFlow(input);
}

const prompt = ai.definePrompt({
    name: 'generateWebsitePrompt',
    input: { schema: GenerateWebsiteInputSchema },
    output: { schema: GenerateWebsiteOutputSchema },
    prompt: `You are an expert website designer. 
    
    Given a description of a business or website idea, you will generate the content for a beautiful landing page.
    
    The output should be a JSON object that matches the provided schema.
    
    The color palette should be modern and aesthetically pleasing.
    
    The hero section should be impactful and immediately grab the user's attention.
    
    The features section should highlight the most important aspects of the business. Make sure to choose appropriate icons from the lucide-react library.
    
    The final call-to-action should be compelling and encourage users to take the next step.

    Business Description: {{{description}}}`,
});

const generateWebsiteFlow = ai.defineFlow(
    {
        name: 'generateWebsiteFlow',
        inputSchema: GenerateWebsiteInputSchema,
        outputSchema: GenerateWebsiteOutputSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!;
    }
);
