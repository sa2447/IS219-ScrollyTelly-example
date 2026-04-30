import Link from "next/link";
import Image from "next/image";

const IMAGES = ["Fathomless.png", "Pokeymanz.png", "Stam.png"] as const;

export default function ImagesPage() {
  return (
    <main style={{ maxWidth: 1040, margin: "0 auto", padding: "32px 16px 64px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16 }}>
        <h1 style={{ margin: 0, fontSize: 20 }}>Images</h1>
        <Link
          href="/library"
          style={{
            display: "inline-flex",
            border: "1px solid rgba(16,185,129,0.22)",
            padding: "8px 10px",
            borderRadius: 10,
            background: "rgba(0,0,0,0.2)",
          }}
        >
          ← Back to Library
        </Link>
      </div>

      <p style={{ color: "rgba(236,253,245,0.62)", fontSize: 13, marginTop: 10 }}>
        Static image sanity-check page.
      </p>

      <div
        style={{
          marginTop: 16,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 14,
        }}
      >
        {IMAGES.map((name) => (
          <a
            key={name}
            href={`/images/${name}`}
            style={{
              border: "1px solid rgba(16,185,129,0.18)",
              borderRadius: 14,
              background: "rgba(0,0,0,0.3)",
              padding: 10,
            }}
          >
            <div style={{ fontSize: 12, color: "rgba(236,253,245,0.7)", marginBottom: 8 }}>{name}</div>
            <Image
              src={`/images/${name}`}
              alt={name}
              width={1200}
              height={800}
              style={{ width: "100%", height: "auto", borderRadius: 10, display: "block" }}
            />
          </a>
        ))}
      </div>
    </main>
  );
}
