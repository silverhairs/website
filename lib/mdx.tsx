'use client';

import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import React, { useEffect, useState, useRef } from 'react';
import remarkGfm from 'remark-gfm';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { highlightCode } from './shiki-highlighter';

// Custom code block component
function Code({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) {
  // Check if this is a mermaid diagram
  if (className === 'language-mermaid') {
    return <MermaidDiagram chart={children as string} />;
  }

  // For inline code, just render it normally
  return <code className={className} {...props}>{children}</code>;
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

// Custom pre component with tree-sitter syntax highlighting
function Pre({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null);
  const [highlighted, setHighlighted] = useState(false);

  // Check if this is a mermaid code block
  const childArray = React.Children.toArray(children);
  const codeElement = childArray.find((child) =>
    React.isValidElement(child) && child.type === 'code'
  );

  if (React.isValidElement(codeElement)) {
    const className = codeElement.props.className || '';
    if (className.includes('language-mermaid')) {
      const codeContent = codeElement.props.children;
      return <MermaidDiagram chart={typeof codeContent === 'string' ? codeContent : String(codeContent)} />;
    }
  }

  useEffect(() => {
    if (preRef.current && !highlighted) {
      const codeElement = preRef.current.querySelector('code');
      if (codeElement) {
        const className = codeElement.className || '';
        const match = className.match(/language-(\w+)/);

        if (match) {
          const language = match[1];

          // Skip mermaid diagrams
          if (language === 'mermaid') {
            return;
          }

          const code = codeElement.textContent || '';

          // Detect theme (dark mode)
          const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

          // Highlight with Shiki
          console.log(`Attempting to highlight ${language} code`);
          highlightCode(code, language, isDark).then((html) => {
            // Shiki returns complete HTML with pre and code tags, extract just the inner content
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const shikiPre = tempDiv.querySelector('pre');
            if (shikiPre && preRef.current) {
              // Replace the entire pre element with Shiki's pre element
              preRef.current.replaceWith(shikiPre);
            }
            setHighlighted(true);
          }).catch(error => {
            console.error('Error during highlighting:', error);
          });
        }
      }
    }
  }, [children, highlighted]);

  return (
    <pre ref={preRef} {...props}>
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
