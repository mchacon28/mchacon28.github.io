# mchacon28.github.io

Personal academic website of Mario Chacón-Falcón, served by GitHub Pages. Plain HTML/CSS/JS with no build step.

## Structure

| File | Content |
| --- | --- |
| `index.html` | Intro, research interests, news, selected publications |
| `publications.html` | Full publication list with abstracts and BibTeX |
| `talks.html` | Invited talks, conference talks/posters, workshops attended |
| `teaching.html` | Teaching, reading groups, other activities |
| `cv.html` | Short web CV (education, research experience, languages) |
| `BAMSLDKVisual.html` | Interactive video companion to the BAM-SLDK paper |
| `conferences.html` | Redirect from the old URL to `talks.html` |
| `assets/css/site.css` | The single stylesheet (light/dark tokens on `:root`) |
| `assets/js/site.js` | Shared header, footer, theme toggle, copy-BibTeX |

## Common edits

- **Navigation / footer / "last updated" date:** edit the `SITE` object at the top of `assets/js/site.js`.
- **News item:** add an `<li>` at the top of the `.news` list in `index.html`.
- **Publication:** copy an `<article class="pub">` block in `publications.html`. Give it an `id` so other pages can link to it.
- **Talk:** copy an `<li class="entry">` block in `talks.html`.
- **Colours and fonts:** change the tokens at the top of `assets/css/site.css`.

## Local preview

```sh
python -m http.server 8000
# open http://localhost:8000
```
