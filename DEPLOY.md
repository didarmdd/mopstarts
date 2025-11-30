# How to Deploy to GitHub Pages

Since you wanted to use GitHub (which is free!), here is how to get your site live.

## Prerequisites
- A GitHub account.
- Git installed on your computer (or use the GitHub Desktop app).

## Steps

1.  **Create a Repository**
    - Go to [github.com/new](https://github.com/new).
    - Name your repository (e.g., `mopstarts-website`).
    - Make it **Public**.
    - Click **Create repository**.

2.  **Push Your Code**
    - Open your terminal in the project folder:
      ```bash
      cd /Users/didar/.gemini/antigravity/scratch/mopstarts-website
      ```
    - Initialize git and push:
      ```bash
      git init
      git add .
      git commit -m "Initial commit"
      git branch -M main
      git remote add origin https://github.com/YOUR_USERNAME/mopstarts-website.git
      git push -u origin main
      ```
      *(Replace `YOUR_USERNAME` with your actual GitHub username)*

3.  **Enable GitHub Pages**
    - Go to your repository settings on GitHub.
    - Click on **Pages** in the left sidebar.
    - Under **Source**, select `Deploy from a branch`.
    - Under **Branch**, select `main` and `/ (root)`.
    - Click **Save**.

4.  **Done!**
    - After a minute or two, your site will be live at `https://YOUR_USERNAME.github.io/mopstarts-website/`.

## Making the Contact Form Work
Since GitHub Pages is static, the contact form won't send emails by default.
1.  Go to [Formspree](https://formspree.io/).
2.  Create a free account and a new form.
3.  Copy the "Endpoint" URL they give you.
4.  Open `contact.html` and replace `https://formspree.io/f/your-form-id` with your new URL.
