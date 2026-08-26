# Vinyl Collection

A personal vinyl record catalog, built with [Jekyll](https://jekyllrb.com/) and [Bootstrap 5](https://getbootstrap.com/), hosted entirely on GitHub Pages.

## Features

- **Collection** — sortable, searchable table and grid views with cover art
- **Artists** — records grouped by artist
- **Stats** — totals, genre/artist/year breakdowns
- **Add Record** — a form that generates the YAML block to add to `_data/records.yml`, with a "Find Artwork" button that looks up official cover art via the iTunes Search API

## Adding a record

1. Go to **Add Record** in the nav.
2. Fill in the details (use **Find Artwork** to auto-fill the cover image).
3. Click **Generate YAML**, then copy the output.
4. Paste it into [`_data/records.yml`](_data/records.yml) and commit.

The site rebuilds automatically on every push to `main`.

## Local development

Requires Ruby and Bundler.

```bash
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000/vinyl/.

## Deployment

Pushing to `main` triggers [`.github/workflows/pages.yml`](.github/workflows/pages.yml), which builds the site and deploys it to GitHub Pages. In the repo settings, under **Pages**, set the source to **GitHub Actions**.
