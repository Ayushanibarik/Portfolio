# Ayush Animesh Barik Digital Headquarters

Production-ready personal headquarters built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and Lucide Icons.

## Content Updates

All website content is stored in one editable file:

```txt
src/data/site.ts
```

Update this file to change profile details, project copy, links, skills, timeline items, contact details, and resume path.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run typecheck
npm run build
npm run start
```

## Resume

The resume button points to:

```txt
/resume.pdf
```

Replace `public/resume.pdf` with the final resume PDF when it is ready. Keep the same filename unless you also update `resumePath` in `src/data/site.ts`.

## SEO Assets

Generated routes:

```txt
/opengraph-image
/twitter-image
/icon
/robots.txt
/sitemap.xml
```

Open Graph, Twitter, LinkedIn, and WhatsApp previews use the metadata configured in `src/app/layout.tsx`.

## Deploy To Vercel

1. Push this project to GitHub.
2. Go to Vercel and choose **Add New Project**.
3. Import the GitHub repository.
4. Use these settings:
   - Framework Preset: `Next.js`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
5. Deploy.

## Connect A GoDaddy Domain To Vercel

In Vercel:

1. Open the project.
2. Go to **Settings > Domains**.
3. Add your domain, for example `ayushanimeshbarik.com`.
4. Add the `www` version too, for example `www.ayushanimeshbarik.com`.

In GoDaddy DNS:

1. Open **My Products > Domains > DNS**.
2. For the root domain, add or update this record:

```txt
Type: A
Name: @
Value: 76.76.21.21
TTL: 600 seconds or default
```

3. For the `www` subdomain, add or update this record:

```txt
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 600 seconds or default
```

4. Remove conflicting parked-domain A records or forwarding records if GoDaddy keeps redirecting the site.
5. Wait for DNS propagation. It can take a few minutes, but some providers may take up to 24 hours.
6. Return to Vercel and click **Refresh** in the Domains panel until both domains are verified.

## Quality Targets

- Mobile-first responsive UI
- Strict TypeScript
- Reusable section and UI components
- Generated social preview images
- Accessible focus states and semantic sections
- Optimized local portrait image with Next.js Image
