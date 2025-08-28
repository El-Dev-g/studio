
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

const GenerateWebsiteOutputSchema = z.object({
    htmlContent: z.string().describe('The complete HTML content for the index.html file, styled with Tailwind CSS classes and linking to styles.css and script.js.'),
    cssContent: z.string().describe('The CSS content for the styles.css file.'),
    jsContent: z.string().describe('The JavaScript content for the script.js file for any interactivity.'),
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
    prompt: `You are an expert website designer and developer. 
    
    Given a description of a business or website idea, you will generate the code for a beautiful and professional single-page landing page.
    
    The output must be a JSON object matching the schema with three fields: 'htmlContent', 'cssContent', and 'jsContent'.

    1.  **htmlContent**: 
        *   This will be the full content for an \`index.html\` file.
        *   It MUST link to a local './styles.css' and a './script.js'. Do NOT use a CDN for anything other than fonts or icons.
        *   It must be styled using Tailwind CSS classes directly in the HTML. Do not use inline styles or a <style> tag.
        *   The page should include:
            *   A modern navigation bar with a logo and links.
            *   An impactful hero section with a clear headline, subtitle, and a call-to-action button.
            *   A features section highlighting 3-4 key benefits or services. Use lucide-react icons where appropriate.
            *   A compelling call-to-action section.
            *   A simple footer with copyright information and social links.
        *   Use placeholder images from picsum.photos (e.g., https://picsum.photos/800/600).
        *   For icons, use names from the 'lucide-react' library (e.g., 'Rocket', 'ShieldCheck'), which will be rendered by a script.

    2.  **cssContent**: 
        *   This will be the content for a \`styles.css\` file.
        *   Include some basic body styles, and styles for a custom font if you use one from Google Fonts.

    3.  **jsContent**:
        *   This will be the content for a \`script.js\` file.
        *   It should contain the necessary JavaScript to make the page interactive, such as mobile menu toggling or activating the Lucide icons. For Lucide, use \`lucide.createIcons();\`.

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
