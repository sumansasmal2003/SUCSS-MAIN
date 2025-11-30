import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Member from '@/models/Member';
import nodemailer from 'nodemailer';
import { getOtpEmail } from '@/lib/emailTemplates';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { identifier } = await req.json(); // Can be email or username

    // Find member by email OR username
    const member = await Member.findOne({
      $or: [{ email: identifier }, { username: identifier }]
    });

    if (!member) {
      // Security: Don't reveal if user exists. Fake a delay.
      await new Promise(resolve => setTimeout(resolve, 1000));
      return NextResponse.json({ success: true, message: "If account exists, OTP sent." });
    }

    if (!member.email) {
      return NextResponse.json({ success: false, error: "No email linked to this account. Contact Admin." }, { status: 400 });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP to DB (Expires in 10 mins)
    member.resetPasswordOtp = otp;
    member.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 mins
    await member.save();

    // Send Email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"SUCSS Security" <${process.env.EMAIL_USER}>`,
      to: member.email,
      subject: "Password Reset OTP - SUCSS",
      html: getOtpEmail(member.fullName, otp),
    });

    return NextResponse.json({ success: true, message: "OTP Sent" });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}
