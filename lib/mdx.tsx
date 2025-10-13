"use client";

import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import React, { useEffect, useState, useRef } from "react";
import remarkGfm from "remark-gfm";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { highlightCode } from "./shiki-highlighter";

// Custom code block component
function Code({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  // Check if this is a mermaid diagram
  if (className === "language-mermaid") {
    return <MermaidDiagram chart={children as string} />;
  }

  // For inline code, just render it normally
  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
}

// Mermaid diagram component - renders client-side
function MermaidDiagram({ chart }: { chart: string }) {
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Dynamically import mermaid only on client-side
    import("mermaid").then((mermaid) => {
      mermaid.default.initialize({ startOnLoad: false, theme: "neutral" });

      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      mermaid.default
        .render(id, chart)
        .then(({ svg }) => setSvg(svg))
        .catch((err) => setError(err.message));
    });
  }, [chart]);

  if (error) {
    return (
      <div className="text-red-500 text-sm">
        Error rendering diagram: {error}
      </div>
    );
  }

  if (!svg) {
    return <div className="text-muted text-sm">Loading diagram...</div>;
  }

  return <div dangerouslySetInnerHTML={{ __html: svg }} className="my-4" />;
}

// Copy button component
function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-2 rounded bg-code-bg hover:bg-border transition-colors text-foreground opacity-70 hover:opacity-100"
      title="Copy code"
      aria-label="Copy code to clipboard"
    >
      {copied ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M13.5 3.5L6 11L2.5 7.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect
            x="5"
            y="5"
            width="9"
            height="9"
            rx="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 11V3a1 1 0 0 1 1-1h8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

function Pre({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [highlighted, setHighlighted] = useState(false);
  const [code, setCode] = useState("");

  const childArray = React.Children.toArray(children);
  const codeElement = childArray.find(
    (child) => React.isValidElement(child) && child.type === "code",
  );

  const isMermaid = React.isValidElement(codeElement) &&
    typeof codeElement.props === "object" &&
    codeElement.props !== null &&
    "className" in codeElement.props &&
    typeof codeElement.props.className === "string" &&
    codeElement.props.className.includes("language-mermaid");

  useEffect(() => {
    if (isMermaid) return;
    if (preRef.current && !highlighted) {
      const codeElement = preRef.current.querySelector("code");
      if (codeElement) {
        const className = codeElement.className || "";
        const match = className.match(/language-(\w+)/);

        if (match) {
          const language = match[1];

          if (language === "mermaid") {
            return;
          }

          const codeText = codeElement.textContent || "";
          setCode(codeText);

          const isDark = window.matchMedia(
            "(prefers-color-scheme: dark)",
          ).matches;

          console.log(`Attempting to highlight ${language} code`);
          highlightCode(codeText, language, isDark)
            .then((html) => {
              const tempDiv = document.createElement("div");
              tempDiv.innerHTML = html;
              const shikiPre = tempDiv.querySelector("pre");
              if (shikiPre && containerRef.current) {
                const oldPre = containerRef.current.querySelector("pre");
                if (oldPre) {
                  oldPre.replaceWith(shikiPre);
                }
              }
              setHighlighted(true);
            })
            .catch((error) => {
              console.error("Error during highlighting:", error);
            });
        }
      }
    }
  }, [children, highlighted, isMermaid]);

  if (isMermaid && React.isValidElement(codeElement)) {
    const codeContent = codeElement.props.children;
    return (
      <MermaidDiagram
        chart={
          typeof codeContent === "string" ? codeContent : String(codeContent)
        }
      />
    );
  }

  return (
    <div ref={containerRef} className="relative group">
      <pre ref={preRef} {...props}>
        {children}
      </pre>
      {code && <CopyButton code={code} />}
    </div>
  );
}

const components = {
  code: Code,
  pre: Pre,
};

interface MDXContentProps {
  source: string;
}

export function MDXContent({ source }: MDXContentProps) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(
    null,
  );

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
