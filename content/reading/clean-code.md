---
title: "Clean Code: A Handbook of Agile Software Craftsmanship"
author: "Robert C. Martin"
type: "book"
status: "read"
dateAdded: "2023-09-15"
dateFinished: "2023-11-20"
rating: 4
url: "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882"
---

## My Thoughts

*Clean Code* is often cited as essential reading for software developers, and while I appreciate many of its principles, I have mixed feelings about some of its dogmatic assertions.

### What I Loved

**The core principles are solid**: Functions should be small, names should be meaningful, and code should read like prose. These ideas have genuinely improved how I think about code organization.

**The refactoring examples** are valuable. Seeing messy code transformed step-by-step into cleaner versions is instructive, even if you don't agree with every decision.

### My Reservations

**The examples feel dated**: Java-centric examples from 2008 don't always translate well to modern development contexts. Some patterns Uncle Bob advocates (like excessive class extraction) feel over-engineered in languages with better functional programming support.

**One-size-fits-all thinking**: The book presents certain rules as universal truths. In practice, context matters—a 3-line function isn't always better than a 10-line one if it requires jumping through multiple levels of abstraction to understand.

**The tone can be preachy**: There's a difference between showing good practices and claiming there's only one right way to write software.

## Key Takeaways

Despite my criticisms, there's value here:

1. **Meaningful names matter**: Time spent finding the right name is time well spent
2. **Functions should do one thing**: But "one thing" is contextual, not absolute
3. **Tests enable refactoring**: Without tests, you can't confidently improve code
4. **Comments are often code smells**: If you need a comment to explain what code does, the code might not be clear enough

## Would I Recommend It?

Yes, but with caveats. Read it critically. Take the principles, not the dogma. Understand the "why" behind the rules so you know when to break them.

Some of the best code I've written violates Uncle Bob's rules. Some of the worst followed them religiously.

---

**Rating**: 4/5 — Valuable principles, but apply them thoughtfully, not blindly.
