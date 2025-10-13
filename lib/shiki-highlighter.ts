import { codeToHtml } from "shiki";

export async function highlightCode(
  code: string,
  language: string,
  isDark: boolean = true,
): Promise<string> {
  try {
    const html = await codeToHtml(code, {
      lang: language,
      theme: isDark ? "gruvbox-dark-hard" : "gruvbox-light-hard",
    });

    return html;
  } catch (error) {
    console.error(`Error highlighting ${language} code:`, error);
    if (error instanceof Error) {
      console.error(`Error message: ${error.message}`);
      console.error(`Error stack: ${error.stack}`);
    }

    return escapeHtml(code);
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
