"use client";

import { useState } from "react";
import { getDomainSuggestions } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles, LoaderCircle, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function DomainSuggester() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setSuggestions([]);
    
    const formData = new FormData(event.currentTarget);
    const businessDescription = formData.get('businessDescription') as string;

    const result = await getDomainSuggestions(businessDescription);
    
    if ('error' in result) {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: result.error,
      });
    } else if (result.domainSuggestions) {
      setSuggestions(result.domainSuggestions);
    }
    
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Sparkles className="text-primary" />
          AI Domain Suggester
        </CardTitle>
        <CardDescription className="text-md">
          Describe your business or idea, and our AI will suggest the perfect domain name for you.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full gap-2">
            <Label htmlFor="businessDescription" className="sr-only">Business Description</Label>
            <Textarea
              id="businessDescription"
              name="businessDescription"
              placeholder="e.g., An online store that sells handmade pet accessories."
              rows={4}
              required
              disabled={isLoading}
              className="text-base"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Suggest Domains
              </>
            )}
          </Button>
        </CardFooter>
      </form>
      {isLoading && (
        <CardContent className="flex flex-col items-center justify-center gap-4 p-8">
            <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Our AI is thinking...</p>
        </CardContent>
      )}
      {suggestions.length > 0 && !isLoading && (
        <CardContent>
            <h3 className="mb-4 text-lg font-semibold">Here are some suggestions:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {suggestions.map((domain, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-lg border">
                        <span className="font-medium">{domain}</span>
                        <Button variant="outline" size="sm" className="bg-background">
                            <Search className="mr-2 h-4 w-4"/>
                            Check
                        </Button>
                    </div>
                ))}
            </div>
        </CardContent>
      )}
    </Card>
  );
}
