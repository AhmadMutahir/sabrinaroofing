# GitHub + Vercel — 3 ways to get this live

Repo ki tayyari mukammal hai: `main` branch par **1 clean commit**, 46 files, 2 MB.
`node_modules` aur `.next` shamil nahi hain (`.gitignore` mein hain).

Main yahan se GitHub par push **nahi** kar sakta kyunke is sandbox mein koi GitHub
credentials nahi hain (na token, na `.netrc`) aur aapke account par GitHub
connector available nahi hai. Neeche 3 tareeqe hain — jo aap ko asaan lage.

---

## Option 1 — Web upload (koi token nahi chahiye, ~2 minute)

1. Workspace se **`sabrina-roofing-repo.zip`** download karein.
2. Zip ko apne computer par **unzip** karein → `sabrina-roofing/` folder banega.
3. GitHub par apni **nayi khali repo** kholein → **"uploading an existing file"** link.
4. `sabrina-roofing` folder ke **andar ka saara content** select karein
   (`app`, `components`, `lib`, `public`, `scripts`, `preview`, `package.json`,
   `README.md`, `AUDIT-REPORT.md`, `.gitignore`, etc.) aur drag & drop karein.
   > `.gitignore` file nazar nahi aa rahi hogi — usko dikhane ke liye
   > macOS: `Cmd + Shift + .` · Windows: View → "Hidden items".
   > Agar miss ho jaye to koi masla nahi, baad mein add ho sakti hai.
5. Commit message: `Sabrina Roofing site` → **Commit changes**.

Iske baad seedha **Vercel import** (neeche "Vercel" section).

---

## Option 2 — Mujhe token dein, main push kar deta hoon (fastest)

1. [github.com/settings/tokens](https://github.com/settings/tokens) → **Generate new token (fine-grained)**
2. Repository access: **All repositories** (ya sirf yeh repo)
3. Permissions: **Contents → Read and write** (+ agar repo list mein nahi aata to **Administration → Read and write**)
4. Token copy karke mujhe bhej dein aur repo ka naam bata dein.

Phir main:
```bash
git remote add origin https://x-access-token:<TOKEN>@github.com/<you>/<repo>.git
git push -u origin main
```
…aur confirm karne ke baad aap token **revoke** kar dein.

---

## Option 3 — Apne machine se push (agar aapko git aata hai)

Repo ka `.git` history is workspace mein maujood hai, lekin zip mein nahi jaata.
Agar aap yeh chahte hain to mujhe batayein — main `git bundle` bana kar de doonga.

Ya simple tareeqa — unzipped folder mein:

```bash
cd sabrina-roofing
git init -b main
git add -A
git commit -m "Sabrina Roofing & Exteriors — Dallas landing page"
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

---

## Vercel par deploy (GitHub ke baad)

1. [vercel.com/new](https://vercel.com/new) → **Import Git Repository** → apni repo select karein.
2. Framework: **Next.js** (khud detect ho jayega). Build command / output directory
   ko **default hi rehne dein** — `npm run build` fonts fetch step khud chala leta hai.
3. **Deploy** dabayein. ~1–2 minute mein `https://<project>.vercel.app` live.

Har `git push` par automatically naya deploy ho jayega.

### Optional: ek environment variable

| Name | Value | Kab |
|---|---|---|
| `NEXT_PUBLIC_REMOTE_ASSETS` | `1` | Sirf tab jab hero image/video aur gallery photos remote CDN se chahiye. Khaali chhorein to `public/` wali self-hosted files use hongi — bilkul wohi setup jo audit hua (92 / 100 / 100 / 100). |

> Note: Vercel project **`sabrina-roofing`** aapke account par pehle se ban gaya hai
> (`prj_RqlRRyTdEnTkYq5SuaJdoBsf5d7q`). Agar import karte waqt naam clash kare to
> Vercel usi project se link kar dega — koi masla nahi.

---

## Deploy ke baad yeh 2 cheezein zaroor badlein

1. `lib/content.ts` → `brand.url` ko apne live domain par set karein
   (canonical, OpenGraph aur sitemap isi se bante hain).
2. Demo data confirm karein: phone `(214) 555-0134`, email, Maple Avenue address,
   aur claims ("1,200+ roofs", "25-year warranty", "GAF Certified", "BBB A+").
