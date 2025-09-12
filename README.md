# Graftikle Landing Page

A modern, responsive landing page for Graftikle Hair Transplant services with a functional single-column consultation form that sends consultation requests via email using both server-side processing and mailto fallback.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Single-Column Layout**: Streamlined consultation form with improved user experience
- **Hair Loss Stage Selection**: Visual selection of baldness stages with images
- **Server-Side Email Processing**: Node.js/Express server for reliable email delivery
- **Mailto Fallback**: Automatic fallback to client-side email if server is unavailable
- **Form Validation**: Client-side validation for all required fields
- **Loading States**: Visual feedback during form submission
- **Success/Error Handling**: User-friendly feedback messages

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

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Email Settings

You have several options for email configuration:

#### Option A: Using Gmail (Recommended for testing)

1. Create a `.env` file in the root directory:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
OWNER_EMAIL=owner@graftikle.com
```

2. For Gmail, you'll need to:
   - Enable 2-factor authentication
   - Generate an "App Password" (not your regular password)
   - Use the app password in the EMAIL_PASS field

#### Option B: Using Other Email Services

Edit the `server.js` file and modify the transporter configuration:

```javascript
const transporter = nodemailer.createTransporter({
  service: 'outlook', // or 'yahoo', 'hotmail', etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

#### Option C: Using Custom SMTP

```javascript
const transporter = nodemailer.createTransporter({
  host: 'your-smtp-host.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

### 3. Update Owner Email

In the `server.js` file, change the `OWNER_EMAIL` environment variable or directly modify:

```javascript
to: process.env.OWNER_EMAIL || 'owner@graftikle.com'
```

### 4. Start the Server

#### Development Mode (with auto-restart):
```bash
npm run dev
```

#### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:3000`

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

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service and template
3. Uncomment the EmailJS code in `script.js`
4. Replace the placeholder credentials with your actual EmailJS credentials

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
├── styles.css          # Custom styles
├── script.js           # JavaScript functionality
├── server.js           # Node.js server for email
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
All styling is done with Tailwind CSS classes. Custom styles are in `styles.css`.

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
3. Ensure the server is running on the correct port

### Styling Issues
1. Check if Tailwind CSS is loading properly
2. Verify custom CSS is being applied
3. Test on different browsers and devices

## Support

For issues or questions, please check the troubleshooting section above or contact the development team.

## License

MIT License - feel free to use and modify as needed.
