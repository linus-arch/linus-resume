# Releases and private content setup

## Adding releases

Add a new object to `src/config/resume-data.ts` in `releasePosts`. The release archive and `/releases/:slug` page update automatically. Replace the placeholder date and add the public Spotify, Apple Music, Bandcamp, or LANDR URLs when the release is live.

LANDR does not provide a public webhook used by this app. For now, the safest low-maintenance workflow is:

1. Release through LANDR.
2. Wait until the release is live on Spotify and other services.
3. Add one `releasePosts` entry and its streaming links.
4. Deploy.

An automated Spotify poller can be added later with a Spotify Client ID/Secret and a scheduled server function, but it should create a draft for review rather than publish unverified metadata.

## Password storage

Do not put the password in React code, `resume-data.ts`, a public `.env` file, or `localStorage`.

Set these as **Vercel project environment variables** for Production, Preview, and Development as appropriate:

- `PRIVATE_CONTENT_PASSWORD_SALT`: URL-safe base64 random salt
- `PRIVATE_CONTENT_PASSWORD_HASH`: URL-safe base64 PBKDF2-SHA-256 hash of the password using 210,000 iterations
- `PRIVATE_CONTENT_SESSION_SECRET`: a long random secret used to sign HttpOnly sessions

The password is never stored by the application. Only the salt, derived hash, and session-signing secret are stored.

Generate values locally without committing them:

```bash
node -e "const c=require('crypto'); console.log('PRIVATE_CONTENT_PASSWORD_SALT='+c.randomBytes(16).toString('base64url')); console.log('PRIVATE_CONTENT_SESSION_SECRET='+c.randomBytes(32).toString('base64url'))"
```

To generate the password hash, use a local script or password-hashing tool that performs PBKDF2-HMAC-SHA256 with 210000 iterations and the generated salt. Do not paste the password into chat or commit the generated values.

Connect the variables in Vercel under **Project → Settings → Environment Variables**, then redeploy. Local development uses an untracked `.env.local` file.

## Persistent security logs

1. Create a Supabase project.
2. Run `supabase/security_access_attempts.sql` in the Supabase SQL editor.
3. Add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to Vercel environment variables.
4. Never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser or prefix it with `VITE_`.

Without those variables, failed attempts are only sent to the server log. With them, attempts are stored as hashes without passwords or raw IP addresses.

## Private content

Replace the example entry in `api/private/content.ts`. Keep private audio and images in private object storage and expose them only after authentication through short-lived signed URLs. Do not use permanent public asset URLs for private material.

