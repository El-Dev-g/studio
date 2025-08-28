
'use server';

/**
 * @fileOverview An AI agent to generate a multi-page website based on a description.
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

const FileObjectSchema = z.object({
    fileName: z.string().describe('The name of the file, e.g., index.html, styles.css.'),
    content: z.string().describe('The full content of the file.'),
});

const GenerateWebsiteOutputSchema = z.object({
    files: z.array(FileObjectSchema).describe('An array of file objects representing the entire website.'),
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
    
    Given a description of a business or website idea, you will generate the code for a beautiful and professional multi-page website.
    
    The output must be a JSON object matching the schema, containing a 'files' array. Each object in the array should have 'fileName' and 'content'.

    You MUST generate the following files:
    1.  **index.html**: 
        *   This will be the main landing page.
        *   It MUST link to './styles.css' and './script.js'.
        *   It must be styled using Tailwind CSS classes directly in the HTML.
        *   The navigation bar MUST contain links to the other generated pages (e.g., about.html, services.html, contact.html).
        *   The page should include a hero section, features/services overview, and a footer.
        *   Use placeholder images from picsum.photos (e.g., https://picsum.photos/800/600).
        *   For icons, use names from the 'lucide-react' library (e.g., 'Rocket').

    2.  **about.html**:
        *   A page describing the company or project.
        *   It must link to './styles.css' and './script.js' and have the same navigation and footer as index.html.

    3.  **services.html** (or a similar name like **products.html**):
        *   A page detailing the services or products offered.
        *   It must link to './styles.css' and './script.js' and have the same navigation and footer as index.html.

    4.  **contact.html**:
        *   A page with a contact form and contact information.
        *   It must link to './styles.css' and './script.js' and have the same navigation and footer as index.html.
    
    5.  **styles.css**: 
        *   This will be the content for a \`styles.css\` file.
        *   Include some basic body styles, and styles for a custom font if you use one from Google Fonts.

    6.  **script.js**:
        *   This will be the content for a \`script.js\` file.
        *   It should contain the necessary JavaScript to make the page interactive, such as mobile menu toggling or activating the Lucide icons. For Lucide, use \`lucide.createIcons();\`.

    Ensure all HTML pages have a consistent design, navigation, and footer for a cohesive user experience. All links between pages must be correct relative paths (e.g., './about.html').

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
