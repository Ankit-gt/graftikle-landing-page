# Graftikle Landing Page

A modern, responsive landing page for Graftikle Hair Transplant services. The site includes a consultation form (section and popup modal), dynamic results slideshow, and smooth interactions.

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean design with smooth animations
- **Consultation Form (Section + Modal)**: Same fields available both inline and as a popup on load
- **Hair Loss Stage Selection**: Visual stage cards with selected state indicator
- **EmailJS Integration**: Client-side email sending (no backend needed)
- **Form Validation & Feedback**: Required fields + loading/success/error states
- **Results Slideshow**: Uses optimized `patient_results1.webp` … `patient_results4.webp`
- **Mobile Menu UX**: Auto-closes after selecting a menu item
- **Start at Home**: Always returns to the first section on reload

## Consultation Form Fields

The consultation form collects the following information:

### Required Fields:
- **Full Name**: Client's full name
- **Age**: Client's age (18-100 years)
- **Location**: Client's city or region
- **Mobile Number**: Client's contact number
- **Email ID**: Client's email for communication
- **Hair Loss Level**: Visual selection of baldness stage (Stage 1-4)

### Optional Fields:
- **Additional Information**: Any other details the client wishes to share

## Setup Instructions

This is a static site. You can open `index.html` directly or serve locally.

### Option A: Open directly
- Open `index.html` in a modern browser.

### Option B: Serve locally (recommended for routing/assets)
```bash
npx serve .
```

### Configure Email (EmailJS)
The modal and section forms are wired to EmailJS. Update the IDs/keys in `index.html` and `script.js` if you need to use your own account:
- EmailJS init key in `index.html`
- Service/template/public keys in `script.js`

### 3. Update Owner Email

In the `server.js` file, change the `OWNER_EMAIL` environment variable or directly modify:

```javascript
to: process.env.OWNER_EMAIL || 'owner@graftikle.com'
```

No server is required for EmailJS. If you later add a backend, document it here.

## Email Template

The system sends beautifully formatted HTML emails containing:

- **Client Information**: Name, email, phone, age
- **Hair Loss Details**: Type of hair loss, preferred consultation date
- **Previous Treatments**: Any treatments the client has tried
- **Additional Information**: Client's concerns and goals
- **Submission Timestamp**: When the form was submitted

## Alternative Email Solutions

If you prefer not to use the Node.js server, you can use these alternatives:

### 1. EmailJS (Client-side)
Already integrated. Replace keys in `index.html` and `script.js`.

### 2. Formspree

1. Sign up at [Formspree](https://formspree.io/)
2. Replace the form action with your Formspree endpoint
3. Remove the JavaScript form handling

### 3. Netlify Forms

1. Deploy to Netlify
2. Add `netlify` attribute to the form
3. Configure email notifications in Netlify dashboard

## File Structure

```
graftikle-landing-page/
├── index.html          # Main landing page
├── styles.css          # Global custom styles (centering fixes)
├── script.js           # JavaScript functionality
├── package.json        # Dependencies
├── README.md           # This file
└── assests/
    └── doc-img.png     # Doctor image
```

## Customization

### Colors
The color scheme is defined in the Tailwind config in `index.html`:
- Primary: `#00364A`
- Secondary: `#002736`
- Accent: `#F59E0B`

### Form Fields
To add or modify form fields:
1. Update the HTML form in `index.html`
2. Update the validation in `script.js`
3. Update the email template in `server.js`

### Styling
Tailwind utility classes in `index.html` plus custom CSS:
- `styles.css` (global layout and animations)
- `consultation.css` (form + modal, stage selection indicators, responsive modal)
- `results.css`, `treatment-styles.css`, `faq-footer.css`, `roadmap.css`

## Security Considerations

- Never commit email credentials to version control
- Use environment variables for sensitive data
- Consider implementing rate limiting for the form
- Add CAPTCHA for production use
- Validate all inputs on the server side

## Troubleshooting

### Email Not Sending
1. Check your email credentials
2. Verify your email service settings
3. Check the server console for error messages
4. Ensure your email service allows SMTP access

### Form Not Working
1. Check browser console for JavaScript errors
2. Verify all form field IDs match the JavaScript
3. Ensure EmailJS keys are correct and the SDK is loaded

### Styling Issues
1. Check if Tailwind CSS is loading properly
2. Verify custom CSS is being applied
3. Test on different browsers and devices

## Support

For issues or questions, please check the troubleshooting section above or contact the development team.

## Recent Updates

- Light blue global background, removed conflicting per-section backgrounds
- Added consultation modal (opens on load), unified with section form
- Stage selection visuals with CSS-only checkmark in popup
- Results slideshow updated to `patient_results1.webp` … `patient_results4.webp`
- Mobile menu now auto-closes after selecting a link
- Always start at top/first section on reload
- Responsive modal adjustments for small screens and cohesive desktop card
- Global centering and layout hardening to avoid left shift on mobile/tablet

## License

MIT License - feel free to use and modify as needed.
