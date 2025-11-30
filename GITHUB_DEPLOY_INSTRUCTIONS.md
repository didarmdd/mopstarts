# GitHub Deployment Instructions for MopStars Website

Your Git repository has been initialized and your first commit is ready! Follow these steps to deploy to GitHub Pages:

## Step 1: Create a GitHub Repository

1. Go to https://github.com/new
2. Fill in the repository details:
   - **Repository name**: `mopstars-website` (or your preferred name)
   - **Description**: "Professional cleaning services website for MopStars Auckland"
   - **Visibility**: Public (required for free GitHub Pages)
   - **DO NOT** initialize with README, .gitignore, or license (we already have files)
3. Click "Create repository"

## Step 2: Connect Your Local Repository to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
cd /Users/didar/.gemini/antigravity/scratch/mopstarts-website

# Add the remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/mopstars-website.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click "Save"

## Step 4: Wait for Deployment

GitHub will build and deploy your site. This usually takes 1-2 minutes.

Your site will be available at:
```
https://YOUR_USERNAME.github.io/mopstarts-website/
```

## Troubleshooting

- If images don't load, check that all image paths are relative (e.g., `assets/image.png` not `/assets/image.png`)
- If the site doesn't appear, wait a few minutes and refresh
- Check the "Actions" tab in your repository to see the deployment status

## Future Updates

When you make changes to your website:

```bash
git add .
git commit -m "Description of your changes"
git push
```

GitHub Pages will automatically redeploy your site within a few minutes.
