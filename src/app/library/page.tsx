import Link from "next/link";

import styles from "./library.module.css";
import { ScrollyLibrary } from "./ScrollyLibrary";

export default function LibraryPage() {
  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.h1}>Library (scrollytelling demo)</h1>
          <p className={styles.sub}>
            Full-page scrollytelling slide: scroll to transition documents.
          </p>
        </div>

        <Link className={styles.link} href="/">
          ← Home
        </Link>
      </div>

      <ScrollyLibrary />

      <div className={styles.footer}>
        Want to verify images? Open <Link href="/images">/images</Link>.
      </div>
    </main>
  );
}
