const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Email configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail', // You can change this to your email service
  auth: {
    user: process.env.EMAIL_USER || 'ankitmamgai9@gmail.com', // Replace with your email
    pass: process.env.EMAIL_PASS || 'Mamgai@2004' // Replace with your app password
  }
});

// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const {
      from_name,
      from_email,
      phone,
      age,
      location,
      hair_loss_level,
      message
    } = req.body;

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: process.env.OWNER_EMAIL || 'owner@graftikle.com', // Replace with owner's email
      subject: `New Consultation Request from ${from_name} - Graftikle`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00364A;">New Consultation Request - Graftikle</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #00364A; margin-top: 0;">Client Information</h3>
            <p><strong>Name:</strong> ${from_name}</p>
            <p><strong>Email:</strong> ${from_email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Age:</strong> ${age}</p>
          </div>

                     <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
             <h3 style="color: #00364A; margin-top: 0;">Hair Loss Details</h3>
             <p><strong>Location:</strong> ${location}</p>
             <p><strong>Hair Loss Level:</strong> ${hair_loss_level}</p>
           </div>

          <div style="background-color: #e8f4f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #666;">
              <strong>Submitted on:</strong> ${new Date().toLocaleString()}
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #666; font-size: 14px;">
              This email was sent from the Graftikle website contact form.
            </p>
          </div>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({ 
      success: true, 
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email',
      error: error.message 
    });
  }
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view the website`);
});

module.exports = app; 