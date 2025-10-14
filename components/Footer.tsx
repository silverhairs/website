export default function Footer() {
  return (
    <footer
      className="border-t mt-24 py-12"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div
            className="text-sm"
            style={{ color: "var(--foreground-secondary)" }}
          >
            <p>
              © {new Date().getFullYear()} Boris Kayiranga. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6 text-sm font-medium">
            <a
              href="https://github.com/silverhairs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              style={{ color: "var(--foreground)" }}
            >
              GitHub
            </a>
            <a
              href="https://x.com/silverhairs7"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              style={{ color: "var(--foreground)" }}
            >
              X (Twitter)
            </a>
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              style={{ color: "var(--foreground)" }}
            >
              License
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
