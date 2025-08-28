
'use server';

/**
 * @fileOverview An AI agent to generate a blog post from a topic.
 * 
 * - generateBlogPost - A function that handles the blog post generation.
 * - GenerateBlogPostInput - The input type for the generateBlogPost function.
 * - GenerateBlogPostOutput - The return type for the generateBlogPost function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateBlogPostInputSchema = z.object({
    topic: z.string().describe('The topic or title for the blog post.'),
});
export type GenerateBlogPostInput = z.infer<typeof GenerateBlogPostInputSchema>;

const GenerateBlogPostOutputSchema = z.object({
    title: z.string().describe('The generated title of the blog post.'),
    content: z.string().describe('The full content of the blog post in Markdown format.'),
});
export type GenerateBlogPostOutput = z.infer<typeof GenerateBlogPostOutputSchema>;


export async function generateBlogPost(
    input: GenerateBlogPostInput
): Promise<GenerateBlogPostOutput> {
    return generateBlogPostFlow(input);
}

const prompt = ai.definePrompt({
    name: 'generateBlogPostPrompt',
    input: { schema: GenerateBlogPostInputSchema },
    output: { schema: GenerateBlogPostOutputSchema },
    prompt: `You are an expert content writer and SEO specialist. 
    
    Given a topic, you will generate a high-quality, engaging, and well-structured blog post.

    The output must be a JSON object matching the schema, containing 'title' and 'content'.

    The 'content' must be in Markdown format. It should include:
    - Headings (h2, h3)
    - Paragraphs
    - Bold and italic text
    - Unordered lists

    Do not include a main h1 heading in the content, as the 'title' field will be used for that.

    Topic: {{{topic}}}`,
});

const generateBlogPostFlow = ai.defineFlow(
    {
        name: 'generateBlogPostFlow',
        inputSchema: GenerateBlogPostInputSchema,
        outputSchema: GenerateBlogPostOutputSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!;
    }
);
