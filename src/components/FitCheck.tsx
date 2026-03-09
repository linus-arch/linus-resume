import { useState } from "react";
import { Loader2, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { fitCheckStrongExample, fitCheckWeakExample } from "@/config/resume-data";

// Uses Vercel API route by default. Set VITE_API_URL to override.
const FIT_CHECK_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/fit-check`
  : "/api/fit-check";

const FitCheck = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeJob = async () => {
    if (!jobDescription.trim() || jobDescription.length < 50) {
      setError("Please enter a more detailed job description (at least 50 characters)");
      return;
    }

    setError("");
    setAnalysis("");
    setIsLoading(true);

    try {
      const response = await fetch(FIT_CHECK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobDescription }),
      });

      if (!response.ok || !response.body) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to analyze job description");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let analysisContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              analysisContent += content;
              setAnalysis(analysisContent);
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (err) {
      console.error("Fit check error:", err);
      setError(err instanceof Error ? err.message : "Failed to analyze. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadExample = (type: "strong" | "weak") => {
    setJobDescription(type === "strong" ? fitCheckStrongExample : fitCheckWeakExample);
    setAnalysis("");
    setError("");
  };

  return (
    <section id="fit-check" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title">Honest Fit Assessment</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Paste a job description. Get an honest assessment of whether I'm the right person—including when I'm not.
        </p>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => loadExample("strong")}
            className="btn-outline text-sm py-2 px-4"
          >
            Strong Fit Example
          </button>
          <button
            onClick={() => loadExample("weak")}
            className="btn-outline text-sm py-2 px-4"
          >
            Weak Fit Example
          </button>
        </div>

        <div className="experience-card">
          <label className="block text-sm text-muted-foreground mb-3">
            Job description to analyze
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full h-40 bg-background border border-border rounded-lg p-4 text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Paste a job description here..."
          />
          
          {error && (
            <p className="text-destructive text-sm mt-2">{error}</p>
          )}

          <Button
            onClick={analyzeJob}
            disabled={isLoading || !jobDescription.trim()}
            className="mt-4"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Analyze Fit
              </>
            )}
          </Button>
        </div>

        {analysis && (
          <div className="mt-8 experience-card">
            <h3 className="text-lg font-semibold mb-4 text-primary flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Fit Analysis
            </h3>
            <div className="prose prose-invert prose-sm max-w-none">
              <ReactMarkdown>{analysis}</ReactMarkdown>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default FitCheck;
