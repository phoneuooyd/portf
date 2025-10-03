# Portfolio Website

A modern, responsive portfolio website built with React, Tailwind CSS, and Vite.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean and professional design using Tailwind CSS
- **Fast Performance**: Built with Vite for lightning-fast development and optimized builds
- **GitHub Pages Ready**: Configured for easy deployment to GitHub Pages

## Sections

- **About**: Introduction and professional summary
- **Projects**: Showcase of your work with descriptions and links
- **Skills**: Display of technical skills organized by category
- **Contact**: Contact form for visitors to reach out

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/phoneuooyd/portf.git
cd portf
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

To preview the production build locally:

```bash
npm run preview
```

## Deploying to GitHub Pages

### Option 1: Using GitHub Actions (Recommended)

1. Create a file `.github/workflows/deploy.yml` with the deployment workflow
2. Push your changes to the main branch
3. GitHub Actions will automatically build and deploy your site

### Option 2: Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to GitHub Pages using your preferred method

## Customization

### Update Personal Information

Edit the following files to personalize your portfolio:

- `src/components/About.jsx` - Update your name, title, and bio
- `src/components/Projects.jsx` - Add your projects with descriptions and links
- `src/components/Skills.jsx` - Update your skills and technologies
- `src/components/Contact.jsx` - Customize the contact form behavior
- `index.html` - Update the page title and meta tags

### Styling

The project uses Tailwind CSS for styling. You can customize the design by:

- Modifying the Tailwind configuration in `tailwind.config.js`
- Editing component styles in the respective component files
- Adding custom CSS in `src/index.css`

## Technologies Used

- **React** - Frontend library
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and development server
- **HTML5** - Markup
- **JavaScript (ES6+)** - Programming language

## License

This project is open source and available under the MIT License.