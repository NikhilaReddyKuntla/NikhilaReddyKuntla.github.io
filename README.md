# Personal Website

A modern, responsive personal website showcasing my work, skills, and experience. This website is hosted on GitHub Pages and can be easily customized to reflect your personal brand.

## 🚀 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Easy to Customize**: Simple HTML, CSS, and JavaScript structure
- **Fast Loading**: Lightweight and optimized for performance
- **SEO Friendly**: Proper meta tags and semantic HTML

## 📋 Sections

1. **Hero Section**: Eye-catching introduction with call-to-action buttons
2. **About**: Personal background and professional summary
3. **Work/Projects**: Showcase of your projects and experiences
4. **Skills**: Technical skills and competencies
5. **Contact**: Ways to get in touch

## 🛠️ Requirements

To work with this website locally, you only need:

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A text editor (VS Code, Sublime Text, etc.)
- Git (for version control)
- A GitHub account (for hosting)

**No build tools or frameworks required!** This is a pure HTML/CSS/JavaScript website.

## 📝 Setup Instructions

### 1. Customize the Content

1. **Update `index.html`**:
   - Replace "Your Name" with your actual name
   - Update the hero section with your professional title and tagline
   - Fill in the About section with your background
   - Add your actual projects in the Work section
   - Update skills in the Skills section
   - Add your contact information (email, LinkedIn, GitHub)

2. **Customize `styles.css`** (optional):
   - Change color scheme by modifying CSS variables in `:root`
   - Adjust fonts, spacing, or styling to match your preferences

3. **Add Your Photo**:
   - Replace the placeholder in the About section with your actual photo
   - Recommended size: 300x300px, square format

### 2. Test Locally

1. Open `index.html` in your web browser
2. Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   ```
3. Navigate to `http://localhost:8000` in your browser

### 3. Deploy to GitHub Pages

#### Option A: Using GitHub Repository

1. **Create a new repository** on GitHub:
   - Go to [GitHub](https://github.com)
   - Click "New repository"
   - Name it `yourusername.github.io` (replace with your GitHub username)
   - Make it public
   - Don't initialize with README

2. **Push your code**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Personal website"
   git branch -M main
   git remote add origin https://github.com/yourusername/yourusername.github.io.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click "Settings" → "Pages"
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"
   - Your site will be live at `https://yourusername.github.io` in a few minutes

#### Option B: Using a Different Repository Name

If you want a different repository name (e.g., `personal-website`):

1. Create the repository with your desired name
2. Push your code as above
3. In Settings → Pages, select the main branch
4. Your site will be at `https://yourusername.github.io/repository-name`

### 4. Custom Domain (Optional)

If you have a custom domain:

1. Add a `CNAME` file in your repository root with your domain name
2. Configure DNS settings with your domain provider:
   - Add a CNAME record pointing to `yourusername.github.io`
3. In GitHub Pages settings, add your custom domain

## 🎨 Customization Tips

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2563eb;    /* Main brand color */
    --secondary-color: #1e40af;  /* Darker shade */
    --accent-color: #3b82f6;     /* Accent color */
}
```

### Adding More Projects

Copy a project card in `index.html` and modify:
- Project title
- Description
- Technologies (tags)
- Links to GitHub and live demo

### Adding More Skills

Add skill items in the Skills section:
```html
<span class="skill-item">Your Skill</span>
```

## 📱 Mobile Responsiveness

The website is fully responsive and includes:
- Mobile-friendly navigation menu
- Responsive grid layouts
- Touch-friendly buttons and links
- Optimized typography for all screen sizes

## 🔧 Troubleshooting

**Website not loading on GitHub Pages?**
- Check that your repository is public
- Verify GitHub Pages is enabled in Settings
- Wait 5-10 minutes after enabling (propagation time)
- Check the Actions tab for any build errors

**Styles not loading?**
- Ensure `styles.css` is in the same directory as `index.html`
- Check file paths are correct (case-sensitive on some systems)

**Images not showing?**
- Verify image file paths are correct
- Use relative paths (e.g., `images/photo.jpg`)
- Ensure images are committed to the repository

## 📄 License

This project is open source and available for personal use. Feel free to customize it for your own portfolio!

## 🤝 Contributing

Feel free to fork this project and customize it for your needs. If you make improvements that could benefit others, pull requests are welcome!

## 📧 Contact

For questions or suggestions, feel free to reach out!

---

**Note**: Remember to replace all placeholder content (Your Name, email addresses, links, etc.) with your actual information before deploying!

