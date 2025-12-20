# Commands to Push to GitHub

## After creating your GitHub repository, run these commands:

### 1. Add GitHub repository as remote
```bash
git remote add origin https://github.com/yourusername/yourusername.github.io.git
```

**Replace `yourusername` with your actual GitHub username!**

### 2. Push to GitHub
```bash
git push -u origin main
```

## Authentication

When you run `git push`, you'll be prompted for:
- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (not your GitHub password)

### How to create a Personal Access Token:

1. Go to GitHub → Click your profile picture → **Settings**
2. Scroll down → Click **Developer settings** (left sidebar)
3. Click **Personal access tokens** → **Tokens (classic)**
4. Click **Generate new token** → **Generate new token (classic)**
5. Give it a name: "Website Deployment"
6. Select expiration (30 days, 60 days, or no expiration)
7. Check the **repo** scope (this includes all repository permissions)
8. Click **Generate token**
9. **Copy the token immediately** (you won't see it again!)
10. Use this token as your password when Git prompts you

## Alternative: Using SSH (if you have SSH keys set up)

If you prefer SSH authentication:

```bash
git remote add origin git@github.com:yourusername/yourusername.github.io.git
git push -u origin main
```

## After Pushing

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select:
   - Branch: **main**
   - Folder: **/ (root)**
4. Click **Save**
5. Wait 2-5 minutes
6. Your website will be live at: `https://yourusername.github.io`

