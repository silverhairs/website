# Getting Started with Your Personal Website

## Quick Start

1. **Navigate to the project**:
   ```bash
   cd personal-website
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**: Visit [http://localhost:3000](http://localhost:3000)

## Customize Your Site

### 1. Update Your Information

**Homepage** (`app/page.tsx`):
- Line 11: Update your name (currently set to "boris kayi")
- Lines 12-14: Update your bio
- Lines 70-78: Update social links (GitHub, Twitter, Email)

**Site Metadata** (`app/layout.tsx`):
- Lines 13-14: Update site title and description

### 2. Add Your First Article

1. Copy the template:
   ```bash
   cp content/articles/_template.md content/articles/my-first-post.md
   ```

2. Edit `content/articles/my-first-post.md`:
   ```yaml
   ---
   title: "My First Post"
   date: "2024-03-15"
   category: "technical"  # or "rants" or "philosophy"
   tags: ["intro", "personal"]
   excerpt: "Welcome to my personal website!"
   ---

   # My First Post

   Your content here...
   ```

3. Refresh your browser to see the new article!

### 3. Add a Book to Your Reading List

1. Copy the template:
   ```bash
   cp content/reading/_template.md content/reading/my-book.md
   ```

2. Edit `content/reading/my-book.md`:
   ```yaml
   ---
   title: "Book Title"
   author: "Author Name"
   type: "book"
   status: "reading"
   dateAdded: "2024-03-15"
   ---

   ## My Notes

   What I learned from this book...
   ```

### 4. Set Up Analytics (Optional)

1. Create `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` with your Plausible details:
   ```
   NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
   NEXT_PUBLIC_PLAUSIBLE_SRC=https://your-plausible.com/js/script.js
   ```

## Customization Tips

### Change Colors

Edit `app/globals.css` (lines 3-8 for light mode, 20-27 for dark mode):

```css
:root {
  --background: #ffffff;
  --foreground: #1a1a1a;
  --accent: #0066cc;      /* Change this for different accent color */
  --muted: #666666;
  --border: #e5e5e5;
}
```

### Change Font

To use Iosevka instead of IBM Plex Mono:

1. Download Iosevka from [GitHub](https://github.com/be5invis/Iosevka/releases)
2. Add font files to `public/fonts/`
3. Update `app/layout.tsx` to use local fonts
4. Update `app/globals.css` font-family references

## Writing Tips

### Code Blocks with Syntax Highlighting

\`\`\`javascript
function hello() {
  console.log("Hello, world!");
}
\`\`\`

### Mermaid Diagrams

\`\`\`mermaid
graph TD
    A[Start] --> B[Process]
    B --> C[End]
\`\`\`

### Categories

- **technical**: Code, math, technology articles
- **rants**: Opinions, frustrations, hot takes
- **philosophy**: Reflections, ideas, life

## Deployment

### Deploy to Vercel (Easiest)

1. Push code to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables (if using analytics)
5. Deploy!

### Build for Production

```bash
npm run build
npm start
```

## Need Help?

- Check the [README.md](README.md) for detailed documentation
- Review example articles in `content/articles/`
- Review example reading items in `content/reading/`

## Next Steps

1. Delete or modify example content
2. Customize colors and styling
3. Add your real content
4. Set up analytics
5. Deploy!

Happy writing! 🚀
