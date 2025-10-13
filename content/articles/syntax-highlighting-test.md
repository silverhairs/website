---
title: "Testing Syntax Highlighting"
date: "2025-10-13"
category: "technical"
tags: ["testing", "code", "syntax-highlighting"]
excerpt: "A test article to showcase the new syntax highlighting capabilities with various programming languages."
---

# Testing Syntax Highlighting

This article demonstrates the syntax highlighting capabilities using rehype-pretty-code and Shiki.

## JavaScript Example

Here's a simple JavaScript function:

```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Usage
console.log(fibonacci(10)); // Output: 55
```

## TypeScript Example

TypeScript with type annotations:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

## Python Example

A Python class with decorators:

```python
from dataclasses import dataclass
from typing import List

@dataclass
class Article:
    title: str
    author: str
    tags: List[str]

    def __str__(self) -> str:
        return f"{self.title} by {self.author}"
```

## Rust Example

Some Rust code with pattern matching:

```rust
fn process_option(opt: Option<i32>) -> i32 {
    match opt {
        Some(value) => value * 2,
        None => 0,
    }
}
```

## Go Example

Go code with error handling:

```go
package main

import (
    "fmt"
    "errors"
)

func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}
```

## Inline Code

You can also use inline code like `const x = 42;` within paragraphs.

## Conclusion

The syntax highlighting is powered by Shiki and supports over 100 programming languages!
