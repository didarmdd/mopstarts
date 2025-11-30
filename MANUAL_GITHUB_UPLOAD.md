# Manual GitHub Upload Instructions for MopStars Website

Follow these steps to manually upload your website to GitHub and deploy it with GitHub Pages.

## Step 1: Create a New GitHub Repository

1. Go to https://github.com/new
2. Fill in the repository details:
   - **Repository name**: `mopstars-website` (or your preferred name)
   - **Description**: "Professional cleaning services website for MopStars Auckland"
   - **Visibility**: **Public** (required for free GitHub Pages)
   - **DO NOT** check "Add a README file"
   - **DO NOT** add .gitignore or license
3. Click **"Create repository"**

## Step 2: Upload Files Manually

1. On your new repository page, click **"uploading an existing file"** link (or click "Add file" → "Upload files")
2. Open Finder and navigate to: `/Users/didar/.gemini/antigravity/scratch/mopstarts-website`
3. Select **ALL** files and folders:
   - `index.html`
   - `about.html`
   - `contact.html`
   - `services.html`
   - `css` folder
   - `js` folder
   - `assets` folder
   - `DEPLOY.md`
4. Drag and drop them into the GitHub upload area
5. In the commit message box at the bottom, type: "Initial commit: MopStars website"
6. Click **"Commit changes"**

## Step 3: Enable GitHub Pages

1. In your repository, click the **"Settings"** tab (top right)
2. In the left sidebar, scroll down and click **"Pages"**
3. Under **"Source"**, select:
   - Branch: **`main`**
   - Folder: **`/ (root)`**
4. Click **"Save"**
5. Wait 1-2 minutes for GitHub to build your site

## Step 4: Access Your Live Website

After a few minutes, your site will be live at:
```
https://YOUR_USERNAME.github.io/mopstarts-website/
```

GitHub will show you the exact URL on the Pages settings page.

## Updating Your Website Later

When you want to make changes:

1. Edit files locally on your computer
2. Go to your GitHub repository
3. Click on the file you want to update
4. Click the pencil icon (✏️) to edit
5. Make your changes
6. Click "Commit changes" at the bottom
7. Your site will automatically update in 1-2 minutes

**OR** upload new files:
1. Click "Add file" → "Upload files"
2. Drag and drop your updated files
3. Commit the changes

## Files to Upload

Make sure you upload these files from:
`/Users/didar/.gemini/antigravity/scratch/mopstarts-website/`

```
mopstarts-website/
├── index.html
├── about.html
├── contact.html
├── services.html
├── DEPLOY.md
├── css/
│   └── style.css
├── js/
│   └── main.js
└── assets/
    ├── contact-hero.jpg
    ├── hero-bg.jpg
    ├── icon-supplies.png
    ├── icon-vacuum.png
    ├── kiwi-badge.png
    ├── mascot.png
    └── team-photo.png
```

## Troubleshooting

- **Images not showing?** Make sure you uploaded the entire `assets` folder
- **Site not appearing?** Wait 2-3 minutes and refresh. Check the "Actions" tab to see deployment status
- **CSS not working?** Make sure you uploaded the `css` folder with `style.css` inside

That's it! Your website will be live on GitHub Pages. 🎉
