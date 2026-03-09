# AI Resume Template

Your resume, but it talks back. An AI-powered portfolio site that lets recruiters ask questions about you — and gets real answers.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FTerminalsandCoffee%2Fai-resume-template&env=OPENAI_API_KEY&envDescription=Your%20OpenAI%20API%20key%20for%20the%20AI%20chat%20feature&envLink=https%3A%2F%2Fplatform.openai.com%2Fapi-keys)

## What's Inside

- AI chat that answers recruiter questions about you in real-time
- Honest fit assessment — paste a job description, get a candid match analysis
- Animated skill bars, certifications, experience cards
- Dark theme with polished design (Space Grotesk + Inter)
- Mobile-responsive with hamburger menu, scaled typography
- Accessible — ARIA labels, progressbar roles, semantic HTML
- Fully customizable — edit 2 files and you're live

## Quick Start

1. Click the **Deploy to Vercel** button above
2. Add your `OPENAI_API_KEY` when prompted ([get one here](https://platform.openai.com/api-keys))
3. Once deployed, customize your site (see below)
4. Push changes — Vercel auto-deploys

## Customization (2 Files)

These are the only files you need to touch. Both are pre-filled with a sample "Jane Smith" persona — search for `CHANGE ME` to find everything you need to update.

### File 1: `src/config/resume-data.ts` — Your Content

This powers every visible section of the site:

- Name, title, tagline, availability status
- Tech tags (hero badges)
- Work experience (with bullet points or sub-sections)
- Skills with proficiency levels (0-100)
- Certifications (name, issuer, icon)
- Suggested AI chat questions
- Fit check example job descriptions

### File 2: `api/_lib/context.ts` — Your AI Personality

This is the system prompt that powers the AI chat. Write it as if you're briefing an assistant who will answer questions on your behalf. Include:

- Professional summary and background
- Detailed work experience
- Technical skills (strong, moderate, gaps)
- Certifications and notable projects
- What roles you're a strong/weak fit for
- Your communication style

The more detail you add, the better the AI answers.

### Optional: `index.html` — SEO & Social Tags

Update the `<title>`, meta description, and Open Graph tags with your name for search engines and social sharing previews. Look for `<!-- CHANGE ME -->` comments. This is a one-time setup, not required for the site to work.

## Local Development

```bash
git clone https://github.com/TerminalsandCoffee/ai-resume-template.git
cd ai-resume-template
npm install
cp .env.example .env       # then add your OPENAI_API_KEY
npm run dev                 # http://localhost:8080
```

For AI chat to work locally, you need the [Vercel CLI](https://vercel.com/docs/cli):

```bash
vercel env pull .env.local  # pulls env vars from Vercel
vercel dev                  # runs Vite + API routes locally
```

## Project Structure

```
src/
  config/resume-data.ts      <- YOUR CONTENT (edit this)
  components/                <- UI components (rarely need editing)
  pages/Index.tsx            <- Main page layout
api/
  _lib/context.ts            <- YOUR AI PERSONALITY (edit this)
  chat.ts                    <- Chat API route (Vercel Edge Function)
  fit-check.ts               <- Fit check API route (Vercel Edge Function)
index.html                   <- SEO meta tags (optional)
.env.example                 <- Environment variable template
```

## Security Notes

- Your `OPENAI_API_KEY` is **server-side only** (in `process.env`) — never exposed to the browser
- `.env` files are gitignored by default — never commit them
- API routes use `Access-Control-Allow-Origin: *` out of the box. For production, consider restricting CORS to your domain in `api/chat.ts` and `api/fit-check.ts`

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend:** Vercel Edge Functions, OpenAI API (gpt-4o-mini)
- **Cost:** ~$0.005 per conversation

## License

MIT — see [LICENSE](LICENSE)
