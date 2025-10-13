---
title: "Testing Mermaid Diagrams with Syntax Highlighting"
date: "2025-10-13"
category: "technical"
tags: ["testing", "mermaid", "diagrams"]
excerpt: "Testing that both syntax highlighting and Mermaid diagrams work together."
---

# Mermaid and Code Together

This tests that both features work side by side.

## A Simple Flowchart

```mermaid
graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug it]
    D --> B
    C --> E[End]
```

## Some JavaScript Code

```javascript
function checkDiagram(isWorking) {
  if (isWorking) {
    console.log('Great!');
  } else {
    console.log('Debug it');
  }
}
```

## A Sequence Diagram

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server
    User->>Browser: Click link
    Browser->>Server: HTTP Request
    Server-->>Browser: HTML Response
    Browser-->>User: Render page
```

## More Code

```typescript
interface Diagram {
  type: 'flowchart' | 'sequence' | 'class';
  content: string;
}

function renderDiagram(diagram: Diagram): void {
  console.log(`Rendering ${diagram.type} diagram`);
}
```

Both should work perfectly now!
