// Dynamic import for web-tree-sitter to avoid server-side bundling
let ParserClass: typeof import("web-tree-sitter").Parser | null = null;
let LanguageClass: typeof import("web-tree-sitter").Language | null = null;

async function loadTreeSitter() {
  console.info("currently loading tree-sitter");
  if (ParserClass && LanguageClass) {
    console.info("we found parser and language classes");
    return { Parser: ParserClass, Language: LanguageClass };
  }

  if (typeof window === "undefined") {
    console.error("Tree-sitter does not exist");
    return null;
  }

  const mod = await import("web-tree-sitter");
  ParserClass = mod.Parser;
  LanguageClass = mod.Language;
  console.info(`we have initialized tree-sitter`);
  return { Parser: ParserClass, Language: LanguageClass };
}

const gruvboxDark = {
  bg: "#1d2021",
  fg: "#ebdbb2",
  red: "#fb4934",
  green: "#b8bb26",
  yellow: "#fabd2f",
  blue: "#83a598",
  purple: "#d3869b",
  aqua: "#8ec07c",
  orange: "#fe8019",
  gray: "#928374",
};

const gruvboxLight = {
  bg: "#f9f5d7",
  fg: "#3c3836",
  red: "#9d0006",
  green: "#79740e",
  yellow: "#b57614",
  blue: "#076678",
  purple: "#8f3f71",
  aqua: "#427b58",
  orange: "#af3a03",
  gray: "#928374",
};

// Map tree-sitter node types to gruvbox colors
function getColorForNodeType(nodeType: string, isDark: boolean): string {
  const colors = isDark ? gruvboxDark : gruvboxLight;

  // Keywords
  if (
    nodeType.includes("keyword") ||
    nodeType === "import" ||
    nodeType === "export" ||
    nodeType === "return" ||
    nodeType === "if" ||
    nodeType === "else" ||
    nodeType === "for" ||
    nodeType === "while" ||
    nodeType === "function" ||
    nodeType === "class" ||
    nodeType === "const" ||
    nodeType === "let" ||
    nodeType === "var" ||
    nodeType === "async" ||
    nodeType === "await" ||
    nodeType === "def" ||
    nodeType === "fn" ||
    nodeType === "struct" ||
    nodeType === "enum"
  ) {
    return colors.red;
  }

  if (nodeType.includes("string") || nodeType.includes("template")) {
    return colors.green;
  }

  if (
    nodeType.includes("number") ||
    nodeType === "integer" ||
    nodeType === "float"
  ) {
    return colors.purple;
  }

  if (
    nodeType.includes("function") ||
    nodeType.includes("method") ||
    nodeType === "call_expression" ||
    nodeType === "identifier"
  ) {
    return colors.yellow;
  }

  if (nodeType.includes("type") || nodeType.includes("interface")) {
    return colors.yellow;
  }

  if (nodeType.includes("comment")) {
    return colors.gray;
  }

  if (nodeType.includes("operator")) {
    return colors.orange;
  }

  if (nodeType.includes("property") || nodeType.includes("member")) {
    return colors.blue;
  }

  return colors.fg;
}

let parserCache: { [key: string]: any } = {};
let initialized = false;

export async function initTreeSitter() {
  if (initialized) return;

  // Only run in browser
  if (typeof window === "undefined") {
    return;
  }

  try {
    const module = await loadTreeSitter();
    if (!module) return;

    await module.Parser.init({
      locateFile(scriptName: string) {
        return `/tree-sitter/${scriptName}`;
      },
    });
    initialized = true;
  } catch (error) {
    console.error("Failed to initialize tree-sitter:", error);
  }
}

async function getParser(language: string): Promise<any | null> {
  if (typeof window === "undefined") {
    return null;
  }

  if (parserCache[language]) {
    return parserCache[language];
  }

  try {
    await initTreeSitter();

    if (!initialized) {
      return null;
    }

    const module = await loadTreeSitter();
    if (!module) return null;

    const parser = new module.Parser();
    const wasmPath = `/tree-sitter/tree-sitter-${language}.wasm`;

    try {
      console.log(`Loading language WASM from: ${wasmPath}`);
      const Lang = await module.Language.load(wasmPath);
      console.log(`Language loaded successfully:`, Lang);
      parser.setLanguage(Lang);
      console.log(`Parser language set successfully`);
      parserCache[language] = parser;
      return parser;
    } catch (e) {
      console.error(`Language ${language} not available:`, e);
      if (e instanceof Error) {
        console.error(`Error message: ${e.message}`);
        console.error(`Error stack: ${e.stack}`);
      }
      // Don't cache failed parsers
      return null;
    }
  } catch (error) {
    console.error(`Failed to load parser for ${language}:`, error);
    return null;
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function highlightCode(
  code: string,
  language: string,
  isDark: boolean = true,
): Promise<string> {
  // Normalize language names
  const langMap: { [key: string]: string } = {
    js: "javascript",
    ts: "typescript",
    py: "python",
    rs: "rust",
    sh: "bash",
    yml: "yaml",
    md: "markdown",
  };

  const normalizedLang = langMap[language] || language;
  const parser = await getParser(normalizedLang);

  if (!parser) {
    // If parser not available, return escaped plain text
    return escapeHtml(code);
  }

  try {
    const tree = parser.parse(code);
    const root = tree.rootNode;

    let html = "";
    let lastIndex = 0;

    function traverse(node: any) {
      if (node.childCount === 0) {
        // Leaf node - apply coloring
        // First, add any text between last processed node and this one
        if (node.startIndex > lastIndex) {
          html += escapeHtml(code.slice(lastIndex, node.startIndex));
        }

        const text = code.slice(node.startIndex, node.endIndex);
        const color = getColorForNodeType(node.type, isDark);
        html += `<span style="color: ${color}">${escapeHtml(text)}</span>`;
        lastIndex = node.endIndex;
      } else {
        // Process children
        for (const child of node.children) {
          traverse(child);
        }
      }
    }

    traverse(root);

    if (lastIndex < code.length) {
      html += escapeHtml(code.slice(lastIndex));
    }

    return html;
  } catch (error) {
    console.error(`Error highlighting code:`, error);
    return escapeHtml(code);
  }
}
