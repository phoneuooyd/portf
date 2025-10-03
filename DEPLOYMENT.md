# Deployment Guide for GitHub Pages

This guide will help you deploy your portfolio website to GitHub Pages.

## Prerequisites

Before deploying, make sure you have:
- Pushed all your changes to the `main` branch
- GitHub Pages enabled in your repository settings

## Setup GitHub Pages

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/phoneuooyd/portf`
2. Click on **Settings** (top right)
3. Scroll down to the **Pages** section in the left sidebar
4. Under **Source**, select `GitHub Actions`

### Step 2: Deploy

The deployment is automated with GitHub Actions. Simply:

1. Push your changes to the `main` branch:
   ```bash
   git push origin main
   ```

2. GitHub Actions will automatically:
   - Install dependencies
   - Build the project
   - Deploy to GitHub Pages

3. Check the **Actions** tab in your repository to monitor the deployment progress

### Step 3: Access Your Site

Once deployed, your site will be available at:
```
https://phoneuooyd.github.io/portf/
```

## Manual Deployment (Alternative)

If you prefer to deploy manually without GitHub Actions:

1. Build your project:
   ```bash
   npm run build
   ```

2. Install `gh-pages` package:
   ```bash
   npm install -D gh-pages
   ```

3. Add deploy script to `package.json`:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

## Troubleshooting

### Site Shows 404 Error

- Verify the `base` path in `vite.config.js` matches your repository name
- Current setting: `base: '/portf/'`
- If your repository name changes, update this value

### CSS Not Loading

- Check browser console for errors
- Ensure the `base` path is correct in `vite.config.js`

### Build Fails

- Run `npm install` to ensure all dependencies are installed
- Check the Actions tab for detailed error logs
- Verify Node.js version (v20 is recommended)

## Customization

To customize your portfolio:

1. Edit content in component files:
   - `src/components/About.jsx` - Personal info
   - `src/components/Projects.jsx` - Your projects
   - `src/components/Skills.jsx` - Your skills
   - `src/components/Contact.jsx` - Contact form

2. Update styling in `src/index.css` or component files

3. Modify `index.html` for title and meta tags

4. Rebuild and redeploy:
   ```bash
   npm run build
   git add .
   git commit -m "Update portfolio content"
   git push origin main
   ```

## CI/CD Pipeline

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:
- Triggers on every push to `main`
- Installs dependencies with npm
- Builds the production bundle
- Deploys to GitHub Pages automatically

You can view deployment history in the **Actions** tab of your repository.
