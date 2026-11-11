# Govt. PG College, Seoni: Website

A fast, mobile-friendly college website. Plain HTML, CSS and a little JavaScript. No frameworks, no build step needed to run it, no server, no database. About 16 KB per page.

**Pages:** Home (with Director's message) · About · Courses · Departments (Arts, Commerce, Science) · Professors (with notes) · Admission (form → WhatsApp) · Exam (dates + admit card link) · Result (link) · Photo Gallery · Contact Us

> All names, dates, numbers and messages are **sample content**. Replace them with the real details before you share the site (see "Replace the sample content" below).

---

## 1. Put it online (free link, no domain needed)

Your site will be at: `https://YOUR-GITHUB-USERNAME.github.io/REPOSITORY-NAME/`

1. Sign in at <https://github.com> (create a free account if needed).
2. Click **+** (top right) → **New repository**. Name it, for example, `govt-pg-college-seoni`. Choose **Public**. Click **Create repository**.
3. On the next page click **uploading an existing file**.
4. Unzip this project. Open the folder and **select everything inside it** (`index.html`, `assets`, all the `.html` files, etc.), then drag it into the GitHub page.
   `index.html` must end up at the top level of the repository, not inside another folder.
5. Wait for the upload to finish, then click **Commit changes**.
6. Go to **Settings → Pages**. Under *Build and deployment* set **Source: Deploy from a branch**, **Branch: main**, folder **/ (root)**, then **Save**.
7. Wait 1–2 minutes and refresh the Pages screen. The live link appears at the top. Open it.

To update the site later: open the file on GitHub → pencil icon → edit → **Commit changes**. The live site updates in about a minute.

<details><summary>Using the command line instead</summary>

```bash
cd govt-pg-college-seoni
git init -b main
git add .
git commit -m "College website"
git remote add origin https://github.com/YOUR-USERNAME/REPOSITORY-NAME.git
git push -u origin main
```
Then do step 6 above.
</details>

---

## 2. Make the forms and links work: edit `assets/js/config.js`

```js
whatsappNumber: "919876543210",   // country code + number, digits only
admitCardUrl:   "https://...",    // official admit-card page
resultUrl:      "https://...",    // official result page
showDemoNotice: false             // hides the "sample content" tag
```

- **WhatsApp number:** until you set it, the admission and contact forms run in *test mode*: they show the message on screen and send nothing anywhere.
- When a student submits the form, **WhatsApp opens with all the details pre-filled** and the student must press **Send**. The website itself never stores or receives any data.
- **Admit card / Result links:** while empty, the buttons show "Link will be updated soon".

## 3. Replace the sample content

| What | Where |
|---|---|
| Phone, email, address, office hours | `_build/data.js` → `college` (also in the footer of every page) |
| Director's name and message | `_build/data.js` → `director` |
| Professors and their notes | `_build/data.js` → `professors` |
| Course list, department details, jobs | `_build/data.js` → `courses`, `departments` |
| Exam dates, notices, FAQs | `_build/data.js` → `examDates`, `notices`, `faqs` |
| Photos | put files in `assets/img/gallery/`, then update the list in `_build/data.js` → `gallery` |

After editing `_build/data.js`, regenerate the pages (needs [Node.js](https://nodejs.org)):

```bash
node _build/build.js     # rebuilds all .html pages
node _build/check.js     # checks links, images and structure
```

No Node.js? You can edit the `.html` files directly in any text editor. Each page is plain HTML.

**Photos:** use JPG or WebP, around 1200 px wide and under 300 KB each, so the site stays fast. Change `.svg` to your file extension in `_build/data.js` (in the gallery list, and the `data-full` / `src` paths if you edit HTML directly).

## 4. Project layout

```
index.html, about.html, courses.html, ...   the pages
assets/css/style.css                        all styling
assets/js/config.js                         ← your settings
assets/js/main.js, forms.js, gallery.js     small scripts
assets/img/                                 hero + gallery pictures, favicon
_build/                                     page generator + content (optional)
```

## 5. Notes

- Works offline-friendly and on all screen sizes (phones, tablets, desktops). Menus, forms and gallery are keyboard accessible.
- Fonts (Playfair Display, DM Sans) load from Google Fonts. If they are blocked, the site falls back to Georgia / system fonts automatically.
- The map on the Contact page uses a Google Maps embed. Change `mapQuery` in `_build/data.js` for an exact pin.
- The pictures are original placeholder illustrations. Use your own campus photos for the final site.
