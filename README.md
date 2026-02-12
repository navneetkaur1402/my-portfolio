# my-portfolio

This repository contains a static portfolio website ready to deploy to GitHub Pages.

## Quick deploy (automatic via GitHub Actions)

1. Create a new GitHub repository (e.g., `my-portfolio`) on GitHub.
2. On your machine, if this folder is not yet a git repo, run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

3. The workflow `.github/workflows/deploy-pages.yml` will run on push to `main` and publish the site to GitHub Pages automatically.

4. After the workflow completes, GitHub will host the site at `https://<your-username>.github.io/<your-repo>/`.

## Manual publish (alternative)

If you prefer, enable Pages in the repository Settings and select the `gh-pages` branch (or the `main` branch root) as source. The Actions workflow above is the recommended approach and requires no further setup.

---

If you'd like, I can:
- Add a `CNAME` file for a custom domain
- Polish content (update hero text, replace `profile-photo.jpg` placeholder)
- Create a small test script to validate links

Tell me which of the above you want next.

