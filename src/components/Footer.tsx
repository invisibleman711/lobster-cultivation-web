import { siteConfig } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 py-8">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="text-sm text-text-muted">
          {siteConfig.name} · {siteConfig.tagline}
        </p>
      </div>
    </footer>
  );
}
