---
title: "Attention Is All You Need"
author: "Vaswani et al."
type: "paper"
status: "reading"
dateAdded: "2024-02-01"
url: "https://arxiv.org/abs/1706.03762"
---

## Initial Thoughts

This is the paper that introduced the Transformer architecture, which has become foundational for modern NLP and is now expanding into computer vision and other domains.

I'm working through it slowly, as the mathematical notation is dense and requires careful study.

## Key Concepts (So Far)

### Self-Attention Mechanism

The core innovation is the self-attention mechanism, which allows the model to weigh the importance of different parts of the input when processing each element.

The attention function can be described as:

```
Attention(Q, K, V) = softmax(QK^T / √d_k)V
```

Where:
- Q = Queries
- K = Keys
- V = Values
- d_k = dimension of keys

### Multi-Head Attention

Instead of using a single attention function, the paper proposes using multiple "heads" that learn different attention patterns in parallel, then concatenating their outputs.

This allows the model to attend to information from different representation subspaces.

## Questions I'm Exploring

1. Why does scaling by √d_k improve stability?
2. How do positional encodings preserve sequence information without recurrence?
3. What are the computational trade-offs compared to RNNs/LSTMs?

## Notes to Self

- Need to implement a simple transformer from scratch to really understand it
- Should explore the connection to graph neural networks
- Compare with more recent architectures (GPT, BERT, etc.)

---

*Will update as I progress through the paper and experiments...*
