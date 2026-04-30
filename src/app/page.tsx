import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ maxWidth: 1040, margin: "0 auto", padding: "40px 16px" }}>
      <h1 style={{ margin: 0, fontSize: 28 }}>Scrollytelling Library Demo</h1>
      <p style={{ marginTop: 12, color: "rgba(236,253,245,0.75)", fontSize: 14, maxWidth: 680 }}>
        Standalone page to demonstrate a scrollytelling-style library UI. No database; the documents are
        mocked.
      </p>

      <div style={{ marginTop: 24 }}>
        <Link
          href="/library"
          style={{
            display: "inline-flex",
            border: "1px solid rgba(16,185,129,0.25)",
            padding: "10px 12px",
            borderRadius: 10,
            background: "rgba(0,0,0,0.35)",
          }}
        >
          Open Library demo →
        </Link>
      </div>

      <p style={{ marginTop: 24, color: "rgba(236,253,245,0.55)", fontSize: 12 }}>
        Tip: deploy to GitHub Pages to share the effect.
      </p>
    </main>
  );
}
