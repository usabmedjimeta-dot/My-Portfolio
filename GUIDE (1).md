# Portfolio Guide: edit, add your files, deploy

## 1. Folder structure

```
portfolio/
├── index.html      ← page structure
├── style.css       ← colours, layout, look
├── script.js       ← your details + behaviour
└── assets/
    ├── images/     ← profile.jpg, project-1.jpg, project-2.jpg …
    └── docs/       ← Your-Name-CV.pdf
```

Keep the three files and the `assets` folder together. Open `index.html` by double-clicking it to preview.
For live reloading, install VS Code + the **Live Server** extension, then right-click `index.html` → *Open with Live Server*.

## 2. Edit your details

**Open `script.js` and change the `CONFIG` object at the top.** That one place controls:

| What | Where in CONFIG |
|---|---|
| Name, job title, short bio line, location | `name`, `role`, `tagline`, `location` |
| Email (the contact form sends to this) | `email` |
| Social links | `links` (add/remove lines) |
| Skills | `skills` (set `learning: true` on skills you're still learning, like JavaScript) |
| Projects | `projects` (title, category, description, image, link) |

To add a project, copy one `{ ... },` block inside `projects`, paste it below, and change the text.
`category` must be `"design"` or `"code"` (that powers the filter buttons).

**Things you edit in `index.html` instead:**
- Tab title and Google description (top of the file, `<title>` and `<meta name="description">`)
- The "About me" paragraphs and the "Focus / Status" lines
- The logo letters `YN` in the header (search for `class="logo"`)
- The CV file name in `Download CV` (`assets/docs/Your-Name-CV.pdf`)

**Colours and fonts:** `style.css`, the `:root { ... }` block at the top. Change `--accent` and `--accent-2` to re-colour the whole site.

## 3. Upload your documents and images

1. **CV:** export as PDF, name it `Your-Name-CV.pdf` (or any name), and put it in `assets/docs/`.
   If you rename it, update the `href` on the **Download CV** button in `index.html`.
2. **Profile photo:** save as `assets/images/profile.jpg` (portrait, about 800×1000 px).
3. **Project images:** export from Photoshop/Illustrator/Figma as `.jpg` or `.webp`,
   about 1200×750 px, under 300 KB each (use squoosh.app to compress).
   Save in `assets/images/` and make sure the `image:` path in `CONFIG.projects` matches the file name exactly (case-sensitive: `Project-1.jpg` is not `project-1.jpg`).
4. If an image is missing, the site shows a colour gradient instead, so nothing breaks.

## 4. Checklist before deployment

- [ ] Replaced "Your Name", email, links, location
- [ ] Added real projects and removed sample ones
- [ ] Profile photo, project images, and CV are in `assets/`
- [ ] Download CV button opens your real PDF
- [ ] Tested light and dark theme (🌓 button)
- [ ] Tested on your phone, or in browser DevTools (F12 → device icon)
- [ ] Clicked every link
- [ ] No leftover `your-handle` or `you@example.com`

## 5. Deploy for free (pick one)

**Netlify Drop (easiest, no account setup needed to try)**
Go to app.netlify.com/drop and drag the whole `portfolio` folder in. You get a live link in seconds.

**GitHub Pages**
1. Create a GitHub repo, upload all files (`index.html` must be at the top level).
2. Repo → Settings → Pages → Source: *Deploy from a branch* → `main` / root → Save.
3. Your site appears at `https://your-username.github.io/repo-name/`.

**Vercel / Cloudflare Pages** also work: connect the GitHub repo and deploy with no build command.

You can attach a custom domain (e.g. `yourname.com`) later from the host's dashboard.

## 6. Optional: contact form that sends email by itself

The current form opens the visitor's email app, which works without a back-end. To receive messages directly:
1. Sign up free at formspree.io and create a form to get an endpoint URL.
2. In `index.html`, change the form tag to
   `<form id="contactForm" action="https://formspree.io/f/YOUR_ID" method="POST">`
3. In `script.js`, section 6, replace the code inside the submit handler with a `fetch()` call to that URL.
   This is a good JavaScript practice exercise. Look up "Formspree fetch AJAX".

## 7. Practice ideas (since you're learning JavaScript)

- Add a "Testimonials" section generated from an array, like the projects.
- Add a lightbox: click a project image to see it full size.
- Add a typing animation to the hero role text.
- Later, make a small Node.js/Express back-end to store form messages and show your back-end skills.
