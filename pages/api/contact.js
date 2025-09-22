import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Ensure the request is a POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, message } = req.body;

  // Set up the transporter using your environment variables
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address from .env.local
      pass: process.env.EMAIL_PASS, // Your App Password from .env.local
    },
  });

  // Define the email content
  const mailOptions = {
    from: `"Sobha Townpark Banglore" <${process.env.EMAIL_USER}>`,
    to: 'PROPPHASE@GMAIL.COM', // Your specified receiving email address
    subject: `New Enquiry from ${name} via Website`,
    html: `
      <h1>New Contact Form Submission</h1>
      <p>You have a new enquiry from your Sobha Town Park website.</p>
      <hr>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email || 'Not provided'}</p>
      <p><strong>Message:</strong> ${message || 'Not provided'}</p>
      <hr>
    `,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    // Send a success response
    res.status(200).json({ status: 'Ok' });
  } catch (error) {
    console.error('Failed to send email:', error);
    // Send an error response
    res.status(500).json({ error: 'Error sending email' });
  }
}

