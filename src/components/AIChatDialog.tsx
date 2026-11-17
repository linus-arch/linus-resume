import { useEffect, useRef, useState } from "react";
import { Bot, MessageSquare, Send, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { chatTitle, suggestedQuestions } from "@/config/resume-data";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const CHAT_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/chat`
  : "/api/chat";

const AIChatDialog = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const streamChat = async (userMessages: Message[]) => {
    let response: Response;

    try {
      response = await fetch(CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: userMessages }),
      });
    } catch {
      throw new Error(
        "The chat service is unreachable. When running locally, start the Vercel API runtime or use the deployed site.",
      );
    }

    if (!response.ok || !response.body) {
      let message = `Chat request failed (${response.status}).`;
      try {
        const data = (await response.json()) as { error?: string };
        if (data.error) message = data.error;
      } catch {
        // Keep the status-based message when the server does not return JSON.
      }
      throw new Error(message);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantContent = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "" || !line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") continue;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantContent += content;
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant") {
                return prev.map((message, index) =>
                  index === prev.length - 1 ? { ...message, content: assistantContent } : message,
                );
              }
              return [...prev, { role: "assistant", content: assistantContent }];
            });
          }
        } catch {
          textBuffer = `${line}\n${textBuffer}`;
          break;
        }
      }
    }

    if (!assistantContent) {
      throw new Error("The chat service returned an empty response. Please try again.");
    }
  };

  const handleSend = async (message?: string) => {
    const text = message || input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setError(null);
    setIsLoading(true);

    try {
      await streamChat(newMessages);
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "The chat request failed.";
      console.error("Chat error:", requestError);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <section className="ai-chat-panel" aria-labelledby="ai-chat-title">
      <header className="ai-chat-panel__header">
        <div>
          <p className="score-kicker">Ask AI</p>
          <h3 id="ai-chat-title">{chatTitle}</h3>
        </div>
        <MessageSquare aria-hidden="true" />
      </header>

      <div className="ai-chat-panel__messages" ref={scrollRef} aria-live="polite">
        {messages.length === 0 ? (
          <div className="ai-chat-panel__empty">
            <p>Ask me anything about my background, skills, projects, or fit for a role.</p>
            <div className="ai-chat-panel__suggestions">
              {suggestedQuestions.map((question) => (
                <button key={question} type="button" onClick={() => handleSend(question)}>
                  {question}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div className={`ai-chat-panel__message ai-chat-panel__message--${message.role}`} key={index}>
              <span className="ai-chat-panel__avatar" aria-hidden="true">
                {message.role === "assistant" ? <Bot /> : <User />}
              </span>
              <div>
                {message.role === "assistant" ? (
                  <div className="ai-chat-panel__markdown">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p>{message.content}</p>
                )}
              </div>
            </div>
          ))
        )}
        {isLoading && <p className="ai-chat-panel__status">Thinking...</p>}
      </div>

      {error && <p className="ai-chat-panel__error" role="alert">{error}</p>}

      <form
        className="ai-chat-panel__form"
        onSubmit={(event) => {
          event.preventDefault();
          handleSend();
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about my experience..."
          aria-label="Ask a question"
          disabled={isLoading}
        />
        <Button type="submit" disabled={!input.trim() || isLoading} size="icon" aria-label="Send question">
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </section>
  );
};

export default AIChatDialog;
