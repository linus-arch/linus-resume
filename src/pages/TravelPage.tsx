import { FormEvent, useEffect, useState } from "react";
import { Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";

type PrivateEntry = { title: string; body: string };

const TravelPage = () => {
  const [password, setPassword] = useState("");
  const [entries, setEntries] = useState<PrivateEntry[]>([]);
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/private/content", { credentials: "include" })
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json() as { entries: PrivateEntry[] };
          setEntries(data.entries);
          setUnlocked(true);
        }
      })
      .catch(() => undefined);
  }, []);

  const unlock = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/private/unlock", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        setError("Unable to unlock this archive.");
        return;
      }
      const data = await (await fetch("/api/private/content", { credentials: "include" })).json() as { entries: PrivateEntry[] };
      setEntries(data.entries);
      setUnlocked(true);
      setPassword("");
    } catch {
      setError("Unable to unlock this archive.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen px-6 pt-28 pb-20">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Field notes</p>
        <h1 className="text-4xl sm:text-6xl font-heading font-bold tracking-tight mb-6">Travel</h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-12">
          Notes, images, and fragments collected along the way.
        </p>
        <div className="space-y-8">
          <article className="border-b border-border pb-8">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Public entry</p>
            <h2 className="text-2xl font-heading font-semibold mb-3">The road keeps moving</h2>
            <p className="text-muted-foreground leading-relaxed">A public layer for places, observations, and small details worth carrying forward.</p>
          </article>
          {!unlocked ? (
            <form onSubmit={unlock} className="rounded-xl border border-border bg-card p-6 sm:p-8">
              <Lock className="w-5 h-5 text-muted-foreground mb-4" />
              <h2 className="text-xl font-heading font-semibold mb-2">Private archive</h2>
              <p className="text-sm text-muted-foreground mb-5">Some pieces are only available to people I have shared them with.</p>
              <label htmlFor="archive-password" className="sr-only">Archive password</label>
              <input id="archive-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm mb-3" placeholder="Enter password" required />
              {error && <p role="alert" className="text-sm text-destructive mb-3">{error}</p>}
              <Button type="submit" disabled={loading}>{loading ? "Checking..." : "Unlock archive"}</Button>
            </form>
          ) : (
            <div className="space-y-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><Unlock className="w-4 h-4" /> Private archive unlocked</div>
              {entries.map((entry) => <article key={entry.title} className="border-b border-border pb-8"><p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Private entry</p><h2 className="text-2xl font-heading font-semibold mb-3">{entry.title}</h2><p className="text-muted-foreground leading-relaxed">{entry.body}</p></article>)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TravelPage;
