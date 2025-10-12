---
title: "Stop Overengineering Simple Problems"
date: "2024-03-12"
category: "rants"
tags: ["software-engineering", "rants", "best-practices"]
excerpt: "A frustrated take on the tendency to reach for complex solutions when simple ones would suffice."
---

# Stop Overengineering Simple Problems

I'm tired of seeing three-line functions wrapped in abstractions, abstractions wrapped in factories, factories managed by dependency injection containers, all to solve a problem that could have been handled with a straightforward `if` statement.

## The Problem

We've created a culture where "best practices" means reflexively reaching for design patterns before understanding the problem. Where adding complexity is seen as professional, and simplicity is viewed as naive.

## Real Example

I recently reviewed code where someone created:

- An interface for a configuration service
- A concrete implementation of that interface
- A factory to create instances of the service
- A provider to register it in the DI container
- Mock implementations for testing

**What did this "service" do?** It read a single environment variable.

```javascript
// What we got
const config = container.resolve('ConfigService').get('API_KEY');

// What we needed
const API_KEY = process.env.API_KEY;
```

## When Abstractions Make Sense

Don't get me wrong—abstractions are powerful. They're essential for:

- Handling multiple implementations
- Managing complex state
- Providing clear boundaries in large systems
- Testing components in isolation

But here's the thing: **Not every problem is complex.**

## The Cost of Complexity

Every abstraction has a cost:

- Cognitive overhead for developers
- More code to maintain
- Harder debugging
- Slower onboarding

You're not making your codebase "enterprise-ready" by adding unnecessary layers. You're making it harder to understand and maintain.

## YAGNI is Still Valid

"You Aren't Gonna Need It" isn't an invitation to write sloppy code. It's a reminder to:

1. Solve the problem you have
2. Not the problem you might have someday
3. Refactor when complexity is actually needed

## Start Simple

Write the simplest thing that works. When you *actually* need flexibility, abstraction, or extensibility—when you have **concrete evidence** that you need it—then refactor.

Your future self will thank you for the readable, maintainable code. Not the "architecturally sound" abstraction that no one understands.

---

*End rant. Back to writing simple code.*
