import nodemailer from "nodemailer";
import SOS from "../models/SOS.js";

export const sendSOS = async (req, res) => {
  try {
    const { name, phone, emergency, location } = req.body;

    // ================= VALIDATION =================
    if (!name || !phone || !emergency) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields (name, phone, emergency)",
      });
    }

    // ================= GUARD: Check env vars =================
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("❌ EMAIL_USER or EMAIL_PASS is missing from .env");
      return res.status(500).json({
        success: false,
        message: "Server email config is missing. Contact admin.",
      });
    }

    // Save to MongoDB
    const newSOS = new SOS({
      name,
      phone,
      emergency,
      location,
    });

    await newSOS.save();

    // ================= Nodemailer setup =================
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },

      tls: {
        rejectUnauthorized: false,
      },
    });

    // ================= VERIFY CONNECTION FIRST =================
    // This catches auth errors early with a clear message
    try {
      await transporter.verify();
      console.log("✅ SMTP SERVER READY");
    } catch (verifyErr) {
      console.error("❌ SMTP Verification Failed:", verifyErr.message);

      if (verifyErr.code === "EAUTH") {
        return res.status(500).json({
          success: false,
          message:
            "Email authentication failed. The Gmail App Password may have expired. Please generate a new one at https://myaccount.google.com/apppasswords",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Could not connect to email server. Check internet/firewall.",
      });
    }

    // ================= Send email =================
    await transporter.sendMail({
      from: `"SOS Alert System" <${process.env.EMAIL_USER}>`,
      to: process.env.DOCTOR_EMAIL,
      subject: "🚨 Emergency SOS Alert",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 2px solid #e53e3e; border-radius: 12px; overflow: hidden;">
          <div style="background: #e53e3e; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">🚨 Emergency SOS Alert</h1>
          </div>
          <div style="padding: 24px; background: #fff8f8;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #555; width: 40%;">👤 Patient Name</td>
                <td style="padding: 10px; color: #111;">${name}</td>
              </tr>
              <tr style="background: #fff0f0;">
                <td style="padding: 10px; font-weight: bold; color: #555;">📞 Phone</td>
                <td style="padding: 10px; color: #111;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #555;">🚨 Emergency</td>
                <td style="padding: 10px; color: #111;">${emergency}</td>
              </tr>
              <tr style="background: #fff0f0;">
                <td style="padding: 10px; font-weight: bold; color: #555;">📍 Location</td>
                <td style="padding: 10px; color: #111;">${location || "Not Provided"}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #555;">🕐 Time</td>
                <td style="padding: 10px; color: #111;">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
              </tr>
            </table>
            <div style="text-align: center; margin-top: 24px;">
              <a
                href="https://wa.me/${phone.replace(/\\D/g, "")}"
                style="background: #25D366; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-size: 16px; font-weight: bold; display: inline-block;"
              >
                💬 Contact Patient on WhatsApp
              </a>
            </div>
          </div>
          <div style="background: #e53e3e; padding: 10px; text-align: center;">
            <p style="color: white; margin: 0; font-size: 12px;">
              This is an automated emergency alert. Please respond immediately.
            </p>
          </div>
        </div>
      `,
    });

    res.status(200).json({
      success: true,
      message: "✅ SOS Alert Sent Successfully! Help is on the way.",
    });

  } catch (err) {
    console.error("❌ SOS Error:", err.message);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};