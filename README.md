# Personal Website

A minimalist personal website built with Next.js, featuring articles and a reading list. Designed with readability in mind, using IBM Plex Mono for a clean, monospace aesthetic.

## Features

- 📝 **Article System**: Write articles in Markdown with support for:
  - Three categories: Technical, Rants, Philosophy
  - Tags and filtering
  - Reading time estimates
  - Syntax-highlighted code blocks
  - Mermaid diagrams
- 📚 **Reading List**: Track books and papers with notes and ratings
- 🎨 **Minimalist Design**: Clean, readable interface with IBM Plex Mono font
- 🌓 **Dark/Light Mode**: Theme toggle with system preference detection
- 📊 **Analytics**: Integrated Plausible.io support (self-hostable)
- ⚡ **Performance**: Static site generation for fast loading

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Navigate to the project directory:
```bash
cd personal-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (optional, for analytics):
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Plausible configuration:
```
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your-domain.com
NEXT_PUBLIC_PLAUSIBLE_SRC=https://your-plausible-instance.com/js/script.js
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Content Management

### Writing Articles

1. Create a new Markdown file in `content/articles/`
2. Use the template from `content/articles/_template.md`
3. Add frontmatter with metadata:

```yaml
---
title: "Your Article Title"
date: "2024-03-15"
category: "technical" # or "rants" or "philosophy"
tags: ["tag1", "tag2"]
excerpt: "Brief description"
---
```

4. Write your article content using Markdown

**Features available:**
- Standard Markdown syntax
- Code blocks with syntax highlighting
- Mermaid diagrams (wrap in ```mermaid code blocks)
- MDX components (if needed)

### Adding to Reading List

1. Create a new Markdown file in `content/reading/`
2. Use the template from `content/reading/_template.md`
3. Add frontmatter:

```yaml
---
title: "Book Title"
author: "Author Name"
type: "book" # or "paper"
status: "reading" # or "read" or "to-read"
dateAdded: "2024-03-15"
dateFinished: "2024-04-01" # optional
rating: 4 # optional, 1-5
url: "https://..." # optional
---
```

4. Write your notes in Markdown

## Customization

### Updating Personal Information

1. **Homepage** (`app/page.tsx`):
   - Update your name, bio, and links
   - Modify the "Find me elsewhere" section with your social links

2. **Site Metadata** (`app/layout.tsx`):
   - Change the site title and description

3. **Navigation** (`components/Navigation.tsx`):
   - Customize navigation links if needed

### Styling

- **Colors**: Edit CSS variables in `app/globals.css`
- **Fonts**: Change font configuration in `app/layout.tsx`
- **Layout**: Adjust spacing and sizing in component files

## Project Structure

```
personal-website/
├── app/                    # Next.js app directory
│   ├── articles/          # Article pages
│   ├── reading/           # Reading list pages
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── Navigation.tsx
│   ├── ThemeToggle.tsx
│   └── Analytics.tsx
├── content/               # Content files
│   ├── articles/         # Article markdown files
│   └── reading/          # Reading list markdown files
├── lib/                   # Utility functions
│   ├── markdown.ts       # Content processing
│   └── mdx.tsx           # MDX rendering
└── public/               # Static assets
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure environment variables for Plausible (if using)
4. Deploy

### Self-Hosting

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

3. Configure a reverse proxy (nginx, Caddy) to serve the site

### Static Export

To generate a fully static site:

1. Update `next.config.ts` to enable static export
2. Run:
```bash
npm run build
```

3. Deploy the `out/` directory to any static hosting service

## Setting Up Plausible Analytics

### Self-Hosted Instance

1. Follow the [Plausible self-hosting guide](https://plausible.io/docs/self-hosting)
2. Deploy Plausible to your VPC
3. Add environment variables to your website:
   - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`: Your website domain
   - `NEXT_PUBLIC_PLAUSIBLE_SRC`: Your Plausible script URL

### Plausible Cloud

1. Sign up at [plausible.io](https://plausible.io)
2. Add your site
3. Set environment variables:
   - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`: Your website domain
   - No need to set `NEXT_PUBLIC_PLAUSIBLE_SRC` (defaults to Plausible cloud)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Adding Features

The codebase is designed to be extensible. Some ideas:

- Add search functionality for articles
- Generate RSS feed
- Add newsletter subscription
- Implement comments system
- Add table of contents for long articles
- Create tag pages

## License

### Code License
The source code of this website is open source and available under the **Apache License 2.0**. See [LICENSE](LICENSE) for details.

### Content License
All content (articles, reading notes, and other written material) is licensed under **[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)**. See [LICENSE-CONTENT.md](LICENSE-CONTENT.md) for full details.

This means:
- **Code**: Free to use, modify, and distribute with patent protection (Apache 2.0)
- **Content**: Free to share and adapt with attribution and same license (CC BY-SA 4.0)

## Credits

Built with:
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono)
- [Plausible Analytics](https://plausible.io/)
