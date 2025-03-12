# Implementation Guide: Single-Page Portfolio with Next.js and Prismic

This guide explains how to implement your single-page portfolio with expandable projects, Gothic minimalist design using Pirata One font, a contact button for email, and a resume download button.

## Why This Approach

### 1. Single-Page Design
This approach keeps all content on a single page, which:
- Creates a smoother user experience (no page transitions)
- Makes it easier for visitors to browse all your work
- Mimics your existing portfolio at bobbyquilacio.com
- Allows for elegant scrolling animations

### 2. Expandable Projects
Projects are expandable/collapsible because:
- It reduces initial visual clutter
- Lets visitors quickly scan your work
- Provides more detailed information for projects they're interested in
- Creates an interactive experience

### 3. Minimal Gothic Design with Pirata One
- Pirata One is used *only* for main headings (H1 and H2), creating a distinctive gothic accent
- The rest of the text uses Inter (a clean, modern sans-serif) for maximum readability
- This creates a nice contrast between gothic accents and clean body text
- The dark theme enhances the gothic aesthetic

### 4. Contact and Resume Buttons
- Direct email link is more efficient than a contact form
- Resume download provides immediate access to your credentials
- Both are prominently placed for easy access

## Setup Process

### 1. Project Setup

```bash
# Create new Next.js project
npx create-next-app@latest portfolio-website
cd portfolio-website

# Install dependencies
npm install @prismicio/client @prismicio/next @prismicio/react next-themes
npm install -D tailwindcss postcss autoprefixer @tailwindcss/typography @tailwindcss/aspect-ratio
npx tailwindcss init -p
```

### 2. Configure Tailwind CSS

Replace the content of `tailwind.config.js` with the code from the `tailwind-config` artifact. This sets up:
- Custom font families for Pirata One and Inter
- Custom color palette with dark theme colors
- Typography plugin configuration for dark mode

### 3. Configure Fonts and Layout

Edit `app/layout.js` to:
- Import the Pirata One and Inter fonts
- Set up the basic page structure with header and footer
- Add navigation that links to sections within the single page

### 4. Create Global CSS

Replace `app/globals.css` with the code from the `global-css` artifact, which includes:
- Base styling for the dark theme
- Section styling for consistent spacing
- Animations for interactive elements
- Custom styling for buttons, skill bars, and timeline
- Scroll animations

### 5. Set Up Prismic CMS

1. Create a Prismic account and repository
2. Create the following Custom Types in Prismic:

   - **Settings** (Single Type):
     - Site Title - Text field
     - Site Description - Text field
     - Email - Text field
     - Resume Link - Link field
     - Social Links - Group field

   - **Homepage** (Single Type):
     - Title - Title field
     - Subtitle - Text field
     - Description - Rich Text field
     - Profile Image - Image field

   - **Project** (Custom Type):
     - Title - Title field
     - Order - Number field
     - Short Description - Text field
     - Full Description - Rich Text field
     - Images - Group field with Image fields
     - Technologies - Group field with Text fields
     - Links - Group field with Link fields

   - **Experience** (Custom Type):
     - Position - Text field
     - Company - Text field
     - Date Range - Text field
     - Description - Text field
     - Order - Number field

   - **Skill** (Custom Type):
     - Name - Text field
     - Category - Select field (Development/Design & Tools)
     - Level - Select field (Beginner/Intermediate/Advanced)
     - Percentage - Number field
     - Order - Number field

3. Set up the Prismic client using the code from the `prismic-setup` artifact

### 6. Create Main Page Component

Use the code from the `single-page-portfolio` artifact to create your main page. This includes:
- Hero section with your name and tagline
- Work section with expandable projects
- About section with bio and experience
- Skills section with progress bars
- Contact section with email and resume links

### 7. Animation Effects

The portfolio includes several animation effects:
- Fade-in animations as sections scroll into view
- Expanding/collapsing project details
- Animated skill bars
- Hover effects on buttons and project items

### 8. Add Your Content

1. Upload your resume PDF to the `/public` directory
2. Add your real projects, experiences, and skills to Prismic
3. Update the contact email to josh.quilacio@gmail.com
4. Add your social media links

## Deployment

1. Push your code to GitHub
2. Deploy to Vercel or Netlify for optimal Next.js performance
3. Connect your custom domain if you have one

## Key Implementation Details

### Project Expansion Logic

```javascript
const [expandedProject, setExpandedProject] = useState(null);

const handleProjectClick = (id) => {
  if (expandedProject === id) {
    setExpandedProject(null);
  } else {
    setExpandedProject(id);
  }
};
```

This React state tracks which project is currently expanded, allowing only one project to be expanded at a time.

### Email Contact Button

```javascript
const handleContactClick = () => {
  window.location.href = "mailto:josh.quilacio@gmail.com";
};

// In JSX
<button onClick={handleContactClick} className="gothic-button">
  Contact me
</button>
```

This approach uses the `mailto:` protocol to open the user's default email client.

### Scroll Animations

```javascript
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
        }
      });
    },
    { threshold: 0.1 }
  );
  
  const animatedElements = document.querySelectorAll('.reveal');
  animatedElements.forEach((el) => observer.observe(el));
  
  return () => {
    animatedElements.forEach((el) => observer.unobserve(el));
  };
}, []);
```

This uses the Intersection Observer API to detect when elements are scrolled into view, then applies animation classes.

## Why This Approach Works Best

1. **Performance**: Single-page design with optimized animations
2. **UX**: Clean, minimalist design with intuitive navigation
3. **Maintainability**: Structured content in Prismic CMS for easy updates
4. **Accessibility**: Clean typography with good contrast
5. **Mobile Responsiveness**: Fully responsive design that works on all devices
6. **Gothic Aesthetic**: Strategically used Pirata One font that adds character without overwhelming