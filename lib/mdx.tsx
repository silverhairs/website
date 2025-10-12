'use client';

import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { highlight } from 'sugar-high';
import React, { useEffect, useState } from 'react';
import remarkGfm from 'remark-gfm';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

// Custom code block component with syntax highlighting
function Code({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) {
  // Check if this is a mermaid diagram
  if (className === 'language-mermaid') {
    return <MermaidDiagram chart={children as string} />;
  }

  const codeHTML = highlight(children as string);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

// Mermaid diagram component - renders client-side
function MermaidDiagram({ chart }: { chart: string }) {
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Dynamically import mermaid only on client-side
    import('mermaid').then((mermaid) => {
      mermaid.default.initialize({ startOnLoad: false, theme: 'neutral' });

      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      mermaid.default.render(id, chart)
        .then(({ svg }) => setSvg(svg))
        .catch((err) => setError(err.message));
    });
  }, [chart]);

  if (error) {
    return <div className="text-red-500 text-sm">Error rendering diagram: {error}</div>;
  }

  if (!svg) {
    return <div className="text-muted text-sm">Loading diagram...</div>;
  }

  return <div dangerouslySetInnerHTML={{ __html: svg }} className="my-4" />;
}

// Custom pre component
function Pre({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  return (
    <pre {...props}>
      {children}
    </pre>
  );
}

// Custom components for MDX
const components = {
  code: Code,
  pre: Pre,
};

interface MDXContentProps {
  source: string;
}

export function MDXContent({ source }: MDXContentProps) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);

  useEffect(() => {
    serialize(source, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    }).then(setMdxSource);
  }, [source]);

  if (!mdxSource) {
    return <div className="text-muted">Loading content...</div>;
  }

  return <MDXRemote {...mdxSource} components={components} />;
}
