export default function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-sm text-muted">
          <p className="mb-2">
            © {new Date().getFullYear()} boris kayi. All content licensed under{' '}
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              CC BY-SA 4.0
            </a>
            .
          </p>
          <p className="text-xs">
            You are free to share and adapt this content with attribution and under the same license.
          </p>
        </div>
      </div>
    </footer>
  );
}
