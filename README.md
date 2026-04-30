# Side Project — Scrollytelling Library Demo

Standalone scrollytelling "Library" page (no backend) meant to demo the effect only.

## Local dev

```powershell
npm.cmd i
npm.cmd run dev
```

Open http://localhost:3000

## Deploy (GitHub Pages)

This project is configured for GitHub Pages via GitHub Actions.

Important: the included workflow assumes this folder is the **repo root**.
If you keep it as a subfolder inside a larger monorepo, you must update the workflow to run in the
`side_project/` working directory.

1. In your repo: **Settings → Pages → Source → GitHub Actions**
2. Push to `main`
3. Your site will publish to:

`https://<your-username>.github.io/<your-repo>/`

## Notes

- Images live in `public/images/` and are referenced as `/images/<file>`.
- The `next.config.ts` uses static export (`output: "export"`).
