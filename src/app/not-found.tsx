import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 16px" }}>
      <h1 style={{ margin: 0, fontSize: 22 }}>Not found</h1>
      <p style={{ marginTop: 10, color: "rgba(236,253,245,0.65)", fontSize: 13 }}>
        That route doesn’t exist in this demo.
      </p>
      <div style={{ marginTop: 18 }}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            border: "1px solid rgba(16,185,129,0.22)",
            padding: "8px 10px",
            borderRadius: 10,
            background: "rgba(0,0,0,0.2)",
          }}
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
