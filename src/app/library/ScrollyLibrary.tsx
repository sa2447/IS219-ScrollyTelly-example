"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import styles from "./library.module.css";

type Doc = {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  kicker: string;
  thumbnailSrc: string;
  pages: number;
  uploaded: string;
  size: string;
  tags: string[];
};

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
function asset(path: string) {
  return `${BASE_PATH}${path}`;
}

const DOCS: Doc[] = [
  {
    id: "fathomless",
    number: 1,
    title: "Fathomless",
    subtitle: "Deep-sea incident report (mock)",
    kicker: "Document 01",
    thumbnailSrc: asset("/images/Fathomless.png"),
    pages: 18,
    uploaded: "2026-04-08",
    size: "3.2 MB",
    tags: ["incident", "narrative", "timeline"],
  },
  {
    id: "pokeymanz",
    number: 2,
    title: "Pokeymanz",
    subtitle: "Game manual excerpt (mock)",
    kicker: "Document 02",
    thumbnailSrc: asset("/images/Pokeymanz.png"),
    pages: 42,
    uploaded: "2026-03-22",
    size: "6.8 MB",
    tags: ["reference", "tables", "images"],
  },
  {
    id: "stam",
    number: 3,
    title: "Stam",
    subtitle: "Product spec sheet (mock)",
    kicker: "Document 03",
    thumbnailSrc: asset("/images/Stam.png"),
    pages: 9,
    uploaded: "2026-02-16",
    size: "1.1 MB",
    tags: ["spec", "bullets", "constraints"],
  },
];

export function ScrollyLibrary() {
  const [activeId, setActiveId] = useState(DOCS[0]?.id ?? "");
  const [stepOverlap, setStepOverlap] = useState<Record<string, number>>({});
  const rootRef = useRef<HTMLDivElement | null>(null);

  const activeDoc = useMemo(() => DOCS.find((d) => d.id === activeId) ?? DOCS[0], [activeId]);

  useEffect(() => {
    const rootEl = rootRef.current;
    if (!rootEl) return;

    const stepEls = Array.from(rootEl.querySelectorAll<HTMLElement>("[data-step]"));
    if (stepEls.length === 0) return;

    let raf = 0;
    const compute = () => {
      raf = 0;
      const vh = window.innerHeight || 1;

      const nextOverlap: Record<string, number> = {};
      let bestId = stepEls[0]?.getAttribute("data-step") ?? DOCS[0]?.id ?? "";
      let bestRatio = -1;

      for (const el of stepEls) {
        const id = el.getAttribute("data-step") ?? "";
        if (!id) continue;

        const r = el.getBoundingClientRect();
        const overlapPx = Math.min(r.bottom, vh) - Math.max(r.top, 0);
        const ratio = Math.max(0, Math.min(1, overlapPx / vh));
        nextOverlap[id] = ratio;

        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      }

      setStepOverlap(nextOverlap);
      setActiveId(bestId);
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(compute);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    compute();

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className={styles.shell} ref={rootRef}>
      <div className={styles.scroller}>
        {DOCS.map((doc, idx) => {
          const isActive = doc.id === activeId;
          return (
            <section
              key={doc.id}
              data-step={doc.id}
              className={[styles.step, isActive ? styles.stepActive : ""].filter(Boolean).join(" ")}
              aria-label={`${doc.title} step`}
            >
              <span style={{ position: "absolute", left: -9999, width: 1, height: 1, overflow: "hidden" }}>
                Step {idx + 1} of {DOCS.length}: {doc.kicker} {doc.title}
              </span>
            </section>
          );
        })}
      </div>

      <aside className={styles.previewWrap} aria-label="Sticky document preview">
        <div className={styles.previewTop}>
          <p className={styles.previewTitle}>Active document</p>
          <p className={styles.previewSub}>
            {activeDoc.kicker} · {activeDoc.title}
          </p>
        </div>

        <div className={styles.previewBody}>
          <div className={styles.thumbStack} aria-label="Thumbnail crossfade stack">
            {DOCS.map((doc) => {
              const overlap = stepOverlap[doc.id] ?? (doc.id === activeId ? 1 : 0);
              // Make fades feel snappier near the midpoint of the viewport.
              const opacity = Math.max(0, Math.min(1, (overlap - 0.12) / 0.76));

              return (
                <Image
                  key={doc.id}
                  className={styles.thumbLayer}
                  src={doc.thumbnailSrc}
                  alt={`${doc.title} thumbnail`}
                  fill
                  sizes="(max-width: 860px) 92vw, 520px"
                  priority={doc.id === activeId}
                  style={{ opacity, objectFit: "cover" }}
                />
              );
            })}
          </div>

          <div className={styles.previewFacts}>
            <div className={styles.fact}>
              <div className={styles.factKey}>Document #</div>
              <div className={styles.factVal}>{activeDoc.number}</div>
            </div>
            <div className={styles.fact}>
              <div className={styles.factKey}>Name</div>
              <div className={styles.factVal}>{activeDoc.title}</div>
            </div>
            <div className={styles.fact}>
              <div className={styles.factKey}>Pages</div>
              <div className={styles.factVal}>{activeDoc.pages}</div>
            </div>
            <div className={styles.fact}>
              <div className={styles.factKey}>File size</div>
              <div className={styles.factVal}>{activeDoc.size}</div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
