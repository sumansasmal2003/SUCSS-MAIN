import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Member from '@/models/Member';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { identifier, otp, newPassword } = await req.json();

    const member = await Member.findOne({
      $or: [{ email: identifier }, { username: identifier }],
      resetPasswordOtp: otp,
      resetPasswordExpires: { $gt: Date.now() } // Check expiry
    });

    if (!member) {
      return NextResponse.json({ success: false, error: "Invalid or Expired OTP" }, { status: 400 });
    }

    // Reset Password
    member.password = newPassword; // Hash this in production!

    // Clear OTP fields
    member.resetPasswordOtp = undefined;
    member.resetPasswordExpires = undefined;

    await member.save();

    return NextResponse.json({ success: true, message: "Password updated successfully" });

  } catch (error) {
    return NextResponse.json({ success: false, error: "Reset Failed" }, { status: 500 });
  }
}
