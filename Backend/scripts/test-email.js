const path = require('path');
const fs = require('fs');

// Check possible .env locations: Backend/.env, current directory .env, or parent .env
const possibleEnvPaths = [
  path.join(__dirname, '../.env'),
  path.join(process.cwd(), 'Backend/.env'),
  path.join(process.cwd(), '.env'),
  path.join(__dirname, '../../.env'),
];

for (const envPath of possibleEnvPaths) {
  if (fs.existsSync(envPath)) {
    require('@dotenvx/dotenvx').config({ path: envPath, silent: true });
    break;
  }
}

const nodemailer = require('nodemailer');

const recipient = process.argv[2] || process.env.EMAIL_USER || 'techverse@ctuniversity.in';
const emailPass = process.env.EMAIL_PASS ? String(process.env.EMAIL_PASS).replace(/\s+/g, '').trim() : '';
const emailUser = (process.env.EMAIL_USER ? String(process.env.EMAIL_USER).trim() : '') || 'techverse@ctuniversity.in';

if (!emailPass) {
  console.error("❌ ERROR: EMAIL_PASS is not defined in your Backend/.env file!");
  console.log("👉 Please open 'c:\\Users\\rajde\\Desktop\\projects\\TECH-VERSE\\Backend\\.env'");
  console.log("👉 Add your 16-character Google App Password: EMAIL_PASS=your16charpassword");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

console.log(`📡 Testing SMTP connection for ${process.env.EMAIL_USER || 'techverse@ctuniversity.in'}...`);

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Verification Failed:", error.message);
    console.log("\nCommon causes:");
    console.log("1. 2-Step Verification is not enabled on techverse@ctuniversity.in.");
    console.log("2. You used the account's normal password instead of a Google App Password.");
    console.log("3. Generate an App Password at: https://myaccount.google.com/apppasswords");
  } else {
    console.log("✅ SMTP Server is ready to send messages!");
    console.log(`📤 Sending test email to ${recipient}...`);

    transporter.sendMail({
      from: `"TechVerse CT University" <${process.env.EMAIL_USER || 'techverse@ctuniversity.in'}>`,
      to: recipient,
      subject: "Test Email from TechVerse",
      html: "<h3>Success!</h3><p>Your email service is configured correctly and ready to send member ID cards.</p>",
    }, (err, info) => {
      if (err) {
        console.error("❌ Failed to send email:", err.message);
      } else {
        console.log(`🎉 Test email sent successfully! Message ID: ${info.messageId}`);
      }
    });
  }
});
