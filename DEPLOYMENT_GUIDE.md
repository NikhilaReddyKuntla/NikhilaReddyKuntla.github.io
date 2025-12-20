# GitHub Pages Deployment Guide

This guide will walk you through deploying your personal website to GitHub Pages step by step.

## Prerequisites

- A GitHub account (create one at [github.com](https://github.com) if you don't have one)
- Git installed on your computer ([Download Git](https://git-scm.com/downloads))
- Your website files ready (index.html, styles.css, script.js)

## Step-by-Step Deployment

### Step 1: Create a GitHub Repository

1. Log in to your GitHub account
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the repository details:
   - **Repository name**: Use `yourusername.github.io` (replace `yourusername` with your actual GitHub username)
     - Example: If your username is `johndoe`, name it `johndoe.github.io`
     - This naming convention gives you a free custom domain at `https://yourusername.github.io`
   - **Description**: "My personal website" (optional)
   - **Visibility**: Select **Public** (required for free GitHub Pages)
   - **DO NOT** check "Initialize this repository with a README"
5. Click **"Create repository"**

### Step 2: Initialize Git in Your Project Folder

Open your terminal/command prompt in your project folder and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Personal website"
```

### Step 3: Connect to GitHub and Push

```bash
# Add GitHub repository as remote (replace with your repository URL)
git remote add origin https://github.com/yourusername/yourusername.github.io.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Note**: You'll be prompted for your GitHub username and password. For password, use a Personal Access Token (see Step 4 if you need to create one).

### Step 4: Create Personal Access Token (if needed)

If Git asks for a password and your regular password doesn't work:

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click **"Generate new token"**
3. Give it a name (e.g., "Website Deployment")
4. Select scopes: Check **"repo"** (this includes all repo permissions)
5. Click **"Generate token"**
6. **Copy the token immediately** (you won't see it again!)
7. Use this token as your password when Git prompts you

### Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **"Settings"** (top menu)
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select:
   - Branch: **main**
   - Folder: **/ (root)**
5. Click **"Save"**

### Step 6: Access Your Website

1. Wait 2-5 minutes for GitHub to build and deploy your site
2. Your website will be available at:
   - `https://yourusername.github.io`
   - You can also find the URL in the Pages settings page

### Step 7: Update Your Website

Whenever you make changes:

```bash
# Add changed files
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push
```

Your changes will be live in 1-2 minutes!

## Alternative: Using GitHub Desktop

If you prefer a graphical interface:

1. Download [GitHub Desktop](https://desktop.github.com/)
2. Sign in with your GitHub account
3. Click **"File" → "Add Local Repository"**
4. Select your project folder
5. Click **"Publish repository"** in GitHub Desktop
6. Follow the prompts to create the repository on GitHub
7. Enable GitHub Pages as described in Step 5 above

## Troubleshooting

### Website shows 404 error
- **Wait a few minutes**: It can take 5-10 minutes for the site to go live
- **Check repository name**: Must be exactly `yourusername.github.io` for the main domain
- **Verify Pages is enabled**: Go to Settings → Pages and confirm it's active
- **Check branch name**: Should be `main` or `master`

### Changes not appearing
- **Wait 1-2 minutes**: GitHub needs time to rebuild
- **Hard refresh**: Press `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac) to clear cache
- **Check repository**: Verify your changes were pushed successfully

### Git authentication errors
- Use a Personal Access Token instead of your password
- Make sure you have the correct repository URL
- Check that your repository is set to Public

## Adding to Your Resume

Once your website is live, you can add it to your resume:

**Format examples:**
- **Personal Website**: [yourusername.github.io](https://yourusername.github.io)
- **Portfolio**: [yourusername.github.io](https://yourusername.github.io) | Showcases my projects and technical skills

**Where to include it:**
- Header section (with email, phone, LinkedIn)
- Contact information section
- Projects section (as a link to view all projects)
- Skills/Experience section (as proof of web development skills)

## Next Steps

1. ✅ Customize all placeholder content
2. ✅ Add your actual projects and work
3. ✅ Update contact information
4. ✅ Add your photo
5. ✅ Test on mobile devices
6. ✅ Share your website URL!

## Need Help?

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Git Documentation](https://git-scm.com/doc)
- Check your repository's "Actions" tab for any build errors

---

**Congratulations!** Your personal website is now live on the internet! 🎉

