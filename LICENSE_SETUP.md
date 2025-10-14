# License Setup Documentation

## Overview

This website uses a dual-licensing approach:
- **Code (Apache 2.0)**: The source code is open source with patent protection
- **Content (CC BY-SA 4.0)**: Articles and notes require attribution

## What's Been Added

### 1. Footer Component (`components/Footer.tsx`)

A footer that appears on every page with:
- Copyright notice with current year
- Link to CC BY-SA 4.0 license
- Brief explanation of license terms

**Location**: Bottom of every page

**What users see**:
```
© 2024 Boris Kayiranga. All content licensed under CC BY-SA 4.0.
You are free to share and adapt this content with attribution and under the same license.
```

### 2. License Files

Three license files have been created:

#### LICENSE
- **Covers**: Source code (HTML, CSS, JavaScript, configurations)
- **Type**: Apache License 2.0
- **Allows**: Free use, modification, distribution of code with patent protection

#### LICENSE-CONTENT.md
- **Covers**: All written content (articles, reading notes)
- **Type**: Creative Commons Attribution-ShareAlike 4.0 (CC BY-SA 4.0)
- **Requires**:
  - Attribution when sharing
  - Same license when adapting
- **Allows**:
  - Sharing and remixing
  - Commercial use
  - Adaptations

### 3. Updated Documentation

**README.md** now includes:
- Clear license section
- Explanation of dual licensing
- Links to both license files

## CC BY-SA 4.0 Explained

### What It Allows:
✅ Anyone can read your articles
✅ Anyone can share your articles
✅ Anyone can translate or adapt your content
✅ Commercial use is permitted

### What It Requires:
📝 Must give you credit (attribution)
🔄 Must use the same license for adaptations
🔗 Must link to the original and indicate changes

### What It Prevents:
❌ No one can claim your work as theirs
❌ No one can use restrictive licenses on adaptations

## Customization

### Change Your Name

In `components/Footer.tsx`, line 7 (currently set to "Boris Kayiranga"):
```tsx
© {new Date().getFullYear()} Boris Kayiranga. All content licensed under{' '}
```

In `LICENSE`, line 189 (currently set to "Boris Kayiranga"):
```
Copyright 2024 Boris Kayiranga
```

### Change License (Not Recommended)

If you want to use a different Creative Commons license:

**Options:**
- **CC BY 4.0**: Requires attribution only (no ShareAlike)
- **CC BY-NC-SA 4.0**: Non-commercial use only + ShareAlike
- **CC BY-ND 4.0**: No derivatives allowed
- **CC0**: Public domain (no rights reserved)

**To change:**
1. Update footer link in `components/Footer.tsx`
2. Update `LICENSE-CONTENT.md` with new license text
3. Update `README.md` references

### Disable License Footer

If you don't want the license footer:

1. Remove `<Footer />` from `app/layout.tsx`
2. Keep license files for legal clarity

## Why This Licensing Approach?

### For You:
- Protects your content while allowing sharing
- Ensures you get credit for your work
- Prevents others from taking your content without attribution
- Allows your ideas to spread freely

### For Readers:
- Clear what they can/can't do with your content
- Freedom to share and translate
- Encourages open knowledge sharing

### For Developers:
- Code can be reused in other projects with patent protection
- Encourages open source contributions
- Apache 2.0 is widely used and trusted (used by major projects)
- Provides explicit patent grants to users

## Legal Considerations

**Disclaimer**: This is a common licensing setup for personal blogs, but:
- Consider consulting a lawyer for specific legal advice
- Licenses are international but enforcement varies by jurisdiction
- Some content may not be licensable by you (e.g., quotes, citations)

## Examples of What Others Can Do

### ✅ Allowed:
- Quote your article with attribution
- Translate your article (with credit)
- Create a video based on your article (with credit)
- Use your code in their own project
- Fork your website for their own use

### ❌ Not Allowed (Without Following License):
- Copy your article without attribution
- Adapt your content under a more restrictive license
- Claim your work as their own

## Resources

- [Creative Commons Official Site](https://creativecommons.org/)
- [CC BY-SA 4.0 Legal Text](https://creativecommons.org/licenses/by-sa/4.0/legalcode)
- [Apache License 2.0 Official](https://www.apache.org/licenses/LICENSE-2.0)
- [Apache 2.0 Explained](https://choosealicense.com/licenses/apache-2.0/)

---

**Questions?** The Creative Commons website has an excellent FAQ section.
