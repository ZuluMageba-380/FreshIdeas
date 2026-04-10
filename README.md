# Fresh Ideas - Premium Digital Agency Website

A modern, premium multi-page business website built for Fresh Ideas, a digital agency specializing in Branding, Marketing, and IT Solutions.

## Features

### Design
- **Dark Theme**: Premium dark color scheme with #73BD6A green accent
- **Custom Fonts**: Russo One for headings, Poppins for body text
- **Glassmorphism Effects**: Modern glass-like UI elements with backdrop blur
- **Smooth Animations**: Page transitions, hover effects, and scroll animations using Motion (Framer Motion)
- **Responsive Design**: Fully responsive layout optimized for mobile and desktop

### Pages
1. **Home** - Hero section with CTA, services preview, and why choose us section
2. **About** - Company description, mission & vision, values, and statistics
3. **Services** - Detailed service cards for Branding, Marketing, and IT Solutions
4. **Contact** - Contact form with EmailJS integration ready, contact information
5. **404** - Custom not found page

### Components
- **Navbar**: Sticky navigation with scroll effects and mobile menu
- **Footer**: Company info, quick links, social media, and contact details
- **Loader**: Animated loading screen on initial page load
- **ScrollToTop**: Floating button to scroll back to top
- **PageTransition**: Smooth transitions between pages

### Technical Features
- **React Router**: Multi-page navigation with Data mode
- **Motion/React**: Smooth animations and transitions
- **Tailwind CSS v4**: Modern utility-first styling
- **TypeScript**: Type-safe code
- **Lucide Icons**: Beautiful, consistent icons throughout

## Getting Started

This project is ready to run. All dependencies are already installed.

## Customization

### Colors
The primary green color (#73BD6A) is defined in `/src/styles/theme.css`. To change it:
- Update the `--primary` variable in the `:root` selector
- Update related color variations as needed

### Fonts
Fonts are imported in `/src/styles/fonts.css`:
- Heading font: Russo One
- Body font: Poppins

To change fonts, update the Google Fonts import URL and the CSS variables in `theme.css`.

### EmailJS Integration

The contact form is ready for EmailJS integration. To enable it:

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service and template
3. Update the `handleSubmit` function in `/src/app/pages/Contact.tsx`:

```javascript
import emailjs from '@emailjs/browser';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus("sending");

  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      formData,
      'YOUR_PUBLIC_KEY'
    );
    setStatus("success");
    setFormData({ name: "", email: "", message: "" });
  } catch (error) {
    setStatus("error");
  }
};
```

## Project Structure

```
/src
  /app
    /components
      - Navbar.tsx
      - Footer.tsx
      - Loader.tsx
      - ScrollToTop.tsx
      - PageTransition.tsx
      - Root.tsx
    /pages
      - Home.tsx
      - About.tsx
      - Services.tsx
      - Contact.tsx
      - NotFound.tsx
    - App.tsx
    - routes.tsx
  /styles
    - fonts.css
    - theme.css
    - custom.css
    - index.css
```

## Key Features Implemented

✅ Multi-page navigation with React Router
✅ Premium dark theme with green accent (#73BD6A)
✅ Glassmorphism effects and soft shadows
✅ Smooth page transitions and animations
✅ Responsive mobile and desktop layouts
✅ Sticky navbar with hover effects
✅ Loading animation on page load
✅ Scroll-to-top button
✅ Contact form ready for EmailJS
✅ Custom 404 page
✅ Social media integration
✅ Professional typography with custom fonts
✅ Hover animations on buttons and cards
✅ Gradient text effects
✅ Custom scrollbar styling
✅ Focus states for accessibility

## Performance Optimizations

- Lazy-loaded images from Unsplash
- Optimized animations with GPU acceleration
- Smooth scroll behavior
- Efficient re-renders with React best practices

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This is a custom-built website for Fresh Ideas digital agency.

---

**Built with ❤️ using React, Tailwind CSS, and Motion**
